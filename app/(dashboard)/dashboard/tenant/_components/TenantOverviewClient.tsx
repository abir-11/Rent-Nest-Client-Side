"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, Clock, DollarSign, CreditCard } from "lucide-react";
import Link from "next/link";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function TenantOverviewClient({ rentals = [] }: { rentals: any[] }) {
  // Safe Array ensure করা
  const safeRentals = Array.isArray(rentals) ? rentals : [];

  // Stats calculation
  const totalRequests = safeRentals.length;
  const completedStays = safeRentals.filter(r => r.status === "COMPLETED" || r.status === "ACTIVE").length;
  const pendingRequests = safeRentals.filter(r => r.status === "PENDING").length;
  
  const totalSpent = safeRentals
    .filter(r => r.paymentStatus === "PAID")
    .reduce((acc, r) => acc + (r.amount || r.rentAmount || r.property?.price || 0), 0);

  const chartData = safeRentals.map((r, i) => ({
    name: r.property?.title?.slice(0, 10) || `Stay #${i + 1}`,
    Amount: r.amount || r.rentAmount || r.property?.price || 0,
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-6 sm:p-8 lg:p-10 space-y-8 text-gray-800">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tenant Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Track your bookings, payments, and request status.</p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Completed Stays", value: completedStays, icon: CheckCircle2, color: "bg-emerald-500" },
          { title: "Pending Requests", value: pendingRequests, icon: Clock, color: "bg-amber-500" },
          { title: "Total Requests", value: totalRequests, icon: Building2, color: "bg-blue-500" },
          { title: "Total Paid", value: `৳${totalSpent.toLocaleString()}`, icon: DollarSign, color: "bg-indigo-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.color} text-white rounded-full flex items-center justify-center shadow-md`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Payment History Overview (৳)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="Amount" fill="#059669" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Recent Rental Requests</h3>
          <Link href="/dashboard/tenant/requests" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold">Property</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Payment</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {safeRentals.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    No rental requests found.
                  </td>
                </tr>
              ) : (
                safeRentals.slice(0, 5).map((rental) => (
                  <tr key={rental.id || rental._id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-900">{rental.property?.title || "Apartment/Hotel"}</td>
                    <td className="px-6 py-4 font-semibold text-emerald-600">৳{rental.amount || rental.rentAmount || rental.property?.price || 0}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        rental.status === "APPROVED" || rental.status === "COMPLETED" ? "bg-emerald-100 text-emerald-700" :
                        rental.status === "REJECTED" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {rental.status || "PENDING"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        rental.paymentStatus === "PAID" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                      }`}>
                        {rental.paymentStatus || "UNPAID"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {rental.status === "APPROVED" && rental.paymentStatus !== "PAID" ? (
                        <Link href={`/dashboard/tenant/requests/${rental.id || rental._id}/pay`} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1">
                          <CreditCard className="w-3.5 h-3.5" /> Pay
                        </Link>
                      ) : (
                        <span className="text-gray-400 text-xs">N/A</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </motion.div>
  );
}