import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { hasRequiredTags } from '@/lib/abac';
import { requiredTagsByToolId } from '@/config/navigation';
import type { UserTags } from '@/lib/db/entities/auth.entities';

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (!pathname.startsWith('/tools/') && !pathname.startsWith('/docs/')) {
		return NextResponse.next();
	}

	const token = await getToken({
		req: request,
		secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
	});

	if (!token) {
		const signInUrl = new URL('/login', request.url);
		signInUrl.searchParams.set('callbackUrl', request.url);
		return NextResponse.redirect(signInUrl);
	}

	const toolId = pathname.split('/')[2];
	const requiredTags = requiredTagsByToolId.get(toolId) ?? [];
	const userTags = (token.tags as UserTags | undefined) ?? {};

	if (!hasRequiredTags(userTags, requiredTags)) {
		return NextResponse.redirect(new URL('/unauthorized', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/tools/:path*', '/docs/:path*'],
};
