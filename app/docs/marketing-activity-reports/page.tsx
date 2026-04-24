import { DocTemplate } from '@/components/docs/doc-template';

export default function MarketingActivityReportsDocPage() {
	return (
		<DocTemplate
			eyebrow="Marketing Playbook"
			title="Marketing Activity Reports"
			summary="Setup and review process for automated client marketing reports covering social media and email marketing channels."
			toolLink={{
				label: 'Open Reporting Sheet',
				href: 'https://docs.google.com/spreadsheets/d/1nPfDbvESoJMOHkWfeWI0uimSSpsVA90SqpBbVsKR7tM/edit?usp=sharing',
			}}
			sections={[
				{
					title: 'Who This Applies To',
					items: [
						'Any client using Social Media Marketing (organic or paid) and/or Email Marketing.',
						'Only client-related input columns should be filled by marketing.',
					],
				},
				{
					title: 'Client Detail Columns',
					items: [
						'`Client`: client name.',
						'`Email`: client email address.',
						'`Client_Website`: client website URL.',
						'`Reporting_Schedule`: Weekly or Biweekly only.',
						'`Brand_Logo`: client logo URL.',
					],
					note: 'Any `Reporting_Schedule` value other than Weekly or Biweekly will block report generation.',
				},
				{
					title: 'Platform Enablement Columns',
					description: 'Set values exactly as Enabled or Disabled (case-sensitive).',
					items: [
						'`YouTube`, `Meta_Ads`, `Google_Ads`, `Facebook`, `TikTok`, `Zoho`, `Klaviyo`, `Instagram`.',
						'`Include_Meta_Ad_Creatives`, `Community_Outreach`, `Has_Manual_Insertion`.',
						'`Has_Manual_Insertion` is used when Shopify stats or Klaviyo form revenue needs to be included.',
					],
				},
				{
					title: 'Do Not Edit: Automation-Owned Fields',
					items: [
						'`Youtube_Channel_ID`, `Meta_Ads_Account_ID`, `Google_Ads_Customer_ID`, `Facebook_Page_ID`, `IG_Business_Account_ID`.',
						'`Klaviyo_Private_API_Key`, `Conversion_Metric_ID`, `Meta_Access_Token`, `Facebook_Page_Access_Token`.',
						'`Google_Access_Token`, `Google_Refresh_Token`, `TikTok_Access_Token`, `TikTok_Refresh_Token`, `TikTok_Account_ID`.',
						'`Zoho_Access_Token`, `Zoho_Refresh_Token`, `Google Consent`, `Zoho Consent`, `TikTok Consent`, `Status`.',
						'`Next_Schedule_Date` must be left empty.',
					],
				},
				{
					title: 'After Setup and Report QA',
					items: [
						'After entering client details, follow up with automation team to start setup.',
						'Reports are expected from next scheduled period (weekly or biweekly).',
						'Reports are delivered via email with Approval and Rejection options.',
						'Reject reports when key images are missing or API data is incomplete so they can be regenerated.',
						'Once final, approve from email and the report is sent to the client automatically.',
					],
					links: [
						{
							label: 'Marketing activity reports sheet',
							href: 'https://docs.google.com/spreadsheets/d/1nPfDbvESoJMOHkWfeWI0uimSSpsVA90SqpBbVsKR7tM/edit?usp=sharing',
						},
					],
				},
			]}
		/>
	);
}
