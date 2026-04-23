import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UnauthorizedPage() {
	return (
		<main className="mx-auto flex min-h-[80vh] w-full max-w-2xl items-center px-6">
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Access restricted</CardTitle>
					<CardDescription>Your current ABAC tags do not satisfy this tool&apos;s required attributes.</CardDescription>
				</CardHeader>
				<CardContent className="flex gap-3">
					<Link href="/">
						<Button>Back to Dashboard</Button>
					</Link>
					<Link href="/profile">
						<Button variant="secondary">View Session Tags</Button>
					</Link>
				</CardContent>
			</Card>
		</main>
	);
}
