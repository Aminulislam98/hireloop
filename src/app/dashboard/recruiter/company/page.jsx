import React from "react";
import CompanySection from "./CompanySection";
import { getUserSession } from "@/lib/core/session";

const CompanyPage = () => {
  const user = getUserSession();
  console.log("this is user data:", user);
  return (
    <div>
      <CompanySection />
    </div>
  );
};

export default CompanySection;
