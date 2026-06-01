import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { AppDataSource, runDbOperation } from '@/lib/db/data-source';
import { UserEntity } from '@/lib/db/entities/user';
import { getSessionUser } from '@/lib/auth';
import { isAdministratorTags } from '@/lib/abac';

export async function GET() {
	try {
		const cookieStore = await cookies();
		const sessionToken = cookieStore.get('session')?.value;
		if (!sessionToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		const requester = await getSessionUser(sessionToken);
		if (!requester || !isAdministratorTags(requester.tags)) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
		}

		const users = await runDbOperation(async () => {
			const userRepo = AppDataSource.getRepository(UserEntity);
			return userRepo.find({
				select: ['id', 'email', 'name', 'tags', 'createdAt'],
				order: { createdAt: 'DESC' },
			});
		});

		return NextResponse.json({ users });
	} catch {
		return NextResponse.json({ error: 'Unable to load users' }, { status: 500 });
	}
}
