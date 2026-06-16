// import UserManagement from "@/components/dashboard/UserManagement";
// import { getUserList } from "@/lib/api/users";

// const AdminUsersPage = async () => {
//   let raw = [];
//   let hasError = false;
//   try {
//     const data = await getUserList();
//     raw = Array.isArray(data) ? data : data?.users || [];
//   } catch {
//     hasError = true;
//   }

//   const users = raw.map((u, i) => ({
//     id: String(u._id ?? u.id ?? u.email ?? i),
//     name: (u.name || "Unknown").trim(),
//     email: u.email || "",
//     image: u.image || null,
//     role: (u.role || "seeker").toLowerCase(),
//     status: (u.status || "active").toLowerCase(),
//     createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : null,
//   }));

//   return <UserManagement users={users} hasError={hasError} />;
// };

// export default AdminUsersPage;
