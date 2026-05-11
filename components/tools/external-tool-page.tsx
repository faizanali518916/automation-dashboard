import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type ExternalToolPageProps = {
	title: string;
	description: string;
	docPath: string;
	toolUrl: string;
	toolLabel?: string;
};

export function ExternalToolPage({ title, description, docPath, toolUrl, toolLabel }: ExternalToolPageProps) {
	return (
		<main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
			<Card>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<p className="text-sm text-zinc-300">
						This tool runs on an external platform. Use the button below to open it in a new tab.
					</p>
					<div className="flex flex-wrap gap-3">
						<a href={toolUrl} target="_blank" rel="noreferrer">
							<Button className="gap-2">
								{toolLabel ?? 'Open Tool'}
								<ExternalLink className="h-4 w-4" />
							</Button>
						</a>
						<Link href={docPath} target="_blank" rel="noreferrer">
							<Button variant="secondary">View Documentation</Button>
						</Link>
						<Link href="/" target="_blank" rel="noreferrer">
							<Button variant="outline">Back to Dashboard</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
