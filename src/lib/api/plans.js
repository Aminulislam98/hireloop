import { serverFetch } from "../core/server";

export const getPlanById = async (jobId) => {
  return serverFetch(`/api/jobs/${jobId}`);
};
