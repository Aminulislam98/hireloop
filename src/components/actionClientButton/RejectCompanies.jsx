"use client";
import { updateCompany } from "@/lib/actions/companies";
import { success } from "better-auth";
import { X } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

const RejectCompanies = ({ id }) => {
  const handleReject = async (id) => {
    const result = await updateCompany(id, { status: "pending" });
    if (result?.success === true) {
      toast.success("Rejected");
    } else {
      toast.error("Something went wrong!");
    }
  };
  return (
    <button
      onClick={() => handleReject(id)}
      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-none border border-red-600 px-3 py-1.5 text-sm font-medium text-red-400 transition-colors duration-150 hover:bg-red-600 hover:text-white active:scale-[0.98]"
    >
      <X className="h-4 w-4" />
      Reject
    </button>
  );
};

export default RejectCompanies;
