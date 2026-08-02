"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, DollarSign, Home, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllProperties } from "@/service/getAllProperties";

export type FilterState = {
  location: string;
  minPrice: string;
  maxPrice: string;
  category: string;
  amenities: string[];
};

interface AdvancedFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
}

export function AdvancedFilterSidebar({ isOpen, onClose, onApplyFilters }: AdvancedFilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    minPrice: "",
    maxPrice: "",
    category: "All",
    amenities: [],
  });

  // --- Dynamic Data States ---
  const [dynamicCategories, setDynamicCategories] = useState<string[]>(["All"]);
  const [dynamicAmenities, setDynamicAmenities] = useState<string[]>([]);
  const [dynamicLocations, setDynamicLocations] = useState<string[]>([]);
  const [isFetchingFilters, setIsFetchingFilters] = useState(false);

  useEffect(() => {
    if (isOpen && dynamicCategories.length === 1) { 
      const fetchFilterData = async () => {
        setIsFetchingFilters(true);
        try {
          const response = await getAllProperties({ limit: 500 });
          
          if (response?.success && response?.data) {
            const properties = response.data;

            const uniqueCategories = Array.from(
              new Set(properties.map((p: any) => p.category?.name).filter(Boolean))
            ) as string[];
            setDynamicCategories(["All", ...uniqueCategories]);

            const allAmenities = properties.flatMap((p: any) => p.amenities || []);
            const uniqueAmenities = Array.from(new Set(allAmenities)) as string[];
            setDynamicAmenities(uniqueAmenities);

            const uniqueLocations = Array.from(
              new Set(properties.map((p: any) => p.location).filter(Boolean))
            ) as string[];
            setDynamicLocations(uniqueLocations);
          }
        } catch (error) {
          console.error("Failed to load filter options", error);
        } finally {
          setIsFetchingFilters(false);
        }
      };

      fetchFilterData();
    }
  }, [isOpen, dynamicCategories.length]);

  const handleAmenityToggle = (amenity: string) => {
    setFilters((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({ location: "", minPrice: "", maxPrice: "", category: "All", amenities: [] });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 border-l border-white/10 z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Advanced Filters</h2>
              <button
                onClick={onClose}
                className="p-2 bg-white/5 hover:bg-emerald-900/40 rounded-full text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar relative">
              
              {isFetchingFilters && (
                <div className="absolute inset-0 z-10 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
                   <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                </div>
              )}

              {/* Location Filter */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500" /> Location
                </label>
                <Input
                  type="text"
                  list="locations-list"
                  placeholder="e.g. Dhanmondi, Bashundhara..."
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="bg-gray-800 border-white/10 focus-visible:ring-emerald-500 text-white h-12 rounded-xl placeholder-gray-500"
                />
                <datalist id="locations-list">
                  {dynamicLocations.map((loc, idx) => (
                    <option key={idx} value={loc} />
                  ))}
                </datalist>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-500" /> Price Range (৳)
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="bg-gray-800 border-white/10 focus-visible:ring-emerald-500 text-white h-12 rounded-xl"
                  />
                  <span className="text-gray-500">-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="bg-gray-800 border-white/10 focus-visible:ring-emerald-500 text-white h-12 rounded-xl"
                  />
                </div>
              </div>

              {/* Property Type Filter */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <Home className="w-4 h-4 text-emerald-500" /> Property Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {dynamicCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilters({ ...filters, category: cat })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                        filters.category === cat
                          ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                          : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities Filter */}
              {dynamicAmenities.length > 0 && (
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-300">Amenities</label>
                  <div className="grid grid-cols-2 gap-3">
                    {dynamicAmenities.map((amenity) => {
                      const isActive = filters.amenities.includes(amenity);
                      return (
                        <button
                          key={amenity}
                          onClick={() => handleAmenityToggle(amenity)}
                          className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                            isActive
                              ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                              : "bg-gray-800 border-white/5 text-gray-400 hover:border-white/20"
                          }`}
                        >
                          <span className="text-sm capitalize truncate pr-2">{amenity}</span>
                          {isActive && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/10 bg-gray-900 grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={handleReset}
                className="h-12 border-white/10 bg-white/5 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl"
              >
                Clear All
              </Button>
              <Button
                onClick={handleApply}
                className="h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
              >
                Show Results
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}