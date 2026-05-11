'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const params = useSearchParams();

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(true);
		setError('');

		const callbackUrl = params.get('callbackUrl') ?? '/';
		const response = await fetch('/api/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			const payload = (await response.json()) as { error?: string };
			setError(payload.error ?? 'Invalid credentials.');
			setLoading(false);
			return;
		}

		window.location.href = callbackUrl;
	}

	return (
		<main className="mx-auto flex min-h-[80vh] w-full max-w-md items-center px-6">
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Sign in to Dashboard</CardTitle>
					<CardDescription>Use your internal credentials to continue.</CardDescription>
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
						<div className="relative">
							<Input
								type={showPassword ? 'text' : 'password'}
								placeholder="Password"
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
						{error ? <p className="text-sm text-red-300">{error}</p> : null}
						<Button className="w-full" type="submit" disabled={loading}>
							{loading ? 'Signing in...' : 'Sign In'}
						</Button>
						<p className="text-center text-sm text-zinc-400">
							Need an account?{' '}
							<Link href="/register" className="text-sky-300 transition hover:text-sky-200">
								Register
							</Link>
						</p>
					</form>
				</CardContent>
			</Card>
		</main>
	);
}
