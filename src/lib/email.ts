import nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, html: string) {
	const smtpPort = Number(process.env.SMTP_PORT);
	const smtpHost = process.env.SMTP_HOST;
	const smtpUser = process.env.SMTP_USER;
	const smtpPass = process.env.SMTP_PASS;

	if (!smtpPort || !smtpHost || !smtpUser || !smtpPass) {
		throw new Error('SMTP configuration is incomplete.');
	}

	const transporter = nodemailer.createTransport({
		host: smtpHost,
		port: smtpPort,
		secure: smtpPort === 465,
		auth: {
			user: smtpUser,
			pass: smtpPass,
		},
	});

	await transporter.sendMail({
		from: smtpUser,
		to,
		subject,
		html,
	});
}

export async function sendActionEmail(options: {
	to: string;
	subject: string;
	title: string;
	description: string;
	actionUrl: string;
	actionLabel: string;
	footer?: string;
}) {
	const { to, subject, title, description, actionUrl, actionLabel, footer } = options;
	const parts = [`<p>${description}</p>`, `<p><a href="${actionUrl}">${actionLabel}</a></p>`];

	if (footer) {
		parts.push(`<p>${footer}</p>`);
	}

	await sendEmail(
		to,
		subject,
		`<div style="font-family: Arial, sans-serif; line-height: 1.5; color: #000000;">
			<h2 style="margin: 0 0 12px;">${title}</h2>
			${parts.join('')}
		</div>`
	);
}
