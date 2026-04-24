import { ExternalToolPage } from '@/components/tools/external-tool-page';

export default function EmailNewslettersToolPage() {
	return (
		<ExternalToolPage
			title="Email Newsletters"
			description="External newsletter intake sheet"
			docPath="/docs/email-newsletters"
			toolUrl="https://docs.google.com/spreadsheets/d/1sRSEwIiTjU4r8tvSs_tyHg8z1f4qCQxCliqIKJx6WQQ/edit?usp=sharing"
			toolLabel="Open Newsletter Sheet"
		/>
	);
}
