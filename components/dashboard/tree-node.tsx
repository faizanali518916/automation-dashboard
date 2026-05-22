'use client';

import React, { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { NodeActions } from './node-actions';
import { ParentToChildConnector } from './connector';
import type { ToolTreeNode } from '@/lib/tool-tree';

import { ChevronRight, ExternalLink, FolderTree, Loader2, Network, Plus, Sparkles, X } from 'lucide-react';

type TreeNodeProps = {
	node: ToolTreeNode;
	depth?: number;
};

function slugify(value: string) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
}

export function TreeNode({ node, depth = 0 }: TreeNodeProps) {
	const router = useRouter();
	const nodeRef = useRef<HTMLDivElement | null>(null);
	const shouldScrollRef = useRef(false);

	const children = node.subcategories ?? [];
	const hasChildren = children.length > 0;
	const isToolNode = node.nodeType === 'tool';
	const canCreateTool = node.nodeType === 'department' && node.canCreateTool && node.departmentId && node.toolType;

	const [expanded, setExpanded] = useState(depth === 0);
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [newToolName, setNewToolName] = useState('');
	const [newToolDescription, setNewToolDescription] = useState('');
	const [newToolPriceAmount, setNewToolPriceAmount] = useState('');
	const [newToolPricePeriod, setNewToolPricePeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
	const [newToolPriceCurrency, setNewToolPriceCurrency] = useState('USD');
	const [newToolPricePerUser, setNewToolPricePerUser] = useState(false);
	const [newToolLink, setNewToolLink] = useState('');
	const [createError, setCreateError] = useState<string | null>(null);
	const [isCreating, setIsCreating] = useState(false);

	// Use useMemo to stabilize refs array across renders
	const childRefs = useMemo(() => {
		return Array.from({ length: children.length }, () => React.createRef<HTMLDivElement>());
	}, [children.length]);

	const docsHref = node.docPath ?? `/docs/${node.id}`;
	const toolHrefs = node.externalLinks ?? [];
	const hasExternalTool = toolHrefs.length > 0;

	const NodeIcon = hasChildren ? (depth === 0 ? Network : FolderTree) : hasExternalTool ? ExternalLink : Sparkles;
	const slugPreview = slugify(newToolName);

	const handleToggle = () => {
		if (!hasChildren) return;

		setExpanded((prev) => {
			const next = !prev;
			shouldScrollRef.current = next;
			return next;
		});
	};

	const handleCreateTool = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		if (!canCreateTool) return;

		setIsCreating(true);
		setCreateError(null);

		try {
			const response = await fetch('/api/tools', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: newToolName,
					description: newToolDescription,
					type: node.toolType,
					departmentId: node.departmentId,
					pricing:
						node.toolType === 'external'
							? {
									amount: Number(newToolPriceAmount),
									period: newToolPricePeriod,
									currency: newToolPriceCurrency,
									perUser: newToolPricePerUser,
								}
							: undefined,
					link: node.toolType === 'internal' ? newToolLink : undefined,
				}),
			});
			const payload = (await response.json()) as { error?: string };

			if (!response.ok) {
				throw new Error(payload.error ?? 'Failed to create tool');
			}

			setNewToolName('');
			setNewToolDescription('');
			setNewToolPriceAmount('');
			setNewToolPricePeriod('monthly');
			setNewToolPriceCurrency('USD');
			setNewToolPricePerUser(false);
			setNewToolLink('');
			setShowCreateForm(false);
			setExpanded(true);
			router.refresh();
		} catch (error) {
			setCreateError(error instanceof Error ? error.message : 'Failed to create tool');
		} finally {
			setIsCreating(false);
		}
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

				{canCreateTool ? (
					<button
						type="button"
						onClick={(event) => {
							event.stopPropagation();
							setShowCreateForm((current) => !current);
							setCreateError(null);
						}}
						aria-label={`Add ${node.toolType} tool to ${node.name}`}
						className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-300/30 bg-emerald-400/10 text-emerald-100 transition hover:border-emerald-300/60 hover:bg-emerald-400/20"
					>
						{showCreateForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
					</button>
				) : null}

				{isToolNode && <NodeActions docsHref={docsHref} toolHrefs={toolHrefs} />}
			</div>

			{showCreateForm && canCreateTool ? (
				<form
					onSubmit={handleCreateTool}
					onClick={(event) => event.stopPropagation()}
					className="relative mt-3 space-y-3 rounded-2xl border border-emerald-300/20 bg-zinc-950/90 p-4 shadow-[0_18px_50px_rgba(16,185,129,0.14)]"
				>
					<div className="grid gap-3 sm:grid-cols-2">
						<label className="space-y-1 text-xs font-medium text-zinc-300">
							Name
							<input
								value={newToolName}
								onChange={(event) => setNewToolName(event.target.value)}
								className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-100 transition outline-none focus:border-emerald-300/50"
								required
							/>
						</label>
						<label className="space-y-1 text-xs font-medium text-zinc-300">
							Slug
							<input
								value={slugPreview}
								readOnly
								className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 text-sm text-zinc-400"
								placeholder="auto-generated"
							/>
						</label>
					</div>
					<label className="block space-y-1 text-xs font-medium text-zinc-300">
						Description
						<textarea
							value={newToolDescription}
							onChange={(event) => setNewToolDescription(event.target.value)}
							rows={3}
							className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 transition outline-none focus:border-emerald-300/50"
							required
						/>
					</label>
					{node.toolType === 'external' ? (
						<div className="grid gap-3 sm:grid-cols-3">
							<label className="space-y-1 text-xs font-medium text-zinc-300">
								Amount
								<input
									value={newToolPriceAmount}
									onChange={(event) => setNewToolPriceAmount(event.target.value)}
									type="number"
									min="0"
									step="0.01"
									className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-100 transition outline-none focus:border-emerald-300/50"
									required
								/>
							</label>
							<label className="space-y-1 text-xs font-medium text-zinc-300">
								Period
								<select
									value={newToolPricePeriod}
									onChange={(event) =>
										setNewToolPricePeriod(event.target.value as 'daily' | 'weekly' | 'monthly' | 'yearly')
									}
									className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-100 transition outline-none focus:border-emerald-300/50"
								>
									<option value="daily">Daily</option>
									<option value="weekly">Weekly</option>
									<option value="monthly">Monthly</option>
									<option value="yearly">Yearly</option>
								</select>
							</label>
							<label className="space-y-1 text-xs font-medium text-zinc-300">
								Currency
								<select
									value={newToolPriceCurrency}
									onChange={(event) => setNewToolPriceCurrency(event.target.value)}
									className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-100 transition outline-none focus:border-emerald-300/50"
								>
									<option value="USD">USD</option>
									<option value="PKR">PKR</option>
								</select>
							</label>
							<label className="flex items-center gap-2 text-xs font-medium text-zinc-300 sm:col-span-3">
								<input
									type="checkbox"
									checked={newToolPricePerUser}
									onChange={(event) => setNewToolPricePerUser(event.target.checked)}
									className="h-4 w-4"
								/>
								Per user
							</label>
						</div>
					) : (
						<label className="block space-y-1 text-xs font-medium text-zinc-300">
							Link
							<input
								value={newToolLink}
								onChange={(event) => setNewToolLink(event.target.value)}
								type="url"
								className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-100 transition outline-none focus:border-emerald-300/50"
								required
							/>
						</label>
					)}
					{createError ? <p className="text-sm text-red-300">{createError}</p> : null}
					<div className="flex justify-end gap-2">
						<button
							type="button"
							onClick={() => {
								setShowCreateForm(false);
								setCreateError(null);
							}}
							className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-zinc-100"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={isCreating}
							className="inline-flex items-center gap-2 rounded-lg border border-emerald-300/30 bg-emerald-400/15 px-3 py-2 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/60 hover:bg-emerald-400/25 disabled:cursor-not-allowed disabled:opacity-60"
						>
							{isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
							Add tool
						</button>
					</div>
				</form>
			) : null}

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
