import { getLoggedInRecruiterCompany } from "@/lib/api/companies";
import { getCompanyJobs } from "@/lib/api/jobs";
import { Pencil, Trash2, Eye } from "lucide-react";

const RecruitersJobs = async () => {
  const company = await getLoggedInRecruiterCompany();
  const companyId = company?.result?._id;
  const jobs = await getCompanyJobs(companyId, "active");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-zinc-100">Company Jobs</h1>
        <p className="text-zinc-500 mt-1">
          Total Jobs:{" "}
          <span className="text-emerald-400 font-semibold">{jobs.length}</span>
        </p>
      </div>

      {/* Table */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full">
          {/* Column headers */}
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left text-sm font-medium text-zinc-400 px-5 py-4">
                Job Title
              </th>
              <th className="text-left text-sm font-medium text-zinc-400 px-5 py-4">
                Category
              </th>
              <th className="text-left text-sm font-medium text-zinc-400 px-5 py-4">
                Location
              </th>
              <th className="text-left text-sm font-medium text-zinc-400 px-5 py-4">
                Type
              </th>
              <th className="text-left text-sm font-medium text-zinc-400 px-5 py-4">
                Status
              </th>
              <th className="text-left text-sm font-medium text-zinc-400 px-5 py-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {jobs.length === 0 ? (
              // Empty state
              <tr>
                <td
                  colSpan={6}
                  className="text-center text-zinc-500 py-12 text-sm"
                >
                  No jobs posted yet.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-b border-zinc-800/60 last:border-0 hover:bg-zinc-800/30 transition-colors"
                >
                  {/* Job title + company name */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-zinc-100">
                      {job.title}
                    </p>
                    <p className="text-sm text-zinc-500 mt-0.5">
                      {job.companyName}
                    </p>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <span className="text-sm text-zinc-300">
                      {job.category}
                    </span>
                  </td>

                  {/* Location — remote or city/country */}
                  <td className="px-5 py-4">
                    <span className="text-sm text-zinc-300">
                      {job.isRemote === "true" || job.isRemote === true
                        ? "Remote"
                        : `${job.city ?? "—"}, ${job.country ?? "—"}`}
                    </span>
                  </td>

                  {/* Job type */}
                  <td className="px-5 py-4">
                    <span className="text-sm text-zinc-300 capitalize">
                      {job.type}
                    </span>
                  </td>

                  {/* Status badge */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${
                        job.status === "active"
                          ? "bg-emerald-900/40 text-emerald-400"
                          : "bg-zinc-800 text-zinc-500"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  {/* Action buttons — not functional yet */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {/* View full detail */}
                      <button className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">
                        <Eye size={16} />
                      </button>

                      {/* Edit job */}
                      <button className="p-2 rounded-lg text-zinc-400 hover:text-blue-400 hover:bg-zinc-800 transition-colors">
                        <Pencil size={16} />
                      </button>

                      {/* Delete job */}
                      <button className="p-2 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecruitersJobs;
