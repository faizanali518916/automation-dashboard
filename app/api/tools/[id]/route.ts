import { getServerAuthSession } from '@/lib/auth';
import { getToolByIdWithUserCheck } from '@/lib/tools';
import { NextResponse } from 'next/server';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;
		const session = await getServerAuthSession();

		// Get tool with user access check
		const tool = await getToolByIdWithUserCheck(id, session?.user?.tags);

		if (!tool) {
			return NextResponse.json({ error: 'Tool not found or access denied' }, { status: 404 });
		}

		return NextResponse.json(tool);
	} catch (error) {
		console.error('Error fetching tool:', error);
		return NextResponse.json({ error: 'Failed to fetch tool' }, { status: 500 });
	}
}
