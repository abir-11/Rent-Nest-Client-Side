import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Wifi, Car, Waves, BedDouble, ShieldCheck } from "lucide-react";

type RoomCardProps = {
  property: any;
};

export default function RoomCard({ property }: RoomCardProps) {
  const imageSrc =
    property.images && property.images.length > 0 && property.images[0].startsWith("http")
      ? property.images[0]
      : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80";

  const landlordInitial = property.landlord?.name ? property.landlord.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="bg-[#0B1C14]   rounded-2xl overflow-hidden hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300 flex flex-col h-full group">
      
      {/* Image Section */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-900">
        <Image
          src={imageSrc}
          alt={property.title || "Property Image"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {property.isAvailable && (
          <div className="absolute top-4 left-4 bg-[#00A35C] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            Available
          </div>
        )}

        {property.category?.name && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium border border-white/10 shadow-md">
            {property.category.name}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-grow flex flex-col">
        
        {/* Title */}
        <h3 className="text-xl font-bold text-emerald-400 line-clamp-1 group-hover:text-emerald-300 transition-colors">
          {property.title}
        </h3>
        
        {/* Location */}
        <div className="flex items-center gap-1.5 mt-2 text-gray-400 text-sm">
          <MapPin className="w-4 h-4 text-emerald-500" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Price */}
        <div className="mt-4 mb-4">
          <span className="text-3xl font-extrabold text-emerald-400">
            ৳{property.price?.toLocaleString()}
          </span>
          <span className="text-gray-400 text-sm font-medium"> / month</span>
        </div>

        {/* Amenities List */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {property.amenities?.slice(0, 3).map((amenity: string, idx: number) => (
            <div 
              key={idx} 
              className="flex items-center gap-1.5 bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-300"
            >
              {amenity.toLowerCase().includes("wifi") && <Wifi className="w-3 h-3 text-emerald-500" />}
              {amenity.toLowerCase().includes("parking") && <Car className="w-3 h-3 text-emerald-500" />}
              {amenity.toLowerCase().includes("pool") && <Waves className="w-3 h-3 text-emerald-500" />}
              {(amenity.toLowerCase().includes("bed") || amenity.toLowerCase().includes("room")) && <BedDouble className="w-3 h-3 text-emerald-500" />}
              {amenity.toLowerCase().includes("security") && <ShieldCheck className="w-3 h-3 text-emerald-500" />}
              
              <span className="capitalize">{amenity}</span>
            </div>
          ))}
          
          {/* More Amenities Count */}
          {property.amenities && property.amenities.length > 3 && (
            <div className="flex items-center bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-400">
              +{property.amenities.length - 3} more
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="p-4 pt-0 mt-2 border-t border-white/5 flex items-center justify-between">
        
        {/* Landlord Info */}
        <div className="flex items-center gap-3 mt-4">
          <div className="w-9 h-9 rounded-full bg-[#032014] flex items-center justify-center text-emerald-500 font-bold text-sm border border-emerald-900/50">
            {landlordInitial}
          </div>
          <span className="text-sm font-medium text-gray-300 truncate max-w-[100px]">
            {property.landlord?.name || "John Doe"}
          </span>
        </div>

        {/* View Details Button with Routing */}
        <Link href={`/properties/${property.id}`} className="mt-4">
          <button className="bg-[#008A4D] hover:bg-[#00A35C] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg active:scale-95">
            View Details
          </button>
        </Link>

      </div>
    </div>
  );
}