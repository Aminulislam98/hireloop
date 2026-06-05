"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, DollarSign, Clock, Wifi, Building2 } from "lucide-react";

export default function JobCard({ job }) {
  const salaryLabel = `${job.currency} ${Number(job.salaryMin).toLocaleString()} – ${Number(job.salaryMax).toLocaleString()}`;

  const deadline = new Date(job.deadline).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="bg-surface border border-border rounded-lg p-4 flex items-start gap-3 hover:bg-surface-hover transition-colors duration-150">
      {/* Company Logo */}
      <div className="relative w-11 h-11 flex-shrink-0 rounded-md border border-border overflow-hidden bg-page-bg">
        {job.companyLogo ? (
          <Image
            src={job.companyLogo}
            alt={`${job.companyName} logo`}
            fill
            className="object-contain p-1"
          />
        ) : (
          <span className="w-full h-full flex items-center justify-center text-sm font-semibold text-text-secondary">
            {job.companyName?.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title + Bookmark */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-text-primary leading-tight truncate">
            {job.title}
          </h3>
          <button
            aria-label="Bookmark job"
            className="flex-shrink-0 p-1 rounded text-text-muted hover:text-text-primary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
          >
            <Bookmark size={16} />
          </button>
        </div>

        {/* Company & Location */}
        <p className="text-sm text-text-secondary mt-1 mb-3 truncate">
          {job.companyName}
          {job.city && (
            <>
              {" "}
              &bull; {job.city}, {job.country}
            </>
          )}
          {job.isRemote && <> &bull; Remote</>}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {/* Salary */}
          <span className="inline-flex items-center gap-1 text-sm font-medium text-text-secondary bg-page-bg border-2 border-border rounded px-2 py-0.5">
            <DollarSign size={12} aria-hidden="true" />
            {salaryLabel}
          </span>

          {/* Job type */}
          <span className="inline-flex items-center gap-1 text-sm font-medium text-text-secondary bg-page-bg border-2 border-border rounded px-2 py-0.5">
            <Clock size={12} aria-hidden="true" />
            {job.type}
          </span>

          {/* Remote / On-site */}
          {job.isRemote ? (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-brand bg-brand-light border-2 border-brand rounded px-2 py-0.5">
              <Wifi size={12} aria-hidden="true" />
              Remote
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-text-secondary bg-page-bg border-2 border-border rounded px-2 py-0.5">
              <Building2 size={12} aria-hidden="true" />
              On-site
            </span>
          )}
        </div>

        {/* Deadline + Apply button */}
        <div className="flex items-center justify-between gap-4 mt-3">
          <p className="text-sm text-text-muted">Deadline: {deadline}</p>
          <Link
            href={`/jobs/${job._id}`}
            className="hover:underline shrink-0 px-4 py-1.5 text-sm font-bold text-on-brand bg-brand hover:bg-brand-hover rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 active:scale-[0.98]"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </article>
  );
}
