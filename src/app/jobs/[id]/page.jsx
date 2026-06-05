// app/jobs/[id]/page.jsx

import { getJobById } from "@/lib/api/jobs";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Clock,
  Wifi,
  Building2,
  Calendar,
  Briefcase,
  CheckCircle,
} from "lucide-react";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  // ── Not found ──────────────────────────────────────────────────
  if (!job) {
    return (
      <main className="min-h-screen bg-page-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mb-4">
            <Briefcase
              size={28}
              className="text-text-muted"
              aria-hidden="true"
            />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Job not found
          </h1>
          <p className="text-base text-text-secondary mb-6">
            This position may have been removed or the link is incorrect.
          </p>
          <Link
            href="/jobs"
            className="px-6 py-2.5 text-base font-bold text-on-brand bg-brand hover:bg-brand-hover rounded-md transition-colors duration-150"
          >
            Back to jobs
          </Link>
        </div>
      </main>
    );
  }

  // ── Derived values ─────────────────────────────────────────────
  const salaryLabel = `${job.currency} ${Number(job.salaryMin).toLocaleString()} – ${Number(job.salaryMax).toLocaleString()}`;

  const deadline = new Date(job.deadline).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const postedDate = new Date(job.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-page-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-base text-text-secondary hover:text-text-primary transition-colors duration-150 mb-6 group"
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
            className="group-hover:-translate-x-0.5 transition-transform duration-150"
          />
          Back to jobs
        </Link>

        {/* Two-column layout on desktop */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* ── LEFT: Main content ─────────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {/* Header card */}
            <div className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="relative w-16 h-16 flex-shrink-0 rounded-md border border-border overflow-hidden bg-page-bg">
                  {job.companyLogo ? (
                    <Image
                      src={job.companyLogo}
                      alt={`${job.companyName} logo`}
                      fill
                      priority
                      className="object-contain p-2"
                    />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center text-lg font-bold text-text-secondary">
                      {job.companyName?.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Title block */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl font-bold text-text-primary leading-tight">
                    {job.title}
                  </h1>
                  <p className="text-base text-text-secondary mt-1">
                    {job.companyName}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin
                      size={14}
                      className="text-text-muted flex-shrink-0"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-text-muted">
                      {job.city}, {job.country}
                      {job.isRemote && " · Remote"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Badges row */}
              <div className="flex flex-wrap gap-2 mt-5">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary bg-page-bg border-2 border-border rounded px-3 py-1">
                  <DollarSign size={13} aria-hidden="true" />
                  {salaryLabel}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary bg-page-bg border-2 border-border rounded px-3 py-1 capitalize">
                  <Clock size={13} aria-hidden="true" />
                  {job.type}
                </span>
                {job.isRemote ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand bg-brand-light border-2 border-brand rounded px-3 py-1">
                    <Wifi size={13} aria-hidden="true" />
                    Remote
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary bg-page-bg border-2 border-border rounded px-3 py-1">
                    <Building2 size={13} aria-hidden="true" />
                    On-site
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary bg-page-bg border-2 border-border rounded px-3 py-1">
                  <Briefcase size={13} aria-hidden="true" />
                  {job.category}
                </span>
              </div>
            </div>

            {/* Responsibilities */}
            <section className="bg-surface border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-3">
                Responsibilities
              </h2>
              <p className="text-base text-text-secondary leading-relaxed">
                {job.responsibilities}
              </p>
            </section>

            {/* Requirements */}
            <section className="bg-surface border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-3">
                Requirements
              </h2>
              <p className="text-base text-text-secondary leading-relaxed">
                {job.requirements}
              </p>
            </section>

            {/* Benefits */}
            <section className="bg-surface border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-3">
                Benefits
              </h2>
              <div className="flex items-start gap-2">
                <CheckCircle
                  size={18}
                  className="text-success flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-base text-text-secondary leading-relaxed">
                  {job.benefits}
                </p>
              </div>
            </section>
          </div>

          {/* ── RIGHT: Sticky sidebar ──────────────────────────── */}
          <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4 lg:sticky lg:top-20">
            {/* Apply card */}
            <div className="bg-surface border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-1">
                Ready to apply?
              </h2>
              <p className="text-sm text-text-muted mb-4">
                Submit your application before the deadline.
              </p>
              <button
                type="button"
                className="w-full py-3 text-base font-bold text-on-brand bg-brand hover:bg-brand-hover rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 active:scale-[0.98] min-h-11 hover:underline"
              >
                Apply Now
              </button>
            </div>

            {/* Job overview card */}
            <div className="bg-surface border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4">
                Job Overview
              </h2>

              <dl className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <Calendar
                    size={18}
                    className="text-text-muted flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-sm font-medium text-text-muted">
                      Deadline
                    </dt>
                    <dd className="text-base text-text-primary mt-0.5">
                      {deadline}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock
                    size={18}
                    className="text-text-muted flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-sm font-medium text-text-muted">
                      Job Type
                    </dt>
                    <dd className="text-base text-text-primary capitalize mt-0.5">
                      {job.type}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign
                    size={18}
                    className="text-text-muted flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-sm font-medium text-text-muted">
                      Salary
                    </dt>
                    <dd className="text-base text-text-primary mt-0.5">
                      {salaryLabel}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="text-text-muted flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-sm font-medium text-text-muted">
                      Location
                    </dt>
                    <dd className="text-base text-text-primary mt-0.5">
                      {job.city}, {job.country}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Briefcase
                    size={18}
                    className="text-text-muted flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-sm font-medium text-text-muted">
                      Category
                    </dt>
                    <dd className="text-base text-text-primary mt-0.5">
                      {job.category}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar
                    size={18}
                    className="text-text-muted flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-sm font-medium text-text-muted">
                      Date Posted
                    </dt>
                    <dd className="text-base text-text-primary mt-0.5">
                      {postedDate}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default JobDetailsPage;
