import {
  ShieldCheck,
  Search,
  Building2,
  CreditCard,
  MessageSquare,
  Bell,
  Users,
  BadgeCheck,
} from "lucide-react";

export const metadata = {
  title: "Features | Rent Nest",
  description: "Explore the powerful features of Rent Nest.",
};

const features = [
  {
    icon: Search,
    title: "Smart Property Search",
    description:
      "Quickly find apartments, houses, and commercial spaces with advanced filters.",
  },
  {
    icon: Building2,
    title: "Verified Listings",
    description:
      "Browse trusted and verified properties from genuine landlords.",
  },
  {
    icon: CreditCard,
    title: "Secure Online Payments",
    description:
      "Pay rent securely using trusted online payment methods.",
  },
  {
    icon: MessageSquare,
    title: "Instant Communication",
    description:
      "Chat directly with landlords and receive fast responses.",
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    description:
      "Get notified about rental requests, approvals, payments, and updates.",
  },
  {
    icon: Users,
    title: "Role-Based Dashboard",
    description:
      "Separate dashboards for tenants, landlords, and administrators.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Security",
    description:
      "Your account and personal information are protected with secure authentication.",
  },
  {
    icon: BadgeCheck,
    title: "Complaint Management",
    description:
      "Submit complaints and track their status until resolution.",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto  px-6 py-20 text-center">
        <span className="inline-block my-5 rounded-full border border-emerald-500 px-4 py-1 text-sm text-emerald-400">
          Rent Nest Features
        </span>

        <h1 className="mt-6 text-5xl font-bold">
          Everything You Need to
          <span className="text-emerald-400"> Rent Smarter</span>
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-gray-400 text-lg">
          Rent Nest provides a secure, modern, and user-friendly platform that
          connects tenants and landlords with powerful tools for property
          management, communication, and online payments.
        </p>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="rounded-2xl border border-gray-800 bg-gray-800/70 p-8 transition duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/20"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/20">
                  <Icon className="h-7 w-7 text-emerald-400" />
                </div>

                <h3 className="mb-3 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold">
            Ready to Find Your Perfect Home?
          </h2>

          <p className="mt-4 text-gray-400 text-lg">
            Join Rent Nest today and experience a smarter, faster, and more
            secure way to rent properties.
          </p>

          <button className="mt-8 rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-white transition hover:bg-emerald-600">
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
}