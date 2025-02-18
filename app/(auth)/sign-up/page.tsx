"use client";

import React from 'react'
import AuthForm from '@/components/AuthForm'
import { signUpSchema } from '@/lib/validations'
const page = () => {
    return (
        <AuthForm type="SIGN_UP"
            schema={signUpSchema}
            defaultValues={{ email: '', password: '', fullName: '' }}
            onSubmit={() => { }}
        />
    )
}

export default page