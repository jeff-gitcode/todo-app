"use server";

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

type CredentialsType = {
    email: string;
    password: string;
};

export async function login({ email, password }: CredentialsType, callbackUrl: string) {
    try {
        console.log(email, password, callbackUrl);

        // Call signIn with the callbackUrl
        await signIn("credentials", { email, password, redirect: false });

    } catch (error) {
        console.log("************************Login Failed***********************");
        console.log('error', error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: 'Invalid credentials',
                    };
                default:
                    return {
                        message: 'Something went wrong.',
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