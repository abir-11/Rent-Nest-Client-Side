"use client";

import React, { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import {
  MapPin, BedDouble, Wifi, Car, ShieldCheck,
  ChevronLeft, Loader2, Mail, User, CalendarDays, CheckCircle2, Home
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getSingleProperty } from "@/service/getSingleProperty";
import { getMyProfile, postTenantRentals } from "./service/postTenantRentals";

// --- Types ---
type Category = { id: string; name: string; description: string };
type Landlord = { id: string; name: string; email: string };
type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number; // 👈 Discount Field Added
  location: string;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  category: Category;
  landlord: Landlord;
  createdAt: string;
};

type RentalStatus = "PENDING" | " REJECTED" | "APPROVED" | "ACTIVE" | " COMPLETED";

const PropertyDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-4 w-full md:w-1/2">
            <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
            <div className="h-12 w-3/4 bg-white/5 rounded-lg animate-pulse" />
            <div className="h-6 w-1/2 bg-white/5 rounded animate-pulse" />
          </div>
          <div className="space-y-3 w-full md:w-1/4 flex flex-col items-start md:items-end">
            <div className="h-10 w-40 bg-white/5 rounded animate-pulse" />
            <div className="flex gap-2">
              <div className="h-6 w-24 bg-white/5 rounded-full animate-pulse" />
              <div className="h-6 w-24 bg-white/5 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-[400px] md:h-[500px] w-full bg-white/5 rounded-2xl animate-pulse" />
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 w-32 bg-white/5 rounded-xl animate-pulse" />
              ))}
            </div>
            <div className="h-48 w-full bg-gray-900 border border-white/5 rounded-xl animate-pulse" />
            <div className="h-64 w-full bg-gray-900 border border-white/5 rounded-xl animate-pulse" />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="h-64 w-full bg-gray-900 border border-white/5 rounded-xl animate-pulse" />
            <div className="h-48 w-full bg-gray-900 border border-white/5 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");
  const [isRequesting, setIsRequesting] = useState(false);
  const [rentalStatus, setRentalStatus] = useState<RentalStatus>("PENDING");

  useEffect(() => {
    const fetchPropertyData = async () => {
      setLoading(true);
      try {
        const response = await getSingleProperty(resolvedParams.id);

        if (response?.success && response?.data?.result) {
          const propData = response.data.result;
          setProperty(propData);

          const images = propData.images;
          setActiveImage(
            images && images.length > 0
              ? images[0]
              : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80"
          );

          if (!propData.isAvailable) {
            setRentalStatus("APPROVED");
          }
        } else {
          toast.error(response?.message || "Failed to load property details");
        }
      } catch (error) {
        console.error("Error fetching property:", error);
        toast.error("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (resolvedParams.id) {
      fetchPropertyData();
    }
  }, [resolvedParams.id]);

  const handleRequestRent = async () => {
    const userProfile = await getMyProfile();

    if (!userProfile?.data) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    if (!property) return;

    setIsRequesting(true);

    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);

    const payload = {
      propertyId: property.id,
      message: "I am interested in renting this property.",
      startDate: today.toISOString().split("T")[0],
      endDate: nextYear.toISOString().split("T")[0],
    };

    try {
      const data = await postTenantRentals(payload);

      if (data?.success) {
        toast.success("Rental request sent successfully to the landlord!");
        setRentalStatus("PENDING");
      } else {
        toast.error(data?.message || "Failed to submit rental request.");
      }
    } catch (error) {
      console.error("Error sending rental request:", error);
      toast.error("Something went wrong while sending the request.");
    } finally {
      setIsRequesting(false);
    }
  };

  if (loading) {
    return <PropertyDetailsSkeleton />;
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <div className="text-6xl mb-4">🏚️</div>
        <h2 className="text-3xl font-bold mb-4">Property Not Found</h2>
        <p className="text-gray-400 mb-6">The property you are looking for does not exist or has been removed.</p>
        <Link href="/properties">
          <Button className="bg-emerald-600 hover:bg-emerald-500">Back to Listings</Button>
        </Link>
      </div>
    );
  }

  const isRentable = property.isAvailable && rentalStatus === "PENDING";

  // Calculate discount price
  const hasDiscount = Boolean(property.discountPercentage && property.discountPercentage > 0);
  const discountedPrice = hasDiscount
    ? property.price - (property.price * (property.discountPercentage || 0)) / 100
    : property.price;

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Navigation & Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <Link href="/properties" className="inline-flex items-center text-emerald-500 hover:text-emerald-400 mb-4 transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to properties
            </Link>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 mt-3 text-gray-400">
              <MapPin className="h-5 w-5 text-emerald-500" />
              <span className="text-lg">{property.location}</span>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            {/* Dynamic Header Price */}
            <div className="flex items-baseline gap-2 flex-wrap">
              {hasDiscount ? (
                <>
                  <span className="text-3xl font-extrabold text-emerald-400">
                    ৳{discountedPrice.toLocaleString()}
                  </span>
                  <span className="text-xl text-gray-400 line-through font-medium">
                    ৳{property.price.toLocaleString()}
                  </span>
                  <Badge className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs px-2.5 py-0.5">
                    {property.discountPercentage}% OFF
                  </Badge>
                </>
              ) : (
                <span className="text-3xl font-extrabold text-emerald-400">
                  ৳{property.price.toLocaleString()}
                </span>
              )}
              <span className="text-lg text-gray-400 font-medium">/ month</span>
            </div>

            <div className="flex gap-2">
              <Badge className={`px-3 py-1 text-sm ${property.isAvailable && rentalStatus !== "APPROVED" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "bg-rose-500/20 text-rose-400 border border-rose-500/50"}`}>
                {property.isAvailable && rentalStatus !== "APPROVED" ? "Available Now" : "Currently Rented"}
              </Badge>
              {property.category && (
                <Badge variant="outline" className="px-3 py-1 text-sm bg-white/5 border-white/10 text-gray-300">
                  {property.category.name}
                </Badge>
              )}
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left Column (Images & Details) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0B1C14]">
                <img
                  src={activeImage}
                  alt={property.title}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80";
                  }}
                />
              </div>

              {property.images && property.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative h-24 w-32 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? "border-emerald-500 opacity-100" : "border-transparent opacity-50 hover:opacity-100"}`}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description Section */}
            <Card className="bg-gray-700 border-white/10">
              <CardHeader>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Home className="h-6 w-6 text-emerald-500" />
                  About this property
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Amenities Section */}
            <Card className="bg-gray-700 border-white/10">
              <CardHeader>
                <h3 className="text-2xl font-bold text-white">Amenities</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities?.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                      <div className="bg-emerald-900/30 p-2 rounded-lg text-emerald-400">
                        {amenity.toLowerCase().includes("wifi") && <Wifi className="h-5 w-5" />}
                        {amenity.toLowerCase().includes("parking") && <Car className="h-5 w-5" />}
                        {amenity.toLowerCase().includes("security") && <ShieldCheck className="h-5 w-5" />}
                        {(amenity.toLowerCase().includes("bed") || amenity.toLowerCase().includes("lift")) && <BedDouble className="h-5 w-5" />}
                        {!["wifi", "parking", "security", "bed", "lift"].some((k) => amenity.toLowerCase().includes(k)) && <CheckCircle2 className="h-5 w-5" />}
                      </div>
                      <span className="text-gray-200 font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column (Sticky CTA & Landlord Info) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6 lg:sticky lg:top-28"
          >
            {/* Request to Rent Card */}
            <Card className="bg-gray-700 border-white/10 shadow-[0_0_40px_rgba(16,185,129,0.05)] overflow-hidden">
              <div className="h-2 bg-emerald-500 w-full" />
              <CardContent className="p-6">
                
                {/* Dynamic Sidebar Card Price */}
                <div className="mb-2 flex items-baseline gap-2 flex-wrap">
                  {hasDiscount ? (
                    <>
                      <span className="text-3xl font-extrabold text-emerald-400">
                        ৳{discountedPrice.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-400 line-through font-medium">
                        ৳{property.price.toLocaleString()}
                      </span>
                      <Badge className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs px-2 py-0.5">
                        {property.discountPercentage}% OFF
                      </Badge>
                    </>
                  ) : (
                    <span className="text-3xl font-extrabold text-white">
                      ৳{property.price.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-gray-400 text-sm mb-6 pb-6 border-b border-white/10">
                  Monthly rent · Excluding utility bills
                </p>

                <Button
                  onClick={handleRequestRent}
                  disabled={!isRentable || isRequesting}
                  className={`w-full h-14 text-lg font-bold rounded-xl shadow-lg transition-all ${
                    rentalStatus === "PENDING"
                      ? "bg-emerald-500 text-white cursor-not-allowed"
                      : isRentable
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/50 hover:shadow-emerald-500/30 hover:-translate-y-1"
                      : "bg-gray-800 text-white cursor-not-allowed"
                  }`}
                >
                  {isRequesting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
                    </>
                  ) : rentalStatus === "PENDING" ? (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" /> Request Sent
                    </>
                  ) : isRentable ? (
                    "Request to Rent"
                  ) : (
                    "Currently Unavailable"
                  )}
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Secure platform process</span>
                </div>
              </CardContent>
            </Card>

            {/* Landlord Profile Card */}
            {property.landlord && (
              <Card className="bg-gray-700 border-white/10">
                <CardHeader>
                  <h3 className="text-lg font-bold text-white">Property Manager</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-xl font-bold text-white shadow-inner">
                      {property.landlord.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{property.landlord.name}</h4>
                      <p className="text-emerald-500/80 text-sm">Verified Landlord</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <a href={`mailto:${property.landlord.email}`} className="hover:text-emerald-400 transition-colors">
                        {property.landlord.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <CalendarDays className="h-5 w-5 text-gray-500" />
                      <span>Listed on {new Date(property.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-2 border-white/10 bg-white/5 hover:bg-white/10 text-white">
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            )}

          </motion.div>
        </div>
      </div>
    </div>
  );
}