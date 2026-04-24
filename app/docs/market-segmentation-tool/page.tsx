import { DocTemplate } from '@/components/docs/doc-template';

export default function MarketSegmentationToolDocPage() {
	return (
		<DocTemplate
			eyebrow="Operations Tool"
			title="Market Segmentation Tool"
			summary="Build reusable audience segments by combining intent, channel behavior, and value tiers for more precise planning."
			sections={[
				{
					title: 'Description',
					items: ['Creates audience segments using dimensions like intent, revenue potential, and channel affinity.'],
				},
				{
					title: 'Primary Use Case',
					items: ['Campaign teams can define and reuse structured segment logic across programs.'],
				},
				{
					title: 'How to Use',
					items: [
						'Choose your source dataset.',
						'Define segmentation dimensions and filters.',
						'Generate, review, and export segments.',
					],
				},
			]}
		/>
	);
}
