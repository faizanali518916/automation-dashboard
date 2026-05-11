import { NextResponse } from 'next/server';

import { loginUser, setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
	try {
		const { email, password } = (await request.json()) as {
			email?: string;
			password?: string;
		};

		if (!email || !password) {
			return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
		}

		const result = await loginUser(email, password);
		if ('error' in result) {
			return NextResponse.json({ error: result.error }, { status: 401 });
		}

		const response = NextResponse.json({ ok: true });
		setSessionCookie(response, result.sessionToken);
		return response;
	} catch {
		return NextResponse.json({ error: 'Login failed' }, { status: 500 });
	}
}
