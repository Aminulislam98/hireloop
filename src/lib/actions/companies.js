// actions/company.actions.js
"use server";

import { serverMutation } from "../core/server";

export const CreateCompany = async (newCompanyData) => {
  return serverMutation("/api/companies", newCompanyData);
};

// export const CreateCompany = async (newCompanyData) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/companies`, {
//     // ← was /api/company
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(newCompanyData),
//   });
//   if (!res.ok) throw new Error("Failed to save company");
//   return res.json();
// };
