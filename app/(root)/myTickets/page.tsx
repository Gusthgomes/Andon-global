import MyTickets from '@/components/MyTickets'
import React from 'react'

export const metadata = {
    title: "Meus tickets",
}

const page = () => {
    return (
        <div className="px-5 py-6">
            <h1 className="text-2xl font-bold text-center mb-4">Meus tickets</h1>

            <MyTickets />
        </div>
    )
}

export default page