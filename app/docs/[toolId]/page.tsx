import { notFound } from 'next/navigation';

import { EditableDocTemplate } from '@/components/docs/editable-doc-template';
import { getAllTools, getToolBySlug } from '@/lib/tools';
import { getServerAuthSession } from '@/lib/auth';

type ToolDocSection = {
	title: string;
	description?: string;
	items?: string[];
	note?: string;
};

function toSections(blocks: Array<{ title: string; description: string; bullets: string[] }>): ToolDocSection[] {
	return blocks.map((block) => ({
		title: block.title,
		description: block.description || undefined,
		items: block.bullets,
	}));
}

function toExternalToolLinks(links: string[]) {
	return links.map((href, index) => ({
		label: links.length > 1 ? `Open Tool ${index + 1}` : 'Open Tool',
		href,
	}));
}

export async function generateStaticParams() {
	const tools = await getAllTools();
	return tools.map((tool) => ({
		toolId: tool.slug,
	}));
}

export async function generateMetadata({ params }: { params: Promise<{ toolId: string }> }) {
	const { toolId } = await params;
	const tool = await getToolBySlug(toolId);

	if (!tool) {
		return {};
	}

	const summary = tool.description ?? tool.name;

	return {
		title: `${tool.name} | Tool Docs`,
		description: summary,
	};
}

export default async function ExternalToolDocPage({ params }: { params: Promise<{ toolId: string }> }) {
	const { toolId } = await params;
	const tool = await getToolBySlug(toolId);
	const session = await getServerAuthSession();

	if (!tool) {
		notFound();
	}

	// Check if user has modify permission for this tool's department
	const canEdit =
		!!session?.user &&
		(session.user.tags?.isAdministrator ||
			session.user.tags?.isSuperUser ||
			(tool.departmentId && session.user.tags?.canModify?.includes(tool.departmentId)));

	return (
		<EditableDocTemplate
			toolId={tool.id}
			eyebrow={tool.type === 'external' ? 'External Tool' : 'Internal Tool'}
			title={tool.name}
			summary={tool.description ?? ''}
			pricing={tool.type === 'external' ? tool.pricing : undefined}
			toolLinks={toExternalToolLinks(tool.links)}
			sections={toSections(tool.documentation ?? [])}
			canEdit={!!canEdit}
		/>
	);
}
