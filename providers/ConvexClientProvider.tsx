"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/configs/firebaseConfig";

type Props = {
    children: React.ReactNode;
};

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "";

const convex = new ConvexReactClient(CONVEX_URL);

const ConvexClientProvider = ({ children }: Props) => {
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                convex.setAuth(async () => await user.getIdToken());
            } else {
                convex.clearAuth();
            }
        });

        return () => unsubscribe();
    }, []);

    return <ConvexProvider client={convex}>{children}</ConvexProvider>;
};

export default ConvexClientProvider;
