export const metadata = {
  title: "Privacy Policy | Rent Nest",
  description:
    "Learn how Rent Nest collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "Introduction",
    content:
      "Welcome to Rent Nest. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and safeguard your data when you use our platform.",
  },
  {
    title: "Information We Collect",
    list: [
      "Personal Information (Name, Email Address, Phone Number)",
      "Account Information (Username, Password, Profile Details)",
      "Property Information (Listings, Rental Requests, Property Preferences)",
      "Technical Information (IP Address, Browser, Device Information)",
      "Payment Information (Processed securely through trusted payment providers)",
    ],
  },
  {
    title: "How We Use Your Information",
    list: [
      "Create and manage your account.",
      "Process rental requests and payments.",
      "Improve our services and user experience.",
      "Provide customer support.",
      "Send important notifications and platform updates.",
      "Maintain platform security and prevent fraud.",
    ],
  },
  {
    title: "Data Security",
    content:
      "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse. Although no online service can guarantee complete security, we continuously improve our systems to keep your data safe.",
  },
  {
    title: "Sharing Your Information",
    content:
      "Rent Nest does not sell your personal information. We only share your data with trusted service providers, payment gateways, or when required by applicable law.",
  },
  {
    title: "Cookies",
    content:
      "We use cookies and similar technologies to remember your preferences, improve website performance, analyze traffic, and provide a better browsing experience.",
  },
  {
    title: "Your Rights",
    list: [
      "Access your personal information.",
      "Update or correct your information.",
      "Request deletion of your account.",
      "Control communication preferences.",
      "Request a copy of your stored personal data.",
    ],
  },
  {
    title: "Changes to this Privacy Policy",
    content:
      "We may update this Privacy Policy from time to time. Any updates will be posted on this page together with the latest revision date.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions regarding this Privacy Policy or how we process your information, please contact the Rent Nest support team.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <section className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-flex rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
            Legal Information
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold">
            Privacy <span className="text-emerald-400">Policy</span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-gray-400">
            Your privacy matters to us. This Privacy Policy explains how Rent
            Nest collects, uses, and protects your personal information while
            providing a secure rental experience.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-gray-800 bg-gray-800/60 backdrop-blur-xl p-8 md:p-12 shadow-2xl shadow-black/40">
          {/* Last Updated */}
          <div className="mb-12 flex items-center gap-3 border-b border-gray-700 pb-6">
            <div className="h-3 w-3 rounded-full bg-emerald-400"></div>

            <p className="text-sm text-gray-400">
              Last Updated:
              <span className="ml-2 text-white font-medium">
                August 2026
              </span>
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={section.title}
                className="rounded-2xl border border-gray-700/60 bg-gray-900/40 p-7 transition duration-300 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10"
              >
                <h2 className="mb-4 text-2xl font-bold text-white">
                  {index + 1}. {section.title}
                </h2>

                {section.content && (
                  <p className="leading-8 text-gray-300">
                    {section.content}
                  </p>
                )}

                {section.list && (
                  <ul className="mt-4 space-y-3">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-14 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
            <h3 className="text-2xl font-bold text-white">
              Questions About Your Privacy?
            </h3>

            <p className="mt-4 max-w-2xl mx-auto text-gray-300">
              If you have any questions regarding this Privacy Policy or how
              your data is handled, our support team is always ready to help.
            </p>

            <button className="mt-8 rounded-xl bg-emerald-500 px-8 py-3 font-semibold text-white transition hover:bg-emerald-600">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}