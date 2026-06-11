"use client";
import { updateCompany } from "@/lib/actions/companies";
import { Check } from "lucide-react";

import React from "react";
import toast from "react-hot-toast";

const ApprovedCompanies = ({ id }) => {
  const handleApprove = async (id) => {
    const result = await updateCompany(id, { status: "Approve" });
    console.log("this is result :", result);
    if (result.success === true) {
      toast.success("Update Successful");
    } else {
      toast.error("Something went wrong!");
    }
  };
  return (
    <button
      onClick={() => handleApprove(id)}
      //   type="button"
      //   aria-label="Approve company"
      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-none border border-green-600 px-3 py-1.5 text-sm font-medium text-green-400 transition-colors duration-150 hover:bg-green-600 hover:text-white active:scale-[0.98]"
    >
      <Check className="h-4 w-4" />
      Approve
    </button>
  );
};

export default ApprovedCompanies;
