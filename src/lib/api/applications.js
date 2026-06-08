import { serverFetch } from "../core/server";

export const getApplicationByApplicant = async (applicantId) => {
  serverFetch(`/app/applications?applicantId=${applicantId}`);
};
