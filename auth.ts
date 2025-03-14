import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./app/(infrastructure)/database/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

export const { auth, signIn, signOut, handlers } = NextAuth({
  // ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email as string },
        });

        if (!user) {
          console.log("User not found");
          return null;
        }

        const { password } = credentials;
        const passwordsMatch = await bcrypt.compare(
          password as string,
          user.password,
        );

        console.log(passwordsMatch);

        if (!passwordsMatch) {
          console.log(user.password, credentials?.password);
          console.log("Invalid credentials - paassword");
          return null;
        }

        console.log("user", user);
        return user;
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
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      const newSession = { ...session, ...token };

      return newSession;
    },
  },
});
