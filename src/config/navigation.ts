import type { RequiredTagRule } from '@/lib/abac';

export type NavigationNode = {
	id: string;
	name: string;
	description?: string;
	useCase?: string;
	howToUse?: string[];
	subcategories?: NavigationNode[];
	externalLink?: string;
	internalPath?: string;
	requiredTags: RequiredTagRule[];
};

export const navigationTree: NavigationNode[] = [
	{
		id: 'ops',
		name: 'Operations',
		requiredTags: [{ key: 'dept', value: 'Operations' }],
		subcategories: [
			{
				id: 'keyword-filtration-tool',
				name: 'Keyword Filtration Tool',
				description: 'Filters high-volume keywords into focused operational targets with customizable thresholds.',
				useCase: 'Operational analysts can remove irrelevant terms before campaign handoff.',
				howToUse: [
					'Upload your raw keyword list.',
					'Set include/exclude criteria.',
					'Run filtration and export the cleaned list.',
				],
				internalPath: '/tools/keyword-filtration-tool',
				requiredTags: [{ key: 'dept', value: 'Operations' }],
			},
			{
				id: 'market-segmentation-tool',
				name: 'Market Segmentation Tool',
				description: 'Build audience segments by combining intent, channel, and revenue tier data.',
				useCase: 'Enable campaign teams to create reusable segment strategies quickly.',
				howToUse: [
					'Select your data source.',
					'Define segmentation dimensions.',
					'Generate and review segment outputs.',
				],
				internalPath: '/tools/market-segmentation-tool',
				requiredTags: [{ key: 'dept', value: 'Operations' }],
			},
			{
				id: 'ppc-keyword-analysis-tool',
				name: 'PPC Keyword Analysis Tool',
				description: 'Analyzes PPC performance and highlights efficiency and cost anomalies.',
				useCase: 'Helps specialists optimize bids and budgets across active campaigns.',
				howToUse: ['Import PPC report CSV.', 'Choose KPI weighting.', 'Inspect recommendations and apply updates.'],
				internalPath: '/tools/ppc-keyword-analysis-tool',
				requiredTags: [{ key: 'dept', value: 'Operations' }],
			},
		],
	},
	{
		id: 'marketing',
		name: 'Marketing',
		requiredTags: [{ key: 'dept', value: 'Marketing' }],
		subcategories: [
			{
				id: 'email-calendars',
				name: 'Email Calendars',
				description: 'Plan campaign sends, promotions, and lifecycle messaging on a shared timeline.',
				useCase: 'Coordinate marketing launches and avoid conflicting send windows.',
				howToUse: [
					'Pick your campaign month.',
					'Add sends with audience and objective.',
					'Publish and sync with your team.',
				],
				internalPath: '/tools/email-calendars',
				requiredTags: [{ key: 'dept', value: 'Marketing' }],
			},
			{
				id: 'marketing-activity-reports',
				name: 'Marketing Activity Reports',
				description: 'Generates weekly and monthly summaries of campaign output and results.',
				useCase: 'Use for stakeholder reporting and trend analysis across channels.',
				howToUse: ['Choose a time range.', 'Select channels and KPIs.', 'Export the report deck.'],
				internalPath: '/tools/marketing-activity-reports',
				requiredTags: [{ key: 'dept', value: 'Marketing' }],
			},
			{
				id: 'marketing-proposal',
				name: 'Marketing Proposal',
				description: 'Drafts initiative proposals with goals, audience, budget, and execution plan.',
				useCase: 'Standardize proposal quality and speed up internal approvals.',
				howToUse: [
					'Fill in campaign objective.',
					'Attach audience and budget assumptions.',
					'Generate proposal output for review.',
				],
				internalPath: '/tools/marketing-proposal',
				requiredTags: [{ key: 'dept', value: 'Marketing' }],
			},
			{
				id: 'website-auditor',
				name: 'Website Auditor',
				description: 'Audits landing pages for SEO, performance, and conversion readiness.',
				useCase: 'Identify weak points in page structure before launching campaigns.',
				howToUse: ['Enter the target URL.', 'Run scan.', 'Review prioritized issues and recommendations.'],
				internalPath: '/tools/website-auditor',
				requiredTags: [{ key: 'dept', value: 'Marketing' }],
			},
		],
	},
];

export function flattenNavigation(nodes: NavigationNode[]): NavigationNode[] {
	return nodes.flatMap((node) => [node, ...(node.subcategories ? flattenNavigation(node.subcategories) : [])]);
}

const toolNodes = flattenNavigation(navigationTree).filter((node) => node.id !== 'ops' && node.id !== 'marketing');

export const toolById = new Map(toolNodes.map((node) => [node.id, node]));
export const requiredTagsByToolId = new Map(toolNodes.map((node) => [node.id, node.requiredTags]));
