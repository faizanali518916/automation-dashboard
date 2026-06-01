'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import type { UserTags } from '@/lib/db/entities/user';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type User = { id: string; email: string; name: string | null; tags: UserTags };
type Dept = { id: string; name: string };
type UsersResponse = { users?: User[]; error?: string };
type DepartmentsResponse = { departments?: Dept[]; error?: string };

export default function PermissionsManager() {
	const [users, setUsers] = useState<User[]>([]);
	const [departments, setDepartments] = useState<Dept[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [saving, setSaving] = useState<Record<string, boolean>>({});
	const [dirty, setDirty] = useState<Record<string, boolean>>({});
	const [success, setSuccess] = useState<Record<string, boolean>>({});

	function hasDeptAccess(user: User, field: 'canView' | 'canModify', deptId: string) {
		return Array.isArray(user.tags?.[field]) && user.tags[field].includes(deptId);
	}

	function userSummary(user: User) {
		const adminLabel = user.tags?.isAdministrator ? 'Administrator' : 'Standard';
		const superLabel = user.tags?.isSuperUser ? 'Superuser' : 'No super access';
		return `${adminLabel} · ${superLabel}`;
	}

	function updateTags(user: User, updater: (tags: UserTags) => UserTags) {
		return { ...user, tags: updater({ ...user.tags }) };
	}

	useEffect(() => {
		Promise.all([
			fetch('/api/admin/users', { credentials: 'include' }).then((r) => r.json() as Promise<UsersResponse>),
			fetch('/api/departments', { credentials: 'include' }).then((r) => r.json() as Promise<DepartmentsResponse>),
		])
			.then(([usersRes, deptsRes]) => {
				if (usersRes?.error) throw new Error(usersRes.error);
				if (deptsRes?.error) throw new Error(deptsRes.error);

				setUsers(usersRes.users ?? []);
				setDepartments(deptsRes.departments ?? []);
			})
			.catch((e) => setError(String(e?.message ?? 'Failed to load')))
			.finally(() => setLoading(false));
	}, []);

	function markDirty(userId: string) {
		setDirty((d) => ({ ...d, [userId]: true }));
		setSuccess((s) => ({ ...s, [userId]: false }));
	}

	function toggleFlag(userId: string, flag: 'isSuperUser' | 'isAdministrator') {
		setUsers((u) =>
			u.map((user) => {
				if (user.id !== userId) return user;
				const updated = updateTags(user, (tags) => ({
					...tags,
					[flag]: !tags?.[flag],
				}));
				markDirty(userId);
				return updated;
			})
		);
	}

	function toggleDeptArray(userId: string, field: 'canView' | 'canModify', deptId: string) {
		setUsers((u) =>
			u.map((user) => {
				if (user.id !== userId) return user;
				const updated = updateTags(user, (tags) => {
					const view: string[] = Array.isArray(tags.canView) ? [...tags.canView] : [];
					const modify: string[] = Array.isArray(tags.canModify) ? [...tags.canModify] : [];

					if (field === 'canView') {
						const idx = view.indexOf(deptId);
						if (idx === -1) {
							view.push(deptId);
						} else {
							view.splice(idx, 1);
							const modifyIdx = modify.indexOf(deptId);
							if (modifyIdx !== -1) modify.splice(modifyIdx, 1);
						}
					} else {
						const idx = modify.indexOf(deptId);
						if (idx === -1) {
							modify.push(deptId);
							if (!view.includes(deptId)) view.push(deptId);
						} else {
							modify.splice(idx, 1);
						}
					}

					return { ...tags, canView: view, canModify: modify };
				});
				markDirty(userId);
				return updated;
			})
		);
	}

	async function saveUser(userId: string) {
		const user = users.find((u) => u.id === userId);
		if (!user) return;
		setSaving((s) => ({ ...s, [userId]: true }));
		setError(null);
		try {
			const res = await fetch(`/api/admin/users/${userId}`, {
				method: 'PUT',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ tags: user.tags }),
			});
			const payload = await res.json();
			if (!res.ok) throw new Error(payload?.error ?? 'Save failed');
			setDirty((d) => ({ ...d, [userId]: false }));
			setSuccess((s) => ({ ...s, [userId]: true }));
			setTimeout(() => setSuccess((s) => ({ ...s, [userId]: false })), 2500);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to save');
		} finally {
			setSaving((s) => ({ ...s, [userId]: false }));
		}
	}

	if (error) return <p className="text-sm text-red-400">{error}</p>;
	if (loading) return <p className="text-sm text-zinc-400">Loading users and departments…</p>;
	if (!loading && users.length === 0) return <p className="text-sm text-zinc-400">No users found.</p>;

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader className="space-y-3 border-b border-zinc-800/70 bg-zinc-950/40">
					<div className="flex flex-wrap items-start justify-between gap-4">
						<div>
							<CardTitle className="text-2xl">User Permissions</CardTitle>
							<p className="mt-2 max-w-3xl text-sm text-zinc-400">
								Use the checkboxes to manage admin access and department visibility. `Can modify` always includes `Can
								view`.
							</p>
						</div>
						<div className="flex flex-wrap gap-2 text-xs text-zinc-300">
							<span className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1">Users: {users.length}</span>
							<span className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1">
								Departments: {departments.length}
							</span>
						</div>
					</div>
				</CardHeader>
				<CardContent className="p-4 sm:p-6">
					<div className="space-y-6">
						{users.map((user) => (
							<div
								key={user.id}
								className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition hover:border-zinc-700"
							>
								<div className="mb-5 flex flex-wrap items-start justify-between gap-4">
									<div>
										<div className="text-xl font-semibold tracking-tight text-zinc-100">
											{user.name ?? 'Unnamed user'}
										</div>
										<div className="mt-1 text-sm text-zinc-400">{user.email}</div>
									</div>
									<div className="flex items-center gap-3">
										<Button
											variant="default"
											size="sm"
											onClick={() => saveUser(user.id)}
											disabled={!dirty[user.id] || saving[user.id]}
										>
											{saving[user.id] ? 'Saving…' : 'Save changes'}
										</Button>
										{success[user.id] && <span className="text-sm text-emerald-400">Saved</span>}
									</div>
								</div>

								<div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-4">
									<label className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-4">
										<input
											type="checkbox"
											checked={!!user.tags?.isAdministrator}
											onChange={() => toggleFlag(user.id, 'isAdministrator')}
											className="h-4 w-4"
										/>
										<div>
											<div className="font-medium text-zinc-100">Administrator</div>
											<div className="text-xs text-zinc-400">Higher-level management access</div>
										</div>
									</label>

									<label className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-4">
										<input
											type="checkbox"
											checked={!!user.tags?.isSuperUser}
											onChange={() => toggleFlag(user.id, 'isSuperUser')}
											className="h-4 w-4"
										/>
										<div>
											<div className="font-medium text-zinc-100">Superuser</div>
											<div className="text-xs text-zinc-400">Full access to admin features</div>
										</div>
									</label>

									<div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
										<div className="mb-3 text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase">Can View</div>
										<div className="grid gap-2 sm:grid-cols-2 2xl:grid-cols-3">
											{departments.map((d) => (
												<label
													key={d.id}
													className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-3"
												>
													<input
														type="checkbox"
														checked={hasDeptAccess(user, 'canView', d.id)}
														onChange={() => toggleDeptArray(user.id, 'canView', d.id)}
														className="h-4 w-4"
													/>
													<span className="text-sm font-medium text-zinc-100">{d.name}</span>
												</label>
											))}
										</div>
									</div>

									<div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
										<div className="mb-3 text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase">
											Can Modify
										</div>
										<div className="grid gap-2 sm:grid-cols-2 2xl:grid-cols-3">
											{departments.map((d) => (
												<label
													key={d.id}
													className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-3"
												>
													<input
														type="checkbox"
														checked={hasDeptAccess(user, 'canModify', d.id)}
														onChange={() => toggleDeptArray(user.id, 'canModify', d.id)}
														className="h-4 w-4"
													/>
													<span className="text-sm font-medium text-zinc-100">{d.name}</span>
												</label>
											))}
										</div>
									</div>
								</div>

								<div className="mt-4 text-sm text-zinc-400">
									{userSummary(user)}
									{dirty[user.id] ? (
										<span className="ml-3 text-amber-400">Unsaved changes</span>
									) : (
										<span className="ml-3 text-zinc-500">Synced</span>
									)}
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
