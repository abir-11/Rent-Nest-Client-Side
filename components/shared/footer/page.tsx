"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

// SVG Brand Icons (Type Safe & Independent)
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800 relative overflow-hidden">
      {/* Decorative Gradient Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50 blur-sm" />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <motion.div className="lg:col-span-2 space-y-4" variants={itemVariants}>
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-white group">
              <div className="p-2 bg-emerald-600 rounded-lg text-white group-hover:bg-emerald-500 transition-colors">
                <Home className="w-6 h-6" />
              </div>
              <span>Rent<span className="text-emerald-500">Nest</span></span>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Discover your dream home effortlessly. RentNest connects tenants and homeowners with trust, transparency, and seamless digital booking.
            </p>

            {/* Social Icons (Fixed) */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { Icon: FacebookIcon, href: "https://www.facebook.com/arafatalom.abir.1", label: "Facebook" },
                { Icon: TwitterIcon, href: "https://x.com/arafat1abir", label: "Twitter" },
                { Icon: InstagramIcon, href: "https://www.instagram.com/abir_._who/", label: "Instagram" },
                { Icon: LinkedinIcon, href: "https://www.linkedin.com/in/md-arafat-alam-abir/", label: "LinkedIn" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-emerald-600 transition-all duration-200"
                >
                  <social.Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Explore Properties", href: "/properties" },
                { name: "Featured Houses", href: "/featured" },
                { name: "How It Works", href: "/how-it-works" },
                { name: "Pricing Plans", href: "/pricing" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

{/* Support & Resources (Replaced Categories) */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Help Center", href: "/help-center" },
                { name: "Safety Guide", href: "/safety" },
                { name: "Tenant Resources", href: "/resources/tenant" },
                { name: "Landlord Guide", href: "/resources/landlord" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1 group">
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>123 Real Estate Avenue, Gulshan, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+880 1306-979918</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>arafatabir5282@gmail.com</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Box */}
        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-2xl bg-gray-800/60 border border-gray-800 mb-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h4 className="text-lg font-semibold text-white">Subscribe to our newsletter</h4>
            <p className="text-sm text-gray-400">Get the latest property updates and rental guides in your inbox.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 w-full md:w-64 transition-colors"
              required
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shrink-0"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {currentYear} RentNest. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-emerald-400 transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}