import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export interface Ticket {
  id: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  createdAt: string;
  updatedAt: string;
}

export const getTickets = async (): Promise<Ticket[]> => {
  const response = await api.get("/tickets");
  return response.data.data.tickets;
};

export const createTicket = async (
  ticketData: Omit<Ticket, "id" | "status" | "createdAt" | "updatedAt">,
): Promise<Ticket> => {
  const response = await api.post("/tickets", ticketData);
  return response.data.data.ticket;
};

export const updateTicketStatus = async (
  id: string,
  status: string,
): Promise<Ticket> => {
  const response = await api.patch(`/tickets/${id}`, { status });
  return response.data.data.ticket;
};
