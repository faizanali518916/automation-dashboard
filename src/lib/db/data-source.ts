import 'reflect-metadata';

import { DataSource, type DataSourceOptions } from 'typeorm';

import { AccountEntity, SessionEntity, UserEntity, VerificationTokenEntity } from '@/lib/db/entities/auth.entities';

export const typeormConfig: DataSourceOptions = {
	type: 'postgres',
	url: process.env.NEXT_PUBLIC_DATABASE_URL,
	logging: process.env.NEXT_PUBLIC_NODE_ENV === 'development',
	synchronize: process.env.NEXT_PUBLIC_NODE_ENV !== 'production',
	entities: [UserEntity, AccountEntity, SessionEntity, VerificationTokenEntity],
};

export const AppDataSource = new DataSource(typeormConfig);
