import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getSessionToken, getSessionUser } from '@/lib/auth';
import { getToolBySlug } from '@/lib/tools';
import type { UserTags } from '@/lib/db/entities/user';

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (!pathname.startsWith('/docs/')) {
		return NextResponse.next();
	}

	const sessionToken = getSessionToken(request);
	let userTags: UserTags | null = null;

	if (sessionToken) {
		const user = await getSessionUser(sessionToken);
		if (user?.emailVerified) {
			userTags = user.tags ?? {};
		}
	}

	if (!userTags) {
		const signInUrl = new URL('/login', request.url);
		signInUrl.searchParams.set('callbackUrl', request.url);
		return NextResponse.redirect(signInUrl);
	}

	const toolSlug = pathname.split('/')[2];
	const tool = await getToolBySlug(toolSlug);

	if (!tool) {
		return NextResponse.redirect(new URL('/unauthorized', request.url));
	}

	if (
		tool.departmentId &&
		!userTags.canView?.includes(tool.departmentId) &&
		!userTags.isAdministrator &&
		!userTags.isSuperUser
	) {
		return NextResponse.redirect(new URL('/unauthorized', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/docs/:path*'],
};
