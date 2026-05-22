import { getServerAuthSession } from '@/lib/auth';
import { canModifyDepartment, createToolForDepartment, getToolsByUserTags } from '@/lib/tools';
import { ToolType, type ToolPricing } from '@/lib/db/entities/tool';
import { NextResponse } from 'next/server';

function isValidUrl(value: string) {
	try {
		const url = new URL(value);
		return url.protocol === 'http:' || url.protocol === 'https:';
	} catch {
		return false;
	}
}

export async function GET() {
	try {
		const session = await getServerAuthSession();

		// Get tools filtered by user's department access
		const tools = await getToolsByUserTags(session?.user?.tags);

		return NextResponse.json(tools);
	} catch (error) {
		console.error('Error fetching tools:', error);
		return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const session = await getServerAuthSession();

		if (!session?.user?.emailVerified) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const body = (await request.json()) as {
			name?: string;
			description?: string;
			type?: ToolType;
			departmentId?: string;
			pricing?: ToolPricing | null;
			link?: string;
		};

		const name = body.name?.trim();
		const description = body.description?.trim() ?? '';
		const type = body.type;
		const departmentId = body.departmentId;
		const link = body.link?.trim();

		if (!name) {
			return NextResponse.json({ error: 'Name is required' }, { status: 400 });
		}

		if (!departmentId) {
			return NextResponse.json({ error: 'Department is required' }, { status: 400 });
		}

		if (type !== ToolType.INTERNAL && type !== ToolType.EXTERNAL) {
			return NextResponse.json({ error: 'Tool type must be internal or external' }, { status: 400 });
		}

		if (!canModifyDepartment(session.user.tags, departmentId)) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
		}

		let pricing: ToolPricing | null = null;
		let links: string[] = [];

		if (type === ToolType.EXTERNAL) {
			if (!body.pricing || typeof body.pricing !== 'object') {
				return NextResponse.json({ error: 'Pricing is required for external tools' }, { status: 400 });
			}

			const { amount, period, currency, perUser } = body.pricing;

			if (typeof amount !== 'number' || Number.isNaN(amount) || amount < 0) {
				return NextResponse.json({ error: 'pricing.amount must be a positive number' }, { status: 400 });
			}
			if (period !== undefined && !['daily', 'weekly', 'monthly', 'yearly'].includes(period)) {
				return NextResponse.json({ error: 'pricing.period invalid' }, { status: 400 });
			}
			if (currency !== undefined && typeof currency !== 'string') {
				return NextResponse.json({ error: 'pricing.currency must be a string' }, { status: 400 });
			}
			if (perUser !== undefined && typeof perUser !== 'boolean') {
				return NextResponse.json({ error: 'pricing.perUser must be a boolean' }, { status: 400 });
			}

			pricing = {
				amount,
				period,
				currency,
				perUser: perUser ?? false,
			};
		}

		if (type === ToolType.INTERNAL) {
			if (!link || !isValidUrl(link)) {
				return NextResponse.json({ error: 'A valid link is required for internal tools' }, { status: 400 });
			}

			links = [link];
		}

		const tool = await createToolForDepartment({
			name,
			description,
			type,
			departmentId,
			links,
			pricing,
		});

		return NextResponse.json({ tool }, { status: 201 });
	} catch (error) {
		console.error('Error creating tool:', error);
		return NextResponse.json({ error: 'Failed to create tool' }, { status: 500 });
	}
}
