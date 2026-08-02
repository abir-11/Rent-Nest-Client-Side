"use client";

import { motion } from "framer-motion";
import { Search, MessageCircle, Key } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Search Property",
    description: "Browse through hundreds of verified listings tailored to your needs and budget.",
    icon: Search,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Contact Landlord",
    description: "Connect directly with owners or roommates via our platform. No brokers involved.",
    icon: MessageCircle,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 3,
    title: "Move In",
    description: "Finalize the deal, get your keys, and move into your new comfortable home.",
    icon: Key,
    color: "bg-amber-100 text-amber-600",
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">How It Works?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Get your dream room in just 3 simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl"
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${step.color} shadow-lg mb-6 border-4 border-white`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  <span className="text-slate-400 mr-2">0{step.id}.</span>{step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}