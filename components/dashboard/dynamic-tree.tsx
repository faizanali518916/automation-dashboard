import type { NavigationNode } from '@/config/navigation';
import { TreeNode } from '@/components/dashboard/tree-node';

type DynamicTreeProps = {
	nodes: NavigationNode[];
};

export function DynamicTree({ nodes }: DynamicTreeProps) {
	return (
		<div className="space-y-3">
			{nodes.map((node) => (
				<TreeNode key={node.id} node={node} />
			))}
		</div>
	);
}
