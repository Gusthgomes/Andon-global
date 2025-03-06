import React from 'react'

import Image from 'next/image'

const page = () => {
    return (
        <section className='mt-10 flex flex-col items-center justify-center gap-3'>
            <div className='px-5 py-6 text-center flex items-center justify-center gap-3'>
                <p className='text-3xl text-white font-mono font-semibold'>Olá, que bom te ver aqui. Aguarde enquanto preparamos tudo para você!</p>
            </div>

            <Image src="/images/space.svg" alt="space" width={400} height={300} className='object-contain py-2' />
        </section>
    )
}

export default page