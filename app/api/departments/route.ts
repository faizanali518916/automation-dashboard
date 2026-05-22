import { NextResponse } from 'next/server';
import { AppDataSource, runDbOperation } from '@/lib/db/data-source';
import { DepartmentEntity } from '@/lib/db/entities/department';

export async function GET() {
	try {
		const rows = await runDbOperation(async () => {
			const repo = AppDataSource.getRepository(DepartmentEntity);
			return repo.find({ order: { name: 'ASC' } });
		});
		const names = rows.map((r) => ({ id: r.id, name: r.name }));
		return NextResponse.json({ departments: names });
	} catch {
		return NextResponse.json({ error: 'Unable to load departments' }, { status: 500 });
	}
}
