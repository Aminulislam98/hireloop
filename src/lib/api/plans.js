import { serverFetch } from "../core/server";

export const getPlanById = async (planId) => {
  console.log("this is user plan in js:", planId);
  return serverFetch(`/api/plans?planId=${planId}`);
};
