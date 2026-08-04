"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Edit3, Trash2, X, SlidersHorizontal, MapPin, Image as ImageIcon, Tag, Percent, Sparkles, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteLandlordProperty } from "../_actions/deleteLandlordProperties";
import { updateLandlordProperty } from "../_actions/updateLandlordProperty";

export default function PropertiesClientView({ initialProperties }: { initialProperties: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // ইন্ডিভিজুয়াল এডিট মোডাল স্টেট
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // ✅ গ্লোবাল ডিসকাউন্ট মোডাল স্টেট
  const [isGlobalModalOpen, setIsGlobalModalOpen] = useState(false);
  const [globalDiscountInput, setGlobalDiscountInput] = useState<number | "">(0);
  const [isApplyingGlobal, setIsApplyingGlobal] = useState(false);

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
    setEditingProperty({
      ...property,
      discountPercentage: property.discountPercentage || 0,
    });
    setIsEditModalOpen(true);
  };

  // একটি প্রোপার্টি এডিট
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    const res = await updateLandlordProperty(editingProperty.id, {
      title: editingProperty.title,
      price: Number(editingProperty.price),
      location: editingProperty.location,
      isAvailable: editingProperty.isAvailable,
      discountPercentage: Number(editingProperty.discountPercentage || 0),
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

  // ✅ সব প্রোপার্টির ওপর একসাথে গ্লোবাল ডিসকাউন্ট প্রয়োগ/তুলে নেওয়ার ফাংশন
  const handleApplyGlobalDiscount = async (discountValue: number) => {
    if (initialProperties.length === 0) {
      Swal.fire("Warning!", "No properties available to update.", "warning");
      return;
    }

    setIsApplyingGlobal(true);

    try {
      // সব প্রোপার্টিতে একসাথে আপডেট রিকোয়েস্ট পাঠানো
      const updatePromises = initialProperties.map((prop) =>
        updateLandlordProperty(prop.id, {
          title: prop.title,
          price: Number(prop.price),
          location: prop.location,
          isAvailable: prop.isAvailable,
          discountPercentage: discountValue,
        })
      );

      await Promise.all(updatePromises);

      setIsApplyingGlobal(false);
      setIsGlobalModalOpen(false);

      Swal.fire({
        title: discountValue > 0 ? "Global Discount Applied!" : "Discounts Removed!",
        text: discountValue > 0
          ? `${discountValue}% discount applied to all properties successfully.`
          : "All property discounts have been removed.",
        icon: "success",
        timer: 1500,
      });

      router.refresh();
    } catch (error) {
      setIsApplyingGlobal(false);
      Swal.fire("Error!", "Something went wrong while applying global discount.", "error");
    }
  };

  // ফাইনাল প্রাইজ হিসাব করার সাহায্যকারী ফাংশন
  const calculateDiscountedPrice = (price: number, discountPercentage: number = 0) => {
    if (!discountPercentage || discountPercentage <= 0) return price;
    return price - (price * discountPercentage) / 100;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Bar: Search, Filters & Global Discount */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by location or title..."
            defaultValue={searchParams.get("search") || ""}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="text-gray-500 w-5 h-5" />
            <select
              defaultValue={searchParams.get("sort") || "newest"}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="newest">Date: Newest First</option>
              <option value="oldest">Date: Oldest First</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
            </select>
          </div>

          {/* ✅ Global Discount Action Button */}
          <button
            onClick={() => {
              setGlobalDiscountInput(0);
              setIsGlobalModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-xl border border-rose-200 transition shadow-sm text-sm"
          >
            <Tag className="w-4 h-4 text-rose-600" /> Global Discount
          </button>
        </div>
      </div>

      {/* Properties Table */}
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
                  initialProperties.map((prop) => {
                    const imageUrl = Array.isArray(prop.images) && prop.images.length > 0
                      ? prop.images[0]
                      : typeof prop.images === "string"
                      ? prop.images
                      : null;

                    const hasDiscount = prop.discountPercentage && prop.discountPercentage > 0;
                    const finalPrice = calculateDiscountedPrice(prop.price, prop.discountPercentage);

                    return (
                      <motion.tr
                        key={prop.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors"
                      >
                        {/* Property Info */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 flex items-center justify-center">
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={prop.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                              ) : (
                                <ImageIcon className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{prop.title}</p>
                              <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-emerald-500" /> {prop.location}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4 text-gray-600">{prop.category?.name || "N/A"}</td>

                        {/* Price Column */}
                        <td className="p-4">
                          {hasDiscount ? (
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-emerald-600 text-base">
                                  ৳{finalPrice.toLocaleString()}
                                </span>
                                <span className="text-xs bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                  <Tag className="w-3 h-3" /> {prop.discountPercentage}% OFF
                                </span>
                              </div>
                              <span className="text-xs text-gray-400 line-through">
                                ৳{prop.price.toLocaleString()}
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold text-emerald-600">
                              ৳{prop.price.toLocaleString()}
                            </span>
                          )}
                        </td>

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
                    );
                  })
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

      {/* Individual Edit Modal */}
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Regular Price (৳)</label>
                    <input
                      type="number" required min="1"
                      value={editingProperty.price}
                      onChange={(e) => setEditingProperty({ ...editingProperty, price: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Discount (%)</label>
                    <input
                      type="number" min="0" max="100"
                      placeholder="0"
                      value={editingProperty.discountPercentage || ""}
                      onChange={(e) => setEditingProperty({ ...editingProperty, discountPercentage: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                {editingProperty.discountPercentage > 0 && (
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Discounted Price:</span>
                    <span className="font-bold text-emerald-700 text-base">
                      ৳{calculateDiscountedPrice(Number(editingProperty.price), Number(editingProperty.discountPercentage)).toLocaleString()} / mo
                    </span>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    value={editingProperty.isAvailable ? "true" : "false"}
                    onChange={(e) => setEditingProperty({ ...editingProperty, isAvailable: e.target.value === "true" })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="true">Available for Rent</option>
                    <option value="false">Currently Rented</option>
                  </select>
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

      {/* ✅ GLOBAL DISCOUNT MODAL */}
      <AnimatePresence>
        {isGlobalModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl space-y-4"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-rose-50/50">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-rose-100 text-rose-600 rounded-xl">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Global Discount Offer</h2>
                    <p className="text-xs text-gray-500">Apply or remove discount for all properties</p>
                  </div>
                </div>
                <button onClick={() => setIsGlobalModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Discount Percentage (%)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={globalDiscountInput}
                      onChange={(e) => setGlobalDiscountInput(e.target.value === "" ? "" : Number(e.target.value))}
                      placeholder="Enter percentage e.g. 10"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:outline-none font-semibold text-gray-800"
                    />
                  </div>
                </div>

                {/* Quick Selection Preset Buttons */}
                <div>
                  <span className="text-xs text-gray-400 block mb-2 font-medium">Quick Select:</span>
                  <div className="flex gap-2">
                    {[5, 10, 15, 20].map((percent) => (
                      <button
                        key={percent}
                        type="button"
                        onClick={() => setGlobalDiscountInput(percent)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                          globalDiscountInput === percent
                            ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-rose-50 hover:text-rose-600"
                        }`}
                      >
                        {percent}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info Text */}
                <p className="text-xs text-gray-500 bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl leading-relaxed">
                  <strong>Note:</strong> This will update all <strong>{initialProperties.length}</strong> listed properties instantly.
                </p>

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    disabled={isApplyingGlobal || globalDiscountInput === "" || Number(globalDiscountInput) < 0}
                    onClick={() => handleApplyGlobalDiscount(Number(globalDiscountInput))}
                    className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-semibold rounded-xl transition shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2 text-sm"
                  >
                    {isApplyingGlobal ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Updating All Properties...
                      </>
                    ) : (
                      <>Apply {globalDiscountInput || 0}% Discount to All</>
                    )}
                  </button>

                  {/* Clear / Remove All Discounts Button */}
                  <button
                    type="button"
                    disabled={isApplyingGlobal}
                    onClick={() => handleApplyGlobalDiscount(0)}
                    className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition text-sm flex items-center justify-center gap-1.5"
                  >
                    Remove Discount from All
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}