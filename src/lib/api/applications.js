import { protectedFetch } from "../core/server";

export const getApplicationByApplicant = async (applicantId) => {
  console.log("this is applicantId:", applicantId);
  return protectedFetch(`/api/applications?applicantId=${applicantId}`);
};
