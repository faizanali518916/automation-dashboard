import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authOptions } from '@/lib/auth';
import { toolById } from '@/config/navigation';

export default async function DocPage({ params }: { params: Promise<{ toolId: string }> }) {
	await getServerSession(authOptions);

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
					<CardDescription>Professional Documentation</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<section>
						<h2 className="mb-2 text-sm font-semibold tracking-wide text-sky-300 uppercase">Description</h2>
						<p className="text-zinc-300">{tool.description ?? 'No description provided.'}</p>
					</section>
					<section>
						<h2 className="mb-2 text-sm font-semibold tracking-wide text-sky-300 uppercase">Use Case</h2>
						<p className="text-zinc-300">{tool.useCase ?? 'No use case provided.'}</p>
					</section>
					<section>
						<h2 className="mb-2 text-sm font-semibold tracking-wide text-sky-300 uppercase">How to Use</h2>
						<ol className="list-inside list-decimal space-y-2 text-zinc-300">
							{(tool.howToUse ?? ['Open the tool and follow your team workflow.']).map((step) => (
								<li key={step}>{step}</li>
							))}
						</ol>
					</section>
					<div className="flex flex-wrap gap-3">
						{tool.internalPath ? (
							<Link href={tool.internalPath}>
								<Button>Launch Tool</Button>
							</Link>
						) : null}
						{tool.externalLink ? (
							<a href={tool.externalLink} target="_blank" rel="noreferrer">
								<Button variant="secondary">Launch External Tool</Button>
							</a>
						) : null}
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
