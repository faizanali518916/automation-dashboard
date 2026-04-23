import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

const transformer = {
	date: {
		from: (date: string | null) => (date ? new Date(parseInt(date, 10)) : null),
		to: (date: Date | null) => date?.valueOf().toString() ?? null,
	},
	bigint: {
		from: (value: string | null) => (value ? parseInt(value, 10) : null),
		to: (value: number | null) => value?.toString() ?? null,
	},
};

export type UserTags = {
	dept?: string;
	[key: string]: string | number | boolean | null | undefined;
};

@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar', nullable: true })
	name!: string | null;

	@Column({ type: 'varchar', nullable: true, unique: true })
	email!: string | null;

	@Column({ type: 'varchar', nullable: true, transformer: transformer.date })
	emailVerified!: string | null;

	@Column({ type: 'varchar', nullable: true })
	image!: string | null;

	@Column({ type: 'varchar', nullable: true, select: false })
	password!: string | null;

	@Column({ type: 'jsonb', default: {} })
	tags!: UserTags;

	@OneToMany(() => SessionEntity, (session) => session.user)
	sessions!: SessionEntity[];

	@OneToMany(() => AccountEntity, (account) => account.user)
	accounts!: AccountEntity[];
}

@Entity({ name: 'accounts' })
export class AccountEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'uuid' })
	userId!: string;

	@Column()
	type!: string;

	@Column()
	provider!: string;

	@Column()
	providerAccountId!: string;

	@Column({ type: 'varchar', nullable: true })
	refresh_token!: string | null;

	@Column({ type: 'varchar', nullable: true })
	access_token!: string | null;

	@Column({ nullable: true, type: 'bigint', transformer: transformer.bigint })
	expires_at!: number | null;

	@Column({ type: 'varchar', nullable: true })
	token_type!: string | null;

	@Column({ type: 'varchar', nullable: true })
	scope!: string | null;

	@Column({ type: 'varchar', nullable: true })
	id_token!: string | null;

	@Column({ type: 'varchar', nullable: true })
	session_state!: string | null;

	@ManyToOne(() => UserEntity, (user) => user.accounts, {
		createForeignKeyConstraints: true,
	})
	user!: UserEntity;
}

@Entity({ name: 'sessions' })
export class SessionEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ unique: true })
	sessionToken!: string;

	@Column({ type: 'uuid' })
	userId!: string;

	@Column({ transformer: transformer.date })
	expires!: string;

	@ManyToOne(() => UserEntity, (user) => user.sessions)
	user!: UserEntity;
}

@Entity({ name: 'verification_tokens' })
export class VerificationTokenEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	token!: string;

	@Column()
	identifier!: string;

	@Column({ transformer: transformer.date })
	expires!: string;
}
