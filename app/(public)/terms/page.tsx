export const metadata = {
  title: "Terms & Conditions | Rent Nest",
  description: "Read the Terms and Conditions for using Rent Nest.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using Rent Nest, you agree to comply with these Terms & Conditions. If you do not agree with any part of these terms, please discontinue using our platform.",
  },
  {
    title: "User Responsibilities",
    list: [
      "Provide accurate and up-to-date information.",
      "Maintain the confidentiality of your account credentials.",
      "Use the platform lawfully and respectfully.",
      "Avoid fraudulent or misleading activities.",
    ],
  },
  {
    title: "Property Listings",
    content:
      "Landlords are responsible for ensuring that all property information, pricing, images, and availability are accurate. Rent Nest reserves the right to remove misleading or inappropriate listings.",
  },
  {
    title: "Payments",
    content:
      "Payments made through Rent Nest are processed using trusted payment providers. We are not responsible for delays or issues caused by third-party payment services.",
  },
  {
    title: "Privacy",
    content:
      "Your personal information is handled according to our Privacy Policy and Cookie Policy. We are committed to protecting your data and maintaining your privacy.",
  },
  {
    title: "Account Suspension",
    content:
      "Rent Nest reserves the right to suspend or terminate accounts involved in fraudulent activities, abuse, or violations of these Terms & Conditions.",
  },
  {
    title: "Changes to Terms",
    content:
      "We may update these Terms & Conditions periodically. Continued use of Rent Nest after changes are published constitutes your acceptance of the revised terms.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions regarding these Terms & Conditions, please contact our support team. We are always happy to assist you.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <section className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-flex my-5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
            Legal Information
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold tracking-tight">
            Terms & <span className="text-emerald-400">Conditions</span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-400 leading-8">
            Please read these Terms & Conditions carefully before using Rent
            Nest. By accessing our platform, you agree to comply with the
            policies outlined below.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-gray-800 bg-gray-800/60 backdrop-blur-xl shadow-2xl shadow-black/40 p-8 md:p-12">
          {/* Last Updated */}
          <div className="mb-12 flex items-center gap-3 border-b border-gray-700 pb-6">
            <div className="h-3 w-3 rounded-full bg-emerald-400"></div>

            <p className="text-sm text-gray-400">
              Last Updated:
              <span className="ml-2 font-medium text-white">
                August 2026
              </span>
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={section.title}
                className="rounded-2xl border border-gray-700/60 bg-gray-900/40 p-7 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10"
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

          {/* Footer */}
          <div className="mt-14 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
            <h3 className="text-2xl font-bold text-white">
              Need More Information?
            </h3>

            <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
              If you have any questions about these Terms & Conditions, feel
              free to contact the Rent Nest support team. We're here to help.
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