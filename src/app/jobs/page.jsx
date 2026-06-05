// app/jobs/page.jsx — Server Component

import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";
import JobSearchBar from "@/components/jobs/JobSearchBar";
import { getJobs } from "@/lib/api/jobs";
import { Briefcase } from "lucide-react";

export default async function JobsPage() {
  const data = await getJobs();
  const jobs = data?.result || [];

  return (
    <main className="min-h-screen bg-page-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search bar — full width at top */}
        <div className="mb-6">
          <JobSearchBar />
        </div>

        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <JobFilters isMobile />
        </div>

        {/* Two-column layout */}
        <div className="flex gap-6 items-start">
          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <JobFilters />
          </aside>

          {/* Job list */}
          <section className="flex-1 min-w-0" aria-label="Job listings">
            {jobs.length > 0 ? (
              <div className="flex flex-col gap-3">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-surface border border-border rounded-lg">
                <div className="w-14 h-14 rounded-full bg-page-bg border border-border flex items-center justify-center mb-4">
                  <Briefcase
                    size={24}
                    className="text-text-muted"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="text-lg font-semibold text-text-primary mb-2">
                  No jobs found
                </h2>
                <p className="text-base text-text-secondary max-w-xs mb-6">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
