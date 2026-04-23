import { getServerSession } from 'next-auth';

import { DynamicTree } from '@/components/dashboard/dynamic-tree';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { navigationTree, type NavigationNode } from '@/config/navigation';
import { authOptions } from '@/lib/auth';
import { hasRequiredTags } from '@/lib/abac';

function filterTreeByTags(
	nodes: NavigationNode[],
	userTags: Record<string, string | number | boolean | null | undefined>
): NavigationNode[] {
	return nodes
		.map((node) => {
			const filteredChildren = node.subcategories ? filterTreeByTags(node.subcategories, userTags) : undefined;

			const canAccessCurrent = hasRequiredTags(userTags, node.requiredTags);
			const hasVisibleChildren = Boolean(filteredChildren?.length);

			if (!canAccessCurrent && !hasVisibleChildren) {
				return null;
			}

			if (filteredChildren) {
				return {
					...node,
					subcategories: filteredChildren,
				};
			}

			return node;
		})
		.filter((node): node is NavigationNode => node !== null);
}

export default async function Home() {
	const session = await getServerSession(authOptions);
	const userTags = session?.user.tags ?? {};
	const filteredNavigation = filterTreeByTags(navigationTree, userTags);

	return (
		<main className="relative flex flex-1 flex-col overflow-hidden px-6 py-10">
			<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.18),transparent_28%),radial-gradient(circle_at_80%_12%,rgba(56,189,248,0.12),transparent_24%),linear-gradient(180deg,#09090b_0%,#111827_40%,#0a0a0a_100%)]" />
			<section className="mb-8">
				<div>
					<p className="text-xs tracking-[0.25em] text-sky-300 uppercase">Dynamic Navigation</p>
					<h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
						Tool Intelligence Dashboard
					</h1>
					<p className="mt-3 max-w-2xl text-sm text-zinc-300">
						Each section and tool is filtered by your ABAC tags from the current NextAuth session.
					</p>
				</div>
			</section>

			<Card>
				<CardHeader>
					<CardTitle>Tool Tree</CardTitle>
					<CardDescription>Expand categories to launch internal tools or open docs for each tool.</CardDescription>
				</CardHeader>
				<CardContent>
					{filteredNavigation.length ? (
						<DynamicTree nodes={filteredNavigation} />
					) : (
						<p className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300">
							No tools are currently visible for your tag set. Visit your profile to inspect your session tags.
						</p>
					)}
				</CardContent>
			</Card>
		</main>
	);
}
