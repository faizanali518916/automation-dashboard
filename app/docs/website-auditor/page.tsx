import { DocTemplate } from '@/components/docs/doc-template';

export default function WebsiteAuditorDocPage() {
	return (
		<DocTemplate
			eyebrow="Marketing Playbook"
			title="Web Audit Report"
			summary="Automated UI/UX audit workflow that generates PDF reports for client websites and delivers them via email."
			toolLink={{
				label: 'Open Web Audit Form',
				href: 'https://spctek.com/audit-report-form/',
			}}
			sections={[
				{
					title: 'Overview and Inputs',
					items: [
						'Tool generates a comprehensive UI/UX audit report in PDF format.',
						'Required input fields: Name, Email, and Website URL.',
						'Website URL must be live, accessible, and not behind login or paywall.',
						'Email must be accurate because delivery is fully automated.',
					],
					links: [{ label: 'Web audit form', href: 'https://spctek.com/audit-report-form/' }],
				},
				{
					title: 'General Rules',
					items: [
						'Validate all inputs before submission.',
						'Do not submit duplicate requests for the same website unless required.',
						'If delayed, check spam/junk before re-submitting.',
					],
				},
				{
					title: 'Process Flow',
					items: [
						'Input: submit Name, Email, Website URL through form.',
						'Processing: system analyzes UI/UX, structure, and performance signals.',
						'Output: automated PDF audit report is generated.',
						'Delivery: report is sent directly to submitted email.',
					],
				},
				{
					title: 'Report Coverage',
					items: [
						'UI/UX design evaluation.',
						'Website structure and navigation assessment.',
						'Conversion optimization insights.',
						'Mobile responsiveness check.',
						'Performance and usability signals.',
						'Actionable improvement recommendations.',
					],
				},
				{
					title: 'Turnaround, Follow-up, and Failure Handling',
					items: [
						'Standard turnaround is within minutes to a few hours.',
						'Confirm client receipt and review report internally as needed.',
						'Use report for lead conversion, pre-sales audits, and upsell conversations.',
						'If report is not received, verify email and website status, then re-submit and escalate internally if issue persists.',
					],
				},
			]}
		/>
	);
}
