import React from "react";

export const metadata = {
  title: "Landlord Guide | RentNest",
  description: "Tips and best practices for property owners.",
};

export default function LandlordGuidePage() {
  return (
    <main className="min-h-screen bg-gray-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-white mb-4">Landlord Success Guide</h1>
          <p className="text-gray-400 text-lg mb-10">Maximize your rental income and find reliable tenants with our expert tips for property owners.</p>

          <div className="space-y-10">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-900/50 border border-emerald-500 flex items-center justify-center text-emerald-400 font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">Prepare Your Property</h3>
                <p className="text-gray-300 leading-relaxed">Ensure your property is clean, well-maintained, and up to safety standards. A fresh coat of paint and minor repairs can significantly increase your property's appeal and rental value.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-900/50 border border-emerald-500 flex items-center justify-center text-emerald-400 font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">Take High-Quality Photos</h3>
                <p className="text-gray-300 leading-relaxed">Listings with professional-looking photos receive 50% more views. Open the curtains, turn on the lights, and capture wide angles of every room to make your listing stand out.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-900/50 border border-emerald-500 flex items-center justify-center text-emerald-400 font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">Write a Clear Description</h3>
                <p className="text-gray-300 leading-relaxed">Be honest and detailed. Highlight key features like parking, nearby transport, pet policies, and included appliances. Clear expectations lead to better tenant matches.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-900/50 border border-emerald-500 flex items-center justify-center text-emerald-400 font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">Screen Tenants Properly</h3>
                <p className="text-gray-300 leading-relaxed">Use our built-in communication tools to interview potential tenants. Verify their identity, employment status, and previous rental history before making a final decision.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}