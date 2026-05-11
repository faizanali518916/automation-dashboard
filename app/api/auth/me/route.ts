import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getSessionToken, getSessionUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
	const sessionToken = getSessionToken(request);
	if (!sessionToken) {
		return NextResponse.json({ authenticated: false }, { status: 401 });
	}

	const user = await getSessionUser(sessionToken);
	if (!user) {
		return NextResponse.json({ authenticated: false }, { status: 401 });
	}

	return NextResponse.json({
		authenticated: true,
		user,
	});
}
