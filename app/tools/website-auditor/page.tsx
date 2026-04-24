import { ExternalToolPage } from '@/components/tools/external-tool-page';

export default function WebsiteAuditorToolPage() {
	return (
		<ExternalToolPage
			title="Web Audit Report"
			description="External web audit form"
			docPath="/docs/website-auditor"
			toolUrl="https://spctek.com/audit-report-form/"
			toolLabel="Open Web Audit Form"
		/>
	);
}
