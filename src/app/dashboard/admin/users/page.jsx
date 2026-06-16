import { getUserList } from "@/lib/api/users";
// import React from "react";

const AdminUsersPage = async () => {
  const data = await getUserList();
  const users = data?.users || [];
  return <div>hi</div>;
};

export default AdminUsersPage;
