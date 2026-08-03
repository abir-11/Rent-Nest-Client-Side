import React from "react";
import AddPropertyForm from "../../_components/AddPropertyForm";
import { getCategories } from "../../_actions/property";

export default async function AddPropertyPage() {
  const response = await getCategories();

 const categories = response?.data?.result || [];


  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Add New Property</h1>
        <p className="text-gray-500 mt-1">Fill in the details to list your new property.</p>
      </div>

      <AddPropertyForm categories={categories}/>
    </div>
  );
}