import { DocTemplate } from '@/components/docs/doc-template';

export default function MarketingProposalDocPage() {
	return (
		<DocTemplate
			eyebrow="Marketing Playbook"
			title="Marketing Proposals"
			summary="Workflow for generating personalized client proposals, adding pricing, and maintaining service scope content safely."
			toolLink={{
				label: 'Open Proposal Form',
				href: 'https://spctek.com/services-proposal-form/',
			}}
			sections={[
				{
					title: 'Submission Form Fields',
					description: 'Complete all required fields to generate the initial proposal draft.',
					items: [
						'`Your Full Name`: client name.',
						'`Email Address`: client email.',
						'`Name of your Brand`: client brand.',
						'`Website URL`: optional website link.',
						'Business niche/industry field.',
						'Primary goals/objectives field.',
						'Requested services field.',
						'Existing account/setup details for requested services.',
						'Upload client brand logo.',
					],
					links: [{ label: 'Proposal form', href: 'https://spctek.com/services-proposal-form/' }],
				},
				{
					title: 'Post-Submission Timeline',
					items: [
						'After form submission, a personalized proposal is sent to marketing@spctek.com.',
						'Expected turnaround is 5 to 10 minutes.',
						'If not received within the expected window, contact automation team.',
						'Email includes a minimal pricing form for requested services.',
					],
				},
				{
					title: 'Pricing Format Requirements',
					items: [
						'Use $[price_in_numbers]/month for recurring services.',
						'Use $[price_in_numbers] once for one-time services.',
						'After submission, finalized proposal with pricing is sent to client email from the first form.',
					],
				},
				{
					title: 'Service Scope Editing Rules',
					description: 'For all service proposals, scope/deliverables content is maintained in one sheet.',
					items: [
						'Edit only relevant columns for in-scope, out-of-scope, and deliverables.',
						'Do not change markdown structure conventions.',
						'Use `##` for main headings, `-` for lists, and `###` or `####` for subheadings as needed.',
						'Paragraphs can be added directly without a list marker.',
					],
					links: [
						{
							label: 'Service proposal scope sheet',
							href: 'https://docs.google.com/spreadsheets/d/1x5lrAJs8--E4rw1HgvqGXnJrlxB7lFM36m6CKPMr8I4/edit?gid=414901407#gid=414901407',
						},
					],
					note: 'Be careful while editing in-scope, out-of-scope, and deliverables fields to avoid broken proposal formatting.',
				},
			]}
		/>
	);
}
