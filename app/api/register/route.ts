import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { AppDataSource } from '@/lib/db/data-source';
import { UserEntity } from '@/lib/db/entities/auth.entities';

const SALT_ROUNDS = 12;

const ALLOWED_EMAIL_DOMAINS = ['spctek.com'];
const ALLOWED_DEPARTMENTS = ['Marketing', 'Operations', 'Sales', 'Management'] as const;

type Department = (typeof ALLOWED_DEPARTMENTS)[number];

export async function POST(request: Request) {
	try {
		const { name, email, password, dept } = (await request.json()) as {
			name?: string;
			email?: string;
			password?: string;
			dept?: string;
		};

		if (!email || !password) {
			return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
		}

		const normalizedEmail = email.toLowerCase().trim();
		const emailParts = normalizedEmail.split('@');
		const emailDomain = emailParts.length === 2 ? emailParts[1] : '';

		if (!ALLOWED_EMAIL_DOMAINS.includes(emailDomain)) {
			return NextResponse.json({ error: 'Email must be from the spctek.com domain.' }, { status: 400 });
		}

		if (password.length < 8) {
			return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
		}

		if (!AppDataSource.isInitialized) {
			await AppDataSource.initialize();
		}

		const userRepo = AppDataSource.getRepository(UserEntity);
		const existingUser = await userRepo.findOne({ where: { email: normalizedEmail } });

		if (existingUser) {
			return NextResponse.json({ error: 'An account already exists for this email.' }, { status: 409 });
		}

		const department = ALLOWED_DEPARTMENTS.includes(dept as Department) ? (dept as Department) : null;

		if (!department) {
			return NextResponse.json(
				{ error: 'Department must be one of Marketing, Operations, Sales, or Management.' },
				{ status: 400 }
			);
		}

		const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

		const user = userRepo.create({
			name: name?.trim() || null,
			email: normalizedEmail,
			password: passwordHash,
			tags: {
				dept: department,
			},
		});

		await userRepo.save(user);

		return NextResponse.json({ ok: true }, { status: 201 });
	} catch {
		return NextResponse.json({ error: 'Failed to register user.' }, { status: 500 });
	}
}
