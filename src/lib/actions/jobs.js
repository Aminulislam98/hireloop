"use server";

import { serverMutation } from "../core/server";

export const createJobs = async (newJobData) => {
  serverMutation("/api/jobs", newJobData);
};
