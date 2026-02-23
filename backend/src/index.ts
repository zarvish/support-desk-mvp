import express from "express";
import cors from "cors";
import ticketRoutes from "./routes/ticketRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { AppError } from "./utils/AppError";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tickets", ticketRoutes);

// Unhandled routes
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
