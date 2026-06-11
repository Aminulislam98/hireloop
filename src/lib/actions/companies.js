// actions/company.actions.js
"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const CreateCompany = async (newCompanyData) => {
  return serverMutation("/api/companies", newCompanyData);
};
export const updateCompany = async (id, data) => {
  const result = serverMutation(`/api/companies/${id}`, data, "PATCH");
  revalidatePath("/dashboard/admin/company");
  return result;
};
