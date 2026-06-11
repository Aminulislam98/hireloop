import PostJobForm from "./PostJobForm";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";
import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";

const PostJobPage = async () => {
  const company = await getLoggedInRecruiterCompany();

  if (!company?.result) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <section className="w-full max-w-md bg-surface border border-border rounded-lg p-8 sm:p-10 flex flex-col items-center text-center">
          <Building2
            className="w-8 h-8 text-brand mb-5"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <h1 className="text-xl font-semibold text-primary mb-2">
            Set up your company first
          </h1>
          <p className="text-base text-secondary leading-relaxed mb-6 max-w-sm">
            You need to add your company details before posting a job. It only
            takes a minute.
          </p>
          <Link
            href="/dashboard/recruiter/company"
            className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-md bg-brand text-on-brand text-base font-semibold transition-colors duration-150 hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            Create company
            <ArrowRight
              className="w-4 h-4"
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>
        </section>
      </main>
    );
  }

  return <PostJobForm company={company} />;
};

export default PostJobPage;
