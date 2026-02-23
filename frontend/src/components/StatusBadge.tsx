const StatusBadge = ({
  status,
}: {
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
}) => {
  const styles = {
    OPEN: "bg-emerald-100 text-emerald-800 border-emerald-200",
    IN_PROGRESS: "bg-amber-100 text-amber-800 border-amber-200",
    RESOLVED: "bg-slate-100 text-slate-800 border-slate-200",
  };

  const labels = {
    OPEN: "Open",
    IN_PROGRESS: "In Progress",
    RESOLVED: "Resolved",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
};

export default StatusBadge;
