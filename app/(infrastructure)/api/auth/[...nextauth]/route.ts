import { handlers } from "@/auth"

// Referring to the auth.ts we just created
export const { GET, POST } = handlers;

// import NextAuth, { NextAuthOptions } from "next-auth";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// export const authOptions: NextAuthOptions = {
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials?.password) {
//                     throw new Error("Email and password are required");
//                 }

//                 // Find user by email
//                 const user = await prisma.user.findUnique({
//                     where: { email: credentials.email },
//                 });

//                 if (!user) {
//                     throw new Error("No user found with this email");
//                 }

//                 // Compare passwords
//                 const isValid = await bcrypt.compare(credentials.password, user.password);

//                 if (!isValid) {
//                     throw new Error("Invalid password");
//                 }

//                 // Return user object if valid
//                 return { id: user.id, email: user.email, name: user.name };
//             },
//         }),
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
//     session: {
//         strategy: "jwt",
//     },
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.id = user.id;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             session?.user?.id = token.id;
//             return session;
//         },
//     },
//     pages: {
//         signIn: "/presentation/pages/auth/signin", // Custom sign-in page
//     },
// };

// export default NextAuth(authOptions);