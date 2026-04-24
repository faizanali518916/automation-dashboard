import { DocTemplate } from '@/components/docs/doc-template';

export default function EmailCalendarsDocPage() {
	return (
		<DocTemplate
			eyebrow="Marketing Playbook"
			title="Email Calendars and Promotional Emails"
			summary="End-to-end workflow for email calendar setup, monthly campaign input, AI copy generation, approvals, design handoff, and launch readiness. This page combines responsibilities for both the Email Marketing team and the Design team."
			toolLink={{
				label: 'Open Clients Sheet',
				href: 'https://docs.google.com/spreadsheets/d/1BvMNmKazNKC_B_kodVtXtCqfivPBph6EWK0v7B8kaxA/edit?gid=0#gid=0',
			}}
			sections={[
				{
					title: 'Client Onboarding and Annual Setup',
					description: 'Create and register the yearly calendar sheet for every client.',
					items: [
						'Create a blank Google Sheet named ${brand_name} - Email Calendar ${current_year} - N8N Automations whenever a client is onboarded or the year changes.',
						'Add the client row in the main Clients sheet.',
						'Columns required in Clients sheet: `Client Name`, `Brand Name`, `Platforms`, `Creds (Access Token / Private API Key)`, `Calendar ID`, `Current Month Calendar`, `Current Month`, `Status`, `AI Prompt`, `Request URL for Products`, `Store Access Token`, `Request URL for Reviews`, `Templates`.',
						'`Current Month Calendar`, `Current Month`, and `Status` are auto-updated and should not be manually edited.',
						'`Request URL for Products`, `Store Access Token`, and `Request URL for Reviews` should be requested from developers.',
						'`Templates` must include all email templates used by the client so the automation team can prepare and update HTML as needed.',
					],
					links: [
						{
							label: 'Clients sheet',
							href: 'https://docs.google.com/spreadsheets/d/1BvMNmKazNKC_B_kodVtXtCqfivPBph6EWK0v7B8kaxA/edit?gid=0#gid=0',
						},
					],
				},
				{
					title: 'Day 20 Workflow: Monthly Campaign Input',
					description:
						'Email marketing receives formatted empty calendars and fills campaign details after client confirmation.',
					items: [
						'On the 20th of each month, the team receives reminder emails with formatted empty calendars.',
						'Fill campaign columns: `Campaign Name`, `Campaign Type`, `Status`, `Start Date`, `End Date`, `Offer Details`, `Goals`, `Products Services`, `Audience if targeted`, `Launch Date`, `Coupon Code`, `Template`, `CTA Link`, `Discount Type`, `Discount Value`.',
						'`Campaign Name` must be unique and is used in dashboard references and copy headings.',
						'`Campaign Type` is either Pre-decided or Ad-hoc. `Status` must always be Pending.',
						'Products/Services supports multi-select. Wait 2 to 5 seconds between selections.',
						'Audience list/segment names must be exact and case-sensitive.',
						'`Launch Date` format is MM-DD-YYYY.',
						'`Template` selection comes from the dropdown. Use Zoho HTML in templates column or Klaviyo template ID from Clients sheet if needed.',
						'`CTA Link` is only the primary destination link; product links are fetched from APIs automatically.',
						'`Discount Type` must be flat or percentage. `Discount Value` must be the exact numeric value.',
					],
				},
				{
					title: 'Day 21 Workflow: AI Content and Approvals',
					description: 'Generated copy is delivered by email and reviewed before design ticket creation.',
					items: [
						'Starting on the 21st, teams receive generated `Subject Line`, `Content Copy`, `CTA Text`, and `Banner Copy/Text` via email.',
						'If required input is missing, reminders are sent every 2 days until campaign inputs are added.',
						'Team can edit generated content directly in the relevant calendar sheet.',
						'Approve campaigns from the same email after final checks only.',
						'Approval automatically creates a banner design ticket for the Design team.',
					],
					note: 'Approve only after all edits are finalized. Approved data is attached to the design ticket as reference.',
				},
				{
					title: 'Campaign Launch and Deadline Rules',
					items: [
						'Campaigns launching in 2 days are drafted today, so all changes must be shared before that drafting day.',
						'Email Marketing is notified once drafts are ready.',
						'If banner is not ready on time, campaign creation pauses automatically.',
						'Designers then receive a reminder email with a form and must submit banner URL there to resume automation.',
					],
				},
				{
					title: 'Design Team Process',
					description: 'What happens after campaign approval and how banner delivery should be handled.',
					items: [
						'Design ticket includes approved campaign details, Drive folder URL, client calendar URL, and row number.',
						'Design banner from approved campaign content and upload to shared Drive folder.',
						'Copy the banner URL and paste into `Banner Copy/Text` in the client calendar for that campaign row.',
						'Due date is always 3 days before launch date.',
						'If due date is missed, submit banner URL via reminder form only. Do not manually update the sheet at that stage.',
						'All change communication should happen outside Drive/calendar through Jira or Google Chat.',
					],
					links: [
						{
							label: 'Shared design Drive folder',
							href: 'https://drive.google.com/drive/folders/1ECh87gCy0dnja6yh_n-tyWedEesTlwDF?usp=sharing',
						},
					],
					note: 'When due date is missed, submitting the form auto-updates banner URL in sheet and resumes draft flow.',
				},
			]}
		/>
	);
}
