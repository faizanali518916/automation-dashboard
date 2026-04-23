'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ExternalLink, FileText, Wrench } from 'lucide-react';
import { useState } from 'react';

import type { NavigationNode } from '@/config/navigation';
import { cn } from '@/lib/utils';

type TreeNodeProps = {
	node: NavigationNode;
	depth?: number;
};

export function TreeNode({ node, depth = 0 }: TreeNodeProps) {
	const hasChildren = Boolean(node.subcategories?.length);
	const [expanded, setExpanded] = useState(depth === 0);

	return (
		<div className="w-full">
			<button
				type="button"
				onClick={() => hasChildren && setExpanded((prev) => !prev)}
				className={cn(
					'group flex w-full items-center gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-3 text-left transition hover:border-zinc-700 hover:bg-zinc-900',
					!hasChildren && 'cursor-default'
				)}
			>
				<ChevronRight
					className={cn(
						'h-4 w-4 text-zinc-400 transition-transform',
						expanded && hasChildren && 'rotate-90 text-sky-300',
						!hasChildren && 'opacity-0'
					)}
				/>
				<span className="font-medium text-zinc-100">{node.name}</span>
			</button>

			<AnimatePresence initial={false}>
				{expanded && hasChildren && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.26, ease: 'easeOut' }}
						className="mt-2 ml-4 space-y-2 overflow-hidden border-l border-zinc-800 pl-4"
					>
						{node.subcategories?.map((child) => (
							<TreeNode key={child.id} node={child} depth={depth + 1} />
						))}
					</motion.div>
				)}
			</AnimatePresence>

			{!hasChildren && (
				<div className="mt-2 ml-11 flex flex-wrap gap-2 pb-3">
					<Link
						href={`/docs/${node.id}`}
						className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-xs font-medium text-zinc-100 transition hover:border-sky-400 hover:text-sky-200"
					>
						<FileText className="h-3.5 w-3.5" />
						Docs
					</Link>
					{node.internalPath && (
						<Link
							href={node.internalPath}
							className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-xs font-medium text-zinc-100 transition hover:border-sky-400 hover:text-sky-200"
						>
							<Wrench className="h-3.5 w-3.5" />
							Launch
						</Link>
					)}
					{node.externalLink && (
						<a
							href={node.externalLink}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-xs font-medium text-zinc-100 transition hover:border-sky-400 hover:text-sky-200"
						>
							<ExternalLink className="h-3.5 w-3.5" />
							External
						</a>
					)}
				</div>
			)}
		</div>
	);
}
