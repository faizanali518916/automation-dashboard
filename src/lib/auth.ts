import { randomBytes } from 'node:crypto';

import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import type { NextRequest, NextResponse } from 'next/server';

import { AppDataSource, runDbOperation } from '@/lib/db/data-source';
import { TokenEntity, TokenType } from './db/entities/token';
import { UserEntity, type UserTags } from './db/entities/user';
import { DepartmentEntity } from './db/entities/department';

const SESSION_COOKIE = 'session';

declare global {
	var __sessionLookupCache: Map<string, Promise<AuthUser | null>> | undefined;
}

export type Department = string;

export async function getDepartments(): Promise<string[]> {
	return runDbOperation(async () => {
		const repo = AppDataSource.getRepository(DepartmentEntity);
		const rows = await repo.find({ select: ['name'], order: { name: 'ASC' } });
		return rows.map((r) => r.name);
	});
}

export type AuthUser = {
	id: string;
	email: string;
	name: string | null;
	tags: UserTags;
	emailVerified: boolean;
};

function randomToken() {
	return randomBytes(32).toString('hex');
}

export async function normalizeDepartment(value: string | undefined): Promise<Department | null> {
	if (!value) return null;
	const allowed = await getDepartments();
	return allowed.includes(value) ? value : null;
}

export async function hashPassword(password: string) {
	return bcrypt.hash(password, 12);
}

export async function checkPassword(password: string, hash: string) {
	return bcrypt.compare(password, hash);
}

export async function registerUser(email: string, password: string, name: string | null, dept: Department) {
	const passwordHash = await hashPassword(password);

	return runDbOperation(async () => {
		const userRepo = AppDataSource.getRepository(UserEntity);

		const normalizedEmail = email.toLowerCase().trim();
		const existing = await userRepo.findOne({ where: { email: normalizedEmail } });
		if (existing) {
			return { error: 'Email already registered' };
		}

		const deptRepo = AppDataSource.getRepository(DepartmentEntity);
		const deptRecord = await deptRepo.findOne({ where: { name: dept } });
		const initialTags: UserTags = {
			isAdministrator: false,
			isSuperUser: false,
			canModify: [],
			canView: deptRecord ? [deptRecord.id] : [],
		};

		const user = await userRepo.save(
			userRepo.create({
				email: normalizedEmail,
				password: passwordHash,
				name,
				emailVerified: false,
				tags: initialTags,
			})
		);

		const token = randomToken();
		const tokenRepo = AppDataSource.getRepository(TokenEntity);
		await tokenRepo.save(
			tokenRepo.create({
				type: TokenType.EMAIL_VERIFICATION,
				tokenHash: token,
				userId: user.id,
				expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
				revokedAt: null,
			})
		);

		return { ok: true, verifyToken: token };
	});
}

export async function verifyEmailAndCreateSession(token: string) {
	return runDbOperation(async () => {
		const tokenRepo = AppDataSource.getRepository(TokenEntity);
		const record = await tokenRepo.findOne({
			where: { type: TokenType.EMAIL_VERIFICATION, tokenHash: token },
		});

		if (!record || record.expiresAt < new Date()) {
			return null;
		}

		const userRepo = AppDataSource.getRepository(UserEntity);
		const user = await userRepo.findOne({ where: { id: record.userId } });
		if (!user) {
			return null;
		}

		user.emailVerified = true;
		await userRepo.save(user);
		await tokenRepo.delete({ id: record.id });

		const sessionToken = randomToken();
		const refreshTokenRepo = AppDataSource.getRepository(TokenEntity);
		await refreshTokenRepo.save(
			refreshTokenRepo.create({
				type: TokenType.REFRESH,
				tokenHash: sessionToken,
				userId: user.id,
				expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
				revokedAt: null,
			})
		);

		return { sessionToken, user: userToAuth(user) };
	});
}

export async function loginUser(email: string, password: string) {
	const user = await runDbOperation(async () => {
		const userRepo = AppDataSource.getRepository(UserEntity);
		return userRepo
			.createQueryBuilder('u')
			.addSelect('u.password')
			.where('u.email = :email', { email: email.toLowerCase().trim() })
			.getOne();
	});

	if (!user || !(await checkPassword(password, user.password))) {
		return { error: 'Invalid credentials' };
	}

	if (!user.emailVerified) {
		return { error: 'Email not verified' };
	}

	const sessionToken = randomToken();
	await runDbOperation(async () => {
		const refreshRepo = AppDataSource.getRepository(TokenEntity);
		await refreshRepo.save(
			refreshRepo.create({
				type: TokenType.REFRESH,
				tokenHash: sessionToken,
				userId: user.id,
				expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
				revokedAt: null,
			})
		);
	});

	return { sessionToken, user: userToAuth(user) };
}

export async function getSessionUser(sessionToken: string): Promise<AuthUser | null> {
	return runDbOperation(async () => {
		const tokenRepo = AppDataSource.getRepository(TokenEntity);
		const session = await tokenRepo.findOne({
			where: { type: TokenType.REFRESH, tokenHash: sessionToken },
		});

		if (!session || session.revokedAt || session.expiresAt < new Date()) {
			return null;
		}

		const userRepo = AppDataSource.getRepository(UserEntity);
		const user = await userRepo.findOne({ where: { id: session.userId } });
		return user ? userToAuth(user) : null;
	});
}

export async function revokeSession(sessionToken: string) {
	return runDbOperation(async () => {
		const tokenRepo = AppDataSource.getRepository(TokenEntity);
		const session = await tokenRepo.findOne({
			where: { type: TokenType.REFRESH, tokenHash: sessionToken },
		});
		if (session) {
			session.revokedAt = new Date();
			await tokenRepo.save(session);
		}
	});
}

function userToAuth(user: UserEntity): AuthUser {
	return {
		id: user.id,
		email: user.email,
		name: user.name,
		tags: user.tags,
		emailVerified: user.emailVerified,
	};
}

export async function getServerAuthSession(): Promise<{ user: AuthUser } | null> {
	const cookieStore = await cookies();
	const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;
	if (!sessionToken) return null;

	// Deduplicate concurrent lookups for the same session token to avoid
	// issuing parallel DB queries on the same pg client which can trigger
	// the deprecation warning in pg when a single client is reused.
	const cacheKey = `session:${sessionToken}`;
	if (!globalThis.__sessionLookupCache) {
		globalThis.__sessionLookupCache = new Map<string, Promise<AuthUser | null>>();
	}
	const cache = globalThis.__sessionLookupCache;

	let promise = cache.get(cacheKey);
	if (!promise) {
		promise = (async () => {
			try {
				return await getSessionUser(sessionToken);
			} finally {
				// remove once settled so later requests will re-run lookup
				cache.delete(cacheKey);
			}
		})();
		cache.set(cacheKey, promise);
	}

	const user = await promise;
	return user ? { user } : null;
}

export function getSessionToken(request: NextRequest): string | null {
	return request.cookies.get(SESSION_COOKIE)?.value ?? null;
}

export function setSessionCookie(response: NextResponse, sessionToken: string) {
	response.cookies.set(SESSION_COOKIE, sessionToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: 30 * 24 * 60 * 60,
	});
}

export function clearSessionCookie(response: NextResponse) {
	response.cookies.set(SESSION_COOKIE, '', {
		httpOnly: true,
		path: '/',
		maxAge: 0,
	});
}
