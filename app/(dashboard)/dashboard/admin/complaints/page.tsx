import React from "react";
import { getAdminComplaints } from "../_actions/adminComplaints";
import ComplaintsClient from "../_components/ComplaintsClient";

export default async function AdminComplaintsPage() {
    
  const response = await getAdminComplaints();
  const complaints = response?.data || [];


  return (
    <div className="bg-gray-50 min-h-screen">
      <ComplaintsClient complaints={complaints} />
    </div>
  );
}