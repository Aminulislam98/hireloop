import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex ">
      <DashboardSidebar />
      <div className="p-3 border max-w-full  w-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
