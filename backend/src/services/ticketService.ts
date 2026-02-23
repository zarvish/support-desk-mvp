import { v4 as uuidv4 } from "uuid";
import { AppError } from "../utils/AppError";
import {
  tickets,
  Ticket,
  CreateTicketDTO,
  TicketStatus,
} from "../models/ticket";

class TicketService {
  constructor() {}

  async createTicket(data: CreateTicketDTO): Promise<Ticket> {
    const newTicket: Ticket = {
      ...data,
      id: uuidv4(),
      status: "OPEN",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tickets.push(newTicket);
    return newTicket;
  }

  async getAllTickets(): Promise<Ticket[]> {
    return tickets;
  }

  async updateTicketStatus(id: string, status: TicketStatus): Promise<Ticket> {
    const ticket = tickets.find((t) => t.id === id);
    if (!ticket) {
      throw new AppError(`Ticket with ID ${id} not found`, 404);
    }

    // Ensure valid transition: OPEN -> IN_PROGRESS -> RESOLVED
    const isValidTransition =
      (ticket.status === "OPEN" && status === "IN_PROGRESS") ||
      (ticket.status === "IN_PROGRESS" && status === "RESOLVED");

    if (!isValidTransition && ticket.status !== status) {
      throw new AppError(
        `Invalid status transition from ${ticket.status} to ${status}`,
        400,
      );
    }

    ticket.status = status;
    ticket.updatedAt = new Date().toISOString();
    return ticket;
  }
}

export const ticketService = new TicketService();
