import React from "react";
import CompanySection from "./CompanySection";
import { getUserSession } from "@/lib/core/session";
import { getRecruiterCompany } from "@/lib/api/companies";
import { redirect } from "next/navigation";

const CompanyPage = async () => {
  const user = await getUserSession();
  if (!user) {
    redirect(`/signup`);
  }
  const company = await getRecruiterCompany(user?.id);
  return (
    <div>
      <CompanySection recruiter={user} recruiterCompany={company} />
    </div>
  );
};

export default CompanyPage;
