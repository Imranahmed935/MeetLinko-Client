"use client";
import { serverFetch } from "@/lib/server-fetch";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { useState } from "react";

export default function SubscriptionPlans() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (planType: string) => {
    console.log(planType)
    setLoadingPlan(planType);
    try {
      const user = await getUserInfo();
      console.log(user)
      const res = await serverFetch.post("/payment/create-checkout-session", {
        body: JSON.stringify({ planType, userId: user.id }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) window.location.href = data.data.url;
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      planType: "WEEKLY",
      price: "$10",
      features: [
        "Access to all content",
        "Community support",
        "Limited premium perks",
        "Verified badge",
      ],
      highlight: false,
    },
    {
      planType: "MONTHLY",
      price: "$50",
      features: [
        "Access to all content",
        "Priority support",
        "Premium perks included",
        "Verified badge",
      ],
      highlight: true, // Highlight this plan
    },
    {
      planType: "YEARLY",
      price: "$100",
      features: [
        "All features included",
        "Exclusive offers",
        "Premium perks included",
        "Verified badge",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Choose Your Plan
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.planType}
              className={`flex flex-col justify-between p-8 rounded-xl shadow-lg transition-transform hover:scale-105 ${
                plan.highlight
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              <div>
                <h3 className="text-2xl font-semibold mb-4">{plan.planType}</h3>
                <p
                  className={`text-3xl font-bold mb-6 ${
                    plan.highlight ? "text-white" : "text-indigo-600"
                  }`}
                >
                  {plan.price}
                </p>
                <ul className="mb-6 space-y-2 text-left">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span
                        className={`h-4 w-4 rounded-full ${
                          plan.highlight ? "bg-white" : "bg-indigo-600"
                        }`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleSubscribe(plan.planType)}
                disabled={loadingPlan === plan.planType}
                className={`mt-auto py-3 px-6 rounded-md font-semibold transition ${
                  plan.highlight
                    ? "bg-white text-indigo-600 hover:bg-gray-100"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {loadingPlan === plan.planType
                  ? "Redirecting..."
                  : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
