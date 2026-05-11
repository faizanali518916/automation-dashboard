'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [dept, setDept] = useState<'Marketing' | 'Operations' | 'Sales'>('Marketing');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(true);
		setError('');
		setSuccess('');

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

		const payload = (await response.json()) as { error?: string; verificationPreviewUrl?: string | null };

		if (!response.ok) {
			setError(payload.error ?? 'Unable to register at the moment.');
			setLoading(false);
			return;
		}

		setSuccess(`Account created. Check your email for the verification link.`);
		setLoading(false);
	}

	return (
		<main className="mx-auto my-auto flex min-h-[80vh] w-full max-w-md items-center px-6">
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Create account</CardTitle>
					<CardDescription>Register your account and verify your email before signing in.</CardDescription>
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
						<div className="relative">
							<Input
								type={showPassword ? 'text' : 'password'}
								placeholder="Password (min 8 chars)"
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
						<label className="space-y-1 text-sm text-zinc-300">
							<span>Department</span>
							<select
								value={dept}
								onChange={(event) => setDept(event.target.value as 'Marketing' | 'Operations' | 'Sales')}
								className="h-10 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:outline-none"
							>
								<option value="Marketing">Marketing</option>
								<option value="Operations">Operations</option>
								<option value="Sales">Sales</option>
							</select>
						</label>
						{error ? <p className="text-sm text-red-300">{error}</p> : null}
						{success ? <p className="text-sm text-emerald-300">{success}</p> : null}
						<Button className="mt-4 w-full" type="submit" disabled={loading}>
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
