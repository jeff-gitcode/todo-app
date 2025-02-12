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