"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Home, User, Calendar, CheckCircle, 
  XCircle, Clock, Loader2 
} from "lucide-react";
import toast from "react-hot-toast";
import { updateRentalRequestStatus } from "../_actions/rentalRequests";

export default function RentalRequestsClient({ requests = [] }: { requests: any[] }) {
  const safeRequests = Array.isArray(requests) ? requests : [];
  //console.log(safeRequests)
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Status Change Handler
  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setLoadingId(id);
    try {
      const res = await updateRentalRequestStatus(id, newStatus);
      
      if (res?.success) {
        toast.success(`Request has been ${newStatus.toLowerCase()} successfully.`);
      } else {
        toast.error(res?.message || "Failed to update request status.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoadingId(null);
    }
  };

  // Status Badge Component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-max"><CheckCircle className="w-3.5 h-3.5"/> Approved</span>;
      case "REJECTED":
        return <span className="bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-max"><XCircle className="w-3.5 h-3.5"/> Rejected</span>;
      case "PENDING":
        return <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-max"><Clock className="w-3.5 h-3.5"/> Pending</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-semibold">{status}</span>;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8"
    >
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Property Rental Requests</h1>
        <p className="text-gray-500 text-sm">
          Manage rental requests from tenants for your properties.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Property Info</th>
                <th className="px-6 py-4">Tenant Info</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {safeRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    <Home className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-base font-medium">No rental requests found.</p>
                  </td>
                </tr>
              ) : (
                safeRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50/60 transition-colors">
                    
                    {/* Property Info */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{req.properties?.title || "Unknown Property"}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Home className="w-3 h-3" /> ID: {req.properties?.id?.slice(0, 8)}
                      </div>
                    </td>

                    {/* Tenant Info */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-gray-400" />
                        {req.tenant?.name || "Tenant Name"}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 ml-5">
                        {req.tenant?.email || "No email provided"}
                      </div>
                    </td>

                    {/* Duration / Date */}
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{new Date(req.startDate).toLocaleDateString("en-GB")}</span>
                        <span className="text-gray-300">-</span>
                        <span>{new Date(req.endDate).toLocaleDateString("en-GB")}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <StatusBadge status={req.status} />
                    </td>

                    {/* Action Buttons */}
                    <td className="px-6 py-4 text-right">
                      {req.status?.toUpperCase() === "PENDING" ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleStatusUpdate(req.id, "APPROVED")}
                            disabled={loadingId === req.id}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 disabled:opacity-50"
                          >
                            {loadingId === req.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                            Approve
                          </button>
                          
                          <button
                            onClick={() => handleStatusUpdate(req.id, "REJECTED")}
                            disabled={loadingId === req.id}
                            className="bg-rose-100 hover:bg-rose-200 text-rose-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 disabled:opacity-50"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Action taken</span>
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