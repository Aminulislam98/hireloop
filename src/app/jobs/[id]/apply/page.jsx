import JobApply from "@/components/jobs/JobApply";
import { getApplicationByApplicant } from "@/lib/api/applications";

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
  console.log("this is user id:", user?.id);
  const applications = await getApplicationByApplicant(user?.id);
  const plan = {
    name: "Free",
    maxApplicationsPerMonth: 3,
  };
  const job = await getJobById(id);

  return (
    <div className="min-h-screen flex flex-col max-w-7xl w-full mx-auto justify-center items-center ">
      <div className="flex flex-col items-center justify-center border border-white rounded-md p-4">
        {applications?.result.length < plan.maxApplicationsPerMonth ? (
          <JobApply applicant={user} job={job} />
        ) : (
          <>
            <h2>
              You have applied so far: {applications?.result.length} out of{" "}
              {plan.maxApplicationsPerMonth}
            </h2>
            <p>
              Purchase plan to apply for more Positions.{" "}
              <Link href={"/plan"} className="underline text-yellow-400">
                Buy Plan
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyPage;
