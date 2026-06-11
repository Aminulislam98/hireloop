"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

export const CompanyRowActions = ({ companyId, status, onUpdate }) => {
  const [loading, setLoading] = useState(null);

  const handleAction = async (newStatus) => {
    setLoading(newStatus);
    try {
      await onUpdate(companyId, newStatus);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {status !== "approved" && (
        <button
          type="button"
          onClick={() => handleAction("approved")}
          disabled={loading !== null}
          aria-label="Approve company"
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-none border border-success px-3 py-1.5 text-sm font-medium text-success transition-colors duration-150 hover:bg-success hover:text-text-on-brand active:scale-[0.98] disabled:opacity-50"
        >
          <Check className="h-4 w-4" />
          {loading === "approved" ? "Approving…" : "Approve"}
        </button>
      )}
      {status !== "rejected" && (
        <button
          type="button"
          onClick={() => handleAction("rejected")}
          disabled={loading !== null}
          aria-label="Reject company"
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-none border border-error px-3 py-1.5 text-sm font-medium text-error transition-colors duration-150 hover:bg-error hover:text-text-on-brand active:scale-[0.98] disabled:opacity-50"
        >
          <X className="h-4 w-4" />
          {loading === "rejected" ? "Rejecting…" : "Reject"}
        </button>
      )}
    </div>
  );
};
