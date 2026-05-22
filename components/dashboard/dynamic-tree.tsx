import type { ToolTreeNode } from '@/lib/tool-tree';
import { TreeNode } from '@/components/dashboard/tree-node';

type DynamicTreeProps = {
	nodes: ToolTreeNode[];
};

export function DynamicTree({ nodes }: DynamicTreeProps) {
	return (
		<div className="relative rounded-3xl border border-cyan-300/20 bg-[linear-gradient(140deg,rgba(24,24,27,0.8),rgba(8,47,73,0.38))] p-5 shadow-[0_24px_90px_rgba(6,182,212,0.18)] backdrop-blur-md sm:p-7">
			<div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_8%_0%,rgba(34,211,238,0.2),transparent_36%),radial-gradient(circle_at_92%_100%,rgba(14,165,233,0.18),transparent_42%)]" />
			<div className="pointer-events-none absolute top-6 left-1/2 h-8 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/90 to-cyan-300/0" />
			<div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6">
				{nodes.map((node, index, list) => (
					<div key={node.id} className="relative">
						{index < list.length - 1 ? (
							<span className="pointer-events-none absolute top-full left-1/2 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/50 to-cyan-300/0" />
						) : null}
						<TreeNode node={node} />
					</div>
				))}
			</div>
		</div>
	);
}
