import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { prisma } from "../database/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
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
            },
        })
    ],
    pages: {
        signIn: "/presentation/pages/auth/signin",
    },
    session: {
        strategy: "jwt", // Required for Credentials provider
        // maxAge: 30 * 24 * 60 * 60, // 30 DAYS
        maxAge: 3000, // 5 MIN
    },
})

