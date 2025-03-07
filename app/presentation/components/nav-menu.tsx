'use client';

// src/presentation/components/NavigationMenu.tsx
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export default function NavMenu() {
    const { data: session, status } = useSession();
    
    console.log("************************NavMenu***********************");
    console.log(session);

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false })
            console.log("************************NavMenu***********************");
            console.log("Sign Out");
        } catch (err) {
            console.log("************************NavMenu***********************");
            console.log(err);
            if (isRedirectError(err)) {
                console.error(err);
                throw err;
            }
        } finally {
            redirect("/");
        }
    };

    return (
        <NavigationMenu className="border-b p-4">
            <NavigationMenuList className="gap-4">
                {status === 'authenticated' ? (
                    <>
                        <NavigationMenuItem>
                            <Link href="/presentation/pages/protected/todos" legacyBehavior passHref>
                                <NavigationMenuLink className="hover:underline">Home</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button variant="ghost" onClick={handleSignOut}>
                                Sign Out
                            </Button>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Avatar>
                                <AvatarImage src={session.user?.name || ""} />
                                <AvatarFallback>
                                    {session.user?.name || "U"}
                                </AvatarFallback>
                            </Avatar>
                        </NavigationMenuItem>
                    </>
                ) : (
                    <NavigationMenuItem>
                        <Link href={`/presentation/pages/auth/signin`} passHref>
                            <NavigationMenuLink className="hover:underline">
                                Sign In
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                )}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
