import { NextResponse } from 'next/server';

import { createPasswordResetToken } from '@/lib/auth';
import { sendActionEmail } from '@/lib/email';

export async function POST(request: Request) {
	try {
		const { email } = (await request.json()) as { email?: string };
		const normalizedEmail = email?.toLowerCase().trim();

		if (!normalizedEmail) {
			return NextResponse.json({ error: 'Email required' }, { status: 400 });
		}

		const result = await createPasswordResetToken(normalizedEmail);
		let resetPreviewUrl: string | null = null;

		if (result.resetToken) {
			const resetUrl = new URL(`/reset-password?token=${result.resetToken}`, request.url).toString();
			await sendActionEmail({
				to: normalizedEmail,
				subject: 'Reset your password',
				title: 'Reset your password',
				description: 'Click the link below to reset your password.',
				actionUrl: resetUrl,
				actionLabel: 'Reset password',
				footer: 'This link expires in 1 hour.',
			});
			resetPreviewUrl = process.env.NODE_ENV !== 'production' ? resetUrl : null;
		}

		return NextResponse.json({
			ok: true,
			message: 'If an account exists for that email, a reset link has been sent.',
			previewUrl: resetPreviewUrl,
		});
	} catch {
		return NextResponse.json({ error: 'Unable to send reset email' }, { status: 500 });
	}
}
