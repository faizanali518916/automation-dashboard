export type ToolTreeNode = {
	id: string;
	slug?: string;
	name: string;
	nodeType?: 'root' | 'department' | 'tool';
	toolType?: 'internal' | 'external';
	departmentId?: string | null;
	canCreateTool?: boolean;
	description?: string | null;
	docPath?: string;
	externalLinks?: string[];
	subcategories?: ToolTreeNode[];
};
