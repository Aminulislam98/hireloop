import StatCard from "./StatCard";

export default function StatsGrid({ stats = [], loading = false }) {
  const items = loading ? [{}, {}, {}, {}] : stats;

  return (
    <section className="max-w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((stat, i) => (
        <StatCard
          key={stat.id ?? i}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          href={stat.href}
          onClick={stat.onClick}
          trend={stat.trend}
          trendDir={stat.trendDir}
          loading={loading}
        />
      ))}
    </section>
  );
}
