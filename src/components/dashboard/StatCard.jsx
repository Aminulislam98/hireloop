import Link from "next/link";

export default function StatCard({
  icon: Icon,
  label,
  value,
  href,
  onClick,
  trend,
  trendDir,
  loading,
}) {
  if (loading) {
    return (
      <div className="flex flex-col gap-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6 animate-pulse">
        <div className="h-9 w-9 rounded-lg bg-zinc-800" />
        <div className="flex flex-col gap-2">
          <div className="h-3 w-24 rounded bg-zinc-800" />
          <div className="h-7 w-14 rounded bg-zinc-800" />
        </div>
      </div>
    );
  }

  const trendColor =
    trendDir === "up"
      ? "text-emerald-400"
      : trendDir === "down"
        ? "text-red-400"
        : "text-zinc-500";

  const cardClass =
    "flex flex-col gap-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors duration-200" +
    (href || onClick
      ? " cursor-pointer hover:border-zinc-600 hover:bg-zinc-800/60"
      : "");

  const content = (
    <>
      <div className="w-fit rounded-lg bg-zinc-800 p-2.5 text-zinc-300">
        {Icon && <Icon size={18} strokeWidth={1.75} />}
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm text-zinc-400">{label}</p>
        <p className="text-3xl font-semibold tracking-tight text-zinc-100">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        {trend && (
          <p className={`text-xs font-medium ${trendColor}`}>{trend}</p>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cardClass}>
        {content}
      </Link>
    );
  }

  return (
    <div
      className={cardClass}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {content}
    </div>
  );
}
