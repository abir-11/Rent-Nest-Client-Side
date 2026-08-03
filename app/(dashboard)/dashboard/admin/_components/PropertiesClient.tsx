"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, MapPin } from "lucide-react";

export default function PropertiesClient({ properties }: { properties: any[] }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 lg:p-8">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Properties</h1>
          <p className="text-gray-500">Overview of all properties listed on RentNest.</p>
        </div>
      </div>

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
                      <span className="line-clamp-1">{property.location || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">৳{property.price}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium">
                      {property.category?.name || 'General'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      property.isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {property.isAvailable ? 'Available' : 'Rented'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {properties.length === 0 && (
             <div className="p-8 text-center text-gray-500">No properties found.</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}