import 'reflect-metadata';

import { DataSource, type DataSourceOptions } from 'typeorm';

import { TokenEntity, UserEntity } from '@/lib/db/entities/auth.entities';

export const typeormConfig: DataSourceOptions = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: process.env.NODE_ENV === 'development',
	entities: [UserEntity, TokenEntity],
	logging: false,
};

export const AppDataSource = new DataSource(typeormConfig);

// Synchronization to prevent concurrent initialization
let initializationPromise: Promise<void> | null = null;

export async function ensureAppDataSource() {
	if (AppDataSource.isInitialized) {
		return AppDataSource;
	}

	// If initialization is already in progress, wait for it
	if (initializationPromise) {
		await initializationPromise;
		return AppDataSource;
	}

	// Start initialization
	initializationPromise = AppDataSource.initialize()
		.then(() => {
			// Initialization succeeded
		})
		.catch((error) => {
			// Reset on failure so next call can retry
			initializationPromise = null;
			throw error;
		});

	await initializationPromise;
	return AppDataSource;
}
