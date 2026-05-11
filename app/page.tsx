import { getServerAuthSession } from '@/lib/auth';
import { hasRequiredTags, isSuperUserTags } from '@/lib/abac';
import { DynamicTree } from '@/components/dashboard/dynamic-tree';
import { navigationTree, type NavigationNode } from '@/config/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function filterTreeByTags(
	nodes: NavigationNode[],
	userTags: Record<string, string | number | boolean | null | undefined>
): NavigationNode[] {
	if (isSuperUserTags(userTags)) {
		return nodes;
	}

	return nodes
		.map((node) => {
			const filteredChildren = node.subcategories ? filterTreeByTags(node.subcategories, userTags) : undefined;

			const canAccessCurrent = hasRequiredTags(userTags, node.requiredTags);
			const hasVisibleChildren = Boolean(filteredChildren?.length);

			if (node.subcategories && !hasVisibleChildren) {
				return null;
			}

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
	const session = await getServerAuthSession();
	const userTags = session?.user.tags ?? {};

	const filteredNavigation = filterTreeByTags(navigationTree, userTags);

	return (
		<main className="relative flex flex-1 flex-col overflow-hidden px-6 py-10 sm:px-8 sm:py-12">
			<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(34,211,238,0.24),transparent_32%),radial-gradient(circle_at_88%_8%,rgba(56,189,248,0.18),transparent_24%),radial-gradient(circle_at_50%_95%,rgba(99,102,241,0.16),transparent_40%),linear-gradient(180deg,#05060c_0%,#0b1220_45%,#06070f_100%)]" />
			<section className="mb-9 rounded-3xl border border-cyan-200/20 bg-[linear-gradient(130deg,rgba(17,24,39,0.74),rgba(8,47,73,0.3))] p-7 shadow-[0_24px_80px_rgba(6,182,212,0.16)] backdrop-blur-md sm:p-9">
				<div>
					<p className="text-xs tracking-[0.3em] text-cyan-200 uppercase">Adaptive Growth Map</p>
					<h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl lg:text-5xl">
						Tool Intelligence Dashboard
					</h1>
					<p className="mt-4 max-w-3xl text-base leading-8 text-zinc-200">
						This branching tree grows as nodes expand, collapses cleanly as nodes close, and always stays filtered by
						your ABAC tags from your authenticated session.
					</p>
				</div>
			</section>

			<Card className="border-cyan-200/20 bg-zinc-900/50 shadow-[0_24px_90px_rgba(14,165,233,0.14)] backdrop-blur-md">
				<CardHeader>
					<CardTitle className="text-zinc-50">Tool Growth Tree</CardTitle>
					<CardDescription className="text-zinc-300">
						Expand branches to reveal child nodes and actions for docs or tools.
					</CardDescription>
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
