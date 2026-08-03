import React from "react";
import { getAdminUsers } from "../_actions/adminActions";
import UsersClient from "../_components/UsersClient";

export default async function AdminUsersPage() {
  const response = await getAdminUsers();
  const users = response?.data || [];

  return <UsersClient users={users} />;
}