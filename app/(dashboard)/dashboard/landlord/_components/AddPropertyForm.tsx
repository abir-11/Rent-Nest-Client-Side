"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  Building,
  MapPin,
  DollarSign,
  CheckCircle2,
  Loader2,
  AlignLeft,
  X,
  Link as LinkIcon,
  Layers,
  ArrowLeft,
  Check,
  Plus,
} from "lucide-react";
import { createProperty } from "../_actions/property";

// ✅ আপনার দেওয়া IProperty ইন্টারফেস
export interface IProperty {
  landlordId?: string;
  categoryId: string;
  title: string;
  description: string;
  location: string;
  price: number;
  images?: string[];
  amenities: string[];
  isAvailable?: boolean;
}

type PropertyFormInputs = {
  title: string;
  categoryId: string;
  description: string;
  location: string;
  price: number;
  amenities: string;
  isAvailable: string;
};

export default function AddPropertyForm({ categories }: { categories: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentUrl, setCurrentUrl] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<PropertyFormInputs>({
    defaultValues: {
      isAvailable: "true",
    },
  });

  const handleSelectCategory = (cat: any) => {
    setSelectedCategory(cat);
    const catId = cat.id || cat._id;
    setValue("categoryId", catId, { shouldValidate: true });
    clearErrors("categoryId");
  };

  const handleAddImageUrl = () => {
    if (!currentUrl.trim()) return;
    setImageUrls([...imageUrls, currentUrl.trim()]);
    setCurrentUrl("");
  };

  const handleRemoveImageUrl = (indexToRemove: number) => {
    setImageUrls(imageUrls.filter((_, index) => index !== indexToRemove));
  };

  const onSubmit: SubmitHandler<PropertyFormInputs> = async (data) => {
    if (!selectedCategory) return;

    if (imageUrls.length === 0) {
      Swal.fire({
        title: "Warning!",
        text: "Please add at least one image URL!",
        icon: "warning",
      });
      return;
    }

    setIsSubmitting(true);

    // ✅ IProperty ইন্টারফেস অনুযায়ী নিখুঁত Payload তৈরি
    const payload: IProperty = {
      title: data.title.trim(),
      description: data.description.trim(),
      location: data.location.trim(),
      price: Number(data.price), // Explicitly Number type
      categoryId: String(selectedCategory.id || selectedCategory._id),
      isAvailable: data.isAvailable === "true", // Convert String to Boolean
      amenities: data.amenities
        ? data.amenities
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
      images: imageUrls,
    };

    try {
      const result = await createProperty(payload);

      setIsSubmitting(false);

      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: result.message || "Property added successfully!",
          icon: "success",
        });

        setImageUrls([]);
        setSelectedCategory(null);
        reset();
      } else {
        Swal.fire({
          title: "Error!",
          text: result.message || "Something went wrong!",
          icon: "error",
        });
      }
    } catch (error) {
      setIsSubmitting(false);

      Swal.fire({
        title: "Error!",
        text: "Something went wrong while submitting the form!",
        icon: "error",
      });
    }
  };

  const categoryList = Array.isArray(categories) ? categories : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden max-w-6xl mx-auto p-6 sm:p-8 space-y-8"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Layers className="w-6 h-6 text-emerald-600" /> Step 1: Select Category *
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {selectedCategory
                ? "You can change category by clicking another card."
                : "Choose a category under which you want to post this property."}
            </p>
          </div>
          {selectedCategory && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory(null);
                setValue("categoryId", "");
              }}
              className="flex items-center gap-1.5 text-sm text-rose-600 hover:text-rose-700 font-semibold bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition"
            >
              <ArrowLeft className="w-4 h-4" /> Reset Category
            </button>
          )}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categoryList.length > 0 ? (
            categoryList.map((cat: any) => {
              const catId = cat.id || cat._id;
              const isSelected = (selectedCategory?.id || selectedCategory?._id) === catId;

              return (
                <motion.div
                  key={catId}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectCategory(cat)}
                  className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-2 ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50/60 shadow-md ring-2 ring-emerald-500/20"
                      : "border-gray-100 bg-gray-50/50 hover:border-emerald-200 hover:bg-emerald-50/30"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white p-1 rounded-full shadow">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold ${
                      isSelected
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-emerald-600 border border-emerald-100 shadow-sm"
                    }`}
                  >
                    {cat.name ? cat.name.charAt(0).toUpperCase() : "C"}
                  </div>

                  <h3
                    className={`font-semibold text-base capitalize ${
                      isSelected ? "text-emerald-900 font-bold" : "text-gray-700"
                    }`}
                  >
                    {cat.name}
                  </h3>
                </motion.div>
              );
            })
          ) : (
            <p className="text-gray-400 text-sm col-span-full">No categories available.</p>
          )}
        </div>
      </div>

      {/* ---------------- STEP 2: PROPERTY FORM ---------------- */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 pt-6 border-t border-gray-100"
          >
            {/* Header Notification */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-emerald-800">
                Posting Property under: <strong className="underline">{selectedCategory.name}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Property Title *</label>
                <div className="relative">
                  <Building className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50/50"
                    placeholder="e.g. Couple Duplex Apartment"
                  />
                </div>
                {errors.title && <p className="text-rose-500 text-sm mt-1">{errors.title.message}</p>}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    {...register("location", { required: "Location is required" })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50/50"
                    placeholder="e.g. Uttara, Dhaka"
                  />
                </div>
                {errors.location && <p className="text-rose-500 text-sm mt-1">{errors.location.message}</p>}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price (৳) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    {...register("price", { required: "Price is required", valueAsNumber: true, min: 1 })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50/50"
                    placeholder="4500"
                  />
                </div>
                {errors.price && <p className="text-rose-500 text-sm mt-1">{errors.price.message}</p>}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  {...register("isAvailable")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50/50 cursor-pointer"
                >
                  <option value="true">Available for Rent</option>
                  <option value="false">Currently Rented</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
              <div className="relative">
                <AlignLeft className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <textarea
                  rows={3}
                  {...register("description", { required: "Description is required" })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50/50 resize-none"
                  placeholder="Beautiful duplex house with modern interior..."
                />
              </div>
              {errors.description && <p className="text-rose-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Amenities (Comma separated)</label>
              <input
                type="text"
                {...register("amenities")}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50/50"
                placeholder="e.g. Parking, Garden, WiFi, Swimming Pool"
              />
            </div>

            {/* Image URLs Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Property Image URLs *</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    value={currentUrl}
                    onChange={(e) => setCurrentUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddImageUrl();
                      }
                    }}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50/50 text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>

            {/* Added Image URLs Preview */}
            {imageUrls.length > 0 && (
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                <p className="text-sm font-semibold text-gray-700">Added Images ({imageUrls.length})</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {imageUrls.map((url, index) => (
                    <div
                      key={index}
                      className="relative group aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-100"
                    >
                      <img
                        src={url}
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).setAttribute('src', 'https://via.placeholder.com/150?text=Invalid+URL');
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImageUrl(index)}
                        className="absolute top-1.5 right-1.5 bg-white/90 p-1 rounded-full text-rose-500 hover:bg-rose-500 hover:text-white transition-colors shadow-sm"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/30 w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Saving Property...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" /> Add Property Under {selectedCategory.name}
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}