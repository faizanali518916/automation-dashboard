import 'reflect-metadata';

import { DataSource, type DataSourceOptions } from 'typeorm';

import { TokenEntity, UserEntity } from '@/lib/db/entities/auth.entities';

export const typeormConfig: DataSourceOptions = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: process.env.NODE_ENV === 'development',
	entities: [UserEntity, TokenEntity],
};

export const AppDataSource = new DataSource(typeormConfig);
