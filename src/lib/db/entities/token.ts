import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from './user';

export enum TokenType {
	EMAIL_VERIFICATION = 'email_verification',
	REFRESH = 'refresh',
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
