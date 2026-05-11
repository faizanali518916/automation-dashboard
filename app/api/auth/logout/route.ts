import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { clearSessionCookie, getSessionToken, revokeSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
	const sessionToken = getSessionToken(request);
	if (sessionToken) {
		await revokeSession(sessionToken);
	}

	const response = NextResponse.json({ ok: true });
	clearSessionCookie(response);
	return response;
}
