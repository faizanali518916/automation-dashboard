import { DocTemplate } from '@/components/docs/doc-template';

export default function EmailNewslettersDocPage() {
	return (
		<DocTemplate
			eyebrow="Marketing Playbook"
			title="Email Newsletters"
			summary="Weekly newsletter drafting process for SPCTEK using structured news input, status control, and review notifications."
			toolLink={{
				label: 'Open Newsletter Sheet',
				href: 'https://docs.google.com/spreadsheets/d/1sRSEwIiTjU4r8tvSs_tyHg8z1f4qCQxCliqIKJx6WQQ/edit?usp=sharing',
			}}
			sections={[
				{
					title: 'Weekly Cadence',
					items: [
						'Before Thursday each week, add all newsletter-relevant news entries.',
						'Once rows are added in correct format, newsletter draft generation starts automatically.',
						'Marketing team receives an email notification for draft review.',
					],
				},
				{
					title: 'Required Sheet Fields',
					items: [
						'`News_Title`: news headline.',
						'`News_Description`: short summary.',
						'`News_Image`: source image URL.',
						'`News_Link`: article URL.',
						'`Status`: must be `New` (case-sensitive).',
					],
					links: [
						{
							label: 'Newsletter input sheet',
							href: 'https://docs.google.com/spreadsheets/d/1sRSEwIiTjU4r8tvSs_tyHg8z1f4qCQxCliqIKJx6WQQ/edit?usp=sharing',
						},
					],
				},
				{
					title: 'Partner Spotlight',
					items: [
						'If a Partner Spotlight is available for the week, share details with the automation team so it can be included in the newsletter.',
					],
				},
			]}
		/>
	);
}
