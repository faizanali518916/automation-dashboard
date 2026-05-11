import { notFound } from 'next/navigation';

import { DocTemplate } from '@/components/docs/doc-template';
import { externalToolDocs } from '@/config/external-docs';
import { externalToolPricing } from '@/config/external-tool-pricing';

type ExternalDocsIndex = typeof externalToolDocs;

type ExternalToolDoc = ExternalDocsIndex[keyof ExternalDocsIndex];

const docsIndex = externalToolDocs;

function buildSummary(tool: ExternalToolDoc) {
	return tool.summary;
}

function buildSections(tool: ExternalToolDoc) {
	return tool.sections;
}

export function generateStaticParams() {
	return Object.keys(docsIndex).map((toolId) => ({
		toolId,
	}));
}

export async function generateMetadata({ params }: { params: Promise<{ toolId: string }> }) {
	const { toolId } = await params;
	const tool = docsIndex[toolId];

	if (!tool) {
		return {};
	}

	return {
		title: `${tool.title} | External Tool Docs`,
		description: tool.summary,
	};
}

export default async function ExternalToolDocPage({ params }: { params: Promise<{ toolId: string }> }) {
	const { toolId } = await params;
	const tool = docsIndex[toolId];

	if (!tool) {
		notFound();
	}

	return (
		<DocTemplate
			eyebrow={tool.eyebrow}
			title={tool.title}
			summary={buildSummary(tool)}
			pricing={externalToolPricing[toolId] ?? 'Not listed'}
			sections={buildSections(tool)}
		/>
	);
}
