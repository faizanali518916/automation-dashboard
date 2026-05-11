import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type InternalToolPageProps = {
	title: string;
	description: string;
	docPath: string;
	placeholder: string;
};

export function InternalToolPage({ title, description, docPath, placeholder }: InternalToolPageProps) {
	return (
		<main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
			<Card>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid gap-3 md:grid-cols-[1fr_auto]">
						<Input placeholder={placeholder} />
						<Button>Execute</Button>
					</div>
					<div className="flex flex-wrap gap-3">
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
