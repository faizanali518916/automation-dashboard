import { NextResponse } from 'next/server';

import { setSessionCookie, verifyEmailAndCreateSession } from '@/lib/auth';

export async function GET(request: Request) {
	const url = new URL(request.url);
	const token = url.searchParams.get('token');

	if (!token) {
		return NextResponse.redirect(new URL('/login?error=no-token', request.url));
	}

	const result = await verifyEmailAndCreateSession(token);
	if (!result) {
		return NextResponse.redirect(new URL('/login?error=invalid-token', request.url));
	}

	const response = NextResponse.redirect(new URL('/', request.url));
	setSessionCookie(response, result.sessionToken);
	return response;
}
