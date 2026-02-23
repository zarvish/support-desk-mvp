# Support Desk MVP

A minimal, full-stack Customer Support Ticket Tracker built as an MVP for managing incoming support requests.

## 🚀 Setup & Run Instructions

### Prerequisites

- Node.js (v18+)

### Running Locally

To launch both the Frontend and Backend concurrently using simple root commands:

1. **Backend**:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

   _The backend will start on http://localhost:5000_

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   _The frontend will start on http://localhost:5173_

## 🛠 Technology Choices & Rationale

**Frontend:**

- **React.js + Vite**: Chosen for its fast build times and excellent developer experience to build an interactive SPA.
- **TailwindCSS**: Chosen to enable a highly polished, premium, and custom visual design without shipping heavy CSS bundles. Provides excellent design constraints out of the box.
- **TypeScript**: Adds static typing to minimize runtime errors and ensure reliable UI component architectures.

**Backend:**

- **Node.js + Express**: Given the 2-3 hour timeframe, Express provides a fast, lightweight, and well-understood path to building REST APIs.
- **Service-Layered Architecture**: Keeps business logic separated from HTTP transport, making the system highly testable and extensible.
- **Centralized Error Handling**: Ensures API responses to errors are structured and predictable, significantly improving client-side debugging.
- **In-Memory Store**: A structured TypeScript array simplifies setup for the MVP scope without needing database orchestration.

## ⚖️ Tradeoffs Made (Time Constraints)

1. **In-Memory Persistence**: Using volatile memory means data is lost between server restarts. For an MVP this works, but a persistent store like PostgreSQL or MongoDB would be required for production.
2. **Missing Input Validation Layer**: While we check for missing fields, we don't have robust validation schemas (like Zod or Joi) to strictly validate email formats, string lengths, or prevent prototype-pollution.
3. **No Authentication/Authorization**: Excluded as per requirements, making the API openly accessible to anyone.
4. **Basic State Management**: Using React `useState` and `useEffect` instead of a dedicated library (like React Query or Redux) to fetch API data, meaning we don't have advanced caching features.

## 🔮 Future Improvements

With more time, I would focus on:

- **Database Integration**: Swap out the in-memory store for a PostgreSQL database via an ORM like Prisma or Sequelize.
- **Data Fetching Layer**: Add React Query to the frontend for better caching, optimistic UI updates, and loading states without manual useEffect mapping.
- **Pagination & Filtering**: Implement query parameters on the `GET /api/tickets` endpoint to support scaling to thousands of tickets (with UI support).
- **Comprehensive API Tests**: Write unit/integration tests for the `TicketService` and controllers using Jest or Supertest.
- **CI/CD Integration**: Add GitHub actions to lint, build, and test the repository automatically.

## 🤖 AI & Productivity Tools Used

- **Tools Used**: , Claude Sonnet 4.5 via Antigravity.
- **Assistance Provided**: Used to scaffold repetitive boilerplate (Express app setup, Vite configurations), quickly inject Tailwind classes for component layouts, and flesh out standard architectural patterns.
- **Modified/Rejected Suggestion Example**: The AI initially suggested handling CORS by allowing any origin without explicit config, which I modified to ensure proper CORS typing and a strictly configured middleware pattern in the root `index.ts`, avoiding global scope issues.
