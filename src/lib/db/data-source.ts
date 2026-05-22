import 'reflect-metadata';

import '../load-env';

import { DataSource, type DataSourceOptions } from 'typeorm';

import { TokenEntity } from './entities/token';
import { UserEntity } from './entities/user';
import { DepartmentEntity } from './entities/department';
import { ToolEntity } from './entities/tool';

export const typeormConfig: DataSourceOptions = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: process.env.NODE_ENV === 'development',
	entities: [UserEntity, TokenEntity, DepartmentEntity, ToolEntity],
	logging: false,
};

export const AppDataSource = new DataSource(typeormConfig);

// Synchronization to prevent concurrent initialization
let initializationPromise: Promise<void> | null = null;
let operationQueue: Promise<void> = Promise.resolve();

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

export async function runDbOperation<T>(operation: () => Promise<T>): Promise<T> {
	const run = operationQueue.then(async () => {
		await ensureAppDataSource();
		return operation();
	});

	operationQueue = run.then(
		() => undefined,
		() => undefined
	);

	return run;
}
