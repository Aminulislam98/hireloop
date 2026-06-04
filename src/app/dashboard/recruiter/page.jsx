"use client";
import StatsGrid from "@/components/dashboard/DashboardStats";
import { authClient } from "@/lib/auth-client";
import { FileText, Users, Zap, CheckCircle } from "lucide-react";

const stats = [
  { id: "posts", label: "Total Job Posts", value: 48, icon: FileText },
  { id: "applicants", label: "Total Applicants", value: 1284, icon: Users },
  { id: "active", label: "Active Jobs", value: 18, icon: Zap },
  { id: "closed", label: "Jobs Closed", value: 32, icon: CheckCircle },
];

const RecruiterDashboardHomePage = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <div className="p-6 space-y-6 ">
      <h1 className="text-xl font-semibold text-zinc-100">
        {isPending ? "Loading..." : `Welcome, ${session?.user?.name}`}
      </h1>
      <StatsGrid stats={stats} />
    </div>
  );
};

export default RecruiterDashboardHomePage;
