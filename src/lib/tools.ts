import { AppDataSource, runDbOperation } from './db/data-source';
import { DepartmentEntity } from './db/entities/department';
import { ToolEntity, ToolType, type ToolPricing } from './db/entities/tool';
import type { UserTags } from './db/entities/user';
import type { ToolTreeNode } from './tool-tree';

function slugify(value: string) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
}

/**
 * Get all tools filtered by user access (department-based)
 * Users can see tools in departments they have canView access to
 */
export async function getToolsByUserTags(userTags?: UserTags): Promise<ToolEntity[]> {
	return runDbOperation(async () => {
		const toolRepository = AppDataSource.getRepository(ToolEntity);

		const query = toolRepository
			.createQueryBuilder('tool')
			.leftJoinAndSelect('tool.department', 'department')
			.orderBy('tool.type', 'ASC')
			.addOrderBy('tool.name', 'ASC');

		if (userTags?.isAdministrator || userTags?.isSuperUser) {
			return query.getMany();
		}

		if (userTags?.canView && userTags.canView.length > 0) {
			query.where('tool.departmentId IS NULL OR tool.departmentId IN (:...departmentIds)', {
				departmentIds: userTags.canView,
			});
		} else if (userTags?.canModify && userTags.canModify.length > 0) {
			query.where('tool.departmentId IS NULL OR tool.departmentId IN (:...departmentIds)', {
				departmentIds: userTags.canModify,
			});
		} else {
			query.where('tool.departmentId IS NULL');
		}

		return query.getMany();
	});
}

/**
 * Get all tools (admin/unrestricted access)
 */
export async function getAllTools(): Promise<ToolEntity[]> {
	return runDbOperation(async () => {
		const toolRepository = AppDataSource.getRepository(ToolEntity);

		return toolRepository
			.createQueryBuilder('tool')
			.leftJoinAndSelect('tool.department', 'department')
			.orderBy('tool.type', 'ASC')
			.addOrderBy('tool.name', 'ASC')
			.getMany();
	});
}

export async function getToolBySlug(slug: string): Promise<ToolEntity | null> {
	return runDbOperation(async () => {
		const toolRepository = AppDataSource.getRepository(ToolEntity);

		return toolRepository
			.createQueryBuilder('tool')
			.leftJoinAndSelect('tool.department', 'department')
			.where('tool.slug = :slug', { slug })
			.getOne();
	});
}

export async function getToolBySlugWithUserCheck(slug: string, userTags?: UserTags): Promise<ToolEntity | null> {
	const tool = await getToolBySlug(slug);

	if (!tool) return null;

	if (tool.departmentId && !userTags?.isAdministrator && !userTags?.isSuperUser) {
		if (!userTags?.canView?.includes(tool.departmentId)) {
			return null;
		}
	}

	return tool;
}

export async function buildToolTree(userTags?: UserTags): Promise<ToolTreeNode[]> {
	const tools = await getToolsByUserTags(userTags);
	const editableDepartments = await getEditableDepartments(userTags);
	const groupedByType = new Map<string, ToolTreeNode[]>();

	for (const tool of tools) {
		const toolTypeKey = tool.type;
		const nodes = groupedByType.get(toolTypeKey) ?? [];
		const departmentName = tool.department?.name ?? 'Ungrouped';
		let departmentNode = nodes.find((node) => node.name === departmentName);

		if (!departmentNode) {
			departmentNode = {
				id: `${toolTypeKey}-${slugify(departmentName)}`,
				name: departmentName,
				nodeType: 'department',
				toolType: tool.type,
				departmentId: tool.departmentId ?? null,
				canCreateTool: canModifyDepartment(userTags, tool.departmentId),
				subcategories: [],
			};
			nodes.push(departmentNode);
		}

		departmentNode.subcategories ??= [];
		departmentNode.subcategories.push({
			id: tool.id,
			slug: tool.slug,
			name: tool.name,
			nodeType: 'tool',
			description: tool.description,
			docPath: `/docs/${tool.slug}`,
			externalLinks: tool.links,
		});

		groupedByType.set(toolTypeKey, nodes);
	}

	for (const department of editableDepartments) {
		for (const toolType of [ToolType.INTERNAL, ToolType.EXTERNAL]) {
			const nodes = groupedByType.get(toolType) ?? [];
			const nodeId = `${toolType}-${slugify(department.name)}`;
			if (!nodes.some((node) => node.id === nodeId)) {
				nodes.push({
					id: nodeId,
					name: department.name,
					nodeType: 'department',
					toolType,
					departmentId: department.id,
					canCreateTool: true,
					subcategories: [],
				});
				groupedByType.set(toolType, nodes);
			}
		}
	}

	return [
		{
			id: 'internal',
			name: 'Internal',
			nodeType: 'root',
			subcategories: groupedByType.get('internal') ?? [],
		},
		{
			id: 'external',
			name: 'External',
			nodeType: 'root',
			subcategories: groupedByType.get('external') ?? [],
		},
	];
}

export function canModifyDepartment(userTags: UserTags | undefined, departmentId: string | null | undefined) {
	if (!departmentId) return false;
	return Boolean(userTags?.isAdministrator || userTags?.isSuperUser || userTags?.canModify?.includes(departmentId));
}

export async function getEditableDepartments(userTags?: UserTags): Promise<DepartmentEntity[]> {
	return runDbOperation(async () => {
		const departmentRepository = AppDataSource.getRepository(DepartmentEntity);
		const query = departmentRepository.createQueryBuilder('department').orderBy('department.name', 'ASC');

		if (userTags?.isAdministrator || userTags?.isSuperUser) {
			return query.getMany();
		}

		if (!userTags?.canModify?.length) {
			return [];
		}

		return query.where('department.id IN (:...departmentIds)', { departmentIds: userTags.canModify }).getMany();
	});
}

/**
 * Get tools by specific department
 */
export async function getToolsByDepartment(departmentId: string): Promise<ToolEntity[]> {
	return runDbOperation(async () => {
		const toolRepository = AppDataSource.getRepository(ToolEntity);

		return toolRepository
			.createQueryBuilder('tool')
			.leftJoinAndSelect('tool.department', 'department')
			.where('tool.departmentId = :departmentId OR tool.departmentId IS NULL', { departmentId })
			.orderBy('tool.type', 'ASC')
			.addOrderBy('tool.name', 'ASC')
			.getMany();
	});
}

/**
 * Get single tool by ID
 */
export async function getToolById(toolId: string): Promise<ToolEntity | null> {
	return runDbOperation(async () => {
		const toolRepository = AppDataSource.getRepository(ToolEntity);

		return toolRepository
			.createQueryBuilder('tool')
			.leftJoinAndSelect('tool.department', 'department')
			.where('tool.id = :toolId', { toolId })
			.getOne();
	});
}

/**
 * Get tool by name/id with user access check
 */
export async function getToolByIdWithUserCheck(toolId: string, userTags?: UserTags): Promise<ToolEntity | null> {
	const tool = await getToolById(toolId);

	if (!tool) return null;

	// Check if user has access to this tool's department
	if (tool.departmentId) {
		if (!userTags?.canView?.includes(tool.departmentId)) {
			return null;
		}
	}

	return tool;
}

/**
 * Create new tool (admin only)
 */
export async function createTool(data: Partial<ToolEntity>): Promise<ToolEntity> {
	return runDbOperation(async () => {
		const toolRepository = AppDataSource.getRepository(ToolEntity);
		const tool = toolRepository.create(data);
		return toolRepository.save(tool);
	});
}

export async function createToolForDepartment(data: {
	name: string;
	description: string | null;
	type: ToolType;
	departmentId: string;
	links?: string[];
	pricing?: ToolPricing | null;
}): Promise<ToolEntity> {
	return runDbOperation(async () => {
		const toolRepository = AppDataSource.getRepository(ToolEntity);
		const baseSlug = slugify(data.name);
		let slug = baseSlug;
		let suffix = 2;

		while (await toolRepository.findOne({ where: { slug } })) {
			slug = `${baseSlug}-${suffix}`;
			suffix += 1;
		}

		const tool = toolRepository.create({
			name: data.name,
			slug,
			description: data.description,
			type: data.type,
			departmentId: data.departmentId,
			links: data.links ?? [],
			pricing: data.pricing ?? null,
			documentation: [],
		});

		await toolRepository.save(tool);

		const saved = await toolRepository
			.createQueryBuilder('tool')
			.leftJoinAndSelect('tool.department', 'department')
			.where('tool.id = :toolId', { toolId: tool.id })
			.getOne();

		return saved ?? tool;
	});
}

/**
 * Update tool (admin only)
 */
export async function updateTool(toolId: string, data: Partial<ToolEntity>): Promise<ToolEntity> {
	return runDbOperation(async () => {
		const toolRepository = AppDataSource.getRepository(ToolEntity);
		await toolRepository.update(toolId, data);
		const updated = await toolRepository
			.createQueryBuilder('tool')
			.leftJoinAndSelect('tool.department', 'department')
			.where('tool.id = :toolId', { toolId })
			.getOne();
		if (!updated) throw new Error('Tool not found after update');
		return updated;
	});
}

/**
 * Delete tool (admin only)
 */
export async function deleteTool(toolId: string): Promise<void> {
	return runDbOperation(async () => {
		const toolRepository = AppDataSource.getRepository(ToolEntity);
		await toolRepository.delete(toolId);
	});
}

/**
 * Update tool documentation blocks
 */
export async function updateToolDocumentation(
	toolId: string,
	documentation: Array<{ title: string; description: string; bullets: string[] }>
): Promise<ToolEntity> {
	return updateTool(toolId, { documentation });
}
