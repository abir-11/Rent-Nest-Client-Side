"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { data } from "framer-motion/m";

type Category = {
  id: string;
  name: string;
  description: string;
};

type HeroSectionProps = {
  categories: {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
      result: Category[];
    };
  };
};


export function HeroSection({ categories }: HeroSectionProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                {/* আপনি এখানে আপনার প্রোজেক্টের আসল ভিডিও লিংক দিবেন */}
                <source src="/data/video_preview_h264.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark Green Gradient Overlay (Pro-level blending) */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#03150D]/80 via-[#03150D]/70 to-[#03150D]/95"></div>

            {/* Content */}
            <div className="relative z-20 max-w-4xl mx-auto px-4 text-center mt-16">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col items-center"
                >
                  
                    {/* Small Badge */}
                    <motion.div variants={itemVariants} className="mb-6">
                        <span className="px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
                            Smart Rental Solutions
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.div variants={itemVariants}>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                            Discover Your Next <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">
                                Place to Call Home
                            </span>
                        </h1>
                    </motion.div>

                    {/* Sub Headline */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl"
                    >
                        Rent Nest makes finding the right home simple and secure. Browse verified
                        rental listings, compare properties, connect with landlords, and move
                        into your ideal home with confidence.
                    </motion.p>
    


                    {/* Search Box */}
                    <motion.div variants={itemVariants} className="w-full max-w-3xl relative">
                        <div className="flex items-center bg-white rounded-full p-2 shadow-2xl shadow-emerald-900/20">
                            <Search className="w-6 h-6 text-gray-400 ml-4" />
                            <input
                                type="text"
                                placeholder="Search for locations, categories, or rent type..."
                                className="flex-1 bg-transparent border-none outline-none px-4 text-gray-700 placeholder:text-gray-400 text-lg w-full"
                            />
                            <Button className="rounded-full px-8 py-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-lg transition-colors">
                                Search
                            </Button>
                        </div>
                    </motion.div>

                    {/* Category Tags */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-8 flex flex-wrap justify-center gap-3"
                    >
                        {categories?.data?.result?.map((category) => (
                            <button
                                key={category.id}
                                className="px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-emerald-500/50 text-white/80 hover:text-white text-sm font-medium backdrop-blur-md transition-all duration-300"
                            >
                                {category.name}
                            </button>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}