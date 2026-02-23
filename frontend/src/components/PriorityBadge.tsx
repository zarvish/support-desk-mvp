const PriorityBadge = ({
  priority,
}: {
  priority: "Low" | "Medium" | "High";
}) => {
  const styles = {
    Low: "bg-rose-50 text-rose-700",
    Medium: "bg-orange-50 text-orange-700",
    High: "bg-red-100 text-red-800 font-bold",
  };

  const icons = {
    Low: "↓",
    Medium: "→",
    High: "↑",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${styles[priority]}`}
    >
      <span>{icons[priority]}</span>
      {priority}
    </span>
  );
};

export default PriorityBadge;
