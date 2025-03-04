"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/context/AuthContext";
import TicketItem from "./TicketItem";

const MyTickets = () => {
    const { user } = useAuth();
    const userId = user?.uid;

    // Buscando os tickets do usuário logado
    const tickets = useQuery(api.tickets.getUserTicketsById, userId ? { userId } : "skip");

    if (tickets === undefined) {
        return <p>Carregando tickets...</p>;
    }

    if (tickets.length === 0) {
        return <p>Você ainda não tem tickets.</p>;
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 px-5">
            {tickets.map((ticket) => (
                <TicketItem key={ticket._id} ticket={ticket} />
            ))}
        </div>
    );
};

export default MyTickets;
