import Image from 'next/image'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <main className='auth-container'>
            <section className='auth-form'>
                <div className='auth-box'>
                    <div className='flex flex-row gap-3'>
                        <Image src="/images/globe-world.gif" alt="world rotation" width={37} height={37} className='rounded-full shadow-md' />

                        <h1 className='text-2xl text-white font-semibold'>Andon</h1>
                    </div>

                    <div>
                        {children}
                    </div>
                </div>
            </section>

            <section className='auth-illustration'>
                <Image src="/images/header.png"
                    alt="ilustração de autenticação"
                    width={1000}
                    height={1000}
                    priority
                    className='size-full object-cover'
                />
            </section>
        </main>
    )
}

export default layout