import { useEffect, useState } from "react";
import { getTickets, updateTicketStatus, type Ticket } from "../api";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";

const TicketList = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const data = await getTickets();
      setTickets(data);
    } catch (error) {
      console.error("Failed to fetch tickets", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleStatusChange = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "OPEN" ? "IN_PROGRESS" : "RESOLVED";
    if (currentStatus === "RESOLVED") return;

    try {
      const updatedTicket = await updateTicketStatus(id, nextStatus);
      setTickets(tickets.map((t) => (t.id === id ? updatedTicket : t)));
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                <div className="h-4 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-4 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
        <svg
          className="mx-auto h-12 w-12 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-slate-900">No tickets</h3>
        <p className="mt-1 text-sm text-slate-500">
          Get started by creating a new support ticket.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
      <ul className="divide-y divide-slate-200">
        {tickets.map((ticket) => (
          <li
            key={ticket.id}
            className="p-6 hover:bg-slate-50 transition-colors duration-150 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3">
                  <p className="text-sm font-semibold text-indigo-600 truncate">
                    {ticket.id.split("-")[0]}
                  </p>
                  <StatusBadge status={ticket.status} />
                  <PriorityBadge priority={ticket.priority} />
                </div>
                <div className="mt-2 flex">
                  <h3 className="text-lg font-medium text-slate-900 truncate">
                    {ticket.subject}
                  </h3>
                </div>
                <div className="mt-2 text-sm text-slate-500 line-clamp-2">
                  {ticket.description}
                </div>
                <div className="mt-3 flex items-center text-xs text-slate-400 space-x-4">
                  <span>
                    {ticket.customerName} ({ticket.customerEmail})
                  </span>
                  <span>•</span>
                  <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="ml-6 flex flex-col items-end space-y-4">
                {ticket.status !== "RESOLVED" && (
                  <button
                    onClick={() => handleStatusChange(ticket.id, ticket.status)}
                    className="inline-flex items-center px-3 py-1.5 border border-indigo-200 shadow-sm text-xs font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Mark as{" "}
                    {ticket.status === "OPEN" ? "In Progress" : "Resolved"}
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
