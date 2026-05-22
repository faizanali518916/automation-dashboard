import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type UserTags = {
	isAdministrator?: boolean;
	isSuperUser?: boolean;
	canModify?: string[];
	canView?: string[];
	[key: string]: unknown;
};

@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar', nullable: true })
	name!: string | null;

	@Column({ type: 'varchar', unique: true })
	email!: string;

	@Column({ type: 'varchar', select: false })
	password!: string;

	@Column({ type: 'boolean', default: false })
	emailVerified!: boolean;

	@Column({ type: 'jsonb', default: {} })
	tags!: UserTags;

	@CreateDateColumn({ type: 'timestamptz' })
	createdAt!: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updatedAt!: Date;
}
