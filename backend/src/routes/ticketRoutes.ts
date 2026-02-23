import { Router } from "express";
import {
  createTicket,
  getAllTickets,
  updateTicketStatus,
} from "../controllers/ticketController";

const router = Router();

router.route("/").post(createTicket).get(getAllTickets);

router.route("/:id").patch(updateTicketStatus);

export default router;
