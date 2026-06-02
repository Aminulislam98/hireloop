import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex ">
      <DashboardSidebar />
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
