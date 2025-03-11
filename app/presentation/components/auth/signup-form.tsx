// 'use client';

// src/presentation/pages/auth/signin.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  SignUpFormValues,
  signUpSchema,
} from "@/app/presentation/validation/auth-schema";
import { register } from "@/app/(infrastructure)/services/auth-service";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { FormEvent } from "react";

export default function SignUpForm() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const result = await register(data);

      if (result?.error) {
        console.log(
          "************************SignUpForm***********************",
        );
        console.log(result.error);
      }

      if (result?.success) {
        console.log(
          "************************SignUpForm***********************",
        );
        console.log("Registration successful");
        redirect("/presentation/pages/auth/signin");
      }
    } catch (error) {
      if (isRedirectError(error)) {
        console.error(error);
        throw error;
      }
      console.log("************************SignInForm***********************");
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return {
              error: "Invalid credentials",
            };
          default:
            return {
              error: "Something went wrong.",
            };
        }
        throw error;
      }
    } finally {
      console.log(
        "************************SignInForm Finally***********************",
      );
      redirect("/");
    }
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    form.handleSubmit(onSubmit)();
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Confirmation</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password Confirmation"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
