import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Help Center | RentNest",
  description: "Get support and answers to common questions on RentNest.",
};

export default function HelpCenterPage() {
  const faqs = [
    { q: "How do I book a property?", a: "You can book a property by browsing our listings, selecting your desired home, and clicking the 'Book Now' or 'Contact Owner' button." },
    { q: "Is my payment secure?", a: "Yes, all transactions are encrypted and processed through our secure payment gateway partners." },
    { q: "Can I cancel my booking?", a: "Cancellations depend on the property owner's specific policy. Please check the listing details before booking." },
    { q: "How do I contact the landlord?", a: "Once a booking request is approved, you will get access to the landlord's direct contact information." },
  ];

  return (
    <main className="min-h-screen bg-gray-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How can we help you?</h1>
          <p className="text-gray-400 text-lg">Search our knowledge base or browse FAQs below.</p>
        </div>

        <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-8 shadow-xl mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                <h3 className="text-lg font-medium text-emerald-400 mb-2">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-900/30 border border-emerald-800/50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Still need help?</h3>
          <p className="text-gray-400 mb-6">Our support team is available 24/7 to assist you.</p>
          <Link href="mailto:arafatabir5282@gmail.com" className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-lg transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}