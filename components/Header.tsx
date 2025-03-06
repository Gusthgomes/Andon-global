"use client";

import React from "react";

import { auth } from "@/configs/firebaseConfig";
import { signOut } from "firebase/auth";

import { redirect } from "next/navigation";
import Link from "next/link";

import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

import { LogOut, MenuIcon, Ticket } from "lucide-react";

import SideMenu from "./SideMenu";

import { ThemeToggle } from "./ui/theme/theme-toggle";


import { useAuth } from "../context/AuthContext";

const Header = () => {

    const { user, userData } = useAuth();

    const signOutUser = async () => {
        try {
            await signOut(auth);
            redirect("/sign-in");
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
                        Olá {user?.email ?? "Visitante"}{" "}
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
