"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Edit3, Trash2, X, SlidersHorizontal, MapPin } from "lucide-react";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteLandlordProperty } from "../_actions/deleteLandlordProperties";
import { updateLandlordProperty } from "../_actions/updateLandlordProperty";

export default function PropertiesClientView({ initialProperties }: { initialProperties: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    router.replace(`?${params.toString()}`);
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: '#ffffff',
      customClass: { title: 'text-gray-900 font-bold', popup: 'rounded-2xl' }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteLandlordProperty(id);
        if (res.success) {
          Swal.fire("Deleted!", "Property has been removed.", "success");
          router.refresh();
        } else {
          Swal.fire("Error!", res.message, "error");
        }
      }
    });
  };

  const openEditModal = (property: any) => {
    setEditingProperty({ ...property });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const res = await updateLandlordProperty(editingProperty.id, {
      title: editingProperty.title,
      price: Number(editingProperty.price),
      location: editingProperty.location,
      isAvailable: editingProperty.isAvailable,
    });
    setIsUpdating(false);

    if (res.success) {
      setIsEditModalOpen(false);
      Swal.fire({ title: "Updated!", text: "Property successfully updated.", icon: "success", timer: 1500 });
      router.refresh();
    } else {
      Swal.fire("Error!", res.message, "error");
    }
  };

  return (
    <div className="space-y-6">
      
      {/*  Top Bar: Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
        
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by location or title..."
            defaultValue={searchParams.get("search") || ""}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <SlidersHorizontal className="text-gray-500 w-5 h-5" />
          <select
            defaultValue={searchParams.get("sort") || "newest"}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            className="bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer w-full md:w-auto"
          >
            <option value="newest">Date: Newest First</option>
            <option value="oldest">Date: Oldest First</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
          </select>
        </div>
      </div>

      {/*  Properties Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                <th className="p-4 font-semibold">Property Info</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Price/mo</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {initialProperties.length > 0 ? (
                  initialProperties.map((prop) => (
                    <motion.tr
                      key={prop.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="p-4">
                        <p className="font-bold text-gray-900">{prop.title}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-emerald-500" /> {prop.location}
                        </p>
                      </td>
                      <td className="p-4 text-gray-600">{prop.category?.name || "N/A"}</td>
                      <td className="p-4 font-semibold text-emerald-600">৳{prop.price.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          prop.isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {prop.isAvailable ? "Available" : "Rented"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => openEditModal(prop)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors" title="Edit">
                            <Edit3 className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleDelete(prop.id)} className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-2 rounded-lg transition-colors" title="Delete">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">No properties found.</td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/*  Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && editingProperty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-bold text-gray-900">Edit Property</h2>
                <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                  <input
                    type="text" required
                    value={editingProperty.title}
                    onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                  <input
                    type="text" required
                    value={editingProperty.location}
                    onChange={(e) => setEditingProperty({ ...editingProperty, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Price (৳)</label>
                  <input
                    type="number" required
                    value={editingProperty.price}
                    onChange={(e) => setEditingProperty({ ...editingProperty, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>


                <div className="pt-4 flex gap-3 justify-end">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200">
                    Cancel
                  </button>
                  <button type="submit" disabled={isUpdating} className="px-5 py-2.5 rounded-xl font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2">
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}