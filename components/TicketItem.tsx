"use client";

import React from 'react'

import { TicketItemProps } from '@/types'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Button } from './ui/button';

import { Check, Trash } from 'lucide-react';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { usePathname } from "next/navigation";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { useAuth } from "@/context/AuthContext";

const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {

    const pathname = usePathname();
    const { user } = useAuth();
    const deleteTicket = useMutation(api.tickets.deleteTicketById);

    const handleDelete = async () => {
        if (confirm("Tem certeza que deseja excluir este ticket?")) {
            try {
                // @ts-ignore
                await deleteTicket({ ticketId: ticket._id, userId: user?.uid });
                alert("Ticket deletado com sucesso!");
            } catch (error: string | any) {
                alert(error.message);
            }
        }
    };

    return (
        <>
            <Card className="relative font-semibold w-full p-1 border-2 rounded-md">
                <CardHeader className='p-2'>
                    <CardTitle>{ticket.number}</CardTitle>

                    <CardDescription
                        className={`text-sm ${ticket.motivo === "Kanban zerado" ? "text-yellow-700" : ""}`}
                    >
                        {ticket.motivo}
                    </CardDescription>
                </CardHeader>
                <Separator className='border-black mb-2' />
                <CardContent>
                    <div className="flex flex-col gap-2 py-1">
                        <div className="relative flex">
                            <Badge
                                variant={ticket.status === "Finalizado" ? "secondary" : "default"}
                                className="items-center justify-center w-32 mt-1"
                            >
                                {ticket.status}
                            </Badge>
                            {ticket.status === "Finalizado" && (
                                <Check size={20} className="text-green-500 absolute top-1 left-1 z-50" />
                            )}
                        </div>
                        <p className="font-semibold text-sm">Area: {ticket.area}</p>
                        <p className="font-semibold text-sm">Posto: {ticket.posto}</p>
                        <p className="font-semibold text-sm">Modelo: {ticket.line}</p>
                        <p className="font-semibold text-sm">{ticket.kit}</p>
                        <p className="font-semibold text-sm">
                            Data: {format(ticket.createdAt, "dd/MM/yyyy", { locale: ptBR })}
                        </p>
                        <p className="font-semibold text-sm">
                            Aberto ás: {format(ticket.createdAt, "HH:mm", { locale: ptBR })}
                        </p>
                    </div>

                    <Separator className="my-1" />

                    <div className="flex flex-col items-start justify-start gap-2">
                        {ticket.ticketItem.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center gap-4 py-1"
                            >
                                <p className="font-semibold text-xs">Código: {item.item}</p>
                                <p className="font-semibold text-xs">Qntd: {item.quantity}</p>
                                <p className="font-semibold text-xs truncate">
                                    Desc: {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>

                <div className="flex items-center gap-2">
                    {pathname === "/myTickets" && (
                        <Button size="icon" className='absolute top-2 right-2' onClick={handleDelete}>
                            <Trash size={20} />
                        </Button>
                    )}
                </div>
            </Card>
        </>
    )
}

export default TicketItem