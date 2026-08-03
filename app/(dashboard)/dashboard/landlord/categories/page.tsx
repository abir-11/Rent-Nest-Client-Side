"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Layers, CheckCircle2, Loader2, FileText } from "lucide-react";
import { createCategory } from "../_actions/category";

type CategoryFormInputs = {
  name: string;
  description: string;
};

export default function AddCategoryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Hook Form সেটআপ
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormInputs>();

  // ফর্ম সাবমিট ফাংশন
  const onSubmit: SubmitHandler<CategoryFormInputs> = async (data) => {
    setIsSubmitting(true);
    
    // Server Action কল করা হচ্ছে
    const response = await createCategory(data);
    
    setIsSubmitting(false);

    if (response.success) {
      Swal.fire({
        title: "Success!",
        text: response.message,
        icon: "success",
        confirmButtonColor: "#059669",
        customClass: { popup: "rounded-3xl" },
      });
      reset(); // ফর্ম ক্লিয়ার করে দিবে
    } else {
      Swal.fire({
        title: "Error!",
        text: response.message,
        icon: "error",
        confirmButtonColor: "#e11d48",
        customClass: { popup: "rounded-3xl" },
      });
    }
  };

  return (
    <div className="p-6 sm:p-8 flex justify-center items-start min-h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-emerald-50/50 p-6 sm:p-8 border-b border-emerald-100">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Add New Category</h2>
              <p className="text-gray-500 text-sm mt-1">Create a new category for your properties.</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Category Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Layers className={`w-5 h-5 ${errors.name ? "text-rose-400" : "text-gray-400"}`} />
                </div>
                <input
                  type="text"
                  placeholder="e.g. Apartment, Duplex, Villa"
                  {...register("name", { 
                    required: "Category name is required",
                    minLength: { value: 3, message: "Name must be at least 3 characters" }
                  })}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                    errors.name ? "border-rose-300 focus:ring-rose-500" : "border-gray-200 focus:ring-emerald-500"
                  } focus:outline-none focus:ring-2 transition-all bg-gray-50/50 focus:bg-white`}
                />
              </div>
              {/* Error Message */}
              {errors.name && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-500 text-sm mt-1.5 flex items-center gap-1">
                  <span className="w-1 h-1 bg-rose-500 rounded-full inline-block"></span> {errors.name.message}
                </motion.p>
              )}
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-0 pl-4 pointer-events-none">
                  <FileText className={`w-5 h-5 ${errors.description ? "text-rose-400" : "text-gray-400"}`} />
                </div>
                <textarea
                  rows={4}
                  placeholder="Write a short description about this category..."
                  {...register("description", { 
                    required: "Description is required",
                    minLength: { value: 10, message: "Description must be at least 10 characters" }
                  })}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                    errors.description ? "border-rose-300 focus:ring-rose-500" : "border-gray-200 focus:ring-emerald-500"
                  } focus:outline-none focus:ring-2 transition-all bg-gray-50/50 focus:bg-white resize-none`}
                />
              </div>
              {/* Error Message */}
              {errors.description && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-500 text-sm mt-1.5 flex items-center gap-1">
                  <span className="w-1 h-1 bg-rose-500 rounded-full inline-block"></span> {errors.description.message}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/30"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" /> Save Category
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}