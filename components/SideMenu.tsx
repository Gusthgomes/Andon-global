import React from 'react'
import { SheetClose, SheetHeader, SheetTitle } from './ui/sheet'
import Link from 'next/link'
import { HomeIcon, TicketPlus } from 'lucide-react'
import { Button } from './ui/button'

const SideMenu = () => {
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
            </div>
        </>
    )
}

export default SideMenu