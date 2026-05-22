import { ExternalLink, FileText } from 'lucide-react';

export function NodeActions({ docsHref, toolHrefs = [] }: { docsHref: string; toolHrefs?: string[] }) {
	return (
		<div className="relative ml-auto flex shrink-0 items-center gap-2">
			<a
				href={docsHref}
				target="_blank"
				rel="noreferrer"
				onClick={(e) => e.stopPropagation()}
				className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.14)] transition hover:border-cyan-300/60 hover:bg-cyan-400/20"
			>
				<FileText className="h-3.5 w-3.5" />
				Docs
			</a>

			{toolHrefs.map((toolHref, index) => (
				<a
					href={toolHref}
					target="_blank"
					rel="noreferrer"
					onClick={(e) => e.stopPropagation()}
					className="inline-flex items-center gap-2 rounded-xl border border-fuchsia-300/30 bg-fuchsia-400/10 px-3 py-1.5 text-xs font-medium text-fuchsia-100 shadow-[0_0_24px_rgba(232,121,249,0.14)] transition hover:border-fuchsia-300/60 hover:bg-fuchsia-400/20"
					key={`${toolHref}-${index}`}
				>
					<ExternalLink className="h-3.5 w-3.5" />
					{toolHrefs.length > 1 ? `Tool ${index + 1}` : 'Tool'}
				</a>
			))}
		</div>
	);
}
