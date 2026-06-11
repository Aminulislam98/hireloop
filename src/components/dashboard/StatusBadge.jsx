const statusConfig = {
  pending: {
    dot: "bg-amber-500",
    text: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  approved: {
    dot: "bg-green-500",
    text: "text-green-400",
    bg: "bg-green-500/10",
  },
  rejected: { dot: "bg-red-500", text: "text-red-400", bg: "bg-red-500/10" },
};

export const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded px-2 py-1 text-sm font-medium capitalize ${config.bg} ${config.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
};
