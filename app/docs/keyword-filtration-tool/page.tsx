import { DocTemplate } from '@/components/docs/doc-template';

export default function KeywordFiltrationToolDocPage() {
	return (
		<DocTemplate
			eyebrow="Operations Tool"
			title="Keyword Filtration Tool"
			summary="Review, mark, clean, and export keyword spreadsheets with fast search, duplicate removal, and auto-saved workbook updates."
			toolLink={{
				label: 'Open Source Repo',
				href: 'https://github.com/faizanali518916/mini-tools/tree/main/keyword-helper',
			}}
			sections={[
				{
					title: 'Description',
					items: [
						'Opens an `.xlsx` file from the `input/` folder, lets you inspect keywords in a table, and keeps changes in the same workbook.',
						'Supports case-insensitive substring search, bulk marking, clean exports, and duplicate removal.',
						'Status is stored with worksheet fill colors so the workbook stays organized after each action.',
					],
				},
				{
					title: 'Getting Started',
					items: [
						'Install Git if needed and clone the repository.',
						'Run `setup.bat` once to create the local `venv` and install Python dependencies.',
						'Launch the tool with `run.bat`.',
					],
				},
				{
					title: 'Files and Folders',
					description: 'The tool only works with workbooks in a specific location and edits them in place.',
					items: [
						'Place Excel workbooks in the `input/` folder.',
						'Only `.xlsx` files from `input/` are listed.',
						'The first column is treated as the keyword column and row 1 is treated as the header.',
						'The main workbook is updated directly when rows are marked, deduplicated, or exported.',
					],
				},
				{
					title: 'Workflow',
					description: 'After you pick a workbook, the app guides you through sheet selection and the main menu.',
					items: [
						'Choose a workbook from `input/`.',
						'Choose one worksheet or merge multiple worksheets into a single working set.',
						'Use the main menu to view data, search, export a clean sheet, remove duplicates, switch sheets, or switch files.',
						'Use Help & Instructions if you need to reopen the built-in guide.',
					],
				},
				{
					title: 'Marking and Search Rules',
					items: [
						'Keyword search is case-insensitive and trims the query before matching it against the first column.',
						'Matching rows can be marked as RELEVANT, IRRELEVANT, or NEUTRAL directly from the search results.',
						'Green fill means relevant, red fill means irrelevant, and white fill means neutral or unmarked.',
						'Relevant rows are protected from being changed to irrelevant, and irrelevant rows are protected from being changed to relevant.',
						'Neutral can override any existing mark.',
					],
				},
				{
					title: 'Export and Cleanup',
					items: [
						'Export Clean Sheet keeps relevant and unmarked rows and skips irrelevant rows.',
						'In single-sheet mode, the export copies the header row and uses the active worksheet as the source.',
						'In multi-sheet mode, selected worksheets are merged into a single sheet with a `Keyword` header.',
						'Remove Duplicate Keywords is only available in single-sheet mode and keeps the first case-insensitive match.',
						'Changes are auto-saved after marking search results, exporting a clean sheet, or removing duplicates.',
					],
				},
				{
					title: 'Usage Notes',
					items: [
						'Large views are paginated once the sheet has more than 500 rows.',
						'Multi-sheet mode is best when you want one search or export across several worksheets.',
						'Keep a backup if you want to preserve the untouched workbook, because the tool edits the file in place.',
					],
				},
			]}
		/>
	);
}
