'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [dept, setDept] = useState<'Marketing' | 'Operations' | 'Sales' | 'Management'>('Marketing');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(true);
		setError('');

		const response = await fetch('/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name,
				email,
				password,
				dept,
			}),
		});

		if (!response.ok) {
			const payload = (await response.json()) as { error?: string };
			setError(payload.error ?? 'Unable to register at the moment.');
			setLoading(false);
			return;
		}

		const loginResult = await signIn('credentials', {
			email,
			password,
			redirect: false,
			callbackUrl: '/',
		});

		if (loginResult?.error) {
			window.location.href = '/login';
			return;
		}

		window.location.href = loginResult?.url ?? '/';
	}

	return (
		<main className="mx-auto my-auto flex min-h-[80vh] w-full max-w-md items-center px-6">
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Create account</CardTitle>
					<CardDescription>Register and immediately access your ABAC-scoped dashboard.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit} className="space-y-4">
						<Input placeholder="Full name" value={name} onChange={(event) => setName(event.target.value)} />
						<Input
							type="email"
							placeholder="you@company.com"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
						/>
						<Input
							type="password"
							placeholder="Password (min 8 chars)"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							required
						/>
						<label className="space-y-1 text-sm text-zinc-300">
							<span>Department</span>
							<select
								value={dept}
								onChange={(event) => setDept(event.target.value as 'Marketing' | 'Operations' | 'Sales' | 'Management')}
								className="h-10 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:outline-none"
							>
								<option value="Marketing">Marketing</option>
								<option value="Operations">Operations</option>
								<option value="Sales">Sales</option>
								<option value="Management">Management</option>
							</select>
						</label>
						{error ? <p className="text-sm text-red-300">{error}</p> : null}
						<Button className="w-full" type="submit" disabled={loading}>
							{loading ? 'Creating account...' : 'Register'}
						</Button>
						<p className="text-center text-sm text-zinc-400">
							Already have an account?{' '}
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
