export interface TicketItemProps {
  ticket: {
    number: string;
    motivo: string;
    posto: string;
    area: string;
    kit: string;
    line: string;
    status: string;
    createdAt: number;
    updatedAt: number;
    ticketItem: {
      item: string;
      quantity: string;
      description: string;
    }[];
  };
}
