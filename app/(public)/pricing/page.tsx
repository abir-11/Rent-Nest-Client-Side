import { Check } from "lucide-react";

export const metadata = {
  title: "Pricing Plans | Rent Nest",
  description: "Choose the perfect pricing plan for your rental needs.",
};

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for tenants looking for rental properties.",
    features: [
      "Browse Properties",
      "Advanced Search Filters",
      "Save Favorite Listings",
      "Send Rental Requests",
      "Basic Support",
    ],
    button: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    duration: "/month",
    description: "Best for landlords managing multiple properties.",
    features: [
      "Unlimited Property Listings",
      "Manage Rental Requests",
      "Online Payment Tracking",
      "Priority Customer Support",
      "Analytics Dashboard",
      "Featured Property Listings",
    ],
    button: "Choose Pro",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Ideal for real estate agencies and businesses.",
    features: [
      "Everything in Pro",
      "Unlimited Team Members",
      "Custom Integrations",
      "Dedicated Account Manager",
      "Advanced Reports",
      "24/7 Premium Support",
    ],
    button: "Contact Sales",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <span className="inline-block my-5 rounded-full border border-emerald-500 px-4 py-1 text-sm text-emerald-400">
          Pricing Plans
        </span>

        <h1 className="mt-6 text-5xl font-bold">
          Choose the Plan That
          <span className="text-emerald-400"> Fits You</span>
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-400">
          Whether you're searching for a home or managing multiple rental
          properties, Rent Nest offers flexible plans designed for everyone.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border p-8 transition duration-300 hover:-translate-y-2 ${
                plan.featured
                  ? "border-emerald-500 bg-gradient-to-b from-emerald-500/10 to-gray-800 shadow-xl shadow-emerald-500/20"
                  : "border-gray-800 bg-gray-800"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-sm font-semibold">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-bold">{plan.name}</h3>

              <div className="mt-5">
                <span className="text-5xl font-extrabold">
                  {plan.price}
                </span>

                {plan.duration && (
                  <span className="text-gray-400">
                    {plan.duration}
                  </span>
                )}
              </div>

              <p className="mt-4 text-gray-400">
                {plan.description}
              </p>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <Check className="h-5 w-5 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-10 w-full rounded-xl py-3 font-semibold transition ${
                  plan.featured
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}