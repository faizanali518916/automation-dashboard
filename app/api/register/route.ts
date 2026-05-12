import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import { ALLOWED_DEPARTMENTS, normalizeDepartment, registerUser } from '@/lib/auth';

async function sendVerificationEmail(to: string, verifyUrl: string) {
	const smtpPort = Number(process.env.SMTP_PORT);
	const smtpHost = process.env.SMTP_HOST;
	const smtpUser = process.env.SMTP_USER;
	const smtpPass = process.env.SMTP_PASS;

	if (!smtpPort || !smtpHost || !smtpUser || !smtpPass) {
		throw new Error('SMTP configuration is incomplete.');
	}

	const transporter = nodemailer.createTransport({
		host: smtpHost,
		port: smtpPort,
		secure: smtpPort === 465,
		auth: {
			user: smtpUser,
			pass: smtpPass,
		},
	});

	await transporter.sendMail({
		from: smtpUser,
		to,
		subject: 'Verify your account',
		html: `<p>Click to verify your account:</p><p><a href="${verifyUrl}">${verifyUrl}</a></p>`,
	});
}

export async function POST(request: Request) {
	try {
		const { email, password, name, dept } = (await request.json()) as {
			email?: string;
			password?: string;
			name?: string;
			dept?: string;
		};

		if (!email?.trim() || !password?.trim()) {
			return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
		}

		if (password.length < 8) {
			return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
		}

		const department = normalizeDepartment(dept);
		if (!department) {
			return NextResponse.json(
				{ error: `Department must be one of: ${ALLOWED_DEPARTMENTS.join(', ')}` },
				{ status: 400 }
			);
		}

		const result = await registerUser(email.toLowerCase().trim(), password, name?.trim() || null, department);
		if ('error' in result) {
			return NextResponse.json({ error: result.error }, { status: 409 });
		}

		const verifyUrl = new URL(`/api/auth/verify-email?token=${result.verifyToken}`, request.url).toString();
		await sendVerificationEmail(email.toLowerCase().trim(), verifyUrl);
		const isDev = process.env.NODE_ENV !== 'production';

		return NextResponse.json({ ok: true, verificationPreviewUrl: isDev ? verifyUrl : null }, { status: 201 });
	} catch {
		return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
	}
}
