'use client';

import React, { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/utils';
import { NodeActions } from './node-actions';
import { ParentToChildConnector } from './connector';
import type { NavigationNode } from '@/config/navigation';

import { ChevronRight, ExternalLink, FolderTree, Network, Sparkles } from 'lucide-react';

type TreeNodeProps = {
	node: NavigationNode;
	depth?: number;
};

export function TreeNode({ node, depth = 0 }: TreeNodeProps) {
	const nodeRef = useRef<HTMLDivElement | null>(null);
	const shouldScrollRef = useRef(false);

	const children = node.subcategories ?? [];
	const hasChildren = children.length > 0;

	const [expanded, setExpanded] = useState(depth === 0);

	// Use useMemo to stabilize refs array across renders
	const childRefs = useMemo(() => {
		return Array.from({ length: children.length }, () => React.createRef<HTMLDivElement>());
	}, [children.length]);

	const docsHref = node.docPath ?? `/docs/${node.id}`;
	const toolHref = node.externalLink ?? node.internalPath;
	const isExternalTool = Boolean(node.externalLink && !node.internalPath);

	const NodeIcon = hasChildren ? (depth === 0 ? Network : FolderTree) : isExternalTool ? ExternalLink : Sparkles;

	const handleToggle = () => {
		if (!hasChildren) return;

		setExpanded((prev) => {
			const next = !prev;
			shouldScrollRef.current = next;
			return next;
		});
	};

	const handleExpandComplete = () => {
		if (!shouldScrollRef.current) return;

		shouldScrollRef.current = false;

		nodeRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	return (
		<div ref={nodeRef} className="relative w-full scroll-mt-12">
			<div
				data-tree-node-header
				role={hasChildren ? 'button' : undefined}
				tabIndex={hasChildren ? 0 : undefined}
				onClick={handleToggle}
				onKeyDown={(e) => {
					if (!hasChildren) return;

					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						handleToggle();
					}
				}}
				className={cn(
					'group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-cyan-200/20 bg-[linear-gradient(130deg,rgba(17,24,39,0.82),rgba(8,47,73,0.34))] px-4 py-3 text-left shadow-[0_16px_40px_rgba(8,145,178,0.12)] backdrop-blur-lg transition hover:border-cyan-300/45 hover:shadow-[0_20px_60px_rgba(8,145,178,0.25)]',
					hasChildren ? 'cursor-pointer' : 'cursor-default'
				)}
			>
				<span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(34,211,238,0.2),transparent_45%)] opacity-80" />

				<span className="relative inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-cyan-300/35 bg-cyan-300/12 shadow-[0_0_20px_rgba(34,211,238,0.35)]">
					<NodeIcon className="h-4 w-4 text-cyan-100" />
				</span>

				<ChevronRight
					className={cn(
						'relative h-4 w-4 shrink-0 text-cyan-100/80 transition-transform',
						expanded && hasChildren && 'rotate-90 text-sky-300',
						!hasChildren && 'hidden'
					)}
				/>

				<span className="relative min-w-0 flex-1 truncate font-medium text-zinc-50">{node.name}</span>

				{!hasChildren && <NodeActions docsHref={docsHref} toolHref={toolHref} isExternalTool={isExternalTool} />}
			</div>

			<AnimatePresence initial={false}>
				{expanded && hasChildren && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.18, ease: 'easeOut' }}
						onAnimationComplete={handleExpandComplete}
						className="relative overflow-visible pt-10"
					>
						<ParentToChildConnector childCount={children.length} childRefs={childRefs} />

						<div className="relative z-10 space-y-[50px] pl-[80px]">
							{children.map((child, index) => (
								<motion.div
									ref={childRefs[index]}
									key={child.id}
									initial={{ opacity: 0, x: -8 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.14, delay: index * 0.08 }}
								>
									<TreeNode node={child} depth={depth + 1} />
								</motion.div>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
