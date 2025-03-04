import TicketList from "@/components/TicketList";
import React from "react";

export const metadata = {
  title: "Dashboard",
}

const Home = () => {

  return (
    <div className="px-5 py-6">
      <h1 className="text-2xl font-bold text-center mb-4">Lista de Tickets</h1>
      <TicketList />
    </div>
  )
};

export default Home;
