import React from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Users,
  Home,
  Award,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Properties Listed", value: "2,500+" },
    { label: "Happy Tenants", value: "10,000+" },
    { label: "Verified Landlords", value: "1,200+" },
    { label: "Cities Covered", value: "15+" },
  ];

  const coreValues = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
      title: "Verified Listings",
      description:
        "Every property and landlord undergoes a thorough verification process to ensure zero scams and maximum safety.",
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-emerald-400" />,
      title: "Transparent Deals",
      description:
        "No hidden charges or unexpected agent fees. What you see is exactly what you pay for.",
    },
    {
      icon: <Award className="w-8 h-8 text-emerald-400" />,
      title: "Seamless Experience",
      description:
        "From browsing properties to instant Stripe checkout and complaint resolution, we make renting effortless.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
            <Building2 className="w-4 h-4" /> About RentNest
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Redefining How You Find Your <span className="text-emerald-500">Next Home</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            RentNest is a modern real estate ecosystem bridging the gap between tenants and property owners through verified listings, secure payments, and dedicated support.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-gray-800/60 border border-white/10 p-6 rounded-2xl text-center space-y-1 hover:border-emerald-500/30 transition-all"
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                {stat.value}
              </p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-gray-800/40 border border-white/10 p-8 sm:p-12 rounded-3xl">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">
              Our Mission to Simplify Renting
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Finding a house shouldn't be stressful. We started RentNest to fix the broken rental market—removing unreliable middlemen, preventing double-booking through direct database synchronization, and creating transparent communication channels.
            </p>
            <div className="space-y-3">
              {[
                "Direct communication between tenants and landlords",
                "Instant online booking with Stripe secure gateway",
                "Dedicated complaint tracking and quick support response",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-600/20 to-gray-800 border border-emerald-500/20 p-8 rounded-2xl space-y-6">
            <div className="p-3 bg-emerald-500/20 w-fit rounded-xl text-emerald-400">
              <Home className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Looking for a place to stay?</h3>
            <p className="text-gray-300 text-sm">
              Explore thousands of verified houses, flats, and apartments with discounted prices and instant booking support.
            </p>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Browse Listings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">Why Choose RentNest?</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
              Built with security, trust, and modern technology at its core.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => (
              <div
                key={idx}
                className="bg-gray-800/60 border border-white/10 p-8 rounded-2xl space-y-4 hover:border-emerald-500/40 transition-all"
              >
                <div className="p-3 bg-emerald-500/10 w-fit rounded-xl">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call To Action */}
        <div className="text-center bg-gradient-to-r from-emerald-600 to-teal-600 p-10 sm:p-14 rounded-3xl space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-emerald-100 max-w-xl mx-auto text-sm sm:text-base">
            Join thousands of happy tenants and landlords today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/properties"
              className="px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all text-sm"
            >
              Explore Properties
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition-all text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}