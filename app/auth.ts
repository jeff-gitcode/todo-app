import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { prisma } from './infrastructure/database/prisma';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email },
                })

                if (!user) {
                    throw new Error("No user found")
                }

                if (user.password !== credentials?.password) {
                    throw new Error("Invalid password")
                }

                return { id: user.id, email: user.email }
                // if (parsedCredentials.success) {
                //     const { email, password } = parsedCredentials.data;
                //     const user = await getUser(email);
                //     if (!user) return null;
                //     const passwordsMatch = await bcrypt.compare(password, user.password);

                //     if (passwordsMatch) return user;
                // }

                // console.log('Invalid credentials');
                // return null;
            },
        }),
    ],
});