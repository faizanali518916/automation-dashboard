import type { ReactNode } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type DocLink = {
	label: string;
	href: string;
};

type DocSection = {
	title: string;
	description?: string;
	items?: string[];
	note?: string;
	links?: DocLink[];
	extra?: ReactNode;
};

type PricingObject = {
	amount?: number;
	period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
	currency?: string;
	perUser?: boolean;
};

type DocTemplateProps = {
	eyebrow: string;
	title: string;
	summary: string;
	pricing?: PricingObject | null;
	toolLinks?: DocLink[];
	sections: DocSection[];
};

function slugify(value: string) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
}

function formatPricing(pricing?: PricingObject | null) {
	if (!pricing) return null;
	if (typeof pricing.amount === 'number') {
		const currencySymbol =
			pricing.currency === 'PKR' ? 'Rs. ' : pricing.currency === 'USD' ? '$' : (pricing.currency ?? '$');
		const period = pricing.period ? ` ${pricing.period}` : '';
		const perUser = pricing.perUser ? ' / user' : '';
		return `${currencySymbol}${pricing.amount.toFixed(2)}${period}${perUser}`;
	}
	return null;
}

function emphasizeTechnicalTokens(segment: string) {
	const tokenRegex = /\b[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)+\b/g;
	const parts: ReactNode[] = [];
	let cursor = 0;

	for (const match of segment.matchAll(tokenRegex)) {
		const index = match.index ?? 0;
		if (index > cursor) {
			parts.push(segment.slice(cursor, index));
		}

		const token = match[0];
		parts.push(
			<code
				key={`${token}-${index}`}
				className="relative mx-0.5 inline-flex shrink-0 items-center overflow-visible rounded-md border border-cyan-300/40 bg-cyan-400/10 px-1.5 py-0.5 font-mono text-[0.82em] leading-none text-cyan-100 shadow-[0_0_16px_rgba(45,212,191,0.22)]"
			>
				{token}
			</code>
		);

		cursor = index + token.length;
	}

	if (cursor < segment.length) {
		parts.push(segment.slice(cursor));
	}

	return parts.length ? parts : [segment];
}

function renderInlineText(text: string) {
	const chunks = text.split(/(`[^`]+`)/g).filter(Boolean);

	return chunks.map((chunk, index) => {
		if (chunk.startsWith('`') && chunk.endsWith('`')) {
			const value = chunk.slice(1, -1);
			return (
				<code
					key={`code-${value}-${index}`}
					className="relative mx-0.5 inline-flex shrink-0 items-center overflow-visible rounded-md border border-cyan-300/40 bg-cyan-400/10 px-1.5 py-0.5 font-mono text-[0.82em] leading-none text-cyan-100 shadow-[0_0_16px_rgba(45,212,191,0.22)]"
				>
					{value}
				</code>
			);
		}

		return <span key={`text-${index}`}>{emphasizeTechnicalTokens(chunk)}</span>;
	});
}

export function DocTemplate({ eyebrow, title, summary, pricing, toolLinks = [], sections }: DocTemplateProps) {
	return (
		<main className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 py-8 sm:px-8 sm:py-12 lg:px-12">
			<div className="self-start">
				<Link href="/" className="text-sm text-cyan-200 transition hover:text-cyan-100">
					Back to dashboard
				</Link>
			</div>
			<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,rgba(34,211,238,0.28),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(59,130,246,0.24),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(6,182,212,0.22),transparent_44%),linear-gradient(160deg,#04050a_0%,#060913_48%,#05060d_100%)]" />
			<div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />

			<section className="relative overflow-hidden rounded-[1.75rem] border border-solid border-white/100 bg-[linear-gradient(130deg,rgba(15,23,42,0.72),rgba(15,23,42,0.42)_40%,rgba(8,47,73,0.4)_100%)] p-6 shadow-[0_20px_96px_rgba(6,182,212,0.2)] backdrop-blur-xl sm:p-8 lg:p-10">
				<div className="pointer-events-none absolute top-6 -left-20 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />
				<div className="pointer-events-none absolute right-0 bottom-0 h-36 w-36 translate-x-8 translate-y-8 rounded-full bg-blue-400/20 blur-3xl" />

				<p className="text-xs tracking-[0.3em] text-cyan-200 uppercase">{eyebrow}</p>
				<h1 className="mt-3 max-w-4xl text-2xl leading-tight font-semibold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl">
					{title}
				</h1>
				<p className="mt-4 max-w-4xl text-sm leading-7 text-zinc-200/95 sm:text-base sm:leading-8">{summary}</p>
				{pricing ? (
					<div className="mt-6 inline-flex flex-wrap items-center gap-3 rounded-2xl border border-cyan-300/25 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-50 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
						<span className="font-semibold tracking-wide text-cyan-100 uppercase">Price</span>
						<span className="text-zinc-50">{formatPricing(pricing) ?? 'Not listed'}</span>
					</div>
				) : null}
				{toolLinks.length ? (
					<div className="mt-6 flex flex-wrap gap-3">
						{toolLinks.map((toolLink, index) => (
							<a href={toolLink.href} target="_blank" rel="noreferrer" key={`${toolLink.href}-${index}`}>
								<Button className="h-11 gap-2 rounded-xl border border-cyan-200/35 bg-cyan-400/25 text-cyan-50 shadow-[0_0_40px_rgba(34,211,238,0.32)] hover:bg-cyan-300/35">
									{toolLink.label}
									<ExternalLink className="h-4 w-4" />
								</Button>
							</a>
						))}
					</div>
				) : null}
			</section>

			<div className="grid gap-7 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-9">
				<aside className="top-24 self-start lg:sticky">
					<Card className="border border-solid border-white/100 bg-zinc-900/45 shadow-[0_12px_70px_rgba(34,211,238,0.12)] backdrop-blur-lg">
						<CardHeader className="pb-3">
							<CardTitle className="text-base tracking-wide text-cyan-100">Sections</CardTitle>
							<CardDescription className="text-zinc-300">Jump through documentation blocks</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2 pt-0">
							{sections.map((section, index) => {
								const anchor = slugify(section.title);
								return (
									<a
										key={section.title}
										href={`#${anchor}`}
										className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-sm text-zinc-200 transition hover:border-white/60 hover:bg-white/5 hover:text-white"
									>
										<span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-xs font-semibold text-cyan-100">
											{index + 1}
										</span>
										<span>{section.title}</span>
									</a>
								);
							})}
						</CardContent>
					</Card>
				</aside>

				<div className="space-y-7">
					{sections.map((section, index) => {
						const anchor = slugify(section.title);
						return (
							<Card
								id={anchor}
								key={section.title}
								className="scroll-mt-28 border border-solid border-white/100 bg-[linear-gradient(130deg,rgba(24,24,27,0.7),rgba(12,74,110,0.28))] shadow-[0_20px_100px_rgba(14,165,233,0.16)] backdrop-blur-lg"
							>
								<CardHeader className="space-y-3 pb-4 sm:pb-5">
									<div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-100 uppercase">
										Section {index + 1}
									</div>
									<CardTitle className="text-2xl leading-tight text-zinc-50">{section.title}</CardTitle>
									{section.description ? (
										<CardDescription className="max-w-3xl text-base leading-7 text-zinc-200">
											{renderInlineText(section.description)}
										</CardDescription>
									) : null}
								</CardHeader>
								<CardContent className="space-y-6 pb-8 text-base leading-8 text-zinc-100 sm:space-y-7 sm:pb-9">
									{section.items ? (
										<ul className="space-y-4">
											{section.items.map((item) => (
												<li key={item} className="flex gap-3">
													<span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.75)]" />
													<span className="text-zinc-100/95">{renderInlineText(item)}</span>
												</li>
											))}
										</ul>
									) : null}
									{section.note ? (
										<p className="rounded-xl border border-amber-300/25 bg-amber-500/10 px-4 py-3 text-sm leading-7 text-amber-100">
											{renderInlineText(section.note)}
										</p>
									) : null}
									{section.links?.length ? (
										<div className="space-y-2 text-sm text-cyan-100">
											{section.links.map((linkItem) => {
												const isExternal = /^https?:\/\//.test(linkItem.href ?? '');
												const href = isExternal ? linkItem.href : `/doc/${slugify(linkItem.href ?? linkItem.label)}`;
												return isExternal ? (
													<a
														key={href}
														href={href}
														target="_blank"
														rel="noreferrer"
														className="flex w-fit items-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-400/5 px-3 py-2 transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
													>
														{linkItem.label}
														<ExternalLink className="h-4 w-4" />
													</a>
												) : (
													<Link
														key={href}
														href={href}
														className="flex w-fit items-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-400/5 px-3 py-2 transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
													>
														{linkItem.label}
													</Link>
												);
											})}
										</div>
									) : null}
									{section.extra}
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>

			<div className="pb-4">
				<Link
					href="/"
					target="_blank"
					rel="noreferrer"
					className="text-sm text-cyan-200 transition hover:text-cyan-100"
				>
					Back to dashboard
				</Link>
			</div>
		</main>
	);
}
