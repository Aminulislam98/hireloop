import JobApply from "@/components/jobs/JobApply";
import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();
  if (!user) {
    redirect(`/signup?callbackUrl=/jobs/${id}/apply`);
  }
  if (user.role !== "seeker") {
    return (
      <div className="max-w-full w-full min-h-screen flex flex-col justify-center items-center ">
        <p className="text-center text-xl font-semibold">
          Only job seeker can apply for this positions. Please sign in with a
          seeker account to proceed.
        </p>
        <Link
          className="underline text-green-500 text-xl"
          href={"/dashboard/recruiter/company"}
        >
          {" "}
          Go back to company
        </Link>
      </div>
    );
  }

  const job = await getJobById(id);

  return (
    <div>
      <h2>Apply for: {job?.title}</h2>
      <JobApply applicant={user} job={job} />
    </div>
  );
};

export default ApplyPage;
