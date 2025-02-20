"use client";

import React from 'react'
import AuthForm from '@/components/AuthForm'
import { signUpSchema } from '@/lib/validations'
import { registerUser } from '@/backend/auth/auth';
const page = () => {
    return (
        <AuthForm type="SIGN_UP"
            schema={signUpSchema}
            defaultValues={{ email: '', password: '', fullName: '' }}
            onSubmit={registerUser}
        />
    )
}

export default page