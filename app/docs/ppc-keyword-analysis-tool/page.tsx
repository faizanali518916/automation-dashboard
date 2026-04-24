import { DocTemplate } from '@/components/docs/doc-template';

export default function PpcKeywordAnalysisToolDocPage() {
	return (
		<DocTemplate
			eyebrow="Operations Tool"
			title="PPC Keyword Analysis Tool"
			summary="Analyze paid search performance to identify efficiency gaps, spend outliers, and optimization opportunities quickly."
			sections={[
				{
					title: 'Description',
					items: ['Analyzes PPC datasets and surfaces performance anomalies across cost and outcome metrics.'],
				},
				{
					title: 'Primary Use Case',
					items: ['Use recommendations to optimize bids, budgets, and targeting decisions.'],
				},
				{
					title: 'How to Use',
					items: [
						'Import PPC CSV reports.',
						'Apply KPI weighting based on campaign goals.',
						'Review recommendations and implement changes.',
					],
				},
			]}
		/>
	);
}
