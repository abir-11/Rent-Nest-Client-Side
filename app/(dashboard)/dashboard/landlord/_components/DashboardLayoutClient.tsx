"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Building, BellRing, Menu, X ,User} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard, href: "/dashboard/landlord" },
    { id: "addProperties", label: "Add Properties", icon: Building, href: "/dashboard/landlord/properties/new" },
    { id: "categories", label: "Create Categories", icon: Building, href: "/dashboard/landlord/categories" },
    { id: "properties", label: "My Properties", icon: Building, href: "/dashboard/landlord/properties" },
    { id: "requests", label: "Requests", icon: BellRing, href: "/dashboard/landlord/requests" },
    { id: "profile", label: "My Profile", icon: User, href: "/dashboard/landlord/profile" },
  ];

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden font-sans">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : (typeof window !== "undefined" && window.innerWidth >= 1024 ? 0 : -300) }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed lg:relative z-50 w-64 h-full bg-gray-900 border-r border-white/10 flex flex-col p-4"
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <Link href={"/"} className="text-2xl font-bold text-white tracking-wider">
            Rent<span className="text-emerald-500">Nest</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.id} href={item.href} onClick={() => setIsSidebarOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30" : "text-gray-400 hover:bg-white/5 hover:text-emerald-400"
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </motion.aside>

      <div className="flex-1 flex flex-col h-screen min-w-0 relative">
        <div className="lg:hidden flex items-center justify-between p-4 bg-gray-900 text-white">
          <h2 className="text-xl font-bold">Rent<span className="text-emerald-500">Nest</span></h2>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-white/10 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <main className="flex-1 overflow-hidden p-2 sm:p-4 lg:p-6 bg-gray-900">
          <div className="h-full w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-y-auto relative border border-gray-100">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}