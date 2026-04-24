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

type DocTemplateProps = {
	eyebrow: string;
	title: string;
	summary: string;
	toolLink?: DocLink;
	sections: DocSection[];
};

function slugify(value: string) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
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
				className="rounded-md border border-cyan-300/40 bg-cyan-400/10 px-1.5 py-0.5 font-mono text-[0.82em] text-cyan-100 shadow-[0_0_16px_rgba(45,212,191,0.22)]"
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
					className="rounded-md border border-cyan-300/40 bg-cyan-400/10 px-1.5 py-0.5 font-mono text-[0.82em] text-cyan-100 shadow-[0_0_16px_rgba(45,212,191,0.22)]"
				>
					{value}
				</code>
			);
		}

		return <span key={`text-${index}`}>{emphasizeTechnicalTokens(chunk)}</span>;
	});
}

export function DocTemplate({ eyebrow, title, summary, toolLink, sections }: DocTemplateProps) {
	return (
		<main className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col gap-12 px-4 py-10 sm:px-8 sm:py-14 lg:px-12">
			<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,rgba(34,211,238,0.28),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(59,130,246,0.24),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(6,182,212,0.22),transparent_44%),linear-gradient(160deg,#04050a_0%,#060913_48%,#05060d_100%)]" />
			<div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />

			<section className="relative overflow-hidden rounded-[2rem] border border-cyan-300/25 bg-[linear-gradient(130deg,rgba(15,23,42,0.72),rgba(15,23,42,0.42)_40%,rgba(8,47,73,0.4)_100%)] p-8 shadow-[0_24px_120px_rgba(6,182,212,0.22)] backdrop-blur-xl sm:p-10 lg:p-12">
				<div className="pointer-events-none absolute top-8 -left-24 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
				<div className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 translate-x-10 translate-y-10 rounded-full bg-blue-400/20 blur-3xl" />

				<p className="text-xs tracking-[0.3em] text-cyan-200 uppercase">{eyebrow}</p>
				<h1 className="mt-4 max-w-4xl text-3xl leading-tight font-semibold tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">
					{title}
				</h1>
				<p className="mt-6 max-w-4xl text-base leading-8 text-zinc-200/95">{summary}</p>
				{toolLink ? (
					<div className="mt-8">
						<a href={toolLink.href} target="_blank" rel="noreferrer">
							<Button className="h-11 gap-2 rounded-xl border border-cyan-200/35 bg-cyan-400/25 text-cyan-50 shadow-[0_0_40px_rgba(34,211,238,0.32)] hover:bg-cyan-300/35">
								{toolLink.label}
								<ExternalLink className="h-4 w-4" />
							</Button>
						</a>
					</div>
				) : null}
			</section>

			<div className="grid gap-7 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-9">
				<aside className="top-24 self-start lg:sticky">
					<Card className="border-cyan-200/15 bg-zinc-900/45 shadow-[0_12px_70px_rgba(34,211,238,0.12)] backdrop-blur-lg">
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
										className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-sm text-zinc-200 transition hover:border-cyan-200/30 hover:bg-cyan-400/10 hover:text-cyan-100"
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
								className="scroll-mt-28 border-cyan-200/15 bg-[linear-gradient(130deg,rgba(24,24,27,0.7),rgba(12,74,110,0.28))] shadow-[0_20px_100px_rgba(14,165,233,0.16)] backdrop-blur-lg"
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
											{section.links.map((linkItem) => (
												<a
													key={linkItem.href}
													href={linkItem.href}
													target="_blank"
													rel="noreferrer"
													className="flex w-fit items-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-400/5 px-3 py-2 transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
												>
													{linkItem.label}
													<ExternalLink className="h-4 w-4" />
												</a>
											))}
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
				<Link href="/" className="text-sm text-cyan-200 transition hover:text-cyan-100">
					Back to dashboard
				</Link>
			</div>
		</main>
	);
}
