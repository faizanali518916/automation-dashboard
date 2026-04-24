import { ExternalToolPage } from '@/components/tools/external-tool-page';

export default function MarketingProposalToolPage() {
	return (
		<ExternalToolPage
			title="Marketing Proposals"
			description="External proposal form"
			docPath="/docs/marketing-proposal"
			toolUrl="https://spctek.com/services-proposal-form/"
			toolLabel="Open Proposal Form"
		/>
	);
}
