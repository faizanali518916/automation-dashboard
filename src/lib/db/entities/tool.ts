import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { DepartmentEntity } from './department';

export enum ToolType {
	INTERNAL = 'internal',
	EXTERNAL = 'external',
}

export type ToolDocumentationBlock = {
	title: string;
	description: string;
	bullets: string[];
};

export type ToolLinks = string[];

export type ToolPricing = {
	amount?: number;
	period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
	currency?: string;
	perUser?: boolean;
};

@Entity({ name: 'tools' })
export class ToolEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar', unique: true })
	slug!: string;

	@Column({ type: 'varchar', unique: true })
	name!: string;

	@Column({ type: 'text', nullable: true })
	description?: string | null;

	@Column({ type: 'enum', enum: ToolType })
	type!: ToolType;

	@Column({ type: 'uuid', nullable: true })
	departmentId?: string | null;

	@ManyToOne(() => DepartmentEntity, { onDelete: 'SET NULL', nullable: true })
	department?: DepartmentEntity;

	@Column({ type: 'jsonb', default: [] })
	documentation!: ToolDocumentationBlock[];

	@Column({ type: 'jsonb', default: [] })
	links!: ToolLinks;

	@Column({ type: 'jsonb', nullable: true })
	pricing?: ToolPricing | null;

	@CreateDateColumn({ type: 'timestamptz' })
	createdAt!: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updatedAt!: Date;
}
