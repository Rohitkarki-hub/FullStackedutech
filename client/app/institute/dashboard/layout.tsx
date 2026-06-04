import Dashboard from "@/src/lib/components/dashboard/dashboard";
import React from "react";

function InstituteDashboardLayout({ children }: { children: React.ReactNode }) {
  return <Dashboard>{children}</Dashboard>;
}

export default InstituteDashboardLayout;
