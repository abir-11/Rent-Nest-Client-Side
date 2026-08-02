"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HousePlus, ArrowRight } from "lucide-react";

export default function CallToAction() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gray-900 rounded-[3rem] p-10 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden"
                >
                    {/* Background Decorative Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                            Have a room to rent? <br />
                            <span className="text-emerald-400">List it on our platform.</span>
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Reach thousands of students and professionals looking for a place near you. It's completely free to post your first listing!
                        </p>
                    </div>

                    <div className="relative z-10 shrink-0 w-full md:w-auto">
                        <Link href="/add-property">
                            <button className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-400 text-[#03150D] px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2">
                                <HousePlus className="w-6 h-6" />
                                Post Property Free
                                <ArrowRight className="w-5 h-5 ml-1" />
                            </button>
                        </Link>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}