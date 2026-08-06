"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle, Clock, X, MessageSquare, AlertCircle, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { replyComplaintAction } from "../_actions/adminComplaints";

export default function ComplaintsClient({ complaints }: { complaints: any[] }) {
  const router = useRouter();
  const [selectedComplaint, setSelectedComplaint] = useState<any | null>(null);
  
  // Modal states
  const [adminReply, setAdminReply] = useState("");
  const [status, setStatus] = useState("RESOLVED");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = (comp: any) => {
    setSelectedComplaint(comp);
    setAdminReply(comp.adminReply || "");
    setStatus(comp.status || "RESOLVED");
  };

  const closeModal = () => {
    setSelectedComplaint(null);
    setAdminReply("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    try {
      setIsSubmitting(true);
      const res = await replyComplaintAction(selectedComplaint.id, {
        adminReply,
        complaintStatus: status, 
      });

      if (res) {
        alert("Reply submitted successfully!");
        closeModal();
        router.refresh(); 
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit reply.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Complaints</h1>
        <p className="text-gray-500 text-sm">Review and resolve issues reported by users.</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold">User Info</th>
                <th className="px-6 py-4 font-semibold">Subject / Property</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {complaints.map((comp) => (
                <tr key={comp.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{comp.name || comp.user?.name || "Anonymous"}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Mail className="w-3 h-3" /> {comp.email || comp.user?.email || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800 line-clamp-1">{comp.subject || "No Subject"}</div>
                    {comp.propertyId && (
                      <div className="text-xs text-blue-600 flex items-center gap-1 mt-1">
                        <Home className="w-3 h-3" /> Property Related
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        comp.status === "RESOLVED"
                          ? "bg-emerald-100 text-emerald-700"
                          : comp.status === "REJECTED"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {comp.status === "RESOLVED" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {comp.status === "PENDING" && <Clock className="w-3 h-3 mr-1" />}
                      {comp.status || "PENDING"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openModal(comp)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      View & Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {complaints.length === 0 && (
            <div className="p-8 text-center text-gray-500 flex flex-col items-center">
              <AlertCircle className="w-8 h-8 text-gray-300 mb-2" />
              No complaints found.
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      <AnimatePresence>
        {selectedComplaint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-rose-500" />
                  Complaint Details
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[65vh]">
                {/* Details Section */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                  <div className="mb-4">
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Subject</span>
                    <div className="text-gray-900 font-medium">{selectedComplaint.subject || "N/A"}</div>
                  </div>
                  
                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Complaint Message</span>
                    <div className="text-gray-700 whitespace-pre-wrap text-sm">
                      {selectedComplaint.message || selectedComplaint.description}
                    </div>
                  </div>
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSubmit} className="border-t border-gray-100 pt-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="RESOLVED">Resolved</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Admin Response</label>
                    <textarea
                      required
                      rows={4}
                      value={adminReply}
                      onChange={(e) => setAdminReply(e.target.value)}
                      placeholder="Type your official response/solution here..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-colors disabled:opacity-70 flex items-center gap-2"
                    >
                      {isSubmitting ? "Submitting..." : "Send Reply & Update"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}