import type { UserTags } from '@/lib/db/entities/auth.entities';

export type RequiredTagRule = {
	key: string;
	value?: string | number | boolean;
	min?: number;
};

export function hasRequiredTags(userTags: UserTags | undefined, requiredTags: RequiredTagRule[]): boolean {
	if (!requiredTags.length) return true;
	if (!userTags) return false;

	if (userTags.dept === 'Management') {
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
