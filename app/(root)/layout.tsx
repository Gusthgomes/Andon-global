import { AuthProvider } from '@/components/context/AuthContext'
import Header from '@/components/Header'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='w-full'>
            <AuthProvider>
                <Header />
                {children}
            </AuthProvider>
        </div>
    )
}

export default layout