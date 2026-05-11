import { DocTemplate } from '@/components/docs/doc-template';

export default function MarketSegmentationToolDocPage() {
	return (
		<DocTemplate
			eyebrow="Operations Tool"
			title="Market Segmentation Tool"
			summary="Fetch Amazon product data, clean it into a structured report, and generate market segmentation dashboards from selected columns in Google Sheets."
			toolLink={{
				label: 'Open Source Repo',
				href: 'https://github.com/faizanali518916/mini-tools/tree/main/market-segmentation',
			}}
			sections={[
				{
					title: 'Description',
					description:
						'The workflow is split into three Apps Script files that move data from raw ASIN lookups to charts and segment tables.',
					items: [
						'`fetch.gs` reads ASINs from `data!A:A`, calls the RapidAPI product-details endpoint, and writes the raw JSON response into `data!B:B`.',
						'`process.gs` cleans the JSON payload and writes a grouped product table into `product_report`.',
						'`segmentor.gs` reads selected columns from `product_report`, aggregates the values, and builds segmentation charts on `Segmentation Reports`.',
					],
				},
				{
					title: 'Setup Requirements',
					description: 'This is a Google Sheets bound Apps Script workflow, not a standalone app.',
					items: [
						'Open the Google Sheet that will hold the workflow and go to Extensions > Apps Script.',
						'Add the three script files from `app-scripts/`: `fetch.gs`, `process.gs`, and `segmentor.gs`.',
						'Save and authorize the project the first time you run a function.',
						'Update the RapidAPI key in `fetch.gs` before running the fetch step.',
					],
				},
				{
					title: 'Required Sheets and Layout',
					description: 'The scripts expect specific sheet names and a fixed control layout.',
					items: [
						'`data` stores ASINs in column A and raw JSON or error messages in column B.',
						'`product_report` stores the cleaned report created from the raw JSON in `data`.',
						'`tool` is the control panel sheet where `E6` and `E7` define the start and end columns to segment.',
						'`Segmentation Reports` is created automatically if it does not already exist.',
					],
				},
				{
					title: 'Usage Flow',
					description: 'Run the scripts in order so each stage has the data it expects.',
					items: [
						'Paste ASINs into `data!A:A`.',
						'Run `fetchProductData()` to populate `data!B:B` with raw JSON.',
						'Run `buildProductReport()` to clean the raw response into `product_report`.',
						'Enter the segmentation range in `tool!E6` and `tool!E7`.',
						'Run `generateSegmentationReports()` to build the summary tables and charts.',
					],
				},
				{
					title: 'Important Behavior Notes',
					items: [
						'`fetchProductData()` skips rows that already have output in column B so it does not overwrite existing results.',
						'`buildProductReport()` normalizes text values to lowercase and trims whitespace before writing the output.',
						'`segmentor.gs` expects the selected analysis columns to live inside `product_report` and uses the two columns after the selected range as monthly sales and monthly revenue.',
						'If the selected range or trailing metric columns do not match that expectation, the segmentation output will be incomplete or incorrect.',
					],
				},
				{
					title: 'Recommended Data Flow',
					items: [
						'Paste ASINs into `data!A:A`.',
						'Run `fetchProductData()` to fill `data!B:B`.',
						'Run `buildProductReport()` to create `product_report`.',
						'Choose the segment columns in `tool`.',
						'Run `generateSegmentationReports()` to produce the dashboard.',
					],
				},
				{
					title: 'API Key and Notes',
					items: [
						'`fetch.gs` currently stores the RapidAPI key directly in the script, so replace it with your own key before running the fetch step.',
						'The repository also includes a separate Python CLI tool in `keyword-helper/`, but this workflow is driven entirely by the Apps Script files in `market-segmentation/app-scripts/`.',
					],
					links: [
						{
							label: 'Sample spreadsheet',
							href: 'https://docs.google.com/spreadsheets/d/1iZb3N3GSCZO-VU1T-ePk35SzVuBkiymo1Q_BRhEnx04/edit?usp=sharing',
						},
					],
				},
			]}
		/>
	);
}
