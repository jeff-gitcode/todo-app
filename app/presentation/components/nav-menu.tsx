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

export default function NavMenu() {
    const { data: session } = useSession();
    console.log("************************NavMenu***********************");
    console.log(session);

    return (
        <NavigationMenu className="border-b p-4">
            <NavigationMenuList className="gap-4">
                {session ? (
                    <>
                        <NavigationMenuItem>
                            <Link href="/presentation/pages/protected/todos" legacyBehavior passHref>
                                <NavigationMenuLink className="hover:underline">Home</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button variant="ghost" onClick={() => signOut()}>
                                Sign Out
                            </Button>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Avatar>
                                <AvatarImage src={session.user?.image || ""} />
                                <AvatarFallback>
                                    {session.user?.name?.charAt(0) || "U"}
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