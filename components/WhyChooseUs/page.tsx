"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Wallet, Clock, Star, Quote } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Landlords",
    desc: "Every property and landlord is manually verified for your safety.",
    color: "text-blue-500 bg-blue-50",
  },
  {
    icon: Wallet,
    title: "No Broker Fee",
    desc: "Connect directly with owners. Zero hidden charges or brokerage.",
    color: "text-emerald-500 bg-emerald-50",
  },
  {
    icon: Clock,
    title: "Instant Booking",
    desc: "Fast-track your moving process with our digital booking system.",
    color: "text-amber-500 bg-amber-50",
  },
];

const testimonials = [
  {
    name: "Rahim Uddin",
    role: "NSU Student",
    review: "Found a great roommate and a flat near Bashundhara in just 2 days. The 'No Broker Fee' feature saved me a lot of money!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sadia Rahman",
    role: "Job Holder",
    review: "Very smooth experience. The verified landlord badge gave me the confidence to book instantly. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Why Choose Us */}
          <div>
            <span className="text-emerald-600 font-bold tracking-wider text-sm uppercase mb-2 block">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              We make renting <span className="text-emerald-500">safe & simple</span>
            </h2>
            <p className="text-slate-500 mb-10 text-lg">
              Say goodbye to scammers and expensive brokers. Our platform is built specifically for students and professionals looking for hassle-free living.
            </p>

            <div className="space-y-6">
              {features.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Testimonials */}
          <div className="relative">
            {/* Background decorative blob */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            
            <div className="space-y-6 relative z-10">
              {testimonials.map((testi, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className={`bg-white p-6 rounded-2xl shadow-xl border border-slate-100 relative ${idx === 1 ? 'ml-0 lg:ml-12' : ''}`}
                >
                  <Quote className="absolute top-6 right-6 text-emerald-100 w-10 h-10" />
                  
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  <p className="text-slate-700 italic mb-6">"{testi.review}"</p>
                  
                  <div className="flex items-center gap-3">
                    <Image 
                      src={testi.image} 
                      alt={testi.name} 
                      width={48} 
                      height={48} 
                      className="rounded-full ring-2 ring-emerald-50"
                    />
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm">{testi.name}</h5>
                      <span className="text-slate-500 text-xs">{testi.role}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}