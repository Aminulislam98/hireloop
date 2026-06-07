import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();
  if (!user) {
    redirect(`/signup?callbackUrl=/jobs/${id}/apply`);
  }

  return <div>This is apply page!</div>;
};

export default ApplyPage;
