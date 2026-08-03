import React from "react";
import { getAdminRentals } from "../_actions/adminActions";
import RentalsClient from "../_components/RentalsClient";

export default async function AdminRentalsPage() {
  const response = await getAdminRentals();
  const rentals = response?.data || [];

  return <RentalsClient rentals={rentals} />;
}