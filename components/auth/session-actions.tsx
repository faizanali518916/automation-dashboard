'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

export function SessionActions() {
	const [loading, setLoading] = useState(false);

	async function handleSignOut() {
		setLoading(true);
		await fetch('/api/auth/logout', {
			method: 'POST',
		});
		window.location.href = '/login';
	}

	return (
		<Button variant="secondary" onClick={() => void handleSignOut()} disabled={loading}>
			{loading ? 'Signing out...' : 'Sign out'}
		</Button>
	);
}
