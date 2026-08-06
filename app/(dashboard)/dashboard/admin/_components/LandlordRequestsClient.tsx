"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle, Clock, X, MessageSquare, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { replyLandlordRequestAction } from "../_actions/adminActions";

export default function LandlordRequestsClient({ requests }: { requests: any[] }) {
  const router = useRouter();
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  
  // Modal states
  const [adminReply, setAdminReply] = useState("");
  const [status, setStatus] = useState("RESOLVED");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = (req: any) => {
    setSelectedRequest(req);
    setAdminReply(req.reply || "");
    setStatus(req.landlordStatus || "RESOLVED");
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setAdminReply("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;

    try {
      setIsSubmitting(true);
      const res = await replyLandlordRequestAction(selectedRequest.id, {
        adminReply,
        status,
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
        <h1 className="text-2xl font-bold text-gray-900">Landlord Requests</h1>
        <p className="text-gray-500 text-sm">Manage and reply to landlord partnership requests.</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold">User Info</th>
                <th className="px-6 py-4 font-semibold">Subject</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{req.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Mail className="w-3 h-3" /> {req.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="line-clamp-1">{req.subject || "N/A"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        req.landlordStatus === "RESOLVED"
                          ? "bg-emerald-100 text-emerald-700"
                          : req.landlordStatus === "REJECTED"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {req.landlordStatus === "RESOLVED" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {req.landlordStatus === "PENDING" && <Clock className="w-3 h-3 mr-1" />}
                      {req.landlordStatus || "PENDING"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openModal(req)}
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

          {requests.length === 0 && (
            <div className="p-8 text-center text-gray-500">No landlord requests found.</div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Request Details</h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {/* User Info Details */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <span className="block text-gray-500 mb-1">Name</span>
                    <span className="font-medium text-gray-900">{selectedRequest.name}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 mb-1">Email</span>
                    <span className="font-medium text-gray-900">{selectedRequest.email}</span>
                  </div>
                  {selectedRequest.phone && (
                    <div>
                      <span className="block text-gray-500 mb-1">Phone</span>
                      <span className="font-medium text-gray-900 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {selectedRequest.phone}
                      </span>
                    </div>
                  )}
                  {selectedRequest.nid && (
                    <div>
                      <span className="block text-gray-500 mb-1">NID</span>
                      <span className="font-medium text-gray-900 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" /> {selectedRequest.nid}
                      </span>
                    </div>
                  )}
                </div>

                {/* Address & Message */}
                <div className="mb-6 text-sm">
                  {selectedRequest.propertyAddress && (
                    <div className="mb-4">
                      <span className="block text-gray-500 mb-1">Property Address</span>
                      <div className="p-3 bg-gray-50 rounded-lg flex gap-2 text-gray-800 border border-gray-100">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        {selectedRequest.propertyAddress}
                      </div>
                    </div>
                  )}
                  <div>
                    <span className="block text-gray-500 mb-1">Message</span>
                    <div className="p-4 bg-gray-50 rounded-lg text-gray-800 border border-gray-100 whitespace-pre-wrap">
                      {selectedRequest.message}
                    </div>
                  </div>
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSubmit} className="border-t border-gray-100 pt-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="RESOLVED">Resolved / Approved</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Admin Reply</label>
                    <textarea
                      required
                      rows={4}
                      value={adminReply}
                      onChange={(e) => setAdminReply(e.target.value)}
                      placeholder="Type your reply to the landlord..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
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
                      {isSubmitting ? "Sending..." : "Submit Reply"}
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