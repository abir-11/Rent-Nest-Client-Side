import React from "react";
import TenantOverviewClient from "./_components/TenantOverviewClient";
import { getTenantRentals } from "./_actions/tenantActions";

export default async function TenantOverviewPage() {
  const response = await getTenantRentals();
  
  let rentals: any[] = [];
  if (Array.isArray(response)) rentals = response;
  else if (Array.isArray(response?.data)) rentals = response.data;
  else if (Array.isArray(response?.data?.data)) rentals = response.data.data;

  return <TenantOverviewClient rentals={rentals} />;
}