import Image from "next/image";
import { Check, X } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { updateCompany } from "@/lib/actions/companies";
import ApprovedCompanies from "../actionClientButton/ApprovedCompanies";
import RejectCompanies from "../actionClientButton/RejectCompanies";

export const CompaniesTable = ({ companies }) => {
  return (
    <section className="rounded-lg border border-zinc-800 bg-zinc-950">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-base">
          <thead>
            <tr className="border-b border-zinc-800 text-sm text-zinc-400">
              <th className="px-4 py-3 font-medium">Company Name</th>
              <th className="px-4 py-3 font-medium">Industry</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Total Jobs</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date Submitted</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr
                key={company._id}
                className="border-b border-zinc-800 transition-colors duration-150 last:border-b-0 hover:bg-zinc-900"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-zinc-100">
                        {company.name}
                      </p>
                      <p className="text-sm text-zinc-500">{company.website}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-zinc-400">{company.industry}</td>
                <td className="px-4 py-3 text-zinc-400">{company.location}</td>
                <td className="px-4 py-3 text-zinc-400">
                  {company.applications}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={company.status} />
                </td>
                <td className="px-4 py-3 text-zinc-400">
                  {new Date(company.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {company?.status !== "Approve" && (
                      <ApprovedCompanies id={company._id} />
                    )}
                    <RejectCompanies id={company._id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
