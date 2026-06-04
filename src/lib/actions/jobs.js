"use server";

import { serverMutation } from "../core/server";

export const createJobs = async (newJobData) => {
  serverMutation("/api/jobs", newJobData);
};

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// export const createJobs = async (newJobData) => {
//   const res = await fetch(`${baseUrl}/api/jobs`, {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify(newJobData),
//   });
//   return await res.json();
// };
