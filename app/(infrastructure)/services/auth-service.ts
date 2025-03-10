"use client";

import { AuthError } from 'next-auth';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { signIn, signOut } from 'next-auth/react';

import { signUpSchema } from '@/app/presentation/validation/auth-schema';
import { prisma } from '@/app/(infrastructure)/database/prisma';

export type CredentialsType = {
    email: string;
    password: string;
};

export async function login({ email, password }: CredentialsType, callbackUrl: string) {
    try {
        console.log(email, password, callbackUrl);

        // Call signIn with the callbackUrl
        const result = await signIn("credentials", { email, password, redirect: false });
        console.log("************************Login function***********************");
        console.log(result);

        return { ok: true };
        // console.log("************************Login function***********************");
        // console.log(result);
        // return result;

    } catch (error) {
        console.log("************************Login Failed***********************");
        console.log('error', error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        error: 'Invalid credentials',
                    };
                default:
                    return {
                        error: 'Something went wrong.',
                    };
            }
            throw error;
        }
    }
}

export async function logout() {
    console.log("************************Logout***********************");
    await signOut();
}

export const register = async (data: z.infer<typeof signUpSchema>) => {
    try {
        // Validate the input data
        const validatedData = signUpSchema.parse(data);

        //  If the data is invalid, return an error
        if (!validatedData) {
            return { error: "Invalid input data" };
        }

        //  Destructure the validated data
        const { email, name, password, passwordConfirmation } = validatedData;

        // Check if passwords match
        if (password !== passwordConfirmation) {
            return { error: "Passwords do not match" };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check to see if user already exists
        const userExists = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        // If the user exists, return an error
        if (userExists) {
            return { error: "Email already is in use. Please try another one." };
        }

        const lowerCaseEmail = email.toLowerCase();

        // Create the user
        await prisma.user.create({
            data: {
                email: lowerCaseEmail,
                name,
                password: hashedPassword,
            },
        });

        // Generate Verification Token
        // const verificationToken = await generateVerificationToken(email);

        // await sendVerificationEmail(lowerCaseEmail, verificationToken.token);

        return { success: "Email Verification was sent" };
    } catch (error) {
        // Handle the error, specifically check for a 503 error
        console.error("Database error:", error);

        if ((error as { code: string }).code === "ETIMEDOUT") {
            return {
                error: "Unable to connect to the database. Please try again later.",
            };
        } else if ((error as { code: string }).code === "503") {
            return {
                error: "Service temporarily unavailable. Please try again later.",
            };
        } else {
            return { error: "An unexpected error occurred. Please try again later." };
        }
    }
};

