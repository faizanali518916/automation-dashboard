import Link from 'next/link';
import { Zap, Package, DollarSign, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getExternalToolById } from '@/src/config/external-tools';

type ToolPageProps = {
	params: {
		toolId: string;
	};
};

export default function ToolPage({ params }: ToolPageProps) {
	const tool = getExternalToolById(params.toolId);

	if (!tool) {
		return (
			<main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
				<Card className="border-red-300/25 bg-red-950/20">
					<CardHeader>
						<CardTitle className="text-red-100">Tool Not Found</CardTitle>
						<CardDescription className="text-red-200/80">
							The tool you&apos;re looking for doesn&apos;t exist in our database.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Link href="/">
							<Button variant="outline" className="gap-2">
								<ArrowLeft className="h-4 w-4" />
								Back to Dashboard
							</Button>
						</Link>
					</CardContent>
				</Card>
			</main>
		);
	}

	const categoryColors: Record<string, { badge: string; text: string }> = {
		Sales: { badge: 'bg-blue-500/20 text-blue-100 border-blue-300/30', text: 'text-blue-200' },
		Operations: { badge: 'bg-green-500/20 text-green-100 border-green-300/30', text: 'text-green-200' },
		Design: { badge: 'bg-purple-500/20 text-purple-100 border-purple-300/30', text: 'text-purple-200' },
	};

	const colors = categoryColors[tool.category] || categoryColors.Operations;

	return (
		<main className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-10">
			<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(34,211,238,0.24),transparent_32%),radial-gradient(circle_at_88%_8%,rgba(56,189,248,0.18),transparent_24%),linear-gradient(180deg,#05060c_0%,#0b1220_45%,#06070f_100%)]" />

			{/* Header Section */}
			<section className="rounded-2xl border border-cyan-200/20 bg-[linear-gradient(130deg,rgba(17,24,39,0.74),rgba(8,47,73,0.3))] p-8">
				<div className="flex flex-col gap-6">
					<div>
						<div className={`mb-4 w-fit rounded-full border px-3 py-1 text-xs font-medium ${colors.badge}`}>
							{tool.category}
							{tool.shared && ' (Shared)'}
						</div>
						<h1 className="text-4xl font-semibold tracking-tight text-zinc-50">{tool.name}</h1>
						<p className="mt-4 max-w-2xl text-base leading-7 text-zinc-200">{tool.description}</p>
					</div>

					<div className="flex flex-wrap gap-3">
						<Link href="/">
							<Button variant="outline" className="gap-2">
								<ArrowLeft className="h-4 w-4" />
								Back to Dashboard
							</Button>
						</Link>
					</div>
				</div>
			</section>

			<div className="grid gap-8 lg:grid-cols-3">
				{/* Main Content */}
				<div className="space-y-6 lg:col-span-2">
					{/* Features */}
					<Card className="border-cyan-200/15 bg-[linear-gradient(130deg,rgba(24,24,27,0.7),rgba(12,74,110,0.28))] shadow-[0_20px_100px_rgba(14,165,233,0.16)] backdrop-blur-lg">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-zinc-50">
								<Zap className="h-5 w-5 text-cyan-400" />
								Key Features
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-3">
								{tool.features.map((feature, index) => (
									<li key={index} className="flex gap-3">
										<span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.75)]" />
										<span className="text-zinc-100">{feature}</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>

					{/* Use Case */}
					<Card className="border-cyan-200/15 bg-[linear-gradient(130deg,rgba(24,24,27,0.7),rgba(12,74,110,0.28))] shadow-[0_20px_100px_rgba(14,165,233,0.16)] backdrop-blur-lg">
						<CardHeader>
							<CardTitle className="text-zinc-50">Primary Use Case</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-base leading-7 text-zinc-100">{tool.useCase}</p>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* Pricing Card */}
					<Card className="border-cyan-200/15 bg-[linear-gradient(130deg,rgba(24,24,27,0.7),rgba(12,74,110,0.28))] shadow-[0_20px_100px_rgba(14,165,233,0.16)] backdrop-blur-lg">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-zinc-50">
								<DollarSign className="h-5 w-5 text-emerald-400" />
								Pricing
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								<p className="text-sm text-zinc-300">Current Plan Price</p>
								<p className="text-3xl font-bold text-emerald-400">${tool.pricing}</p>
								<p className="text-xs text-zinc-400">
									*Placeholder pricing. Actual pricing to be confirmed and updated.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Info Card */}
					<Card className="border-cyan-200/15 bg-[linear-gradient(130deg,rgba(24,24,27,0.7),rgba(12,74,110,0.28))] shadow-[0_20px_100px_rgba(14,165,233,0.16)] backdrop-blur-lg">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-zinc-50">
								<Package className="h-5 w-5 text-cyan-400" />
								Details
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div>
								<p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">Category</p>
								<p className={`mt-1 text-sm font-medium ${colors.text}`}>{tool.category}</p>
							</div>
							{tool.shared && (
								<div>
									<p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">Access Type</p>
									<p className="mt-1 text-sm font-medium text-amber-300">Shared Team Account</p>
								</div>
							)}
							<div>
								<p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">Tool ID</p>
								<p className="mt-1 font-mono text-xs text-zinc-400">{tool.id}</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
