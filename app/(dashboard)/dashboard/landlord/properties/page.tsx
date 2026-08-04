import React from "react";
import { getLandLordProperties } from "../_actions/getLandlord";
import PropertiesClientView from "../_components/PropertiesClientView";

export default async function MyPropertiesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const response = await getLandLordProperties();
  let properties = response?.data || [];

  const search = searchParams?.search?.toLowerCase() || "";
  const sort = searchParams?.sort || "newest";

  // 1. Filter by location or title
  if (search) {
    properties = properties.filter(
      (p: any) =>
        p.title.toLowerCase().includes(search) ||
        p.location.toLowerCase().includes(search)
    );
  }

  // 2. Sort by Date and Price
  properties = properties.sort((a: any, b: any) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    // default: newest
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="p-6 sm:p-8 text-gray-800">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
        <p className="text-gray-500 mt-1">Manage, edit, and track your property listings.</p>
      </div>

      <PropertiesClientView initialProperties={properties} />
    </div>
  );
}