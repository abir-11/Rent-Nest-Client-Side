"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Building2, MapPin, Search, ArrowUpDown, Trash2, Loader2 } from "lucide-react";

export default function PropertiesClientWrapper(props: { properties: any[] }) {
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-500">Loading properties...</div>}>
      <PropertiesClient {...props} />
    </Suspense>
  );
}

function PropertiesClient({ properties }: { properties: any[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("searchTerm") || "";
  const currentSortBy = searchParams.get("sortBy") || "createdAt";

  const [localSearchTerm, setLocalSearchTerm] = useState(currentSearch);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const updateUrlParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.keys(updates).forEach((key) => {
        if (updates[key] === null || updates[key] === "") {
          params.delete(key);
        } else {
          params.set(key, updates[key] as string);
        }
      });

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  // Debounced Search
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    const timer = setTimeout(() => {
      updateUrlParams({
        searchTerm: localSearchTerm || null, 
        page: "1", 
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearchTerm]);



  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 lg:p-8">
      {/* Header & Controls */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Properties</h1>
          <p className="text-gray-500 text-sm">Overview of all properties listed on RentNest.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search property or location..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-48">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <select
              value={currentSortBy}
              onChange={(e) => updateUrlParams({ sortBy: e.target.value })}
              className="w-full pl-9 pr-8 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500 appearance-none cursor-pointer shadow-sm"
            >
              <option value="createdAt">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold">Property</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Price (Monthly)</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-gray-900 line-clamp-1">{property.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{property.location || "N/A"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">৳{property.price?.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium">
                      {property.category?.name || "General"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        property.isAvailable ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {property.isAvailable ? "Available" : "Rented"}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {properties.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No properties found matching your search.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}