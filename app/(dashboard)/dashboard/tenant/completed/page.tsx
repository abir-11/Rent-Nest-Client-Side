import React from "react";
import { getTenantRentals } from "../_actions/tenantActions";

export default async function TenantCompletedStaysPage() {
  const response = await getTenantRentals();
  let rentals: any[] = [];
  if (Array.isArray(response)) rentals = response;
  else if (Array.isArray(response?.data)) rentals = response.data;

  const completedStays = rentals.filter(r => r.status === "COMPLETED" || r.status === "APPROVED");

  return (
    <div className="p-6 sm:p-8 lg:p-10 text-gray-800 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hotel & Property Stay History</h1>
        <p className="text-gray-500 mt-1">Properties you have stayed at or currently approved for.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedStays.map((stay) => (
          <div key={stay.id || stay._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            <div className="h-40 bg-gray-100 rounded-xl overflow-hidden relative">
              <img 
                src={stay.property?.images?.[0] || stay.property?.profilePhoto || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80"} 
                alt="Property" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-gray-900 line-clamp-1">{stay.property?.title || "Luxury Apartment/Hotel"}</h3>
            <p className="text-xs text-gray-500">{stay.property?.location || "Dhaka, Bangladesh"}</p>
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="font-semibold text-emerald-600 text-sm">৳{stay.amount || stay.rentAmount}/mo</span>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">Completed</span>
            </div>
          </div>
        ))}
      </div>
      {completedStays.length === 0 && (
        <div className="p-8 text-center text-gray-400 bg-white rounded-2xl border border-gray-100">No completed stays yet.</div>
      )}
    </div>
  );
}