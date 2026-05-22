import { NextResponse } from 'next/server';

import { getServerAuthSession } from '@/lib/auth';
import { buildToolTree } from '@/lib/tools';

export async function GET() {
	try {
		const session = await getServerAuthSession();
		const tree = await buildToolTree(session?.user?.tags ?? {});

		return NextResponse.json(tree);
	} catch (error) {
		console.error('Error fetching tool tree:', error);
		return NextResponse.json({ error: 'Failed to fetch tool tree' }, { status: 500 });
	}
}
