export type ExternalToolMetadata = {
	id: string;
	name: string;
	category: 'Sales' | 'Operations' | 'Marketing' | 'Design';
	shared?: boolean;
	description: string;
	features: string[];
	pricing: string;
	useCase: string;
	externalLink?: string;
};

export const externalToolsDatabase: Record<string, ExternalToolMetadata> = {
	'goto-connect': {
		id: 'goto-connect',
		name: 'Goto Connect',
		category: 'Sales',
		description:
			'GoTo Connect is a unified communications platform that enables seamless calling, messaging, and collaboration for sales teams.',
		features: [
			'VoIP calling with HD audio quality',
			'Integrated messaging and presence',
			'Call recording and analytics',
			'Team collaboration features',
			'CRM integration capabilities',
		],
		pricing: 'Not listed',
		useCase:
			'Enable sales teams with reliable communication infrastructure and call tracking for customer interactions.',
	},
	hubspot: {
		id: 'hubspot',
		name: 'Hubspot',
		category: 'Sales',
		description:
			'HubSpot is a comprehensive CRM platform designed to help sales, marketing, and customer service teams grow their business.',
		features: [
			'CRM with contact and deal management',
			'Email tracking and templates',
			'Sales pipeline visualization',
			'Automated follow-ups and workflows',
			'Sales reporting and forecasting',
		],
		pricing: 'Not listed',
		useCase: 'Manage customer relationships, track sales pipelines, and automate sales workflows from lead to close.',
	},
	quickbooks: {
		id: 'quickbooks',
		name: 'QuickBooks',
		category: 'Sales',
		description:
			'QuickBooks is the accounting and invoicing platform the team can use to track finances, payments, and business records.',
		features: [
			'Invoice creation and payment tracking',
			'Bank and expense reconciliation',
			'Profit and loss reporting',
			'Basic bookkeeping workflows',
			'Financial record organization',
		],
		pricing: 'Not listed',
		useCase:
			'Keep financial records, invoices, and basic reporting in one place so sales-related accounting stays organized.',
	},
	helium10: {
		id: 'helium10',
		name: 'Helium10',
		category: 'Operations',
		description:
			'Helium10 is an all-in-one Amazon seller toolkit that provides product research, keyword research, and competitor analysis tools.',
		features: [
			'Product research and market analysis',
			'Keyword research and ranking tracking',
			'Competitor price monitoring',
			'Listing optimization tools',
			'Sales analytics and forecasting',
		],
		pricing: '$96.80 / month',
		useCase:
			'Research Amazon products and keywords, monitor competition, and optimize listings for better visibility and sales.',
	},
	myamztools: {
		id: 'myamztools',
		name: 'myAmztools (Shared)',
		category: 'Operations',
		shared: true,
		description:
			'MyAmztools is a shared Amazon seller resource providing automation and insights for product listings and sales management.',
		features: [
			'Bulk listing management',
			'Price monitoring and repricing',
			'Sales and inventory tracking',
			'Performance analytics',
			'Feedback and review management',
		],
		pricing: '$32.00 / month',
		useCase: 'Manage and optimize Amazon listings at scale with shared account access for team collaboration.',
	},
	'chatgpt-plus': {
		id: 'chatgpt-plus',
		name: 'Chatgpt Plus',
		category: 'Operations',
		description:
			"ChatGPT Plus is a premium subscription to OpenAI's ChatGPT that provides priority access, faster response times, and advanced features.",
		features: [
			'Advanced AI conversation capabilities',
			'Priority access during peak times',
			'Faster response times',
			'Access to latest models and features',
			'Integration with external tools',
		],
		pricing: '$20 / month',
		useCase:
			'Leverage advanced AI for content creation, data analysis, brainstorming, and automating operational tasks.',
	},
	jira: {
		id: 'jira',
		name: 'Jira',
		category: 'Operations',
		description:
			'Jira is a project management and issue tracking tool designed for agile teams to plan, track, and manage work.',
		features: [
			'Issue and bug tracking',
			'Agile project management',
			'Sprint planning and tracking',
			'Customizable workflows',
			'Real-time collaboration',
		],
		pricing: '$9 / user / month',
		useCase: 'Organize project tasks, track issues, and coordinate team efforts using agile methodologies.',
	},
	'google-workspace': {
		id: 'google-workspace',
		name: 'Google Workspace',
		category: 'Operations',
		description:
			'Google Workspace is the shared productivity suite for email, documents, calendars, and team collaboration.',
		features: [
			'Gmail and shared inbox support',
			'Docs, Sheets, and Slides collaboration',
			'Calendar and meeting coordination',
			'Drive storage and file sharing',
			'Admin and access controls',
		],
		pricing: 'Not listed',
		useCase:
			'Keep communication, documents, and scheduling aligned so operations work can move without scattered files or isolated inboxes.',
	},
	nordpass: {
		id: 'nordpass',
		name: 'Nordpass',
		category: 'Operations',
		description:
			'Nordpass is a secure password manager that helps teams store, manage, and share passwords and sensitive information securely.',
		features: [
			'Password encryption and storage',
			'Secure team sharing',
			'Password strength analyzer',
			'Breach monitoring alerts',
			'Multi-device synchronization',
		],
		pricing: '$18 / month',
		useCase: 'Securely manage team credentials and sensitive information with zero-knowledge encryption.',
	},
	freepik: {
		id: 'freepik',
		name: 'Freepik',
		category: 'Design',
		description:
			'Freepik is a platform providing millions of free and premium design assets including vectors, photos, and design templates.',
		features: [
			'Millions of stock photos',
			'Vector graphics and illustrations',
			'Design templates and mockups',
			'Creative commons and premium content',
			'Easy search and filtering',
		],
		pricing: '$12.20 / month',
		useCase: 'Access high-quality design assets and templates for creating marketing materials and visual content.',
	},
	creatify: {
		id: 'creatify',
		name: 'Creatify',
		category: 'Design',
		description:
			'Creatify is an AI-powered video creation tool that helps teams generate professional ads and social content quickly.',
		features: [
			'AI-powered video generation',
			'Pre-built ad templates',
			'Text-to-video conversion',
			'Brand customization options',
			'One-click social sharing',
		],
		pricing: '$40 / month',
		useCase: 'Create professional video ads and social media content using AI automation.',
	},
	'adobe-creative-cloud': {
		id: 'adobe-creative-cloud',
		name: 'Adobe Creative Cloud',
		category: 'Design',
		description:
			'Adobe Creative Cloud is a comprehensive suite of design, photo, video, and web tools used by professionals worldwide.',
		features: [
			'Photoshop for image editing',
			'Illustrator for vector design',
			'InDesign for layout and publishing',
			'Premiere Pro for video editing',
			'After Effects for motion graphics',
		],
		pricing: '$43.20 / month',
		useCase:
			'Create professional designs, edit images and videos, and produce polished marketing materials with industry-standard tools.',
	},
	canva: {
		id: 'canva',
		name: 'Canva',
		category: 'Design',
		description:
			'Canva is a web-based design platform that enables anyone to create professional-looking graphics, presentations, and social media content.',
		features: [
			'Drag-and-drop design editor',
			'Thousands of templates',
			'Stock photos and icons',
			'Team collaboration',
			'Brand kit management',
		],
		pricing: '$4.30 / month',
		useCase: 'Create professional marketing graphics, social posts, and presentations without design expertise.',
	},
	'hafiz-seo-tools': {
		id: 'hafiz-seo-tools',
		name: 'Hafiz SEO Tools (Shared)',
		category: 'Design',
		shared: true,
		description:
			'Hafiz SEO Tools is a shared resource providing analytics and optimization tools for search engine optimization and content strategy.',
		features: [
			'SEO keyword research and analysis',
			'Competitor analysis',
			'Backlink monitoring',
			'On-page optimization suggestions',
			'Rank tracking across keywords',
		],
		pricing: '$9.90 / month',
		useCase:
			'Research keywords, analyze competitors, and optimize content for better search engine rankings and visibility.',
	},
	instantly: {
		id: 'instantly',
		name: 'Instantly',
		category: 'Marketing',
		description:
			'Instantly is a cold email outreach platform that helps teams run outbound campaigns, track deliverability, and manage sending infrastructure.',
		features: [
			'Cold email sequence management',
			'Inbox rotation and sending controls',
			'Deliverability monitoring',
			'Reply tracking and campaign analytics',
			'Outbound workflow automation',
		],
		pricing: '$97.00 / month',
		useCase: 'Run outbound email campaigns at scale while keeping sender reputation and campaign reporting organized.',
	},
	inboxes: {
		id: 'inboxes',
		name: 'Inboxes',
		category: 'Marketing',
		description:
			'Inboxes is an email account management workspace for organizing sending identities, replies, and outbound communication flow.',
		features: [
			'Inbox organization for outreach accounts',
			'Reply flow management',
			'Sender account coordination',
			'Communication visibility across campaigns',
			'Outbound account management',
		],
		pricing: '$45.00 / month',
		useCase: 'Keep outbound sender accounts and reply handling structured so email operations stay easy to manage.',
	},
	make: {
		id: 'make',
		name: 'Make',
		category: 'Marketing',
		description:
			'Make is a visual automation platform that connects various software applications and databases to automate workflows and sync data without writing code.',
		features: [
			'Visual scenario builder for automations',
			'App and database integrations',
			'Trigger-based workflow execution',
			'Data routing and transformation steps',
			'Reusable automation logic',
		],
		pricing: '$11.30 / month',
		useCase:
			'Automate repeatable marketing and operations workflows so the team can move data between systems without manual copying.',
	},
	semrush: {
		id: 'semrush',
		name: 'Semrush',
		category: 'Marketing',
		description:
			'Semrush is an all-in-one digital marketing suite used for Search Engine Optimization (SEO), competitor analysis, keyword research, link building, and PPC tracking.',
		features: [
			'Keyword research and ranking analysis',
			'Site audit and technical SEO checks',
			'Competitive domain insights',
			'Backlink analysis and monitoring',
			'PPC tracking and content planning support',
		],
		pricing: '$99.00 / month',
		useCase:
			'Research search demand, audit websites, and study competitor strategy so marketing decisions are grounded in data.',
	},
};

export function getExternalToolById(toolId: string): ExternalToolMetadata | undefined {
	return externalToolsDatabase[toolId];
}

export const externalToolsByCategory = {
	Sales: Object.values(externalToolsDatabase).filter((tool) => tool.category === 'Sales'),
	Operations: Object.values(externalToolsDatabase).filter((tool) => tool.category === 'Operations'),
	Marketing: Object.values(externalToolsDatabase).filter((tool) => tool.category === 'Marketing'),
	Design: Object.values(externalToolsDatabase).filter((tool) => tool.category === 'Design'),
};
