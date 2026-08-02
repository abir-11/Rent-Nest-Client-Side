"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import animationData from "@/public/data/Looped 404 error animation.json";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#03150D] via-[#0A2B1E] to-[#03150D] flex items-center justify-center px-6">
      <div className="max-w-3xl w-full text-center">
        {/* Animation */}
        <div className="mx-auto max-w-lg">
          <Lottie
            animationData={animationData}
            loop
            className="w-full h-full"
          />
        </div>

        {/* Content */}
        <h1 className="mt-4 text-5xl md:text-6xl font-bold text-white">
          404
        </h1>

        <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-emerald-400">
          Oops! Page Not Found
        </h2>

        <p className="mt-4 text-gray-300 max-w-xl mx-auto leading-7">
          The page you're looking for might have been removed, renamed, or is
          temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 mb-10 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-emerald-600 hover:scale-105"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-600 mb-10 px-6 py-3 font-semibold text-gray-200 transition-all duration-300 hover:border-emerald-500 hover:text-emerald-400"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}