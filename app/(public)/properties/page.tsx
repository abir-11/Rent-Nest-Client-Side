"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Search, MapPin, BedDouble, Wifi, Car, ShieldCheck,
  ChevronLeft, ChevronRight, SlidersHorizontal, ArrowUpDown
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllProperties } from "@/service/getAllProperties";
import Image from "next/image";
import { PropertyCardSkeleton } from "../_components/PropertyCardSkeleton";
import Link from "next/link";
import { AdvancedFilterSidebar, FilterState } from "@/components/AdvancedFilterSidebar/page";

type Category = { id: string; name: string };
type Landlord = { id: string; name: string; email: string };
type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number; 
  location: string;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  category: Category;
  landlord: Landlord;
  createdAt: string;
};

// --- Framer Motion Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
};

// Main Component wrapped in Suspense (Best practice for Next.js useSearchParams)
export default function PropertiesPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        Loading...
      </div>
    }>
      <PropertiesPage />
    </Suspense>
  );
}

function PropertiesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ page: 1, limit: 10, totalProterties: 0, totalPage: 1 });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Local state for snappy typing, synced with URL params later
  const [localSearchTerm, setLocalSearchTerm] = useState(searchParams.get("search") || "");
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Derive Current Values from URL Search Params
  const currentSearchTerm = searchParams.get("search") || "";
  const currentSortBy = searchParams.get("sortBy") || "createdAt";
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLocation = searchParams.get("location") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentCategory = searchParams.get("category") || "All";
  const currentAmenities = searchParams.get("amenities") || "";

  // Update URL helper
  const updateUrlParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.keys(updates).forEach((key) => {
      if (updates[key] === null || updates[key] === "") {
        params.delete(key);
      } else {
        params.set(key, updates[key] as string);
      }
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  // Handle Search Input Change with Debounce
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      updateUrlParams({
        search: localSearchTerm || null,
        page: "1" // Reset to page 1 on new search
      });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [localSearchTerm]); // Trigger ONLY when typing changes

  // Fetch Data when URL Params change
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await getAllProperties({
          page: currentPage,
          limit: 9,
          searchTerm: currentSearchTerm || undefined,
          sortBy: currentSortBy.includes("price") ? "price" : "createdAt",
          sortOrder: currentSortBy === "price_asc" ? "asc" : "desc",
          location: currentLocation || undefined,
          minPrice: currentMinPrice || undefined,
          maxPrice: currentMaxPrice || undefined,
          category: currentCategory !== "All" ? currentCategory : undefined,
          amenities: currentAmenities || undefined,
        });

        if (response?.success) {
          setProperties(response.data);
          if (response.meta) {
            setMeta(response.meta);
          }
        }
      } catch (error) {
        console.error("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [
    currentPage, currentSearchTerm, currentSortBy, currentLocation, 
    currentMinPrice, currentMaxPrice, currentCategory, currentAmenities
  ]); // Trigger fetch whenever URL params change

  // Sync local search term if user navigates via browser back/forward buttons
  useEffect(() => {
    setLocalSearchTerm(currentSearchTerm);
  }, [currentSearchTerm]);

  // Handle Advanced Filters Submit
  const handleApplyFilters = (filters: FilterState) => {
    updateUrlParams({
      page: "1", // reset page
      location: filters.location || null,
      minPrice: filters.minPrice ? filters.minPrice.toString() : null,
      maxPrice: filters.maxPrice ? filters.maxPrice.toString() : null,
      category: filters.category && filters.category !== "All" ? filters.category : null,
      amenities: filters.amenities.length > 0 ? filters.amenities.join(",") : null,
    });
  };

  // Determine if any advanced filters are active (for the indicator dot)
  const hasActiveAdvancedFilters = Boolean(
    currentLocation || currentMinPrice || currentMaxPrice || (currentCategory !== "All") || currentAmenities
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      
      <AdvancedFilterSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onApplyFilters={handleApplyFilters}
      />

      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500/70" />
            <Input
              type="text"
              placeholder="Search by title or location..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              className="w-full pl-10 bg-gray-900/50 border-white/10 focus-visible:ring-emerald-500 text-white placeholder-gray-400 rounded-xl h-12"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-48">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={currentSortBy}
                onChange={(e) => updateUrlParams({ sortBy: e.target.value, page: "1" })}
                className="w-full pl-9 pr-4 h-12 bg-gray-900 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
              >
                <option value="createdAt">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            {/* Filter Button */}
            <Button 
              onClick={() => setIsSidebarOpen(true)}
              variant="outline" 
              className="relative h-12 border-white/10 bg-white/5 hover:bg-emerald-900/40 hover:text-emerald-400 text-gray-300 rounded-xl"
            >
              <SlidersHorizontal className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Filters</span>
              
              {/* Active Filter Indicator Dot */}
              {hasActiveAdvancedFilters && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900"></span>
              )}
            </Button>
          </div>
        </div>

        {/* Skeleton Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <PropertyCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && properties.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-6xl mb-4">🏚️</div>
            <h3 className="text-xl font-semibold text-white">No Properties Found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Properties Grid */}
        {!loading && properties.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {properties.map((property) => {
                const hasDiscount = Boolean(property.discountPercentage && property.discountPercentage > 0);
                const discountedPrice = hasDiscount
                  ? property.price - (property.price * (property.discountPercentage || 0)) / 100
                  : property.price;

                return (
                  <motion.div key={property.id} variants={cardVariants} layout>
                    <Card className="group relative bg-gray-800 border-white/10 overflow-hidden rounded-xl hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col h-full">

                      {/* Image Section */}
                      <div className="relative h-56 w-full overflow-hidden rounded-t-xl bg-gray-900">
                        <Image
                          src={
                            property.images?.[0] && property.images[0].startsWith("http")
                              ? property.images[0]
                              : "https://placehold.co/800x600/png?text=No+Image"
                          }
                          alt={property.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                          onError={(e) => {
                            e.currentTarget.srcset = "";
                            e.currentTarget.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80";
                          }}
                        />

                        {/* Status Badge */}
                        <Badge
                          className={`absolute top-4 left-4 font-semibold px-3 py-1 ${property.isAvailable
                            ? "bg-emerald-500/90 hover:bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            : "bg-rose-500/90 hover:bg-rose-500 text-white"
                            }`}
                        >
                          {property.isAvailable ? "Available" : "Rented Out"}
                        </Badge>

                        {/* Category Badge */}
                        {property.category && (
                          <Badge variant="outline" className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border-white/20 text-white">
                            {property.category.name}
                          </Badge>
                        )}
                      </div>

                      <CardHeader className="p-5 pb-0">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
                              {property.title}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-2 text-gray-400 text-sm">
                              <MapPin className="h-4 w-4 text-emerald-500" />
                              <span className="truncate">{property.location}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="p-5 flex-grow">
                        {/* Dynamic Price & Discount Section */}
                        <div className="mt-2 mb-4 flex items-baseline gap-2 flex-wrap">
                          {hasDiscount ? (
                            <>
                              <span className="text-2xl font-extrabold text-emerald-400">
                                ৳{discountedPrice.toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-400 line-through font-medium">
                                ৳{property.price.toLocaleString()}
                              </span>
                              <Badge className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs px-2 py-0.5">
                                {property.discountPercentage}% OFF
                              </Badge>
                            </>
                          ) : (
                            <span className="text-2xl font-extrabold text-emerald-400">
                              ৳{property.price.toLocaleString()}
                            </span>
                          )}
                          <span className="text-gray-400 text-sm font-medium">/ month</span>
                        </div>

                        {/* Amenities List */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {property.amenities?.slice(0, 3).map((amenity, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 text-xs text-gray-300">
                              {(amenity.toLowerCase().includes("wifi") || amenity.toLowerCase().includes("wife")) && <Wifi className="h-3 w-3 text-emerald-500" />}
                              {amenity.toLowerCase().includes("parking") && <Car className="h-3 w-3 text-emerald-500" />}
                              {amenity.toLowerCase().includes("security") && <ShieldCheck className="h-3 w-3 text-emerald-500" />}
                              {(amenity.toLowerCase().includes("bed") || amenity.toLowerCase().includes("lift")) && <BedDouble className="h-3 w-3 text-emerald-500" />}
                              <span>{amenity}</span>
                            </div>
                          ))}
                          {property.amenities && property.amenities.length > 3 && (
                            <div className="flex items-center bg-white/5 px-2 py-1 rounded-md border border-white/5 text-xs text-gray-400">
                              +{property.amenities.length - 3} more
                            </div>
                          )}
                        </div>
                      </CardContent>

                      <CardFooter className="p-5 pt-0 mt-auto border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2 pt-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-900/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
                            {property.landlord?.name?.charAt(0) || "U"}
                          </div>
                          <span className="text-xs text-gray-400 font-medium truncate w-24">
                            {property.landlord?.name || "Unknown"}
                          </span>
                        </div>
                        <Button asChild className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-md transition-all">
                          <Link href={`/properties/${property.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Dynamic Pagination Section */}
        {!loading && properties.length > 0 && meta.totalPage > 1 && (
          <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-8">
            <p className="text-sm text-gray-400">
              Showing <span className="font-semibold text-white">{(currentPage - 1) * meta.limit + 1}</span> to <span className="font-semibold text-white">{Math.min(currentPage * meta.limit, meta.totalProterties)}</span> of <span className="font-semibold text-white">{meta.totalProterties}</span> results
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => updateUrlParams({ page: Math.max(1, currentPage - 1).toString() })}
                className="border-white/10 bg-white/5 text-white hover:bg-emerald-900/40 hover:text-emerald-400 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="hidden sm:flex gap-1">
                {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map((pageNum) => (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    onClick={() => updateUrlParams({ page: pageNum.toString() })}
                    className={`w-10 h-10 ${currentPage === pageNum
                      ? "bg-emerald-600 text-white hover:bg-emerald-500 border-transparent"
                      : "border-white/10 bg-white/5 text-gray-300 hover:bg-emerald-900/40 hover:text-emerald-400"
                      }`}
                  >
                    {pageNum}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === meta.totalPage}
                onClick={() => updateUrlParams({ page: (currentPage + 1).toString() })}
                className="border-white/10 bg-white/5 text-white hover:bg-emerald-900/40 hover:text-emerald-400 disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}