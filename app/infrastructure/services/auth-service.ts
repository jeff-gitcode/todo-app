"use server";

import { signIn, signOut } from '@/app/infrastructure/utils/auth';

type CredentialsType = {
    email: string;
    password: string;
};

export async function login({ email, password }: CredentialsType, callbackUrl: string) {
    try {
        // Call signIn with the callbackUrl
        await signIn("credentials", { email, password, redirectTo: callbackUrl });
    } catch (error) {
        console.log("************************Login***********************");
        // if (error instanceof AuthError) {
        //     switch (error.type) {
        //         case 'CredentialsSignin':
        //             return {
        //                 message: 'Invalid credentials',
        //             };
        //         default:
        //             return {
        //                 message: 'Something went wrong.',
        //             };
        //     }
        throw error;
    }
}

export async function logout() {
    console.log("************************Logout***********************");
    await signOut();
}