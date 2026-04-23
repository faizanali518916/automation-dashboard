import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { SessionActions } from '@/components/auth/session-actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authOptions } from '@/lib/auth';

export default async function ProfilePage() {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		redirect('/login?callbackUrl=/profile');
	}

	return (
		<main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-10">
			<Card>
				<CardHeader>
					<CardTitle>Profile</CardTitle>
					<CardDescription>Verify your ABAC claims directly from your active NextAuth session.</CardDescription>
				</CardHeader>
				<CardContent className="space-y-5">
					<div className="space-y-1 text-sm text-zinc-300">
						<p>Email: {session.user.email}</p>
						<p>User ID: {session.user.id}</p>
					</div>
					<div>
						<p className="mb-2 text-sm font-medium text-zinc-200">Session tags</p>
						<pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-300">
							{JSON.stringify(session.user.tags ?? {}, null, 2)}
						</pre>
					</div>
					<div className="flex flex-wrap gap-3">
						<Link href="/">
							<Button>Back to Dashboard</Button>
						</Link>
						<SessionActions />
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
