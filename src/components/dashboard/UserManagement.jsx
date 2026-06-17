"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Briefcase,
  Shield,
  Download,
  Users,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PER_PAGE = 8;

const initials = (n = "") => {
  const p = n.trim().split(/\s+/).filter(Boolean);
  if (!p.length) return "?";
  return (
    p.length === 1 ? p[0][0] : p[0][0] + p[p.length - 1][0]
  ).toUpperCase();
};
const fmtDate = (v) =>
  !v || isNaN(new Date(v))
    ? "—"
    : new Date(v).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });

const ROLES = {
  seeker: { label: "Seeker", Icon: User },
  recruiter: { label: "Recruiter", Icon: Briefcase },
  admin: { label: "Admin", Icon: Shield },
};
const STATUS = {
  active: { label: "Active", dot: "bg-emerald-500", text: "text-emerald-400" },
  suspended: { label: "Suspended", dot: "bg-red-500", text: "text-red-400" },
  pending: { label: "Pending", dot: "bg-amber-500", text: "text-amber-400" },
};

function Avatar({ name, image }) {
  if (image)
    return (
      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <Image
          src={image}
          alt={`${name} photo`}
          fill
          sizes="40px"
          className="object-cover"
        />
      </span>
    );
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-base font-semibold text-white">
      {initials(name)}
    </span>
  );
}

const actionBtn =
  "inline-flex min-h-[44px] items-center text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-[0.98]";

export default function UserManagement({
  users: initial = [],
  hasError = false,
}) {
  const router = useRouter();
  const [users, setUsers] = useState(initial);
  const [roleFilter, setRoleFilter] = useState("all");
  const [page, setPage] = useState(1);

  const stats = useMemo(() => {
    const total = users.length || 1;
    const suspended = users.filter((u) => u.status === "suspended").length;
    return {
      active: users.filter((u) => u.status !== "suspended").length,
      recruiters: users.filter((u) => u.role === "recruiter").length,
      suspended,
      fresh: users.filter(
        (u) =>
          u.createdAt && Date.now() - new Date(u.createdAt).getTime() <= 864e5,
      ).length,
      pct: ((suspended / total) * 100).toFixed(1),
      total: users.length,
    };
  }, [users]);

  const filtered = useMemo(
    () =>
      roleFilter === "all" ? users : users.filter((u) => u.role === roleFilter),
    [users, roleFilter],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const current = filtered.slice(start, start + PER_PAGE);

  // Optimistic only — add your API call here (e.g. fetch(`/api/admin/users/${id}`, {...}))
  const patch = (id, c) =>
    setUsers((l) => l.map((u) => (u.id === id ? { ...u, ...c } : u)));
  const onToggleRole = (u) =>
    patch(u.id, { role: u.role === "recruiter" ? "seeker" : "recruiter" });
  const onSuspend = (u) => patch(u.id, { status: "suspended" });
  const onActivate = (u) => patch(u.id, { status: "active" });
  const onDelete = (u) => setUsers((l) => l.filter((x) => x.id !== u.id));

  const exportCsv = () => {
    const rows = [
      ["Name", "Email", "Role", "Status", "Join Date"],
      ...filtered.map((u) => [u.name, u.email, u.role, u.status, u.createdAt]),
    ];
    const csv = rows
      .map((r) =>
        r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "hireloop-users.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const setFilter = (v) => {
    setRoleFilter(v);
    setPage(1);
  };

  const pages = (() => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const set = [...new Set([1, 2, 3, safePage, totalPages])]
      .filter((p) => p >= 1 && p <= totalPages)
      .sort((a, b) => a - b);
    const out = [];
    let prev = 0;
    for (const p of set) {
      if (p - prev > 1) out.push("…");
      out.push(p);
      prev = p;
    }
    return out;
  })();

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
              User Management
            </h1>
            <p className="mt-2 max-w-prose text-base leading-relaxed text-zinc-400">
              Review, filter, and manage platform access for all users.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <label htmlFor="role-filter" className="sr-only">
              Filter by role
            </label>
            <select
              id="role-filter"
              value={roleFilter}
              onChange={(e) => setFilter(e.target.value)}
              className="min-h-[44px] rounded-md border border-zinc-800 bg-zinc-900 px-4 text-base transition-colors duration-150 hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <option value="all">All Roles</option>
              <option value="seeker">Seeker</option>
              <option value="recruiter">Recruiter</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-white px-5 text-base font-bold text-zinc-900 transition-colors duration-150 hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-[0.98]"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Export List
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {[
            {
              l: "Total Active Users",
              v: stats.active,
              h: `${stats.total} total accounts`,
              t: "text-emerald-400",
            },
            {
              l: "Recruiter Growth",
              v: stats.recruiters,
              h: "On the platform",
              t: "text-emerald-400",
            },
            {
              l: "Suspended Accounts",
              v: stats.suspended,
              h: `${stats.pct}% of total`,
              t: "text-zinc-500",
            },
            {
              l: "New Signups (24h)",
              v: stats.fresh,
              h: "Recent activity",
              t: "text-amber-400",
            },
          ].map((s) => (
            <article
              key={s.l}
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-5"
            >
              <p className="text-sm font-medium text-zinc-400">{s.l}</p>
              <p className="mt-2 text-3xl font-bold leading-tight">
                {s.v.toLocaleString()}
              </p>
              <p className={`mt-2 text-sm font-medium ${s.t}`}>{s.h}</p>
            </article>
          ))}
        </div>

        {/* Table card */}
        <div className="mt-8 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
          {hasError ? (
            <State
              icon={AlertTriangle}
              tone="text-red-400"
              title="Couldn't load users"
              desc="Something went wrong fetching the user list. Please try again."
              action="Retry"
              onAction={() => router.refresh()}
            />
          ) : filtered.length === 0 ? (
            <State
              icon={Users}
              tone="text-zinc-400"
              title="No users found"
              desc="No users match the current filter. Try a different role or clear it."
              action="Clear filter"
              onAction={() => setFilter("all")}
            />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      {[
                        "User Name",
                        "Email Address",
                        "Role",
                        "Join Date",
                        "Status",
                      ].map((c) => (
                        <th
                          key={c}
                          scope="col"
                          className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-zinc-400"
                        >
                          {c}
                        </th>
                      ))}
                      <th
                        scope="col"
                        className="px-4 py-4 text-right text-sm font-semibold text-zinc-400"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {current.map((u) => {
                      const suspended = u.status === "suspended";
                      const role = ROLES[u.role] || ROLES.seeker;
                      const st = STATUS[u.status] || STATUS.active;
                      return (
                        <tr
                          key={u.id}
                          className="border-b border-zinc-800 transition-colors duration-150 hover:bg-zinc-800/50"
                        >
                          <td className="px-4 py-4">
                            <div className="flex min-w-0 items-center gap-3">
                              <Avatar name={u.name} image={u.image} />
                              <span
                                className={`truncate text-base font-medium ${suspended ? "text-zinc-500" : "text-zinc-100"}`}
                              >
                                {u.name}
                              </span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <span
                              className={`text-base ${suspended ? "text-zinc-500" : "text-zinc-400"}`}
                            >
                              {u.email}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <span className="inline-flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm font-medium text-zinc-300">
                              <role.Icon
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                              {role.label}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-base text-zinc-400">
                            {fmtDate(u.createdAt)}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <span
                              className={`inline-flex items-center gap-2 rounded-full border border-zinc-700 px-3 py-1 text-sm font-medium ${st.text}`}
                            >
                              <span
                                className={`h-2 w-2 rounded-full ${st.dot}`}
                                aria-hidden="true"
                              />
                              {st.label}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-right">
                            <div className="flex flex-wrap items-center justify-end gap-4">
                              {suspended ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => onActivate(u)}
                                    className={`${actionBtn} text-emerald-400`}
                                  >
                                    Activate
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => onDelete(u)}
                                    className={`${actionBtn} text-red-400`}
                                  >
                                    Delete
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => onToggleRole(u)}
                                    className={`${actionBtn} text-zinc-400 hover:text-zinc-100`}
                                  >
                                    {u.role === "recruiter"
                                      ? "Make Seeker"
                                      : "Make Recruiter"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => onSuspend(u)}
                                    className={`${actionBtn} text-red-400`}
                                  >
                                    Suspend
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <nav
                aria-label="Users pagination"
                className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800 px-4 py-4"
              >
                <p className="text-sm text-zinc-500">
                  Showing {start + 1} to{" "}
                  {Math.min(start + PER_PAGE, filtered.length)} of{" "}
                  {filtered.length} users
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous page"
                    disabled={safePage <= 1}
                    onClick={() => setPage(safePage - 1)}
                    className="flex h-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-zinc-800 text-zinc-400 transition-colors duration-150 hover:bg-zinc-800 hover:text-zinc-100 disabled:opacity-40 active:scale-[0.98]"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  {pages.map((p, i) =>
                    p === "…" ? (
                      <span
                        key={`e${i}`}
                        className="px-2 text-sm text-zinc-500"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        aria-current={p === safePage ? "page" : undefined}
                        onClick={() => setPage(p)}
                        className={`flex h-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-md border text-sm font-medium transition-colors duration-150 active:scale-[0.98] ${
                          p === safePage
                            ? "border-zinc-700 bg-zinc-800 text-zinc-100"
                            : "border-transparent text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}
                  <button
                    type="button"
                    aria-label="Next page"
                    disabled={safePage >= totalPages}
                    onClick={() => setPage(safePage + 1)}
                    className="flex h-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-zinc-800 text-zinc-400 transition-colors duration-150 hover:bg-zinc-800 hover:text-zinc-100 disabled:opacity-40 active:scale-[0.98]"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </nav>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function State({ icon: Icon, tone, title, desc, action, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-800 ${tone}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-lg font-semibold text-zinc-100">{title}</h2>
      <p className="mt-2 max-w-prose text-base leading-relaxed text-zinc-400">
        {desc}
      </p>
      <button
        type="button"
        onClick={onAction}
        className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-md bg-indigo-600 px-5 text-base font-bold text-white transition-colors duration-150 hover:bg-indigo-500 active:scale-[0.98]"
      >
        {action}
      </button>
    </div>
  );
}
