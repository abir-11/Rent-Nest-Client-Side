"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Receipt, CheckCircle2, XCircle, Clock, 
  Calendar, Hash, DollarSign
} from "lucide-react";

function normalizePayments(input: any): any[] {
  if (Array.isArray(input)) return input;
  if (Array.isArray(input?.data)) return input.data;
  if (Array.isArray(input?.data?.data)) return input.data.data;
  return [];
}

export default function PaymentHistoryClient({ payments = [] }: { payments: any }) {
  const safePayments = normalizePayments(payments);

  const paymentHistory = safePayments.filter(
    (payment) => payment?.status?.toUpperCase() === "PAID"
  );

  const totalPaid = paymentHistory.reduce(
    (acc, curr) => acc + Number(curr.amount || 0),
    0
  );

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PAID":
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Paid
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-full text-xs font-semibold">
            <XCircle className="w-3.5 h-3.5" /> Failed
          </span>
        );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8"
    >
      {/* Header & Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-1">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Payment History</h1>
          <p className="text-gray-500 text-sm">
            View all your transaction details and payment records in one place.
          </p>
        </div>
        
        {/* Total Paid Card */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200 flex items-center justify-between">
          <div>
            <p className="text-emerald-100 text-sm font-medium mb-1">Total Amount Paid</p>
            <h3 className="text-3xl font-bold">৳{totalPaid.toLocaleString()}</h3>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <Receipt className="w-5 h-5 text-gray-500" />
          <h3 className="font-bold text-gray-800">Transaction Records</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Property Info</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {paymentHistory.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    <Receipt className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-base font-medium">No successful payment history found.</p>
                  </td>
                </tr>
              ) : (
                paymentHistory.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50/60 transition-colors">
                    
                    {/* Transaction ID */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-mono text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md w-max">
                        <Hash className="w-3 h-3 text-gray-400" />
                        {payment.id?.slice(0, 8).toUpperCase()}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(payment.paidAt || payment.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </div>
                      <span className="text-xs text-gray-400 ml-5">
                        {new Date(payment.paidAt || payment.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit", minute: "2-digit"
                        })}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-700">
                      {payment.rentalRequest?.properties?.title || "Rent Payment"}
                      <div className="text-xs text-gray-400 font-normal mt-0.5">
                        Via {payment.method || "Gateway"}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 font-bold text-gray-900">
                      ৳{Number(payment.amount || 0).toLocaleString()}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-right">
                      {getStatusBadge(payment.status)}
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