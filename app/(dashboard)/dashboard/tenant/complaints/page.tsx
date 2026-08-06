import React from "react";
import MyComplaintsClient from "../_components/MyComplaintsClient";
import { getMyComplaintsAction } from "../_actions/userComplaints";

export default async function MyComplaintsPage() {
  const response = await getMyComplaintsAction();
  const complaints = response?.data || [];

  return (
    <div className="bg-gray-50 min-h-screen">
      <MyComplaintsClient complaints={complaints} />
    </div>
  );
}