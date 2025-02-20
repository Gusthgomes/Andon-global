"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/configs/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const Header = () => {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push("/sign-in");
            } else {
                setUserEmail(user.email);
            }
        });

        return () => unsubscribe();
    }, [router]);

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
        <div className="flex flex-row items-center justify-between px-2 gap-2">
            {userEmail ? <p>Bem-vindo, {userEmail}</p> : <p>Carregando...</p>}

            <Button size="icon" onClick={signOutUser} className="flex items-center justify-center mt-3">
                <LogOut size={20} />
            </Button>
        </div>
    );
};

export default Header;
