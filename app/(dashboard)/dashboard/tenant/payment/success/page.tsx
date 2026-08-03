import React from "react";
import { getTenantRentals } from "../../_actions/tenantActions";

export default async function TenantPaymentsPage() {
  const response = await getTenantRentals();
  let rentals: any[] = [];
  if (Array.isArray(response)) rentals = response;
  else if (Array.isArray(response?.data)) rentals = response.data;

  // শুধুমাত্র PAID স্ট্যাটাসের পেমেন্ট ফিল্টার
  const paidHistory = rentals.filter(r => r.paymentStatus === "PAID");

  return (
    <div className="p-6 sm:p-8 lg:p-10 text-gray-800 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
        <p className="text-gray-500 mt-1">View all completed transactions and receipts.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-4 font-semibold">Property</th>
              <th className="px-6 py-4 font-semibold">Amount Paid</th>
              <th className="px-6 py-4 font-semibold">Transaction Date</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paidHistory.map((item) => (
              <tr key={item.id || item._id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 font-medium text-gray-900">{item.property?.title || "Property Stay"}</td>
                <td className="px-6 py-4 font-bold text-emerald-600">৳{item.amount || item.rentAmount}</td>
                <td className="px-6 py-4">{new Date(item.updatedAt || item.createdAt || Date.now()).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                    SUCCESS
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {paidHistory.length === 0 && (
          <div className="p-8 text-center text-gray-400">No payment history found.</div>
        )}
      </div>
    </div>
  );
}