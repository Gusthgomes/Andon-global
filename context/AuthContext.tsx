"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/configs/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface AuthContextType {
    user: User | null;
    userData: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const userData = useQuery(
        api.users.getUserByUid,
        user ? { uid: user.uid } : "skip"
    );

    return (
        <AuthContext.Provider value={{ user, userData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};
