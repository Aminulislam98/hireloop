import React from "react";
import PostJobForm from "./PostJobForm";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";

const PostJobPage = async () => {
  const company = await getLoggedInRecruiterCompany();
  console.log("this is company id form page:", company?.result?._id);

  return (
    <div>
      <PostJobForm company={company} />
    </div>
  );
};

export default PostJobPage;
