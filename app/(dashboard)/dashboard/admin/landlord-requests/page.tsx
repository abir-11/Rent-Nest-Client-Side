import React from "react";
import LandlordRequestsClient from "../_components/LandlordRequestsClient";
import { getAdminLandlordRequests } from "../_actions/adminActions";

export default async function AdminLandlordRequestsPage() {

  const response = await getAdminLandlordRequests();
  const requests = response?.data || [];
  

  return (
    <div className="bg-gray-50 min-h-screen">
      <LandlordRequestsClient requests={requests} />
    </div>
  );
}