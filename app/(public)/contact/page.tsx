"use client";

import React, { useState } from "react";
import {
  Building,
  AlertCircle,
  Send,
  Loader2,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { IComplaintPayload, ILandlordRequestPayload,  submitComplaint, submitLandlordRequest } from "../_actions/submitContactRequest";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"LANDLORD_REQUEST" | "COMPLAINT">(
    "LANDLORD_REQUEST"
  );
  const [loading, setLoading] = useState(false);

  // ১. Landlord Request Form State
  const [landlordData, setLandlordData] = useState<ILandlordRequestPayload>({
    type: "LANDLORD_REQUEST",
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    nid: "",
    propertyAddress: "",
    evidenceUrl: "",
  });

  // ২. Complaint Form State
  const [complaintData, setComplaintData] = useState<IComplaintPayload>({
    subject: "",
    message: "",
  });

  // Landlord Request Submit Handler
  const handleLandlordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await submitLandlordRequest(landlordData);

      if (res?.success) {
        toast.success("Landlord request submitted successfully!");
        setLandlordData({
          type: "LANDLORD_REQUEST",
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          nid: "",
          propertyAddress: "",
          evidenceUrl: "",
        });
      } else {
        toast.error(res?.message || "Failed to submit landlord request.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting.");
    } finally {
      setLoading(false);
    }
  };

  // Complaint Submit Handler
  const handleComplaintSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await submitComplaint(complaintData);

      if (res?.success) {
        toast.success("Complaint submitted successfully!");
        setComplaintData({
          subject: "",
          message: "",
        });
      } else {
        toast.error(res?.message || "Failed to submit complaint.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Get in <span className="text-emerald-500">Touch</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Apply to become a verified landlord or submit a complaint regarding any issue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Info Sidebar */}
          <div className="lg:col-span-1 bg-gray-800/60 border border-white/10 p-6 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">
              Contact Information
            </h3>

            <div className="space-y-4 text-gray-300 text-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email Us</p>
                  <p className="font-medium text-white">support@rentnest.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Call Us</p>
                  <p className="font-medium text-white">+880 1700-000000</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Office Address</p>
                  <p className="font-medium text-white">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-xs text-emerald-300 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Quick Resolution
                </p>
                <p className="text-gray-400">
                  Our support team reviews every submission promptly.
                </p>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="lg:col-span-2 bg-gray-800/80 border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl space-y-6">
            {/* Tab Selection */}
            <div className="flex p-1 bg-gray-900/80 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("LANDLORD_REQUEST")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "LANDLORD_REQUEST"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Building className="w-4 h-4" /> Become Landlord
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("COMPLAINT")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "COMPLAINT"
                    ? "bg-rose-600 text-white shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <AlertCircle className="w-4 h-4" /> Submit Complaint
              </button>
            </div>

            {/* Form 1: Landlord Request */}
            {activeTab === "LANDLORD_REQUEST" && (
              <form onSubmit={handleLandlordSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Name *</label>
                    <Input
                      name="name"
                      value={landlordData.name}
                      onChange={(e) =>
                        setLandlordData({ ...landlordData, name: e.target.value })
                      }
                      placeholder="Your Name"
                      required
                      className="bg-gray-900/80 border-white/10 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      value={landlordData.email}
                      onChange={(e) =>
                        setLandlordData({ ...landlordData, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      required
                      className="bg-gray-900/80 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Phone</label>
                    <Input
                      name="phone"
                      value={landlordData.phone}
                      onChange={(e) =>
                        setLandlordData({ ...landlordData, phone: e.target.value })
                      }
                      placeholder="+880 1..."
                      className="bg-gray-900/80 border-white/10 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Subject</label>
                    <Input
                      name="subject"
                      value={landlordData.subject}
                      onChange={(e) =>
                        setLandlordData({ ...landlordData, subject: e.target.value })
                      }
                      placeholder="e.g. Landlord Verification Request"
                      className="bg-gray-900/80 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">NID Number</label>
                    <Input
                      name="nid"
                      value={landlordData.nid}
                      onChange={(e) =>
                        setLandlordData({ ...landlordData, nid: e.target.value })
                      }
                      placeholder="NID Number"
                      className="bg-gray-900/80 border-white/10 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Property Address</label>
                    <Input
                      name="propertyAddress"
                      value={landlordData.propertyAddress}
                      onChange={(e) =>
                        setLandlordData({
                          ...landlordData,
                          propertyAddress: e.target.value,
                        })
                      }
                      placeholder="Property Location"
                      className="bg-gray-900/80 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">
                    Evidence Link (Google Drive / Image)
                  </label>
                  <Input
                    name="evidenceUrl"
                    value={landlordData.evidenceUrl}
                    onChange={(e) =>
                      setLandlordData({
                        ...landlordData,
                        evidenceUrl: e.target.value,
                      })
                    }
                    placeholder="https://..."
                    className="bg-gray-900/80 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Message *</label>
                  <Textarea
                    name="message"
                    value={landlordData.message}
                    onChange={(e:any) =>
                      setLandlordData({ ...landlordData, message: e.target.value })
                    }
                    rows={4}
                    placeholder="Provide details about your landlord request..."
                    required
                    className="bg-gray-900/80 border-white/10 text-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" /> Submit Landlord Application
                    </span>
                  )}
                </Button>
              </form>
            )}

            {/* Form 2: Complaint */}
            {activeTab === "COMPLAINT" && (
              <form onSubmit={handleComplaintSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">
                    Complaint Subject
                  </label>
                  <Input
                    name="subject"
                    value={complaintData.subject}
                    onChange={(e) =>
                      setComplaintData({ ...complaintData, subject: e.target.value })
                    }
                    placeholder="e.g. Payment Issue or Landlord Misbehavior"
                    className="bg-gray-900/80 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Message *</label>
                  <Textarea
                    name="message"
                    value={complaintData.message}
                    onChange={(e:any) =>
                      setComplaintData({ ...complaintData, message: e.target.value })
                    }
                    rows={5}
                    placeholder="Describe your issue in detail..."
                    required
                    className="bg-gray-900/80 border-white/10 text-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" /> Submit Complaint
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}