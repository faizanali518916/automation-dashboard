import { NextResponse } from 'next/server';

import { resetPasswordWithToken } from '@/lib/auth';

export async function POST(request: Request) {
	try {
		const { token, password } = (await request.json()) as {
			token?: string;
			password?: string;
		};

		if (!token?.trim() || !password?.trim()) {
			return NextResponse.json({ error: 'Token and password required' }, { status: 400 });
		}

		if (password.length < 8) {
			return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
		}

		const result = await resetPasswordWithToken(token.trim(), password);
		if ('error' in result) {
			return NextResponse.json({ error: result.error }, { status: 400 });
		}

		return NextResponse.json({ ok: true });
	} catch {
		return NextResponse.json({ error: 'Unable to reset password' }, { status: 500 });
	}
}
