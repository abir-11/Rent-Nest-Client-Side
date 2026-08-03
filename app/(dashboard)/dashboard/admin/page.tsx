import React from "react";
import AdminDashboardClientView from "./_components/AdminDashboardClientView";
import { getAdminUsers, getAdminProperties, getAdminRentals } from "./_actions/adminActions";

export default async function AdminDashboardPage() {
  // Fetch all admin data concurrently to improve loading speed
  const [usersRes, propertiesRes, rentalsRes] = await Promise.all([
    getAdminUsers(),
    getAdminProperties(),
    getAdminRentals()
  ]);

  const users = usersRes?.data || [];
  const properties = propertiesRes?.data || [];
  const rentals = rentalsRes?.data || [];

  return (
    <AdminDashboardClientView 
      users={users} 
      properties={properties} 
      rentals={rentals} 
    />
  );
}