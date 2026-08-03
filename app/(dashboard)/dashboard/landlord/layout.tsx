import React from "react";
import DashboardLayoutClient from "./_components/DashboardLayoutClient";

export default function LandlordLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}