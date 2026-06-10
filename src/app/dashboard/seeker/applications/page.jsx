// app/dashboard/seeker/applications/page.jsx

import { getApplicationByApplicant } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import Link from "next/link";
import {
  Briefcase,
  Building2,
  Calendar,
  FileText,
  Link2,
  Globe,
  Inbox,
  ExternalLink,
  ArrowUpRight,
  CircleDot,
} from "lucide-react";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }) {
  const map = {
    applied: {
      bg: "bg-[#1e3a5f]",
      text: "text-[#60a5fa]",
      border: "border-[#2563eb]",
      label: "Applied",
    },
    reviewing: {
      bg: "bg-[#3b2a00]",
      text: "text-[#fbbf24]",
      border: "border-[#d97706]",
      label: "Reviewing",
    },
    interview: {
      bg: "bg-[#1a3a2a]",
      text: "text-[#34d399]",
      border: "border-[#059669]",
      label: "Interview",
    },
    rejected: {
      bg: "bg-[#3b1a1a]",
      text: "text-[#f87171]",
      border: "border-[#dc2626]",
      label: "Rejected",
    },
    hired: {
      bg: "bg-[#1a3a1a]",
      text: "text-[#4ade80]",
      border: "border-[#16a34a]",
      label: "Hired",
    },
  };

  const style = map[status?.toLowerCase()] ?? map.applied;

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-medium ${style.bg} ${style.text} ${style.border}`}
    >
      <CircleDot size={11} strokeWidth={2} aria-hidden="true" />
      {style.label}
    </span>
  );
}

function EmptyState() {
  return (
    <tr>
      <td colSpan={9}>
        <section className="flex flex-col items-center justify-center text-center py-16 gap-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#262626]">
            <Inbox size={28} strokeWidth={1.5} className="text-white" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold leading-tight text-white">
            No applications yet
          </h2>
          <p className="text-base font-normal leading-relaxed text-white max-w-xs">
            You haven&apos;t applied to any jobs yet. Start exploring and submit
            your first application.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 rounded-md bg-[#3b82f6] text-base font-bold text-white transition-all duration-150 hover:bg-[#2563eb] active:scale-[0.98] active:bg-[#1d4ed8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            Browse Jobs
          </Link>
        </section>
      </td>
    </tr>
  );
}

function ExternalLinkCell({ href, icon: Icon, label }) {
  if (!href) {
    return <span className="text-base text-[#737373]">—</span>;
  }
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-base font-medium text-[#3b82f6] transition-colors duration-150 hover:text-[#2563eb] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:rounded-sm"
    >
      <Icon size={14} strokeWidth={2} aria-hidden="true" />
      {label}
      <ExternalLink size={11} strokeWidth={2} aria-hidden="true" />
    </Link>
  );
}

const ApplicationPage = async () => {
  const user = await getUserSession();
  const jobs = await getApplicationByApplicant(user?.id);
  const applications = jobs?.result ?? [];

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-white">
            My Applications
          </h1>
          <p className="text-base font-normal text-white mt-1">
            {applications.length > 0
              ? `${applications.length} application${applications.length > 1 ? "s" : ""} submitted`
              : "Track all your job applications in one place"}
          </p>
        </header>

        <section aria-label="Applications table">
          <div className="w-full overflow-x-auto rounded-lg border border-[#262626]">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#111111] border-b border-[#262626]">
                  <th className="px-4 py-3 text-sm font-medium text-white whitespace-nowrap">
                    #
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-white whitespace-nowrap">
                    <span className="inline-flex items-center gap-2">
                      <Briefcase size={14} strokeWidth={2} aria-hidden="true" />
                      Job Title
                    </span>
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-white whitespace-nowrap">
                    <span className="inline-flex items-center gap-2">
                      <Building2 size={14} strokeWidth={2} aria-hidden="true" />
                      Company
                    </span>
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-white whitespace-nowrap">
                    <span className="inline-flex items-center gap-2">
                      <Calendar size={14} strokeWidth={2} aria-hidden="true" />
                      Applied
                    </span>
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-white whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-white whitespace-nowrap">
                    Resume
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-white whitespace-nowrap">
                    LinkedIn
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-white whitespace-nowrap">
                    Portfolio
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-white whitespace-nowrap text-right">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {applications.length === 0 ? (
                  <EmptyState />
                ) : (
                  applications.map((application, index) => (
                    <tr
                      key={application._id}
                      className={`border-b border-[#262626] transition-colors duration-150 hover:bg-[#111111] ${
                        index === applications.length - 1 ? "border-b-0" : ""
                      }`}
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-base text-white">
                          {index + 1}
                        </span>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-base font-semibold text-white">
                          {application.jobTitle}
                        </span>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-base font-medium text-white">
                          {application.companyName}
                        </span>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <time
                          dateTime={application.createdAt}
                          className="text-base text-white"
                        >
                          {formatDate(application.createdAt)}
                        </time>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <StatusBadge status={application.status} />
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <ExternalLinkCell
                          href={application.resumeUrl}
                          icon={FileText}
                          label="Resume"
                        />
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <ExternalLinkCell
                          href={application.linkedinUrl}
                          icon={Link2}
                          label="LinkedIn"
                        />
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <ExternalLinkCell
                          href={application.portfolioUrl}
                          icon={Globe}
                          label="Portfolio"
                        />
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <Link
                          href={`/jobs/${application.jobId}`}
                          className="inline-flex items-center justify-center gap-1 min-h-[44px] px-4 rounded-md bg-[#3b82f6] text-base font-semibold text-white transition-all duration-150 hover:bg-[#2563eb] active:scale-[0.98] active:bg-[#1d4ed8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                        >
                          View Job
                          <ArrowUpRight
                            size={14}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ApplicationPage;
