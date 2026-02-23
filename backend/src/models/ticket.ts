export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED";
export type TicketPriority = "Low" | "Medium" | "High";

export interface Ticket {
  id: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
}

export type CreateTicketDTO = Omit<
  Ticket,
  "id" | "status" | "createdAt" | "updatedAt"
>;

// In-memory data store
export const tickets: Ticket[] = [];
