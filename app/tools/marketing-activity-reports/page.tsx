import { ExternalToolPage } from '@/components/tools/external-tool-page';

export default function MarketingActivityReportsToolPage() {
	return (
		<ExternalToolPage
			title="Marketing Activity Reports"
			description="External reporting setup sheet"
			docPath="/docs/marketing-activity-reports"
			toolUrl="https://docs.google.com/spreadsheets/d/1nPfDbvESoJMOHkWfeWI0uimSSpsVA90SqpBbVsKR7tM/edit?usp=sharing"
			toolLabel="Open Reporting Sheet"
		/>
	);
}
