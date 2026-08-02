"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Search, MapPin, BedDouble, Wifi, Car, ShieldCheck,
  ChevronLeft, ChevronRight, SlidersHorizontal, ArrowUpDown, Loader2
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllProperties } from "@/service/getAllProperties";
import Image from "next/image";
import { PropertyCardSkeleton } from "../_components/PropertyCardSkeleton";
import Link from "next/link";

type Category = { id: string; name: string };
type Landlord = { id: string; name: string; email: string };
type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
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

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination State
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ page: 1, limit: 10, totalProterties: 0, totalPage: 1 });

  // Fetch Data Form Server Action
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await getAllProperties({
        page,
        limit: 9,
        searchTerm: searchTerm || undefined,
        sortBy: sortBy.includes("price") ? "price" : "createdAt",
        sortOrder: sortBy === "price_asc" ? "asc" : "desc",
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

  // Trigger Fetch when Filters or Pagination change
  useEffect(() => {
    // Debounce effect for search term so it doesn't call API on every keystroke
    const delayDebounceFn = setTimeout(() => {
      fetchProperties();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, sortBy, page]);

  // Handle Search Input Change (Reset to page 1)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const [imageSrc, setImageSrc] = useState(
    properties?.[0]?.images?.[0] &&
      properties[0].images[0].startsWith("http")
      ? properties[0].images[0]
      : "https://placehold.co/800x600/png?text=No+Image"
  );

  return (
    <div className="min-h-screen bg-[#03150D] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500/70" />
            <Input
              type="text"
              placeholder="Search by title or location..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 bg-[#03150D]/50 border-white/10 focus-visible:ring-emerald-500 text-white placeholder-gray-400 rounded-xl h-12"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-48">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1); // সর্ট চেঞ্জ হলে পেজ ১ এ ফিরে যাবে
                }}
                className="w-full pl-9 pr-4 h-12 bg-[#03150D]/50 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
              >
                <option value="createdAt">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            <Button variant="outline" className="h-12 border-white/10 bg-white/5 hover:bg-emerald-900/40 hover:text-emerald-400 text-gray-300 rounded-xl">
              <SlidersHorizontal className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Filters</span>
            </Button>
          </div>
        </div>

    {/* Skeleton Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* আমরা এখানে ডামি ৬টি কার্ড রেন্ডার করছি, যেহেতু পেজে লিমিট ৯ বা ৬ দেওয়া থাকে */}
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
              {properties.map((property) => (
                <motion.div key={property.id} variants={cardVariants} layout>
                  <Card className="group relative bg-[#0B1C14] border-white/10 overflow-hidden rounded-xl hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col h-full">

                    {/* Image Section */}
                    <div className="relative h-56 w-full overflow-hidden rounded-t-xl bg-gray-900">

                      <Image
                        src={imageSrc}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        onError={() => {
                          setImageSrc(
                            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                          );
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
                      <div className="mt-2 mb-4">
                        <span className="text-2xl font-extrabold text-emerald-400">৳{property.price.toLocaleString()}</span>
                        <span className="text-gray-400 text-sm font-medium"> / month</span>
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
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Dynamic Pagination Section */}
        {!loading && properties.length > 0 && meta.totalPage > 1 && (
          <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-8">
            <p className="text-sm text-gray-400">
              Showing <span className="font-semibold text-white">{(page - 1) * meta.limit + 1}</span> to <span className="font-semibold text-white">{Math.min(page * meta.limit, meta.totalProterties)}</span> of <span className="font-semibold text-white">{meta.totalProterties}</span> results
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="border-white/10 bg-white/5 text-white hover:bg-emerald-900/40 hover:text-emerald-400 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="hidden sm:flex gap-1">
                {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map((pageNum) => (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? "default" : "outline"}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 ${page === pageNum
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
                disabled={page === meta.totalPage}
                onClick={() => setPage(p => p + 1)}
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