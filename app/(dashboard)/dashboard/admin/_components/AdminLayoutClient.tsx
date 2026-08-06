"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Users, Building2, FileText, Menu, X, ShieldCheck,UserCheck ,AlertCircle} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, href: "/dashboard/admin" },
  { id: "users", label: "Manage Users", icon: Users, href: "/dashboard/admin/users" },
  { id: "properties", label: "All Properties", icon: Building2, href: "/dashboard/admin/properties" },
  { id: "rentals", label: "Rental Requests", icon: FileText, href: "/dashboard/admin/rentals" },
  { id: "landlord-requests", label: "Landlord Requests", icon: UserCheck, href: "/dashboard/admin/landlord-requests" },
  { id: "complaints", label: "Complaints", icon: AlertCircle, href: "/dashboard/admin/complaints" },
  { id: "profile", label: "Admin Profile", icon: FileText, href: "/dashboard/admin/profile" },
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
        <div className="flex items-center justify-between mb-8 px-2 mt-2">
          <Link href={"/"} className="flex items-center gap-2 text-2xl font-bold text-white tracking-wider">
            <ShieldCheck className="text-emerald-500 w-7 h-7" />
            <span>Admin<span className="text-emerald-500">Panel</span></span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 flex-1 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.id} href={item.href} onClick={() => setIsSidebarOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30" : "text-gray-400 hover:bg-white/5 hover:text-emerald-400"
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
        <div className="lg:hidden flex items-center justify-between p-4 bg-gray-900 text-white border-b border-gray-800">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="text-emerald-500 w-5 h-5" /> Admin Panel
          </h2>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-white/10 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <main className="flex-1 overflow-hidden p-2 sm:p-4 lg:p-6 bg-gray-900">
          <div className="h-full w-full bg-slate-50 rounded-2xl sm:rounded-3xl shadow-xl overflow-y-auto relative border border-gray-100">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}