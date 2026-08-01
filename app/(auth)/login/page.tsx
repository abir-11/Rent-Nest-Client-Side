"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import LottieDisplay from "../_components/LottieDisplay";
import LoginForm from "../_components/loginFrom"; // আপনার ফাইল অনুযায়ী ইমপোর্ট

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#03150D] relative overflow-hidden flex items-center justify-center p-4 sm:p-8">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-900/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Glassmorphism Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-6 lg:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10"
      >
        {/* Left Side: Lottie Animation & Welcome Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full flex flex-col items-center justify-center order-1 text-center"
        >
          <div className="w-full max-w-md drop-shadow-2xl">
            <LottieDisplay />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-8">
            Welcome back to <span className="text-emerald-400">RentNest</span>
          </h2>
          <p className="text-gray-400 mt-3 text-sm md:text-base max-w-sm">
            Sign in to manage your properties, find roommates, and discover your next perfect home.
          </p>
        </motion.div>

        {/* Right Side: Login Form with Logo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full flex flex-col items-center justify-center order-2 bg-black/40 p-8 md:p-10 rounded-2xl border border-white/5 shadow-inner"
        >
          {/* Logo Section */}
          <Link href="/" className="mb-8 flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Home className="text-emerald-400 w-8 h-8 group-hover:text-emerald-300 transition-colors" />
            </motion.div>
            <span className="text-3xl font-extrabold text-white tracking-wide">
              Rent<span className="text-emerald-400 group-hover:text-emerald-300 transition-colors">Nest</span>
            </span>
          </Link>

          {/* The Form Component */}
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;