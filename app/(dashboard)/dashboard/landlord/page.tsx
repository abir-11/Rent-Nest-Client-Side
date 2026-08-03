import React from "react";
import DashboardClientView from "./_components/DashboardClientView";
import { getLandLordProperties } from "./_actions/getLandlord";

export default async function DashboardPage() {
  const response = await getLandLordProperties();
  const properties = response?.data || [];

  return <DashboardClientView properties={properties} />;
}