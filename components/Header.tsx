"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/configs/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut, MenuIcon, Ticket } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./SideMenu";

import { ThemeToggle } from "./ui/theme/theme-toggle";
import Link from "next/link";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Header = () => {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userUid, setUserUid] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push("/sign-in");
            } else {
                setUserEmail(user.email);
                setUserUid(user.uid);
            }
        });

        return () => unsubscribe();
    }, [router]);



    const userData = useQuery(
        api.users.getUserByUid,
        userUid ? { uid: userUid } : "skip"
    );


    const signOutUser = async () => {
        try {
            await signOut(auth);
            router.push("/sign-in");
            return { success: true };
        } catch (error: string | any) {
            return { success: false, message: error.message };
        }
    };

    return (
        <Card>
            <CardContent className="p-5 justify-between flex flex-row  items-center">
                <div className="flex items-center gap-3">
                    <Link href="/">
                        <Ticket size={30} className="text-orange-600" />
                    </Link>
                    <h1 className="font-bold text-xl font-mono">
                        Tickets AMF
                    </h1>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <p className="text-md font-semibold">
                        Olá {userEmail}{" "}
                        {userData === undefined
                            ? "Carregando..."
                            : userData
                                ? userData.role ?? "Sem papel definido"
                                : "Usuário não encontrado"}
                    </p>



                    <ThemeToggle />

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon">
                                <MenuIcon size={16} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="p-0">
                            <SideMenu />
                        </SheetContent>
                    </Sheet>
                    <Button size="icon" onClick={signOutUser} className="flex items-center justify-center">
                        <LogOut size={20} />
                    </Button>
                </div>
            </CardContent>



        </Card>
    );
};

export default Header;
