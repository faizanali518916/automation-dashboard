'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const params = useSearchParams();

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(true);
		setError('');

		const callbackUrl = params.get('callbackUrl') ?? '/';
		const result = await signIn('credentials', {
			email,
			password,
			redirect: false,
			callbackUrl,
		});

		if (result?.error) {
			setError('Invalid credentials. Please verify your email and password.');
			setLoading(false);
			return;
		}

		window.location.href = result?.url ?? callbackUrl;
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
						<Input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							required
						/>
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
