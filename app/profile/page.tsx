import Link from 'next/link';
import { redirect } from 'next/navigation';

import { SessionActions } from '@/components/auth/session-actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getServerAuthSession } from '@/lib/auth';
import { AppDataSource, runDbOperation } from '@/lib/db/data-source';
import { DepartmentEntity } from '@/lib/db/entities/department';

function formatPermissionLabel(count: number) {
	return count === 1 ? '1 department' : `${count} departments`;
}

export default async function ProfilePage() {
	const session = await getServerAuthSession();

	if (!session?.user) {
		redirect('/login?callbackUrl=/profile');
	}

	const departments = await runDbOperation(async () => {
		const departmentRepo = AppDataSource.getRepository(DepartmentEntity);
		return departmentRepo.find({ order: { name: 'ASC' } });
	});
	const departmentById = new Map(departments.map((department) => [department.id, department.name]));

	const canViewIds = Array.isArray(session.user.tags?.canView) ? session.user.tags.canView : [];
	const canModifyIds = Array.isArray(session.user.tags?.canModify) ? session.user.tags.canModify : [];
	const canViewNames = canViewIds.map((id) => departmentById.get(id) ?? 'Unknown department');
	const canModifyNames = canModifyIds.map((id) => departmentById.get(id) ?? 'Unknown department');
	const displayName = session.user.name?.trim() || 'Unnamed user';
	const isAdministrator = session.user.tags?.isAdministrator === true;
	const isSuperUser = session.user.tags?.isSuperUser === true;

	return (
		<main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
			<Card className="overflow-hidden">
				<CardHeader className="border-b border-zinc-800/70 bg-zinc-950/40">
					<CardTitle className="text-2xl">Profile</CardTitle>
					<CardDescription>Review your account and current access without exposing raw session data.</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6 p-6">
					<div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
						<div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
							<div className="text-xs tracking-[0.2em] text-zinc-500 uppercase">Account</div>
							<div className="mt-2 text-2xl font-semibold text-zinc-100">{displayName}</div>
							<div className="mt-1 text-sm text-zinc-400">{session.user.email}</div>
						</div>
						<div className="grid gap-3 sm:grid-cols-2">
							<div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
								<div className="text-xs tracking-[0.2em] text-zinc-500 uppercase">Role</div>
								<div className="mt-2 text-lg font-semibold text-zinc-100">
									{isAdministrator ? 'Administrator' : 'Standard user'}
								</div>
								<div className="mt-1 text-sm text-zinc-400">
									{isAdministrator ? 'Can manage users and permissions.' : 'No admin tooling access.'}
								</div>
							</div>
							<div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
								<div className="text-xs tracking-[0.2em] text-zinc-500 uppercase">Platform Access</div>
								<div className="mt-2 text-lg font-semibold text-zinc-100">
									{isSuperUser ? 'Superuser enabled' : 'Standard access'}
								</div>
								<div className="mt-1 text-sm text-zinc-400">
									{isSuperUser
										? 'All tools and departments are available.'
										: 'Access is limited by department permissions.'}
								</div>
							</div>
						</div>
					</div>

					<div className="grid gap-4 lg:grid-cols-2">
						<div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
							<div className="flex items-center justify-between gap-3">
								<div>
									<div className="text-xs tracking-[0.2em] text-zinc-500 uppercase">Can View</div>
									<div className="mt-1 text-sm text-zinc-400">{formatPermissionLabel(canViewNames.length)}</div>
								</div>
							</div>
							<div className="mt-4 flex flex-wrap gap-2">
								{canViewNames.length > 0 ? (
									canViewNames.map((department) => (
										<span
											key={department}
											className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200"
										>
											{department}
										</span>
									))
								) : (
									<span className="text-sm text-zinc-500">No view permissions assigned.</span>
								)}
							</div>
						</div>

						<div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
							<div className="flex items-center justify-between gap-3">
								<div>
									<div className="text-xs tracking-[0.2em] text-zinc-500 uppercase">Can Modify</div>
									<div className="mt-1 text-sm text-zinc-400">{formatPermissionLabel(canModifyNames.length)}</div>
								</div>
							</div>
							<div className="mt-4 flex flex-wrap gap-2">
								{canModifyNames.length > 0 ? (
									canModifyNames.map((department) => (
										<span
											key={department}
											className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200"
										>
											{department}
										</span>
									))
								) : (
									<span className="text-sm text-zinc-500">No modify permissions assigned.</span>
								)}
							</div>
						</div>
					</div>

					<div className="flex flex-wrap gap-3 border-t border-zinc-800 pt-2">
						<Link href="/">
							<Button>Back to Dashboard</Button>
						</Link>
						<SessionActions />
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
