import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getSessionUser, getSessionToken } from '@/lib/auth';
import { getToolById, updateTool } from '@/lib/tools';
import type { ToolDocumentationBlock } from '@/lib/db/entities/tool';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id: toolId } = await params;

	const sessionToken = getSessionToken(request);
	if (!sessionToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const user = await getSessionUser(sessionToken);
	if (!user?.emailVerified) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const tool = await getToolById(toolId);
	if (!tool) {
		return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
	}

	// Check if user has modify permission for this tool's department
	const canModify =
		user.tags?.isAdministrator ||
		user.tags?.isSuperUser ||
		(tool.departmentId && user.tags?.canModify?.includes(tool.departmentId));

	if (!canModify) {
		return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
	}

	try {
		const body = await request.json();

		type PricingPayload = {
			amount?: number;
			period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
			currency?: string;
			perUser?: boolean;
		} | null;

		const {
			documentation,
			title: newTitle,
			description: newDescription,
			pricing,
		} = body as {
			documentation?: ToolDocumentationBlock[];
			title?: string;
			description?: string;
			pricing?: PricingPayload;
		};

		const updates: Record<string, unknown> = {};

		if (typeof newTitle !== 'undefined') {
			if (typeof newTitle !== 'string') return NextResponse.json({ error: 'Title must be a string' }, { status: 400 });
			updates.name = newTitle;
		}

		if (typeof newDescription !== 'undefined') {
			if (typeof newDescription !== 'string')
				return NextResponse.json({ error: 'Description must be a string' }, { status: 400 });
			updates.description = newDescription;
		}

		if (typeof pricing !== 'undefined') {
			// Validate pricing object if provided
			if (pricing !== null && typeof pricing !== 'object') {
				return NextResponse.json({ error: 'pricing must be an object or null' }, { status: 400 });
			}
			if (pricing === null) {
				updates.pricing = null;
			} else {
				const { amount, period, currency, perUser } = pricing;
				if (amount !== undefined && typeof amount !== 'number')
					return NextResponse.json({ error: 'pricing.amount must be number' }, { status: 400 });
				if (period !== undefined && !['daily', 'weekly', 'monthly', 'yearly'].includes(period))
					return NextResponse.json({ error: 'pricing.period invalid' }, { status: 400 });
				if (currency !== undefined && typeof currency !== 'string')
					return NextResponse.json({ error: 'pricing.currency must be string' }, { status: 400 });
				if (perUser !== undefined && typeof perUser !== 'boolean')
					return NextResponse.json({ error: 'pricing.perUser must be boolean' }, { status: 400 });

				// Build a pricing object only with provided fields to avoid persisting an empty object
				const newPricing: Record<string, unknown> = {};
				if (amount !== undefined) newPricing.amount = amount;
				if (period !== undefined) newPricing.period = period;
				if (currency !== undefined) newPricing.currency = currency;
				if (perUser !== undefined) newPricing.perUser = perUser;
				if (Object.keys(newPricing).length > 0) {
					updates.pricing = newPricing;
				}
			}
		}

		if (documentation !== undefined) {
			if (!Array.isArray(documentation)) {
				return NextResponse.json({ error: 'Documentation must be an array of blocks' }, { status: 400 });
			}

			// Validate each block
			for (const block of documentation) {
				if (!block.title || typeof block.title !== 'string') {
					return NextResponse.json({ error: 'Each block must have a title' }, { status: 400 });
				}
				if (typeof block.description !== 'string') {
					return NextResponse.json({ error: 'Each block must have a description' }, { status: 400 });
				}
				if (!Array.isArray(block.bullets)) {
					return NextResponse.json({ error: 'Each block must have bullets array' }, { status: 400 });
				}
				for (const bullet of block.bullets) {
					if (typeof bullet !== 'string') {
						return NextResponse.json({ error: 'All bullets must be strings' }, { status: 400 });
					}
				}
			}

			updates.documentation = documentation;
		}

		let updatedTool;
		if (Object.keys(updates).length > 0) {
			updatedTool = await updateTool(toolId, updates);
		} else {
			// nothing to update
			updatedTool = tool;
		}

		return NextResponse.json(updatedTool);
	} catch (error) {
		console.error('Failed to update documentation:', error);
		return NextResponse.json({ error: 'Failed to update documentation' }, { status: 500 });
	}
}
