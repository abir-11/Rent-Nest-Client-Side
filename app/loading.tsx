"use client";

import { motion } from "framer-motion";
import { Home } from "lucide-react";

const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-5">
        {/* Loader */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 0.5,
              ease: "linear",
            }}
            className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-emerald-500"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <Home className="w-7 h-7 text-emerald-600" />
          </div>
        </div>

        {/* Text */}
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            repeat: Infinity,
            duration: .8,
          }}
          className="text-lg font-semibold text-gray-800"
        >
          Loading...
        </motion.h2>

        <p className="text-sm text-gray-500">
          Please wait a moment
        </p>
      </div>
    </div>
  );
};

export default GlobalLoading;