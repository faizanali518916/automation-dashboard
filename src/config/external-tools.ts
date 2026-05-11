export type ExternalToolMetadata = {
	id: string;
	name: string;
	category: 'Sales' | 'Operations' | 'Design';
	shared?: boolean;
	description: string;
	features: string[];
	pricing: number;
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
		pricing: -5,
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
		pricing: -5,
		useCase: 'Manage customer relationships, track sales pipelines, and automate sales workflows from lead to close.',
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
		pricing: -5,
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
		pricing: -5,
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
		pricing: -5,
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
		pricing: -5,
		useCase: 'Organize project tasks, track issues, and coordinate team efforts using agile methodologies.',
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
		pricing: -5,
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
		pricing: -5,
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
		pricing: -5,
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
		pricing: -5,
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
		pricing: -5,
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
		pricing: -5,
		useCase:
			'Research keywords, analyze competitors, and optimize content for better search engine rankings and visibility.',
	},
};

export function getExternalToolById(toolId: string): ExternalToolMetadata | undefined {
	return externalToolsDatabase[toolId];
}

export const externalToolsByCategory = {
	Sales: Object.values(externalToolsDatabase).filter((tool) => tool.category === 'Sales'),
	Operations: Object.values(externalToolsDatabase).filter((tool) => tool.category === 'Operations'),
	Design: Object.values(externalToolsDatabase).filter((tool) => tool.category === 'Design'),
};
