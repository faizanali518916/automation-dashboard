'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ResetPasswordPage() {
	const router = useRouter();
	const params = useSearchParams();
	const token = params.get('token') ?? '';
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(true);
		setError('');
		setSuccess('');

		if (password !== confirmPassword) {
			setError('Passwords do not match.');
			setLoading(false);
			return;
		}

		const response = await fetch('/api/auth/reset-password', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token, password }),
		});

		const payload = (await response.json()) as { error?: string };

		if (!response.ok) {
			setError(payload.error ?? 'Unable to reset password.');
			setLoading(false);
			return;
		}

		setSuccess('Password reset. You can now sign in with your new password.');
		setPassword('');
		setConfirmPassword('');
		setLoading(false);
		router.replace('/login?reset=1');
	}

	return (
		<main className="mx-auto flex min-h-[80vh] w-full max-w-md items-center px-6">
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Set new password</CardTitle>
					<CardDescription>Choose a new password for your account.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit} className="space-y-4">
						{token ? null : <p className="text-sm text-red-300">This reset link is missing a token.</p>}
						<div className="relative">
							<Input
								type={showPassword ? 'text' : 'password'}
								placeholder="New password (min 8 chars)"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-zinc-400 hover:text-zinc-200"
							>
								{showPassword ? 'Hide' : 'Show'}
							</button>
						</div>
						<Input
							type={showPassword ? 'text' : 'password'}
							placeholder="Confirm new password"
							value={confirmPassword}
							onChange={(event) => setConfirmPassword(event.target.value)}
							required
						/>
						{error ? <p className="text-sm text-red-300">{error}</p> : null}
						{success ? <p className="text-sm text-emerald-300">{success}</p> : null}
						<Button className="w-full" type="submit" disabled={loading || !token}>
							{loading ? 'Resetting...' : 'Reset Password'}
						</Button>
						<p className="text-center text-sm text-zinc-400">
							Back to{' '}
							<Link href="/login" className="text-sky-300 transition hover:text-sky-200">
								sign in
							</Link>
						</p>
					</form>
				</CardContent>
			</Card>
		</main>
	);
}
