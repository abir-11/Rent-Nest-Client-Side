import React from "react";
import PropertiesClient from "../_components/PropertiesClient";
import { getAdminProperties } from "../_actions/adminActions";

export default async function AdminPropertiesPage() {
  const response = await getAdminProperties();
  const properties = response?.data || [];

  return <PropertiesClient properties={properties} />;
}