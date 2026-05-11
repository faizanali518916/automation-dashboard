import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export type UserTags = {
	dept?: string;
	[key: string]: string | number | boolean | null | undefined;
};

export enum TokenType {
	EMAIL_VERIFICATION = 'email_verification',
	REFRESH = 'refresh',
}

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
}

@Entity({ name: 'tokens' })
@Index(['tokenHash', 'type'], { unique: true })
export class TokenEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'enum', enum: TokenType })
	type!: TokenType;

	@Column({ type: 'varchar' })
	tokenHash!: string;

	@Column({ type: 'uuid' })
	userId!: string;

	@Column({ type: 'timestamptz' })
	expiresAt!: Date;

	@Column({ type: 'timestamptz', nullable: true })
	revokedAt!: Date | null;

	@ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
	user!: UserEntity;
}
