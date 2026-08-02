"use client";

import { motion } from "framer-motion";
import { BellRing, Mail } from "lucide-react";

export default function PropertyAlert() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 rounded-3xl p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl"
        >
          {/* Background Decorative Circles */}
          <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-emerald-800 rounded-full mix-blend-screen opacity-50 blur-2xl"></div>
          <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen opacity-20 blur-3xl"></div>

          <div className="relative z-10 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center justify-center p-3 bg-emerald-800 rounded-2xl mb-6">
              <BellRing className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Didn't find your perfect room?
            </h2>
            <p className="text-emerald-100/80 text-lg">
              Set up a property alert. We'll email you the moment a new room matching your preferences becomes available.
            </p>
          </div>

          <div className="relative z-10 w-full md:max-w-md">
            <form className="bg-white p-2 rounded-2xl flex flex-col sm:flex-row shadow-lg">
              <div className="flex items-center flex-1 px-4 py-3 sm:py-0">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 focus:ring-0"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="bg-[#008A4D] hover:bg-[#00A35C] text-white px-6 py-4 rounded-xl font-bold transition-colors w-full sm:w-auto mt-2 sm:mt-0"
              >
                Notify Me
              </button>
            </form>
            <p className="text-emerald-200/60 text-xs text-center md:text-left mt-4">
              We respect your privacy. No spam, ever.
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
}