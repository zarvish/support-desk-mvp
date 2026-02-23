import { Request, Response, NextFunction } from "express";
import { ticketService } from "../services/ticketService";
import { AppError } from "../utils/AppError";

export const createTicket = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { customerName, customerEmail, subject, description, priority } =
      req.body;

    if (
      !customerName ||
      !customerEmail ||
      !subject ||
      !description ||
      !priority
    ) {
      throw new AppError("Missing required fields", 400);
    }

    const ticket = await ticketService.createTicket({
      customerName,
      customerEmail,
      subject,
      description,
      priority,
    });
    res.status(201).json({ status: "success", data: { ticket } });
  } catch (error) {
    next(error);
  }
};

export const getAllTickets = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tickets = await ticketService.getAllTickets();
    res
      .status(200)
      .json({ status: "success", results: tickets.length, data: { tickets } });
  } catch (error) {
    next(error);
  }
};

export const updateTicketStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      throw new AppError("Status is required", 400);
    }

    const ticket = await ticketService.updateTicketStatus(
      id as string,
      status as any,
    );
    res.status(200).json({ status: "success", data: { ticket } });
  } catch (error) {
    next(error);
  }
};
