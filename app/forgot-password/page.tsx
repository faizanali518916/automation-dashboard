'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(true);
		setError('');
		setSuccess('');

		const response = await fetch('/api/auth/forgot-password', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email }),
		});

		const payload = (await response.json()) as { error?: string; message?: string };

		if (!response.ok) {
			setError(payload.error ?? 'Unable to send reset email.');
			setLoading(false);
			return;
		}

		setSuccess(payload.message ?? 'If an account exists for that email, a reset link has been sent.');
		setLoading(false);
	}

	return (
		<main className="mx-auto flex min-h-[80vh] w-full max-w-md items-center px-6">
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Reset password</CardTitle>
					<CardDescription>Enter your email and we will send you a password reset link.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit} className="space-y-4">
						<Input
							type="email"
							placeholder="you@company.com"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
						/>
						{error ? <p className="text-sm text-red-300">{error}</p> : null}
						{success ? <p className="text-sm text-emerald-300">{success}</p> : null}
						<Button className="w-full" type="submit" disabled={loading}>
							{loading ? 'Sending...' : 'Send Reset Link'}
						</Button>
						<p className="text-center text-sm text-zinc-400">
							Remembered your password?{' '}
							<Link href="/login" className="text-sky-300 transition hover:text-sky-200">
								Sign in
							</Link>
						</p>
					</form>
				</CardContent>
			</Card>
		</main>
	);
}
