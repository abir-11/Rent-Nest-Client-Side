"use client";

import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, MapPin, FileText, Camera, Edit2, X, Mail, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";
import { updateMyProfile } from "../_actions/profileActions";

export default function ProfileClient({ profile }: { profile: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const profileDetails = profile?.profiles?.[0] || {};

  // Form State Initialization
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    phoneNumber: profile?.phoneNumber || "",
    profilePhoto: profileDetails?.profilePhoto || "",
    bio: profileDetails?.bio || "",
    address: profileDetails?.address || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await updateMyProfile(formData);
      
      if (res?.success) {
        setIsModalOpen(false); 
        
        // Success Alert
        Swal.fire({
          title: "Success!",
          text: "Your profile has been updated successfully.",
          icon: "success",
          confirmButtonColor: "#059669", 
        });
      } else {
        // Error Alert
        Swal.fire({
          title: "Error!",
          text: res?.message || "Failed to update profile. Please try again.",
          icon: "error",
          confirmButtonColor: "#ef4444", 
        });
      }
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 lg:p-8 max-w-5xl mx-auto">
      
      {/* Profile Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your personal information and settings.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
        >
          <Edit2 className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      {/* Profile Information Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-500 w-full"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6 flex items-end gap-6">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-md flex items-center justify-center shrink-0">
              {profileDetails?.profilePhoto ? (
                <Image src={profileDetails.profilePhoto} alt="Profile" width={128} height={128} className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <div className="pb-2">
              <h2 className="text-2xl font-bold text-gray-900">{profile?.name || "User Name"}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 uppercase tracking-wide">
                  {profile?.role}
                </span>
                {profile?.status === 'ACTIVE' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                    <ShieldCheck className="w-3 h-3" /> Active
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-emerald-500" />
                    <span>{profile?.email || "Not Provided"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-emerald-500" />
                    <span>{profile?.phoneNumber || "Not Provided"}</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{profileDetails?.address || "Not Provided"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">About Me</h3>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-gray-600 leading-relaxed min-h-[120px]">
                {profileDetails?.bio ? profileDetails.bio : "No bio added yet. Click 'Edit Profile' to tell us about yourself."}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-xl font-bold text-gray-900">Update Profile</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-500" /> Full Name
                    </label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      placeholder="e.g. Arafat Abir" required
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-500" /> Phone Number
                    </label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      placeholder="e.g. 01712345678"
                    />
                  </div>
                </div>

                {/* Profile Photo URL */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-emerald-500" /> Profile Photo URL
                  </label>
                  <input type="url" name="profilePhoto" value={formData.profilePhoto} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="https://i.ibb.co/example/photo.jpg"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-500" /> Address
                  </label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="e.g. Dhanmondi, Dhaka"
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-500" /> Short Bio
                  </label>
                  <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                    placeholder="Tell us a bit about yourself..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button type="submit" disabled={isPending}
                    className="px-6 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isPending ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : null}
                    {isPending ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}