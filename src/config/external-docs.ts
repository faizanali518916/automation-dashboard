type DocSection = {
	title: string;
	description?: string;
	items?: string[];
	note?: string;
};

export type ExternalDocPageContent = {
	eyebrow: string;
	title: string;
	summary: string;
	sections: DocSection[];
};

function section(title: string, description: string, items: string[]): DocSection {
	return { title, description, items };
}

export const externalToolDocs: Record<string, ExternalDocPageContent> = {
	'goto-connect': {
		eyebrow: 'External Sales Tool',
		title: 'GoTo Connect',
		summary:
			'GoTo Connect gives the team a single workspace for calling, messaging, and customer routing so communication stays organized across devices and channels.',
		sections: [
			section('What It Is Used For', 'This is the daily phone and messaging layer for the team.', [
				'It combines business calling, internal chat, video meetings, and contact handling in one place.',
				'It works best as the communication switchboard for sales and support work that needs to stay visible and fast.',
			]),
			section(
				'How It Is Used',
				'Users work through the desktop app, mobile app, or desk phone, while admins shape call flow behind the scenes.',
				[
					'Team members place and receive calls, join meetings, and message colleagues from the same platform.',
					'Administrators build routing rules, greetings, and call paths so incoming traffic reaches the right person quickly.',
				]
			),
			section(
				'Who Primarily Uses It',
				'The platform is most useful to people who spend the day on live communication.',
				[
					'Remote and hybrid teams rely on it to keep the business reachable wherever they work.',
					'Sales, support, and IT teams use it most because they need dependable calling and clear visibility into activity.',
				]
			),
			section(
				'How It Benefits Us',
				'The value is less about the phone system itself and more about the consistency it creates.',
				[
					'It removes the need for separate tools and physical hardware, which simplifies setup and support.',
					'Call metrics and centralized routing make the customer experience easier to monitor and improve.',
				]
			),
		],
	},
	hubspot: {
		eyebrow: 'External Sales Tool',
		title: 'HubSpot',
		summary:
			'HubSpot is the team hub for contacts, deals, campaigns, and service activity, keeping customer work connected from first touch to long-term retention.',
		sections: [
			section('What It Is Used For', 'HubSpot is the system of record for customer-facing work.', [
				'It holds contact records, deal stages, marketing activity, and service notes in one searchable workspace.',
				'It is the right fit when a team needs one place to manage growth rather than stitching together separate point tools.',
			]),
			section('How It Is Used', 'The platform supports both day-to-day execution and broader campaign orchestration.', [
				'Sales teams track leads, notes, and pipeline movement while marketing teams run email, landing page, and automation work.',
				'The same database can support reporting, handoffs, and follow-up tasks without forcing people to duplicate records elsewhere.',
			]),
			section(
				'Who Primarily Uses It',
				'Anyone who touches the customer lifecycle depends on it, but a few groups feel the impact most directly.',
				[
					'Marketing, sales, customer success, and operations all use it to coordinate ownership and timing.',
					'It is especially valuable for teams that need the same account history to stay visible across multiple functions.',
				]
			),
			section(
				'How It Benefits Us',
				'Its strength is in centralizing work that would otherwise drift across tools and inboxes.',
				[
					'It creates a single source of truth for customer data, which reduces duplication and follow-up mistakes.',
					'Automation and reporting features help the team scale outreach without losing control of the process.',
				]
			),
		],
	},
	quickbooks: {
		eyebrow: 'External Sales Tool',
		title: 'QuickBooks',
		summary:
			'QuickBooks is the accounting workspace for invoices, reconciliation, and financial reporting, giving the team one place to keep sales-adjacent records organized.',
		sections: [
			section('What It Is Used For', 'It is the finance layer for invoicing and bookkeeping work.', [
				'QuickBooks helps the team issue invoices, record payments, and keep financial activity easy to review later.',
				'It is the right tool when sales work needs to connect cleanly to bookkeeping instead of living in separate spreadsheets.',
			]),
			section(
				'How It Is Used',
				'Users enter transactions, reconcile accounts, and review reports inside the same system.',
				[
					'Teams create customer invoices, categorize expenses, and match incoming payments to the right records.',
					'Reports and account views help users confirm that the books reflect current activity instead of stale assumptions.',
				]
			),
			section('Who Primarily Uses It', 'It is mainly used by people who need reliable financial visibility.', [
				'Accounting, operations, and sales support users depend on it to keep billing and records in order.',
				'It is especially useful when several people need to understand the same financial history without rechecking emails or spreadsheets.',
			]),
			section('How It Benefits Us', 'It reduces friction between customer work and financial tracking.', [
				'It keeps invoices, payments, and reconciliation in a structured system that is easier to audit.',
				'That makes it simpler to know what has been billed, what has cleared, and what still needs attention.',
			]),
		],
	},
	helium10: {
		eyebrow: 'External Operations Tool',
		title: 'Helium 10',
		summary:
			'Helium 10 is the research and optimization toolkit for marketplace sellers who need better product decisions, stronger listings, and clearer competitive insight.',
		sections: [
			section(
				'What It Is Used For',
				'It is built for sellers who need data before they commit to inventory or content.',
				[
					'It helps teams identify product opportunities, understand search demand, and refine listings for Amazon and similar marketplaces.',
					'It is the sort of tool you use when product choice and keyword positioning matter more than guesswork.',
				]
			),
			section('How It Is Used', 'Users move from research to listing optimization in a fairly tight loop.', [
				'Teams check product demand, keyword volume, competitor behavior, and ranking trends before making decisions.',
				'Once a product is chosen, the same platform supports listing improvements and ongoing performance checks.',
			]),
			section(
				'Who Primarily Uses It',
				'The most frequent users are the people who make marketplace decisions every week.',
				[
					'E-commerce operators, Amazon FBA sellers, brand managers, and product researchers depend on it most.',
					'It is especially useful for teams that need to compare multiple product ideas before spending on stock or content.',
				]
			),
			section(
				'How It Benefits Us',
				'Better research means fewer weak launches and more disciplined optimization work.',
				[
					'It helps the team find profitable niches faster and improve visibility on pages that already have traction.',
					'Competitor insight and ranking data reduce the cost of trial and error during marketplace growth.',
				]
			),
		],
	},
	myamztools: {
		eyebrow: 'External Operations Tool',
		title: 'myAmztools (Shared)',
		summary:
			'myAmztools is the shared-access layer for premium seller utilities, giving the team broader access to marketplace research without every user carrying a full subscription load.',
		sections: [
			section('What It Is Used For', 'It is mainly a cost-sharing access model for high-value seller tools.', [
				'It gives the team a practical way to reach premium e-commerce and SEO tooling without paying for a separate license for every person.',
				'It works best when the team needs broad access to research tools but still wants to keep software overhead under control.',
			]),
			section(
				'How It Is Used',
				'Users log in once and work through a shared access layer instead of managing individual subscriptions.',
				[
					'Team members use the shared portal or access mechanism to reach the tools they need for research and reporting.',
					'It is most useful when people need to move quickly between product checks, keyword work, and marketplace analysis.',
				]
			),
			section(
				'Who Primarily Uses It',
				'The audience is usually small teams and individual operators who need premium capability on a modest budget.',
				[
					'Freelance researchers, budget-conscious sellers, and smaller agencies are the most likely day-to-day users.',
					'It is a practical fit when several people need the same tools but do not each require a separate paid account.',
				]
			),
			section('How It Benefits Us', 'The payoff is mostly economic, but the operational upside is just as important.', [
				'It lowers the cost of research and makes premium tooling more accessible across the team.',
				'By sharing access, the team can keep its budget lean while still working with the same standard of data and tooling.',
			]),
		],
	},
	'chatgpt-plus': {
		eyebrow: 'External Operations Tool',
		title: 'ChatGPT Plus',
		summary:
			'ChatGPT Plus is the team assistant for writing, brainstorming, analysis, and technical support, making it useful anywhere speed and draft quality matter.',
		sections: [
			section('What It Is Used For', 'It is the quick-response layer for thinking, drafting, and problem solving.', [
				'It supports content creation, coding help, spreadsheet analysis, translation, and other knowledge work that benefits from a strong first draft.',
				'It is most useful when the team needs to explore an idea, write faster, or reduce the time spent staring at a blank page.',
			]),
			section(
				'How It Is Used',
				'Users get the best results when they give it enough context and ask for a specific output shape.',
				[
					'Teams use prompts to draft emails, clean up copy, generate code, review data, or build a workable outline for a larger task.',
					'It also works well for iterative work, where a first answer is refined through follow-up prompts until it is ready for real use.',
				]
			),
			section('Who Primarily Uses It', 'Its reach is broad because it supports both creative and technical work.', [
				'Content writers, developers, marketers, analysts, and operations staff all use it in different parts of the workflow.',
				'It is especially helpful for teams that need to move quickly across tasks instead of waiting for a dedicated specialist every time.',
			]),
			section('How It Benefits Us', 'The main value is momentum: more drafts, more options, and faster decisions.', [
				'It reduces the time spent on repetitive writing and research, which lets the team focus on judgment and final quality.',
				'When used well, it becomes a reliable multiplier for output without replacing the person making the decision.',
			]),
		],
	},
	jira: {
		eyebrow: 'External Operations Tool',
		title: 'Jira',
		summary:
			'Jira is the work-tracking system for projects, issues, and delivery planning, helping teams keep execution visible from backlog to release.',
		sections: [
			section('What It Is Used For', 'It gives the team a structured place to plan and track work.', [
				'Jira is used to manage tasks, bugs, and larger delivery items through a clear workflow that shows what is happening now and what still needs attention.',
				'It is the right tool when the team needs accountability, status visibility, and a stable process for moving work forward.',
			]),
			section(
				'How It Is Used',
				'Teams break work into manageable pieces and keep movement visible on boards and reports.',
				[
					'Project owners create epics, stories, and tasks, then organize them on Kanban or Scrum boards with the right assignee and due date.',
					'As work progresses, the workflow keeps comments, dependencies, and workflow state in one place so nothing disappears into chat threads.',
				]
			),
			section(
				'Who Primarily Uses It',
				'It is most important for the people coordinating delivery and the people doing the delivery.',
				[
					'Product managers, project managers, developers, and QA testers use it to keep release work organized.',
					'It is especially valuable for cross-functional teams that need one shared view of schedule, priority, and blockers.',
				]
			),
			section(
				'How It Benefits Us',
				'Its real value is making the work visible enough to manage before it becomes a problem.',
				[
					'It improves accountability by making ownership and status easy to see at a glance.',
					'It also helps the team spot bottlenecks early, which keeps delivery moving and reduces last-minute surprises.',
				]
			),
		],
	},
	nordpass: {
		eyebrow: 'External Operations Tool',
		title: 'NordPass',
		summary:
			'NordPass is the team vault for passwords, secure notes, and shared credentials, reducing the risk that sensitive access information gets scattered across chat or spreadsheets.',
		sections: [
			section('What It Is Used For', 'It is the secure storage and sharing layer for access credentials.', [
				'NordPass stores login details, secure notes, and payment information inside an encrypted vault instead of leaving them in plain text somewhere else.',
				'It is the tool to reach for when the team needs a safer way to manage credentials without slowing down day-to-day access.',
			]),
			section(
				'How It Is Used',
				'Users save credentials once and then rely on autofill and secure sharing when needed.',
				[
					'Team members can autofill logins across devices, store notes tied to accounts, and share sensitive items without exposing the raw value in chat.',
					'Admins can monitor password health and keep shared accounts organized without relying on memory or manual handoffs.',
				]
			),
			section(
				'Who Primarily Uses It',
				'Anyone who handles credentials or shared access touches it, but security and admin users feel the strongest benefit.',
				[
					'All team members use it for daily logins, while IT and administrators use it for control and oversight.',
					'It is especially valuable in environments where multiple people need access without exposing passwords directly.',
				]
			),
			section(
				'How It Benefits Us',
				'It improves security and reduces the friction that usually comes with credential management.',
				[
					'It lowers the chance of reused or weak passwords and makes access sharing safer for the whole team.',
					'By keeping credentials organized in one encrypted place, it reduces lockouts and support overhead.',
				]
			),
		],
	},
	freepik: {
		eyebrow: 'External Design Tool',
		title: 'Freepik',
		summary:
			'Freepik is the asset library the team uses when a design needs high-quality vectors, photos, templates, or icons without starting from scratch.',
		sections: [
			section('What It Is Used For', 'It is a source of ready-made creative material for design work.', [
				'Freepik provides downloadable vectors, stock photos, templates, and other assets that speed up visual production.',
				'It is ideal when the design needs strong building blocks rather than a completely hand-crafted illustration or photo shoot.',
			]),
			section('How It Is Used', 'Designers search, download, and adapt assets to fit brand requirements.', [
				'Teams use the platform to find a visual starting point, then edit the asset so it matches the brand tone, size, and channel format.',
				'It is especially useful when campaigns need a lot of graphics quickly and consistency matters more than original illustration every time.',
			]),
			section('Who Primarily Uses It', 'It is most useful to people who spend their time shaping marketing visuals.', [
				'Graphic designers, social media managers, web designers, and content creators use it most often.',
				'It also helps non-designers who need decent presentation or social assets without waiting on a longer design cycle.',
			]),
			section('How It Benefits Us', 'It speeds up design production while keeping the output polished.', [
				'It reduces the amount of original asset creation required for each project, which saves time and budget.',
				'Having a deep library of reusable assets makes it easier to stay visually consistent across channels.',
			]),
		],
	},
	'google-workspace': {
		eyebrow: 'External Operations Tool',
		title: 'Google Workspace',
		summary:
			'Google Workspace is the shared productivity suite for email, documents, calendars, and file storage, keeping day-to-day coordination in one connected environment.',
		sections: [
			section('What It Is Used For', 'It is the operating layer for communication and collaboration.', [
				'Google Workspace gives the team access to email, docs, spreadsheets, presentations, calendar, and drive storage from one account set.',
				'It is the natural fit when work needs to move between communication, planning, and document editing without changing tools.',
			]),
			section(
				'How It Is Used',
				'People use it to create files, schedule time, and share information with the right access level.',
				[
					'Users draft documents, update sheets, schedule meetings, and share files through the same authenticated workspace.',
					'Administrators manage permissions and structure so shared content remains organized and accessible only to the right people.',
				]
			),
			section('Who Primarily Uses It', 'It is used by nearly everyone who needs to collaborate across workstreams.', [
				'Operations, marketing, sales, and leadership all rely on it because it touches communication and planning every day.',
				'It is especially valuable for teams that need documents and calendars to stay synced with the rest of their work.',
			]),
			section(
				'How It Benefits Us',
				'It keeps communication and shared work lightweight, structured, and easy to hand off.',
				[
					'It reduces the gap between discussion and execution by keeping notes, files, and schedules in one place.',
					'That makes the team faster at finding the right file, the right meeting, or the right shared context when it matters.',
				]
			),
		],
	},
	creatify: {
		eyebrow: 'External Design Tool',
		title: 'Creatify',
		summary:
			'Creatify helps the team turn product inputs into short marketing videos quickly, making it useful when ads need to move at the pace of testing rather than traditional video production.',
		sections: [
			section('What It Is Used For', 'It is an AI video generator for promotional and social content.', [
				'Creatify is used to turn product URLs or images into ad-ready videos with minimal manual editing.',
				'It fits best when the goal is to produce a lot of creative variations without spending a full production cycle on each one.',
			]),
			section(
				'How It Is Used',
				'Users feed in product details and let the platform assemble the first pass of the creative.',
				[
					'The tool can scrape product context, draft a script, pair it with a voiceover or avatar, and render a finished marketing clip.',
					'The strongest workflow is to treat the output as a fast creative draft that can be tested, refined, and reused across campaigns.',
				]
			),
			section('Who Primarily Uses It', 'It is most relevant to teams responsible for ad volume and creative testing.', [
				'Social media advertisers, e-commerce marketers, and dropshippers are the most likely regular users.',
				'It is especially useful for teams that need multiple variations instead of one expensive hero asset.',
			]),
			section(
				'How It Benefits Us',
				'It compresses the time and cost needed to move from product idea to testable creative.',
				[
					'It lowers video production cost and speeds up the creative A/B testing loop.',
					'By shortening turnaround time, it lets the team react faster when a product or angle starts to perform.',
				]
			),
		],
	},
	'adobe-creative-cloud': {
		eyebrow: 'External Design Tool',
		title: 'Adobe Creative Cloud',
		summary:
			'Adobe Creative Cloud is the professional-grade creative suite the team uses when a project needs full control over image, video, layout, and motion work.',
		sections: [
			section('What It Is Used For', 'It is the main toolkit for advanced creative production.', [
				'Adobe Creative Cloud supports design, photo editing, publishing, video editing, and motion graphics work in one ecosystem.',
				'It is the right choice when the job calls for precision, brand fidelity, and production-quality output.',
			]),
			section('How It Is Used', 'Designers and editors open the specific app that fits the work they are doing.', [
				'Photoshop, Illustrator, InDesign, Premiere Pro, and After Effects each handle different parts of the creative workflow.',
				'The suite supports work that starts with raw assets and ends with fully polished brand material ready for distribution.',
			]),
			section(
				'Who Primarily Uses It',
				'It is most valuable to professionals who build or finish final creative assets.',
				[
					'Graphic designers, video editors, and creative directors are the primary users.',
					'It is also important for teams that need a single standard for advanced design work across multiple projects or clients.',
				]
			),
			section(
				'How It Benefits Us',
				'It gives the team the flexibility to produce premium work without being boxed into lightweight templates.',
				[
					'It delivers the depth and control needed for custom, polished brand assets.',
					'Because the tools are mature and specialized, the team can solve harder creative problems without switching platforms constantly.',
				]
			),
		],
	},
	canva: {
		eyebrow: 'External Design Tool',
		title: 'Canva',
		summary:
			'Canva is the lightweight design workspace for fast branded graphics, presentations, and social content when the team needs speed and consistency more than deep editing control.',
		sections: [
			section('What It Is Used For', 'It is the fast path for everyday design work.', [
				'Canva is used to create presentations, social graphics, documents, and other lightweight visual assets quickly.',
				'It is especially useful for work that needs to look clean and on-brand without requiring a full professional design workflow.',
			]),
			section('How It Is Used', 'Users start from templates or brand kits and move quickly to a finished export.', [
				'Teams drag in logos, colors, text, and images, then adjust the layout until it fits the channel they are publishing to.',
				'Collaboration features make it easy for non-designers to contribute while keeping the output controlled and easy to review.',
			]),
			section(
				'Who Primarily Uses It',
				'It is most popular with people who need solid design output without deep software training.',
				[
					'Social media managers, marketers, content writers, and other non-designers use it every day.',
					'It is also useful for teams that need to produce a lot of on-brand material without sending every request to the design queue.',
				]
			),
			section(
				'How It Benefits Us',
				'It makes basic design more accessible while keeping quality high enough for day-to-day use.',
				[
					'It removes a lot of bottlenecks for routine creative tasks and lets teams work independently.',
					'By standardizing templates and brand assets, it helps the team move quickly without drifting off-brand.',
				]
			),
		],
	},
	'hafiz-seo-tools': {
		eyebrow: 'External Design Tool',
		title: 'Hafiz SEO Tools (Shared)',
		summary:
			'Hafiz SEO Tools is the shared access layer for SEO and marketing research tools, giving the team a lower-cost way to reach premium digital marketing data.',
		sections: [
			section('What It Is Used For', 'It is a shared-access service for premium SEO and marketing software.', [
				'It allows the team to reach tools used for keyword research, competitor analysis, copy support, and other search-focused work.',
				'It is the right fit when the team wants broader access without buying a separate subscription for every platform and every user.',
			]),
			section(
				'How It Is Used',
				'Users log in through the shared portal and then work with the tools they need for a given task.',
				[
					'The workflow usually involves using a central access point to reach platforms like SEO suites, copy tools, or research utilities.',
					'That setup keeps access coordinated so the team can move between research tasks without rebuilding the environment each time.',
				]
			),
			section(
				'Who Primarily Uses It',
				'It serves the people who rely on data-heavy digital marketing work and need to keep costs down.',
				[
					'SEO specialists, content marketers, freelancers, and smaller agency teams are the clearest fit.',
					'It is especially useful when the team needs access to expensive tools but cannot justify a large software budget for each one.',
				]
			),
			section(
				'How It Benefits Us',
				'It keeps the team connected to better data without turning the tooling budget into a constraint.',
				[
					'It offers an economical way to work with strong SEO and marketing platforms.',
					'By lowering the cost barrier, it helps the team stay data-driven while spending less on infrastructure.',
				]
			),
		],
	},
	capcut: {
		eyebrow: 'External Design Tool',
		title: 'CapCut',
		summary:
			'CapCut is the short-form video editor the team can use when social content needs to move fast and stay aligned with current platform trends.',
		sections: [
			section('What It Is Used For', 'It is built for fast, trend-aware editing of short videos.', [
				'CapCut is used to cut footage, add captions, layer music, and turn raw clips into social-ready videos.',
				'It is a strong fit for content that needs to feel current, lightweight, and easy to publish across short-form platforms.',
			]),
			section('How It Is Used', 'Editors import clips and then shape them into a publishable short-form sequence.', [
				'The workflow usually includes trimming, captions, overlays, transitions, and music that supports the intended pace of the edit.',
				'It is most effective when the team wants to ship a lot of social content quickly and keep the editing process simple.',
			]),
			section('Who Primarily Uses It', 'It is mainly used by people who publish social-native video regularly.', [
				'Social media managers, TikTok creators, and junior video editors are the core users.',
				'It is especially helpful for teams that need a fast editor for recurring short-form content instead of a heavyweight production suite.',
			]),
			section('How It Benefits Us', 'It makes short-form editing faster and more accessible to the wider team.', [
				'It shortens the path from raw clip to posted asset, which is valuable when trends move quickly.',
				'Because the tool is built around speed, it helps the team keep a steady publishing rhythm without overcomplicating the edit.',
			]),
		],
	},
	make: {
		eyebrow: 'External Marketing Tool',
		title: 'Make (formerly Integromat)',
		summary:
			'Make is the visual automation layer for connecting apps and syncing data, giving the team a practical way to automate workflows without writing custom code.',
		sections: [
			section(
				'What It Is Used For',
				'It is used to build multi-step automations between the systems the team already depends on.',
				[
					'Make is designed to connect software tools, move data between them, and trigger actions automatically when something changes.',
					'It is the right tool when a workflow has repeated handoffs and the team wants to reduce manual status updates or copy-paste steps.',
				]
			),
			section('How It Is Used', 'Users draw scenarios that define what happens when one event leads to another.', [
				'Teams map out triggers, actions, and filters so one event in a source app can initiate a chain of useful steps elsewhere.',
				'The visual approach makes it easier to inspect the logic, maintain the flow, and adjust the automation as business rules change.',
			]),
			section(
				'Who Primarily Uses It',
				'It is most valuable for people who care about process design and systems coordination.',
				[
					'Operations managers, automation specialists, and system integrators use it most often.',
					'It is also a strong fit for teams that need to connect several tools but do not want every small integration to become a full development project.',
				]
			),
			section(
				'How It Benefits Us',
				'It reduces repetitive admin work and makes cross-system workflows more reliable.',
				[
					'It saves time by automating routine handoffs and data sync work that would otherwise be done manually.',
					'It also lowers the chance of human error, which is especially useful when the same data has to move through several systems in order.',
				]
			),
		],
	},
	semrush: {
		eyebrow: 'External Marketing Tool',
		title: 'Semrush',
		summary:
			'Semrush is the research suite for SEO, PPC, and competitive analysis, helping the team make better decisions from search data instead of intuition.',
		sections: [
			section(
				'What It Is Used For',
				'It is the platform the team uses to understand search performance and competitor visibility.',
				[
					'Semrush supports keyword research, site audits, backlink review, competitor tracking, and paid search analysis.',
					'It is especially useful when the team needs a more complete picture of how a domain is performing in search and where the next opportunity sits.',
				]
			),
			section('How It Is Used', 'Users start from a domain, keyword, or campaign and work outward from there.', [
				'Marketers use it to inspect organic traffic, technical issues, keyword opportunities, and the content themes that are winning attention.',
				'It is also useful for tracking paid search, comparing competitors, and shaping content strategy around real search demand.',
			]),
			section('Who Primarily Uses It', 'It is mainly used by people who make decisions from search data every day.', [
				'SEO specialists, content strategists, PPC managers, and digital marketers rely on it most.',
				'It is especially valuable for teams that need to justify recommendations with evidence instead of opinions.',
			]),
			section(
				'How It Benefits Us',
				'It sharpens strategy by showing where search demand, technical gaps, and competitive pressure really sit.',
				[
					'It helps the team identify the right topics, the right keywords, and the right channels before time is spent on execution.',
					'By making search data easier to act on, it improves both organic growth planning and paid search efficiency.',
				]
			),
		],
	},
	instantly: {
		eyebrow: 'External Marketing Tool',
		title: 'Instantly',
		summary:
			'Instantly is the outbound email platform the team can use to manage cold outreach, monitor deliverability, and keep prospecting campaigns moving at scale.',
		sections: [
			section('What It Is Used For', 'It is the outreach engine for structured cold email campaigns.', [
				'Instantly helps teams send targeted outbound sequences, manage sending accounts, and keep deliverability under control.',
				'It is the right fit when the goal is to reach more prospects consistently without treating every send like a manual one-off.',
			]),
			section(
				'How It Is Used',
				'Users build campaigns, connect inboxes, and watch performance from a single control panel.',
				[
					'Teams create sequences, write follow-up steps, and assign sending infrastructure before launching an outreach batch.',
					'The workflow usually includes monitoring opens, replies, and deliverability signals so the team can refine the campaign while it is live.',
				]
			),
			section('Who Primarily Uses It', 'It is most useful to people responsible for outbound pipeline generation.', [
				'Sales development reps, outbound marketers, and growth teams use it most often.',
				'It also supports anyone who needs a structured way to manage high-volume outreach without losing control of the sender setup.',
			]),
			section('How It Benefits Us', 'It makes outbound work more scalable, measurable, and repeatable.', [
				'It helps the team send at volume while still protecting deliverability and response quality.',
				'Campaign analytics make it easier to see what message, audience, and sending pattern actually perform.',
			]),
		],
	},
	inboxes: {
		eyebrow: 'External Marketing Tool',
		title: 'Inboxes',
		summary:
			'Inboxes is the email inbox management layer for outreach and reply handling, keeping sending accounts organized so the team can coordinate communication cleanly.',
		sections: [
			section('What It Is Used For', 'It is used to organize and support the email accounts behind outbound work.', [
				'Inboxes helps the team keep multiple sending accounts, reply flows, and outreach identities in order.',
				'It is most useful when email operations need structure instead of ad-hoc account handling spread across different places.',
			]),
			section(
				'How It Is Used',
				'Teams connect inboxes, route communication, and use the workspace to keep replies manageable.',
				[
					'Users configure or monitor inboxes so outreach campaigns can send from the right account and route responses consistently.',
					'It also helps keep the inbox side of outbound work tidy when several campaigns or team members are active at once.',
				]
			),
			section(
				'Who Primarily Uses It',
				'It is most relevant to people managing email infrastructure and outbound response handling.',
				[
					'Outbound sales teams, operations staff, and campaign managers are the main users.',
					'It is especially helpful for teams that rely on multiple sender accounts and want a cleaner operating model around them.',
				]
			),
			section('How It Benefits Us', 'It reduces chaos in the part of outreach work that is easiest to lose track of.', [
				'It makes sender management easier to maintain and helps the team keep communication organized as volume grows.',
				'By improving visibility into inbox activity, it supports better follow-up discipline and fewer missed replies.',
			]),
		],
	},
};
