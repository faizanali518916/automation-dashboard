import { randomBytes } from 'node:crypto';

import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import type { NextRequest, NextResponse } from 'next/server';

import { ensureAppDataSource, AppDataSource } from '@/lib/db/data-source';
import { TokenEntity, TokenType, UserEntity, type UserTags } from '@/lib/db/entities/auth.entities';

const SESSION_COOKIE = 'session';

export const ALLOWED_DEPARTMENTS = ['Design', 'Marketing', 'Operations', 'Sales'] as const;

export type Department = (typeof ALLOWED_DEPARTMENTS)[number];

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

export function normalizeDepartment(value: string | undefined): Department | null {
	if (!value) return null;
	return ALLOWED_DEPARTMENTS.includes(value as Department) ? (value as Department) : null;
}

export async function hashPassword(password: string) {
	return bcrypt.hash(password, 12);
}

export async function checkPassword(password: string, hash: string) {
	return bcrypt.compare(password, hash);
}

export async function registerUser(email: string, password: string, name: string | null, dept: Department) {
	await ensureAppDataSource();
	const userRepo = AppDataSource.getRepository(UserEntity);

	const normalizedEmail = email.toLowerCase().trim();
	const existing = await userRepo.findOne({ where: { email: normalizedEmail } });
	if (existing) {
		return { error: 'Email already registered' };
	}

	const passwordHash = await hashPassword(password);
	const user = await userRepo.save(
		userRepo.create({
			email: normalizedEmail,
			password: passwordHash,
			name,
			emailVerified: false,
			tags: { dept },
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
}

export async function verifyEmailAndCreateSession(token: string) {
	await ensureAppDataSource();
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
}

export async function loginUser(email: string, password: string) {
	await ensureAppDataSource();
	const userRepo = AppDataSource.getRepository(UserEntity);

	const user = await userRepo
		.createQueryBuilder('u')
		.addSelect('u.password')
		.where('u.email = :email', { email: email.toLowerCase().trim() })
		.getOne();

	if (!user || !(await checkPassword(password, user.password))) {
		return { error: 'Invalid credentials' };
	}

	if (!user.emailVerified) {
		return { error: 'Email not verified' };
	}

	const sessionToken = randomToken();
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

	return { sessionToken, user: userToAuth(user) };
}

export async function getSessionUser(sessionToken: string): Promise<AuthUser | null> {
	await ensureAppDataSource();
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
}

export async function revokeSession(sessionToken: string) {
	await ensureAppDataSource();
	const tokenRepo = AppDataSource.getRepository(TokenEntity);
	const session = await tokenRepo.findOne({
		where: { type: TokenType.REFRESH, tokenHash: sessionToken },
	});
	if (session) {
		session.revokedAt = new Date();
		await tokenRepo.save(session);
	}
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
	const user = await getSessionUser(sessionToken);
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
