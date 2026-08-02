import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllProperties } from "@/service/getAllProperties";
import RoomCard from "../RoomCard/page";
import RentalFeatures from "../RentalFeatures/page";

export default async function AvailableRoomsSection() {
  let availableRooms = [];
  
  try {
    const response = await getAllProperties({
      sortBy: "createdAt",
      sortOrder: "desc",
      limit: 6, 
    });

    if (response?.success && response?.data) {
      availableRooms = response.data
        .filter((room: any) => room.isAvailable === true)
        .slice(0, 6);
    }
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
  }

  return (
    <section className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Navigation Categories (Framer Motion Features) */}
        <RentalFeatures />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pt-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">Available Rooms</h2>
            <p className="text-slate-500 mt-1 font-medium">Verified listings from students near you</p>
          </div>
          <Link href="/properties">
            <button className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-semibold text-sm transition-colors border border-emerald-100/50">
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableRooms.length > 0 ? (
            availableRooms.map((room: any) => (
              <RoomCard key={room.id} property={room} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-slate-500">
              No available rooms found at the moment.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}