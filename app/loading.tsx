"use client";

import React from "react";
import { motion } from "framer-motion";

const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#03150D]/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative flex items-center justify-center w-28 h-28">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-emerald-500/30"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute inset-2 rounded-full border-b-2 border-l-2 border-emerald-400/60"
          />

          {/* Pulsing Rental Emoji */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-4xl drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"
          >
            🏡
          </motion.div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2 mt-2">
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-2xl font-bold text-white tracking-widest flex items-center justify-center gap-2"
          >
            Rent<span className="text-emerald-400">Nest</span> 🗝️
          </motion.h2>
          <motion.p
            animate={{
              opacity: [0.4, 1, 0.4],
              y: [5, 0, 5],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-sm text-emerald-300 font-medium"
          >
            Preparing your perfect space...
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default GlobalLoading;