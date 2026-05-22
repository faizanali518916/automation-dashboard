import type { Metadata } from 'next';
import Link from 'next/link';
import { Sora, JetBrains_Mono } from 'next/font/google';

import { getServerAuthSession } from '@/lib/auth';
import { isAdministratorTags } from '@/lib/abac';
import './globals.css';

const sora = Sora({
	variable: '--font-sora',
	subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
	variable: '--font-jetbrains-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Automation Dashboard',
	description: 'ABAC-enabled internal tools dashboard',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerAuthSession();

	return (
		<html lang="en" className={`${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}>
			<body className="min-h-full bg-zinc-950 text-zinc-100">
				<div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col">
					<header className="sticky top-0 z-20 border-b border-zinc-800/80 bg-zinc-950/80 px-6 py-4 backdrop-blur">
						<div className="flex items-center justify-between">
							<Link href="/" className="text-sm font-semibold tracking-[0.2em] text-sky-300">
								AUTOMATION HQ
							</Link>
							<nav className="flex items-center gap-4 text-sm text-zinc-300">
								<Link href="/" className="transition hover:text-zinc-100">
									Dashboard
								</Link>
								{session ? (
									<>
										<Link href="/profile" className="transition hover:text-zinc-100">
											Profile
										</Link>
										{isAdministratorTags(session.user.tags) && (
											<Link href="/admin/permissions" className="transition hover:text-zinc-100">
												Permissions
											</Link>
										)}
									</>
								) : (
									<>
										<Link href="/login" className="transition hover:text-zinc-100">
											Sign In
										</Link>
										<Link href="/register" className="transition hover:text-zinc-100">
											Register
										</Link>
									</>
								)}
							</nav>
						</div>
					</header>
					{children}
				</div>
			</body>
		</html>
	);
}
