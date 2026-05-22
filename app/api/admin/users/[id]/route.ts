import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { AppDataSource, runDbOperation } from '@/lib/db/data-source';
import { UserEntity, type UserTags } from '@/lib/db/entities/user';
import { getSessionUser } from '@/lib/auth';
import { isAdministratorTags } from '@/lib/abac';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const cookieStore = await cookies();
		const sessionToken = cookieStore.get('session')?.value;
		if (!sessionToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		const requester = await getSessionUser(sessionToken);
		if (!requester || !isAdministratorTags(requester.tags)) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
		}

		const { id } = await params;
		const body = await request.json();
		const { tags } = body as { tags?: Partial<UserTags> };
		if (!tags || typeof tags !== 'object') {
			return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
		}

		const updatedTags = {
			isAdministrator: !!tags.isAdministrator,
			isSuperUser: !!tags.isSuperUser,
			canModify: Array.isArray(tags.canModify) ? tags.canModify : [],
			canView: Array.isArray(tags.canView) ? tags.canView : [],
		};

		const user = await runDbOperation(async () => {
			const userRepo = AppDataSource.getRepository(UserEntity);
			const existingUser = await userRepo.findOne({ where: { id } });
			if (!existingUser) return null;
			existingUser.tags = updatedTags;
			return userRepo.save(existingUser);
		});

		if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

		return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, tags: user.tags } });
	} catch {
		return NextResponse.json({ error: 'Unable to update user' }, { status: 500 });
	}
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const cookieStore = await cookies();
		const sessionToken = cookieStore.get('session')?.value;
		if (!sessionToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		const requester = await getSessionUser(sessionToken);
		if (!requester || !isAdministratorTags(requester.tags)) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
		}

		const { id } = await params;
		const user = await runDbOperation(async () => {
			const userRepo = AppDataSource.getRepository(UserEntity);
			return userRepo.findOne({
				where: { id },
				select: ['id', 'email', 'name', 'tags', 'createdAt', 'updatedAt'],
			});
		});
		if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

		return NextResponse.json({ user });
	} catch {
		return NextResponse.json({ error: 'Unable to load user' }, { status: 500 });
	}
}
