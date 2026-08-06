import React from "react";

export const metadata = {
  title: "Trust & Safety | RentNest",
  description: "Learn how to stay safe while renting properties.",
};

export default function SafetyGuidePage() {
  return (
    <main className="min-h-screen bg-gray-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800/80 border border-gray-700 rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
          
          <h1 className="text-4xl font-bold text-white mb-4">Trust & Safety Guide</h1>
          <p className="text-gray-400 text-lg mb-10">Your safety is our top priority. Follow these guidelines to ensure a secure renting experience.</p>

          <div className="space-y-8 text-gray-300">
            <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
              <h2 className="text-2xl font-semibold text-emerald-400 mb-3">1. Verify Property Listings</h2>
              <p>Always check for the "Verified" badge on property listings. We manually review these properties for authenticity. If a deal seems too good to be true, it usually is.</p>
            </section>

            <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
              <h2 className="text-2xl font-semibold text-emerald-400 mb-3">2. Never Pay Outside the Platform</h2>
              <p>To protect yourself from scams, always make payments through RentNest's secure payment system. We cannot guarantee or refund payments made via direct bank transfers or cash.</p>
            </section>

            <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
              <h2 className="text-2xl font-semibold text-emerald-400 mb-3">3. Visit Before You Sign</h2>
              <p>Whenever possible, schedule a physical visit to the property before signing any agreements. Make sure the property matches the photos and descriptions provided online.</p>
            </section>

            <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
              <h2 className="text-2xl font-semibold text-emerald-400 mb-3">4. Report Suspicious Activity</h2>
              <p>If you encounter a suspicious listing, fake profile, or inappropriate behavior, please use the "Report" button on the listing page or contact our trust and safety team immediately.</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}