import React from "react";

export const metadata = {
  title: "How It Works | RentNest",
  description: "Learn how RentNest connects tenants and homeowners.",
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-gray-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          How RentNest Works
        </h1>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Find your dream home or list your property in just a few simple steps.
        </p>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="bg-gray-200 p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Search & Filter</h2>
            <p className="text-gray-600">Browse thousands of verified properties tailored to your needs using our advanced search filters.</p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-gray-200 p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Book a Visit</h2>
            <p className="text-gray-600">Schedule a physical or virtual tour directly with the property owner.</p>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-200 p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Secure Your Home</h2>
            <p className="text-gray-600">Sign digital agreements and pay securely through our platform to move in stress-free.</p>
          </div>
        </div>
      </div>
    </main>
  );
}