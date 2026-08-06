"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle, XCircle, AlertCircle, MessageSquare, Calendar } from "lucide-react";

export default function MyComplaintsClient({ complaints }: { complaints: any[] }) {
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "RESOLVED":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
            <CheckCircle className="w-3 h-3 mr-1" /> Resolved
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700">
            <XCircle className="w-3 h-3 mr-1" /> Rejected
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            <Clock className="w-3 h-3 mr-1" /> In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            <AlertCircle className="w-3 h-3 mr-1" /> Pending
          </span>
        );
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Complaints</h1>
        <p className="text-gray-500 text-sm mt-1">Track the status and updates of your submitted complaints.</p>
      </div>

      {complaints.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
          <AlertCircle className="w-10 h-10 text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Complaints Found</h3>
          <p className="text-gray-500 text-sm">You haven't submitted any complaints yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {complaints.map((comp) => (
            <div key={comp.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              
              {/* Card Header */}
              <div className="p-5 border-b border-gray-50 flex justify-between items-start gap-4 bg-gray-50/50">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{comp.subject || "No Subject"}</h3>
                  <div className="flex items-center text-xs text-gray-500 gap-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(comp.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}
                    </span>
                  </div>
                </div>
                <div>{getStatusBadge(comp.status)}</div>
              </div>

              {/* User Message */}
              <div className="p-5 flex-grow">
                <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Your Message</span>
                <p className="text-gray-700 text-sm whitespace-pre-wrap">
                  {comp.message || comp.description}
                </p>
              </div>

              {/* Admin Reply Section */}
              {comp.adminReply && (
                <div className="p-5 bg-emerald-50/50 border-t border-emerald-100">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Admin Response</span>
                  </div>
                  <p className="text-emerald-900 text-sm whitespace-pre-wrap">
                    {comp.adminReply}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}