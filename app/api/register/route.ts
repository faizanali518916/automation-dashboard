import { NextResponse } from 'next/server';

import { getDepartments, normalizeDepartment, registerUser } from '@/lib/auth';
import { sendActionEmail } from '@/lib/email';

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

		const department = await normalizeDepartment(dept);
		if (!department) {
			const allowed = await getDepartments();
			return NextResponse.json({ error: `Department must be one of: ${allowed.join(', ')}` }, { status: 400 });
		}

		const result = await registerUser(email.toLowerCase().trim(), password, name?.trim() || null, department);
		if ('error' in result) {
			return NextResponse.json({ error: result.error }, { status: 409 });
		}

		const verifyUrl = new URL(`/api/auth/verify-email?token=${result.verifyToken}`, request.url).toString();
		await sendActionEmail({
			to: email.toLowerCase().trim(),
			subject: 'Verify your account',
			title: 'Verify your account',
			description: 'Click the link below to verify your account.',
			actionUrl: verifyUrl,
			actionLabel: 'Verify account',
		});
		const isDev = process.env.NODE_ENV !== 'production';

		return NextResponse.json({ ok: true, previewUrl: isDev ? verifyUrl : null }, { status: 201 });
	} catch {
		return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
	}
}
