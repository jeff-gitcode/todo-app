'use client';

// src/presentation/pages/auth/signin.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SignInFormValues, signInSchema } from "@/app/presentation/validation/auth-schema";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { FormEvent } from "react";
import { login } from "@/app/(infrastructure)/services/auth-service";

export default function SignInForm() {
    const form = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: SignInFormValues) => {
        // "use server";
        // const result = await signIn("credentials", {
        //     email: data.email,
        //     password: data.password,
        //     redirectTo: "/",
        // });

        try {
            // const result = await signIn("credentials", {
            //     email: data.email,
            //     password: data.password,
            //     redirect: false,
            // });

            const result = await login({ email: data.email, password: data.password }, "/");

            if (result?.error) {
                console.log("************************SignInForm***********************");
                console.log(result.error);
                redirect("/presentation/pages/auth/signup");
            } else {
                console.log("************************SignInForm***********************");
                console.log("Login successful");
                redirect("/");
            }


            // if (result?.ok) {
            //     console.log("************************SignInForm***********************");
            //     console.log("Login successful");
            //     redirect("/");
            //     // router.push(`/?refreshId=${new Date().getTime()}`);
            // }

        } catch (error) {
            if (isRedirectError(error)) {
                console.error(error);
                throw error;
            }
            console.log("************************SignInForm***********************");
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
        finally {
            console.log("************************SignInForm Finally***********************");
            redirect("/");
        }


        // if (result) {
        //     alert(result.error);
        // } else {
        //     router.push("/presentation/pages/todos");
        // }
    };

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        form.handleSubmit(onSubmit)();
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center">Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Sign In
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
