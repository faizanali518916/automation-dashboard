'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';

export function SessionActions() {
	return (
		<Button
			variant="secondary"
			onClick={() => {
				void signOut({ callbackUrl: '/login' });
			}}
		>
			Sign out
		</Button>
	);
}
