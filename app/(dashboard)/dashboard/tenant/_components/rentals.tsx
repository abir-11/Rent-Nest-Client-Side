"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2, CreditCard, Clock, CheckCircle2,
  XCircle, Calendar, MapPin, Loader2, ShieldCheck, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { createPayment } from "../_actions/paymentActions";

export default function MyRentalsClient({ rentalsData }: { rentalsData: any[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const sortedRentals = [...(rentalsData || [])].sort((a, b) => {
    if (a.status === "PENDING" && b.status !== "PENDING") return -1;
    if (a.status !== "PENDING" && b.status === "PENDING") return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handlePayment = async (item: any) => {
    setLoadingId(item.id);
    try {
      // পুরো rental item পাঠাচ্ছি যাতে price ও landlordId সহজে পাওয়া যায়
      const res = await createPayment(item);

      if (res?.success) {
        // ব্যাকএন্ড response structured অনুযায়ী URL redirect
        const gatewayUrl = res?.data?.paymentUrl || res?.paymentUrl || res?.data?.url;

        if (gatewayUrl) {
          toast.success("Redirecting to payment gateway...");
          window.location.href = gatewayUrl;
        } else {
          toast.error("Payment URL not found in API response.");
        }
      } else {
        toast.error(res?.message || "Failed to initiate payment");
      }
    } catch (error) {
      toast.error("An error occurred while processing payment.");
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusBadge = (status: string, paymentStatus?: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending Approval
          </Badge>
        );

      case "APPROVED":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-200">
            <ShieldCheck className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );

      case "ACTIVE":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );

      case "COMPLETED":
        return (
          <Badge className="bg-green-500/10 text-green-700 border-green-200">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );

      case "REJECTED":
        return (
          <Badge className="bg-rose-500/10 text-rose-600 border-rose-200">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );

      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Rental Requests</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your rental applications, payment status, and stay details.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100">
          <Building2 className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-semibold text-gray-700">
            Total Requests: {sortedRentals.length}
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Property Info</th>
                <th className="px-6 py-4">Rent Price</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action / Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {sortedRentals.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-base font-medium">No rental requests found.</p>
                  </td>
                </tr>
              ) : (
                sortedRentals.map((item) => {
                  const prop = item.properties || {};
const isPaid =
  item.status === "ACTIVE" || item.status === "COMPLETED";

const canPay =
  item.status === "APPROVED" ||
  (item.status === "ACTIVE" && !isPaid);

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-gray-50/60 transition-colors ${item.status === "PENDING" ? "bg-amber-50/30" : ""
                        }`}
                    >
                      {/* Property Details */}
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
                            {prop.title ? prop.title.charAt(0) : "P"}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 line-clamp-1">
                              {prop.title || "N/A"}
                            </h4>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              {prop.location || "Location not specified"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Rent Price */}
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        ৳{(prop.price || 0).toLocaleString()} <span className="text-xs font-normal text-gray-500">/mo</span>
                      </td>

                      {/* Start & End Dates */}
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex flex-col text-xs space-y-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            {new Date(item.startDate).toLocaleDateString("en-GB")}
                          </span>
                          <span className="text-gray-400 pl-4">to {new Date(item.endDate).toLocaleDateString("en-GB")}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {getStatusBadge(item.status, item.paymentStatus)}
                      </td>

                      {/* Payment Action Button */}
                     <td className="px-6 py-4 text-right">
  {canPay ? (
    <Button
      onClick={() => handlePayment(item)}
      disabled={loadingId === item.id}
      className="bg-emerald-600 hover:bg-emerald-700 text-white"
    >
      {loadingId === item.id ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          <CreditCard className="w-4 h-4 mr-1" />
          Pay Now
        </>
      )}
    </Button>
  ) : isPaid ? (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
      <CheckCircle2 className="w-4 h-4" />
      Paid
    </span>
  ) : item.status === "PENDING" ? (
    <span className="text-xs text-amber-600 font-medium bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
      Waiting for Landlord
    </span>
  ) : item.status === "REJECTED" ? (
    <></>
  ) : null}
</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}