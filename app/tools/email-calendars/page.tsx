import { ExternalToolPage } from '@/components/tools/external-tool-page';

export default function EmailCalendarsToolPage() {
	return (
		<ExternalToolPage
			title="Email Calendars and Promotional Emails"
			description="External marketing workflow sheet"
			docPath="/docs/email-calendars"
			toolUrl="https://docs.google.com/spreadsheets/d/1BvMNmKazNKC_B_kodVtXtCqfivPBph6EWK0v7B8kaxA/edit?gid=0#gid=0"
			toolLabel="Open Clients Sheet"
		/>
	);
}
