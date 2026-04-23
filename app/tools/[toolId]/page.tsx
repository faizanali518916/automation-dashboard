import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { authOptions } from '@/lib/auth';
import { toolById } from '@/config/navigation';

export default async function ToolPage({ params }: { params: Promise<{ toolId: string }> }) {
	const session = await getServerSession(authOptions);
	const { toolId } = await params;
	const tool = toolById.get(toolId);

	if (!tool) {
		notFound();
	}

	return (
		<main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
			<Card>
				<CardHeader>
					<CardTitle>{tool.name}</CardTitle>
					<CardDescription>Internal Dashboard Tool</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<p className="text-sm text-zinc-300">
						This route is ABAC-protected via middleware. Your active tags:{' '}
						<span className="font-mono text-zinc-100">{JSON.stringify(session?.user.tags ?? {})}</span>
					</p>
					<div className="grid gap-3 md:grid-cols-[1fr_auto]">
						<Input placeholder={`Run ${tool.name.toLowerCase()}...`} />
						<Button>Execute</Button>
					</div>
					<div className="flex flex-wrap gap-3">
						<Link href={`/docs/${tool.id}`}>
							<Button variant="secondary">View Documentation</Button>
						</Link>
						<Link href="/">
							<Button variant="outline">Back to Dashboard</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
