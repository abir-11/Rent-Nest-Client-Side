import React from "react";

export const metadata = {
  title: "Tenant Resources | RentNest",
  description: "Helpful guides and resources for tenants.",
};

export default function TenantResourcesPage() {
  return (
    <main className="min-h-screen bg-gray-900 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">Resources for Tenants</h1>
        <p className="text-gray-400 text-lg mb-12 text-center max-w-2xl mx-auto">Everything you need to know about finding, renting, and living in your perfect home.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-gray-800/80 border border-gray-700 p-8 rounded-2xl hover:border-emerald-500/50 transition-colors">
            <h2 className="text-xl font-semibold text-white mb-3">Moving Checklist</h2>
            <p className="text-gray-400 mb-4">A comprehensive guide on what to pack, utility setup, and how to prepare for your move-in day seamlessly.</p>
            <span className="text-emerald-400 text-sm font-medium cursor-pointer hover:underline">Read full guide &rarr;</span>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-800/80 border border-gray-700 p-8 rounded-2xl hover:border-emerald-500/50 transition-colors">
            <h2 className="text-xl font-semibold text-white mb-3">Understanding Lease Agreements</h2>
            <p className="text-gray-400 mb-4">Learn about standard terms, your rights as a tenant, and what to look out for before signing the dotted line.</p>
            <span className="text-emerald-400 text-sm font-medium cursor-pointer hover:underline">Read full guide &rarr;</span>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-800/80 border border-gray-700 p-8 rounded-2xl hover:border-emerald-500/50 transition-colors">
            <h2 className="text-xl font-semibold text-white mb-3">Dealing with Maintenance</h2>
            <p className="text-gray-400 mb-4">How to properly request repairs, what counts as an emergency, and landlord responsibilities.</p>
            <span className="text-emerald-400 text-sm font-medium cursor-pointer hover:underline">Read full guide &rarr;</span>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-800/80 border border-gray-700 p-8 rounded-2xl hover:border-emerald-500/50 transition-colors">
            <h2 className="text-xl font-semibold text-white mb-3">Neighborhood Guides</h2>
            <p className="text-gray-400 mb-4">Explore different areas, local amenities, and find the perfect neighborhood that fits your lifestyle.</p>
            <span className="text-emerald-400 text-sm font-medium cursor-pointer hover:underline">Read full guide &rarr;</span>
          </div>
        </div>
      </div>
    </main>
  );
}