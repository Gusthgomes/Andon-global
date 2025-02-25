"use client";

import React from 'react'
import AuthForm from '@/components/AuthForm'
import { signInSchema } from '@/lib/validations'
import { loginUser } from '@/backend/auth/auth';

const page = () => {
    return (
        <AuthForm type="SIGN_IN"
            schema={signInSchema}
            defaultValues={{ email: '', password: '' }}
            onSubmit={loginUser}
        />
    )
}

export default page