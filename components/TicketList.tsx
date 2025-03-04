"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TicketItem from "./TicketItem";

const TicketList = () => {
    const tickets = useQuery(api.tickets.getAllTickets);

    if (tickets === undefined) {
        return <p>Carregando tickets...</p>;
    }

    if (tickets.length === 0) {
        return <p>Nenhum ticket encontrado.</p>;
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 px-5">
            {tickets.map((ticket) => (
                <TicketItem key={ticket._id} ticket={ticket} />
            ))}
        </div>
    );
};

export default TicketList;
