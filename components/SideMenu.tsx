"use client";

import React from 'react'

import { SheetClose, SheetHeader, SheetTitle } from './ui/sheet'

import Link from 'next/link'

import { HomeIcon, TicketPlus, Ticket } from 'lucide-react'

import { Button } from './ui/button'

import { useAuth } from '@/context/AuthContext'

const SideMenu = () => {

    const { userData, user } = useAuth()

    return (
        <>
            <SheetHeader className='text-left border-b border-solid border-secondary p-5'>
                <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-3 px-5 py-6">
                <SheetClose asChild>
                    <Link href="/">
                        <Button
                            variant="outline"
                            className="w-full items-start justify-start"
                        >
                            <HomeIcon size={18} className="mr-2" />
                            Início
                        </Button>
                    </Link>
                </SheetClose>

                {userData?.role === "DPRO" && (
                    <>
                        <SheetClose asChild>
                            <Link href="/myTickets">
                                <Button
                                    variant="outline"
                                    className="w-full items-start justify-start"
                                >
                                    <Ticket size={18} className="mr-2" />
                                    Meus tickets
                                </Button>
                            </Link>
                        </SheetClose>

                        <SheetClose asChild>
                            <Link href="/newTicket">
                                <Button
                                    variant="outline"
                                    className="w-full items-start justify-start"
                                >
                                    <TicketPlus size={18} className="mr-2" />
                                    Cadastrar Ticket
                                </Button>
                            </Link>
                        </SheetClose>
                    </>
                )}



            </div>
        </>
    )
}

export default SideMenu