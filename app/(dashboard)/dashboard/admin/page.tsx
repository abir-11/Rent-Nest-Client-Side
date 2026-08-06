export const dynamic = "force-dynamic";
import React from "react";
import AdminDashboardClientView from "./_components/AdminDashboardClientView";
import { 
  getAdminUsers, 
  getAdminProperties, 
  getAdminRentals, 
  getAdminComplaints,
  getAdminLandlordRequests 
} from "./_actions/adminActions"; 

export default async function AdminDashboardPage() {
  const [
    usersRes, 
    propertiesRes, 
    rentalsRes, 
    complaintsRes, 
    landlordRequestsRes
  ] = await Promise.all([
    getAdminUsers(),
    getAdminProperties(),
    getAdminRentals(),
    getAdminComplaints(),
    getAdminLandlordRequests()
  ]);

  const users = usersRes?.data || [];
  const properties = propertiesRes?.data || [];
  const rentals = rentalsRes?.data || [];
  const complaints = complaintsRes?.data || [];
  const landlordRequests = landlordRequestsRes?.data || [];

  return (
    <AdminDashboardClientView 
      users={users} 
      properties={properties} 
      rentals={rentals} 
      complaints={complaints}
      landlordRequests={landlordRequests}
    />
  );
}