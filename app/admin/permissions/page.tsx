import { redirect } from 'next/navigation';
import { getServerAuthSession } from '@/lib/auth';
import { isAdministratorTags } from '@/lib/abac';
import PermissionsManager from '@/components/admin/permissions-manager';

export default async function AdminPermissionsPage() {
	const session = await getServerAuthSession();
	if (!session || !isAdministratorTags(session.user.tags)) {
		redirect('/unauthorized');
	}

	return (
		<main className="mx-auto my-8 max-w-4xl px-4">
			<h1 className="mb-4 text-2xl font-bold">User Permissions</h1>
			<PermissionsManager />
		</main>
	);
}
