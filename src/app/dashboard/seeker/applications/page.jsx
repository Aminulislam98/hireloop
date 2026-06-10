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
} from "lucide-react";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ApplicationCard({ application }) {
  const {
    jobTitle,
    companyName,
    createdAt,
    email,
    phone,
    linkedinUrl,
    portfolioUrl,
    resumeUrl,
    jobId,
  } = application;

  return (
    <article className="bg-[#111111] border border-[#262626] rounded-lg px-6 py-5 flex flex-col gap-4 transition-colors duration-150 hover:border-[#3b82f6]">
      {/* Top row — company logo placeholder + title + bookmark */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 min-w-0">
          {/* Company logo placeholder */}
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#1a1a1a] border border-[#262626] shrink-0">
            <Building2 size={20} strokeWidth={1.75} className="text-white" />
          </div>

          {/* Title + company */}
          <div className="min-w-0">
            <h2 className="text-base md:text-lg font-semibold leading-tight text-white">
              {jobTitle}
            </h2>
            <p className="text-base text-white mt-1">{companyName}</p>
          </div>
        </div>

        {/* Applied date top right */}
        <time
          dateTime={createdAt}
          className="text-sm text-white shrink-0 flex items-center gap-1"
        >
          <Calendar size={13} strokeWidth={2} aria-hidden="true" />
          {formatDate(createdAt)}
        </time>
      </div>

      {/* Tags row */}
      <div className="flex items-center gap-2 flex-wrap">
        {resumeUrl && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded border border-[#262626] text-sm font-medium text-white">
            <FileText size={13} strokeWidth={2} aria-hidden="true" />
            Resume
          </span>
        )}
        {linkedinUrl && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded border border-[#262626] text-sm font-medium text-white">
            <Link2 size={13} strokeWidth={2} aria-hidden="true" />
            LinkedIn
          </span>
        )}
        {portfolioUrl && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded border border-[#262626] text-sm font-medium text-white">
            <Globe size={13} strokeWidth={2} aria-hidden="true" />
            Portfolio
          </span>
        )}
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded border border-[#262626] text-sm font-medium text-white">
          <Briefcase size={13} strokeWidth={2} aria-hidden="true" />
          {email}
        </span>
      </div>

      {/* Bottom row — applied info + links */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-base text-white">Applied: {formatDate(createdAt)}</p>

        <div className="flex items-center gap-4 flex-wrap">
          {resumeUrl && (
            <Link
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-base font-medium text-white underline underline-offset-4 transition-colors duration-150 hover:text-[#3b82f6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:rounded-sm"
            >
              Resume
              <ExternalLink size={13} strokeWidth={2} aria-hidden="true" />
            </Link>
          )}
          {linkedinUrl && (
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-base font-medium text-white underline underline-offset-4 transition-colors duration-150 hover:text-[#3b82f6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:rounded-sm"
            >
              LinkedIn
              <ExternalLink size={13} strokeWidth={2} aria-hidden="true" />
            </Link>
          )}
          <Link
            href={`/jobs/${jobId}`}
            className="text-base font-bold text-white transition-colors duration-150 hover:text-[#3b82f6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:rounded-sm"
          >
            View Job
          </Link>
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-16 gap-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#262626]">
        <Inbox size={28} strokeWidth={1.5} className="text-white" />
      </div>
      <h2 className="text-lg sm:text-xl font-semibold leading-tight text-white">
        No applications yet
      </h2>
      <p className="text-base font-normal leading-relaxed text-white max-w-xs">
        You haven&apos;t applied to any jobs yet. Start exploring opportunities
        and submit your first application.
      </p>
      <Link
        href="/jobs"
        className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 rounded-md bg-[#3b82f6] text-base font-bold text-white transition-all duration-150 hover:bg-[#2563eb] active:scale-[0.98] active:bg-[#1d4ed8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
      >
        Browse Jobs
      </Link>
    </section>
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

        {applications.length === 0 ? (
          <EmptyState />
        ) : (
          <section aria-label="Application list">
            <ul className="flex flex-col gap-4 list-none p-0">
              {applications.map((application) => (
                <li key={application._id}>
                  <ApplicationCard application={application} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
};

export default ApplicationPage;
