import { DocTemplate } from '@/components/docs/doc-template';

export default function KeywordFiltrationToolDocPage() {
	return (
		<DocTemplate
			eyebrow="Operations Tool"
			title="Keyword Filtration Tool"
			summary="Filter high-volume keyword datasets into campaign-ready lists with clear include/exclude logic and export controls."
			sections={[
				{
					title: 'Description',
					items: [
						'Filters noisy keyword lists into high-intent targets with configurable thresholds and exclusion rules.',
					],
				},
				{
					title: 'Primary Use Case',
					items: ['Operations teams can prepare cleaner keyword sets for downstream PPC and content workflows.'],
				},
				{
					title: 'How to Use',
					items: [
						'Upload raw keyword data.',
						'Define include and exclude criteria.',
						'Run filtration and export the cleaned output.',
					],
				},
			]}
		/>
	);
}
