import type { RequiredTagRule } from '@/lib/abac';

export type NavigationNode = {
	id: string;
	name: string;
	description?: string;
	useCase?: string;
	howToUse?: string[];
	subcategories?: NavigationNode[];
	externalLink?: string;
	docPath?: string;
	requiredTags: RequiredTagRule[];
};

export const navigationTree: NavigationNode[] = [
	{
		id: 'internal',
		name: 'Internal',
		requiredTags: [],
		subcategories: [
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
						externalLink: 'https://github.com/faizanali518916/mini-tools/tree/main/keyword-helper',
						docPath: '/docs/keyword-filtration-tool',
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
						externalLink: 'https://github.com/faizanali518916/mini-tools/tree/main/market-segmentation',
						docPath: '/docs/market-segmentation-tool',
						requiredTags: [{ key: 'dept', value: 'Operations' }],
					},
					{
						id: 'ppc-keyword-analysis-tool',
						name: 'PPC Keyword Analysis Tool',
						description: 'Analyzes PPC performance and highlights efficiency and cost anomalies.',
						useCase: 'Helps specialists optimize bids and budgets across active campaigns.',
						howToUse: ['Import PPC report CSV.', 'Choose KPI weighting.', 'Inspect recommendations and apply updates.'],
						docPath: '/docs/ppc-keyword-analysis-tool',
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
						name: 'Email Calendars and Promotional Emails',
						description: 'Monthly campaign planning, AI content generation, approvals, and design handoff workflows.',
						useCase:
							'Coordinate offer planning, campaign copy approvals, and launch-readiness across marketing and design teams.',
						howToUse: [
							'Maintain client records in the master sheet.',
							'Populate monthly campaign details before automation deadlines.',
							'Review generated copy and approve only final campaigns.',
						],
						externalLink:
							'https://docs.google.com/spreadsheets/d/1BvMNmKazNKC_B_kodVtXtCqfivPBph6EWK0v7B8kaxA/edit?gid=0#gid=0',
						docPath: '/docs/email-calendars',
						requiredTags: [{ key: 'dept', value: 'Marketing' }],
					},
					{
						id: 'marketing-activity-reports',
						name: 'Marketing Activity Reports',
						description:
							'Automated reporting workflow for social and email channels using controlled client setup input.',
						useCase: 'Set up recurring weekly or biweekly reports and approve outputs before client delivery.',
						howToUse: [
							'Add client details and channel enablement values in the reporting sheet.',
							'Leave automation-owned credential and status fields untouched.',
							'Review report emails and approve or reject based on data completeness.',
						],
						externalLink:
							'https://docs.google.com/spreadsheets/d/1nPfDbvESoJMOHkWfeWI0uimSSpsVA90SqpBbVsKR7tM/edit?usp=sharing',
						docPath: '/docs/marketing-activity-reports',
						requiredTags: [{ key: 'dept', value: 'Marketing' }],
					},
					{
						id: 'marketing-proposal',
						name: 'Marketing Proposals',
						description: 'Guided form workflow that generates personalized service proposals and pricing-ready drafts.',
						useCase: 'Create client-facing proposals quickly while preserving service scope and pricing workflows.',
						howToUse: [
							'Submit the proposal request form with complete client details.',
							'Fill pricing in the follow-up email using the required format.',
							'Update service scope text only in the designated master sheet.',
						],
						externalLink: 'https://spctek.com/services-proposal-form/',
						docPath: '/docs/marketing-proposal',
						requiredTags: [{ key: 'dept', value: 'Marketing' }],
					},
					{
						id: 'email-newsletters',
						name: 'Email Newsletters',
						description:
							'Weekly newsletter drafting flow based on structured news entries and internal review email alerts.',
						useCase: 'Collect weekly news updates and trigger newsletter draft generation for marketing review.',
						howToUse: [
							'Add weekly news entries before Thursday using the required columns.',
							'Set status exactly as New for each row.',
							'Share Partner Spotlight details with automation when available.',
						],
						externalLink:
							'https://docs.google.com/spreadsheets/d/1sRSEwIiTjU4r8tvSs_tyHg8z1f4qCQxCliqIKJx6WQQ/edit?usp=sharing',
						docPath: '/docs/email-newsletters',
						requiredTags: [{ key: 'dept', value: 'Marketing' }],
					},
					{
						id: 'website-auditor',
						name: 'Web Audit Report',
						description: 'Generates comprehensive UI/UX audit PDFs and delivers them automatically by email.',
						useCase: 'Use as a lead conversion and pre-sales diagnostic tool for CRO and optimization services.',
						howToUse: [
							'Submit name, email, and live website URL in the web audit form.',
							'Validate inputs and avoid duplicate submissions.',
							'Confirm delivery and escalate if report generation fails.',
						],
						externalLink: 'https://spctek.com/audit-report-form/',
						docPath: '/docs/website-auditor',
						requiredTags: [{ key: 'dept', value: 'Marketing' }],
					},
				],
			},
		],
	},
	{
		id: 'external',
		name: 'External',
		requiredTags: [],
		subcategories: [
			{
				id: 'external-sales',
				name: 'Sales',
				requiredTags: [{ key: 'dept', value: 'Sales' }],
				subcategories: [
					{
						id: 'goto-connect',
						name: 'Goto Connect',
						description: 'Unified communications platform for sales calling, messaging, and collaboration.',
						docPath: '/docs/goto-connect',
						requiredTags: [{ key: 'dept', value: 'Sales' }],
					},
					{
						id: 'hubspot',
						name: 'Hubspot',
						description: 'Comprehensive CRM platform for managing sales pipelines and customer relationships.',
						docPath: '/docs/hubspot',
						requiredTags: [{ key: 'dept', value: 'Sales' }],
					},
					{
						id: 'quickbooks',
						name: 'QuickBooks',
						description: 'Accounting and invoicing platform for tracking finances and business records.',
						docPath: '/docs/quickbooks',
						requiredTags: [{ key: 'dept', value: 'Sales' }],
					},
				],
			},
			{
				id: 'external-operations',
				name: 'Operations',
				requiredTags: [{ key: 'dept', value: 'Operations' }],
				subcategories: [
					{
						id: 'helium10',
						name: 'Helium10',
						description: 'Amazon seller toolkit for product research, keyword research, and competitor analysis.',
						docPath: '/docs/helium10',
						requiredTags: [{ key: 'dept', value: 'Operations' }],
					},
					{
						id: 'myamztools',
						name: 'myAmztools (Shared)',
						description: 'Shared Amazon seller resource for automation and insights on listings and sales.',
						docPath: '/docs/myamztools',
						requiredTags: [{ key: 'dept', value: 'Operations' }],
					},
					{
						id: 'chatgpt-plus',
						name: 'Chatgpt Plus',
						description: 'Premium AI assistant for content creation, analysis, and operational task automation.',
						docPath: '/docs/chatgpt-plus',
						requiredTags: [{ key: 'dept', value: 'Operations' }],
					},
					{
						id: 'jira',
						name: 'Jira',
						description: 'Project management and issue tracking for agile teams.',
						docPath: '/docs/jira',
						requiredTags: [{ key: 'dept', value: 'Operations' }],
					},
					{
						id: 'google-workspace',
						name: 'Google Workspace',
						description: 'Shared productivity suite for email, documents, calendars, and team coordination.',
						docPath: '/docs/google-workspace',
						requiredTags: [{ key: 'dept', value: 'Operations' }],
					},
					{
						id: 'nordpass',
						name: 'Nordpass',
						description: 'Secure password manager for storing and sharing team credentials.',
						docPath: '/docs/nordpass',
						requiredTags: [{ key: 'dept', value: 'Operations' }],
					},
				],
			},
			{
				id: 'external-marketing',
				name: 'Marketing',
				requiredTags: [{ key: 'dept', value: 'Marketing' }],
				subcategories: [
					{
						id: 'instantly',
						name: 'Instantly',
						description: 'Cold email outreach platform for running outbound campaigns and monitoring deliverability.',
						docPath: '/docs/instantly',
						requiredTags: [{ key: 'dept', value: 'Marketing' }],
					},
					{
						id: 'inboxes',
						name: 'Inboxes',
						description: 'Email account management workspace for organizing sending identities and reply flow.',
						docPath: '/docs/inboxes',
						requiredTags: [{ key: 'dept', value: 'Marketing' }],
					},
					{
						id: 'make',
						name: 'Make',
						description: 'Visual automation platform for connecting apps and syncing data across workflows.',
						docPath: '/docs/make',
						requiredTags: [{ key: 'dept', value: 'Marketing' }],
					},
					{
						id: 'semrush',
						name: 'Semrush',
						description: 'SEO and competitive research suite for keyword, content, and search performance analysis.',
						docPath: '/docs/semrush',
						requiredTags: [{ key: 'dept', value: 'Marketing' }],
					},
				],
			},
			{
				id: 'external-design',
				name: 'Design',
				requiredTags: [{ key: 'dept', value: 'Design' }],
				subcategories: [
					{
						id: 'freepik',
						name: 'Freepik',
						description: 'Platform with millions of design assets including vectors, photos, and templates.',
						docPath: '/docs/freepik',
						requiredTags: [{ key: 'dept', value: 'Design' }],
					},
					{
						id: 'creatify',
						name: 'Creatify',
						description: 'AI-powered video creation tool for professional ads and social content.',
						docPath: '/docs/creatify',
						requiredTags: [{ key: 'dept', value: 'Design' }],
					},
					{
						id: 'adobe-creative-cloud',
						name: 'Adobe Creative Cloud',
						description: 'Comprehensive suite of design, photo, video, and web tools for professionals.',
						docPath: '/docs/adobe-creative-cloud',
						requiredTags: [{ key: 'dept', value: 'Design' }],
					},
					{
						id: 'canva',
						name: 'Canva',
						description: 'Web-based design platform for creating graphics, presentations, and social content.',
						docPath: '/docs/canva',
						requiredTags: [{ key: 'dept', value: 'Design' }],
					},
					{
						id: 'hafiz-seo-tools',
						name: 'Hafiz SEO Tools (Shared)',
						description: 'Shared SEO analytics and optimization tools for keyword research and content strategy.',
						docPath: '/docs/hafiz-seo-tools',
						requiredTags: [{ key: 'dept', value: 'Design' }],
					},
				],
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
