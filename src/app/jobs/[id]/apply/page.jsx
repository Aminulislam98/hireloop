import JobApply from "@/components/jobs/JobApply";
import { getApplicationByApplicant } from "@/lib/api/applications";
import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldX, Sparkles } from "lucide-react";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) {
    redirect(`/signup?callbackUrl=/jobs/${id}/apply`);
  }

  // ── Wrong role ─────────────────────────────────────────────────
  if (user.role !== "seeker") {
    return (
      <main className="min-h-screen bg-page-bg flex items-center justify-center px-4">
        <div className="bg-surface border border-border rounded-lg p-8 max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4">
            <ShieldX size={24} className="text-error" aria-hidden="true" />
          </div>
          <h1 className="text-lg font-semibold text-text-primary mb-2">
            Recruiter Account Detected
          </h1>
          <p className="text-base text-text-secondary mb-6">
            Only job seekers can apply for positions. Please sign in with a
            seeker account to proceed.
          </p>
          <Link
            href="/dashboard/recruiter/company"
            className="inline-block px-6 py-2.5 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Go back to dashboard
          </Link>
        </div>
      </main>
    );
  }

  const applications = await getApplicationByApplicant(user?.id);
  const job = await getJobById(id);

  const plan = {
    name: "Free",
    maxApplicationsPerMonth: 3,
  };

  const appliedCount = applications?.result.length;
  const limitReached = appliedCount >= plan.maxApplicationsPerMonth;

  // ── Plan limit reached ─────────────────────────────────────────
  if (limitReached) {
    return (
      <main className="min-h-screen bg-page-bg flex items-center justify-center px-4">
        <div className="bg-surface border border-border rounded-lg p-8 max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4">
            <Sparkles size={24} className="text-warning" aria-hidden="true" />
          </div>
          <h1 className="text-lg font-semibold text-text-primary mb-2">
            Application Limit Reached
          </h1>
          <p className="text-base text-text-secondary mb-1">
            You have used{" "}
            <span className="font-semibold text-text-primary">
              {appliedCount} of {plan.maxApplicationsPerMonth}
            </span>{" "}
            applications on the{" "}
            <span className="font-semibold text-text-primary">{plan.name}</span>{" "}
            plan.
          </p>
          <p className="text-base text-text-secondary mb-6">
            Upgrade your plan to keep applying for more positions.
          </p>
          <Link
            href="/plan"
            className="inline-block px-6 py-2.5 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Upgrade Plan
          </Link>
          <Link
            href="/jobs"
            className="block mt-3 text-base text-text-secondary hover:text-text-primary transition-colors duration-150"
          >
            Back to jobs
          </Link>
        </div>
      </main>
    );
  }

  // ── Show the form ──────────────────────────────────────────────
  return <JobApply applicant={user} job={job} />;
};

export default ApplyPage;
