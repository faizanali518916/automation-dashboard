import type { UserTags } from './db/entities/user';

export type RequiredTagRule = {
	key: string;
	min?: number;
	value?: string | number | boolean;
};

export function isSuperUserTags(userTags: UserTags | undefined): boolean {
	return userTags?.role === 'SUPERUSER' || userTags?.isSuperUser === true || userTags?.isAdministrator === true;
}

export function isAdministratorTags(userTags: UserTags | undefined): boolean {
	return userTags?.isAdministrator === true;
}

export function hasRequiredTags(userTags: UserTags | undefined, requiredTags: RequiredTagRule[]): boolean {
	if (!requiredTags.length) return true;
	if (!userTags) return false;

	if (isSuperUserTags(userTags)) {
		return true;
	}

	return requiredTags.every((rule) => {
		const actual = userTags[rule.key];

		if (rule.value !== undefined) {
			return actual === rule.value;
		}

		if (rule.min !== undefined) {
			return typeof actual === 'number' && actual >= rule.min;
		}

		return actual !== undefined && actual !== null;
	});
}
