'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Save, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { ToolDocumentationBlock } from '@/lib/db/entities/tool';
import { DocTemplate } from './doc-template';

type DocLink = { label: string; href: string };
type DocSection = { title: string; description?: string; items?: string[]; note?: string; links?: DocLink[] };

type PricingObject = {
	amount?: number;
	period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
	currency?: string;
	perUser?: boolean;
};

type Props = {
	toolId: string;
	eyebrow: string;
	title: string;
	summary: string;
	pricing?: PricingObject | null;
	toolLinks?: DocLink[];
	sections: DocSection[];
	showPricing?: boolean;
	canEdit?: boolean;
};

function documentationToBlocks(sections: DocSection[]): ToolDocumentationBlock[] {
	return sections?.map((s) => ({ title: s.title, description: s.description ?? '', bullets: s.items ?? [] })) ?? [];
}
function blocksToSections(blocks: ToolDocumentationBlock[]): DocSection[] {
	return blocks?.map((b) => ({ title: b.title, description: b.description || undefined, items: b.bullets })) ?? [];
}

export function EditableDocTemplate(props: Props) {
	const { toolId, eyebrow, title, summary, pricing, toolLinks, sections, canEdit = false } = props;
	const router = useRouter();

	const [isEditMode, setIsEditMode] = useState(false);
	const [blocks, setBlocks] = useState<ToolDocumentationBlock[]>(documentationToBlocks(sections));
	const [heroSummary, setHeroSummary] = useState(summary);
	const [pricingAmount, setPricingAmount] = useState<number | undefined>(pricing?.amount ?? undefined);
	const [pricingPeriod, setPricingPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly' | undefined>(
		pricing?.period ?? undefined
	);
	const [pricingCurrency, setPricingCurrency] = useState(pricing?.currency ?? undefined);
	const [pricingPerUser, setPricingPerUser] = useState<boolean>(!!pricing?.perUser);
	const [editableTitle, setEditableTitle] = useState(title);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);

	type UpdatedToolResponse = {
		title?: string;
		description?: string;
		pricing?: PricingObject | null;
		documentation?: ToolDocumentationBlock[];
	};

	const resetFromProps = useCallback(() => {
		setBlocks(documentationToBlocks(sections));
		setHeroSummary(summary);
		setPricingAmount(pricing?.amount ?? undefined);
		setPricingPeriod(pricing?.period ?? undefined);
		setPricingCurrency(pricing?.currency ?? undefined);
		setPricingPerUser(!!pricing?.perUser);
		setEditableTitle(title);
	}, [sections, summary, pricing, title]);

	const handleBlockChange = useCallback(
		(
			index: number,
			field: keyof ToolDocumentationBlock,
			value: ToolDocumentationBlock[keyof ToolDocumentationBlock]
		) => {
			setBlocks((prev) => {
				const copy = prev.slice();
				copy[index] = { ...copy[index], [field]: value };
				return copy;
			});
		},
		[]
	);

	const handleAddBlock = useCallback(() => {
		setBlocks((prev) => [...prev, { title: 'New Section', description: '', bullets: [] }]);
	}, []);
	const handleRemoveBlock = useCallback((index: number) => setBlocks((prev) => prev.filter((_, i) => i !== index)), []);
	const handleAddBullet = useCallback((blockIndex: number) => {
		setBlocks((prev) => {
			const copy = prev.slice();
			copy[blockIndex] = { ...copy[blockIndex], bullets: [...(copy[blockIndex].bullets || []), ''] };
			return copy;
		});
	}, []);
	const handleBulletChange = useCallback((blockIndex: number, bulletIndex: number, value: string) => {
		setBlocks((prev) => {
			const copy = prev.slice();
			const bullets = [...(copy[blockIndex].bullets || [])];
			bullets[bulletIndex] = value;
			copy[blockIndex] = { ...copy[blockIndex], bullets };
			return copy;
		});
	}, []);
	const handleRemoveBullet = useCallback((blockIndex: number, bulletIndex: number) => {
		setBlocks((prev) => {
			const copy = prev.slice();
			copy[blockIndex] = {
				...copy[blockIndex],
				bullets: (copy[blockIndex].bullets || []).filter((_, i) => i !== bulletIndex),
			};
			return copy;
		});
	}, []);

	const handleSave = useCallback(async () => {
		setIsSaving(true);
		setError(null);
		try {
			// Build request payload and include pricing only if any field provided
			const payload: Record<string, unknown> = {
				title: editableTitle,
				description: heroSummary,
				documentation: blocks,
			};
			const hasPricingFields = typeof pricingAmount === 'number' || !!pricingPeriod || !!pricingCurrency;
			if (hasPricingFields) {
				const pricingPayload: Record<string, unknown> = {};
				if (typeof pricingAmount === 'number') pricingPayload.amount = pricingAmount;
				if (pricingPeriod) pricingPayload.period = pricingPeriod;
				if (pricingCurrency) pricingPayload.currency = pricingCurrency;
				pricingPayload.perUser = pricingPerUser;
				payload.pricing = pricingPayload;
			}

			const res = await fetch(`/api/tools/${toolId}/documentation`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});
			if (!res.ok) throw new Error('Save failed');
			const updated = (await res.json()) as UpdatedToolResponse;
			setHeroSummary(updated.description ?? heroSummary);
			setEditableTitle(updated.title ?? editableTitle);
			setPricingAmount(updated.pricing?.amount ?? pricingAmount);
			setPricingPeriod(updated.pricing?.period ?? pricingPeriod);
			setPricingCurrency(updated.pricing?.currency ?? pricingCurrency);
			setPricingPerUser(updated.pricing?.perUser ?? pricingPerUser);
			setBlocks(documentationToBlocks(updated.documentation ?? blocks));
			setIsEditMode(false);
			router.refresh();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Error');
		} finally {
			setIsSaving(false);
		}
	}, [
		toolId,
		editableTitle,
		heroSummary,
		blocks,
		pricingAmount,
		pricingPeriod,
		pricingCurrency,
		pricingPerUser,
		router,
	]);

	const displaySections = isEditMode ? blocksToSections(blocks) : sections;

	if (!isEditMode) {
		return (
			<div className="relative">
				{canEdit && (
					<div className="absolute top-6 right-6 z-20">
						<Button
							onClick={() => {
								resetFromProps();
								setIsEditMode(true);
							}}
							className="gap-2"
						>
							<Pencil /> Edit
						</Button>
					</div>
				)}

				<DocTemplate
					eyebrow={eyebrow}
					title={title}
					summary={summary}
					pricing={pricing}
					toolLinks={toolLinks}
					sections={displaySections}
				/>
			</div>
		);
	}

	return (
		<main className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 py-8 sm:px-8 sm:py-12 lg:px-12">
			<section className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900/40 p-6 sm:p-8 lg:p-10">
				<p className="text-xs tracking-[0.3em] text-cyan-200 uppercase">{eyebrow}</p>
				<div className="mt-4 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
					<div className="min-w-0">
						<Input
							value={editableTitle}
							onChange={(e) => setEditableTitle(e.target.value)}
							className="mt-3 h-auto border-white/10 bg-zinc-950/50 px-4 py-3 text-2xl font-semibold text-zinc-50 placeholder:text-zinc-500"
						/>

						<textarea
							value={heroSummary}
							onChange={(e) => setHeroSummary(e.target.value)}
							rows={3}
							placeholder="Describe the tool using simple text"
							className="mt-4 w-full resize-none rounded-xl border border-cyan-300/20 bg-zinc-950/50 px-4 py-3 text-sm leading-6 text-zinc-50 outline-none placeholder:text-zinc-500 focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/10"
						/>

						{/* Pricing Fields */}
						<div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
								<div>
									<label className="text-xs font-medium text-zinc-400">Amount</label>
									<Input
										type="number"
										value={pricingAmount ?? ''}
										onChange={(e) => setPricingAmount(e.target.value ? Number(e.target.value) : undefined)}
										className="mt-1.5 bg-zinc-950/50"
									/>
								</div>

								<div>
									<label className="text-xs font-medium text-zinc-400">Period</label>
									<select
										value={pricingPeriod ?? ''}
										onChange={(e) => {
											const next = e.target.value as PricingObject['period'] | '';
											setPricingPeriod(next || undefined);
										}}
										className="mt-1.5 w-full rounded-md border border-white/10 bg-zinc-950/50 px-3 py-2 text-sm text-zinc-50 outline-none focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/10"
									>
										<option value="">—</option>
										<option value="daily">Daily</option>
										<option value="weekly">Weekly</option>
										<option value="monthly">Monthly</option>
										<option value="yearly">Yearly</option>
									</select>
								</div>

								<div>
									<label className="text-xs font-medium text-zinc-400">Currency</label>
									<select
										value={pricingCurrency ?? ''}
										onChange={(e) => setPricingCurrency(e.target.value)}
										className="mt-1.5 w-full rounded-md border border-white/10 bg-zinc-950/50 px-3 py-2 text-sm text-zinc-50 outline-none focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/10"
									>
										<option value="">—</option>
										<option value="USD">USD</option>
										<option value="PKR">PKR</option>
									</select>
								</div>
							</div>

							<div className="mt-4 border-t border-white/10 pt-4">
								<label className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400">
									<input
										type="checkbox"
										checked={pricingPerUser}
										onChange={(e) => setPricingPerUser(e.target.checked)}
										className="h-4 w-4 rounded border-white/20 bg-zinc-950"
									/>
									Per user
								</label>
							</div>
						</div>

						{error && (
							<div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
								{error}
							</div>
						)}
					</div>

					<div className="mt-4 flex flex-col gap-2 lg:min-w-32">
						<Button onClick={handleSave} disabled={isSaving} className="w-full justify-center gap-2">
							<Save className="h-4 w-4" />
							Save
						</Button>

						<Button
							onClick={() => {
								resetFromProps();
								setIsEditMode(false);
							}}
							variant="secondary"
							className="w-full justify-center gap-2"
						>
							Cancel
						</Button>
					</div>
				</div>
			</section>

			<section className="space-y-6">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold text-zinc-50">Sections</h2>
				</div>
				<div className="space-y-6">
					{blocks.map((block, index) => (
						<Card key={`${block.title}-${index}`} className="border border-white/100 bg-zinc-900/40">
							<CardHeader className="flex flex-row items-center justify-between gap-3">
								<div className="flex-1">
									<CardTitle className="text-sm text-zinc-200">Section title</CardTitle>
									<Input
										value={block.title}
										onChange={(e) => handleBlockChange(index, 'title', e.target.value)}
										className="mt-2"
									/>
								</div>
								<Button onClick={() => handleRemoveBlock(index)} variant="secondary" className="gap-2">
									<Trash2 className="h-4 w-4" />
									Remove
								</Button>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<CardDescription className="text-zinc-300">Description</CardDescription>
									<textarea
										value={block.description ?? ''}
										onChange={(e) => handleBlockChange(index, 'description', e.target.value)}
										rows={3}
										className="mt-2 w-full rounded-lg border border-cyan-300/20 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500"
										placeholder="Describe this section"
									/>
								</div>

								<div className="space-y-3">
									<CardDescription className="text-zinc-300">Bullets</CardDescription>
									<div className="space-y-2">
										{(block.bullets || []).map((bullet, bulletIndex) => (
											<div key={`${index}-${bulletIndex}`} className="flex gap-2">
												<Input
													value={bullet}
													onChange={(e) => handleBulletChange(index, bulletIndex, e.target.value)}
												/>
												<Button
													onClick={() => handleRemoveBullet(index, bulletIndex)}
													variant="secondary"
													className="px-3"
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										))}
									</div>
									<Button onClick={() => handleAddBullet(index)} variant="secondary" className="gap-2">
										<Plus className="h-4 w-4" />
										Add bullet
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
				<div className="flex justify-end">
					<Button onClick={handleAddBlock} className="gap-2">
						<Plus className="h-4 w-4" />
						Add section
					</Button>
				</div>
			</section>

			<div className="pb-4">
				<Link href="/" className="text-sm text-cyan-200">
					Back to dashboard
				</Link>
			</div>
		</main>
	);
}

export default EditableDocTemplate;
