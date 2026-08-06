import React from "react";

export const metadata = {
  title: "Cookie Policy | RentNest",
  description: "Learn how RentNest uses cookies to improve your experience.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-gray-900 pt-24 pb-16">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Main Content Card */}
        <div className="bg-gray-800/80 border border-gray-700 rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
          
          {/* Decorative Gradient Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />

          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-emerald-500 font-medium mb-10">
            Last Updated: August 2026
          </p>

          {/* Content */}
          <div className="space-y-10 text-gray-300 leading-relaxed text-lg">
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                What Are Cookies?
              </h2>
              <p>
                Cookies are small text files stored on your device that help
                websites remember your preferences, improve functionality, and
                provide a better browsing experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                How We Use Cookies
              </h2>
              <ul className="list-disc pl-6 space-y-3 marker:text-emerald-500">
                <li>Keep you securely signed in to your RentNest account.</li>
                <li>Remember your property preferences and search filters.</li>
                <li>Improve website performance and loading speeds.</li>
                <li>Analyze visitor activity to enhance user experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Types of Cookies We Use
              </h2>
              <ul className="list-disc pl-6 space-y-3 marker:text-emerald-500">
                <li><strong className="text-white">Essential Cookies:</strong> Required for the platform to function properly.</li>
                <li><strong className="text-white">Performance Cookies:</strong> Help us understand how visitors interact with our site.</li>
                <li><strong className="text-white">Functional Cookies:</strong> Remember your choices (e.g., language or region).</li>
                <li><strong className="text-white">Analytics Cookies:</strong> Track anonymous data to improve our services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Managing Cookies
              </h2>
              <p>
                Most browsers allow you to manage or disable cookies through
                browser settings. Please note that disabling cookies may affect
                certain features of RentNest, such as secure login and personalized searches.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Third-Party Cookies
              </h2>
              <p>
                We may use trusted third-party services such as analytics (e.g., Google Analytics) and
                payment providers that place cookies to improve functionality
                and security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Updates to This Policy
              </h2>
              <p>
                We may update this Cookie Policy periodically to reflect changes in our practices. Any updates will
                be posted on this page with a revised date.
              </p>
            </section>

            <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50 mt-12">
              <h2 className="text-xl font-semibold text-white mb-3">
                Contact Us
              </h2>
              <p className="text-gray-400 text-base">
                If you have any questions about our Cookie Policy, please
                contact the RentNest support team at <a href="mailto:support@rentnest.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">support@rentnest.com</a>.
              </p>
            </section>

          </div>
        </div>
      </section>
    </main>
  );
}