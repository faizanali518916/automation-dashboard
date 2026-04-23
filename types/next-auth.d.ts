import type { DefaultSession } from 'next-auth';

import type { UserTags } from '@/lib/db/entities/auth.entities';

declare module 'next-auth' {
	interface Session {
		user: DefaultSession['user'] & {
			id: string;
			tags: UserTags;
		};
	}

	interface User {
		tags?: UserTags;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		tags?: UserTags;
	}
}

export {};
