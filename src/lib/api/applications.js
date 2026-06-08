import { serverFetch } from "../core/server";

export const getApplicationByApplicant = async (applicantId) => {
  console.log("this is applicantId:", applicantId);
  return serverFetch(`/api/applications?applicantId=${applicantId}`);
};
