"use client";

import { useAuth } from '@/context/AuthContext'
import Header from '@/components/Header'
import React, { ReactNode } from 'react'

import { redirect } from 'next/navigation';

const layout = ({ children }: { children: ReactNode }) => {

    const { userData, user } = useAuth();

    if (!user) {
        return redirect('/sign-in')
    };

    if (userData?.role === "COMMON") {
        return redirect('/too-fast')
    };

    return (
        <div className='w-full'>
            <Header />
            {children}
        </div>
    )
}

export default layout