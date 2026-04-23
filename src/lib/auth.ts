import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { TypeORMAdapter } from '@auth/typeorm-adapter';
import bcrypt from 'bcryptjs';

import { AppDataSource, typeormConfig } from '@/lib/db/data-source';
import {
	AccountEntity,
	SessionEntity,
	UserEntity,
	VerificationTokenEntity,
	type UserTags,
} from '@/lib/db/entities/auth.entities';

type DbUserWithPassword = UserEntity & { password: string | null };

export const authOptions: NextAuthOptions = {
	adapter: TypeORMAdapter(typeormConfig, {
		entities: {
			UserEntity,
			AccountEntity,
			SessionEntity,
			VerificationTokenEntity,
		},
	}),
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/login',
	},
	providers: [
		CredentialsProvider({
			name: 'Email and Password',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					return null;
				}

				if (!AppDataSource.isInitialized) {
					await AppDataSource.initialize();
				}

				const user = await AppDataSource.getRepository(UserEntity)
					.createQueryBuilder('user')
					.addSelect('user.password')
					.where('user.email = :email', { email: credentials.email })
					.getOne();

				const userWithPassword = user as DbUserWithPassword | null;

				if (!userWithPassword?.password) {
					return null;
				}

				const isPasswordValid = await bcrypt.compare(credentials.password, userWithPassword.password);

				if (!isPasswordValid) {
					return null;
				}

				return {
					id: userWithPassword.id,
					email: userWithPassword.email,
					name: userWithPassword.name,
					image: userWithPassword.image,
					tags: userWithPassword.tags,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.tags = (user as { tags?: UserTags }).tags ?? {};
			}

			if (!token.tags && token.sub) {
				if (!AppDataSource.isInitialized) {
					await AppDataSource.initialize();
				}

				const dbUser = await AppDataSource.getRepository(UserEntity).findOne({
					where: { id: token.sub },
				});

				token.tags = dbUser?.tags ?? {};
			}

			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.sub ?? '';
				session.user.tags = (token.tags as UserTags | undefined) ?? {};
			}

			return session;
		},
	},
	secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
};
