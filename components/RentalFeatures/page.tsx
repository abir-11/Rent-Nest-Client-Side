"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  CalendarMinus,
  ShieldCheck,
  Headset,
} from "lucide-react";

const features = [
  {
    title: "Easy Check In",
    subtitle: "Book your rental instantly",
    href: "/properties",
    icon: CalendarCheck,
    color: "emerald",
  },
  {
    title: "Smooth Check Out",
    subtitle: "Simple & hassle-free process",
    href: "/dashboard/tenant",
    icon: CalendarMinus,
    color: "rose",
  },
  {
    title: "Verified Properties",
    subtitle: "Trusted landlords only",
    href: "/properties",
    icon: ShieldCheck,
    color: "blue",
  },
  {
    title: "24/7 Support",
    subtitle: "We're here to help",
    href: "/contact",
    icon: Headset,
    color: "amber",
  },
];

const colors = {
  emerald: {
    bg: "bg-emerald-100",
    text: "text-emerald-600",
    arrow: "text-emerald-500",
  },
  rose: {
    bg: "bg-rose-100",
    text: "text-rose-600",
    arrow: "text-rose-500",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    arrow: "text-blue-500",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-600",
    arrow: "text-amber-500",
  },
};

export default function RentalFeatures() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl shadow-xl border border-slate-100 p-2 flex flex-col lg:flex-row overflow-hidden"
    >
      {features.map((item, index) => {
        const Icon = item.icon;
        const color = colors[item.color as keyof typeof colors];

        return (
          <motion.div
            key={item.title}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 ${
              index !== 0 ? "border-t lg:border-t-0 lg:border-l border-slate-100" : ""
            }`}
          >
            <Link
              href={item.href}
              className="group flex items-center gap-4 px-6 py-5 hover:bg-slate-50 transition-all duration-300 h-full rounded-2xl"
            >
              <div
                className={`${color.bg} ${color.text} p-3 rounded-2xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <h4 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h4>

                <p className="text-sm text-slate-500">
                  {item.subtitle}
                </p>
              </div>

              <ArrowRight
                className={`w-5 h-5 ${color.arrow} transition-transform duration-300 group-hover:translate-x-2`}
              />
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}