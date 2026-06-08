// app/plan/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Zap, ChevronDown } from "lucide-react";

// ── Seeker plans data ─────────────────────────────────────────────

const SEEKER_PLANS = [
  {
    name: "Free",
    id: "seeker_free",
    price: "$0",
    period: "forever",
    description: "Start exploring opportunities with no commitment.",
    highlighted: false,
    cta: "Get Started",
    href: "/signup",
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs per month",
      "Basic profile",
      "Email alerts",
    ],
  },
  {
    name: "Pro",
    id: "seeker_pro",
    price: "$19",
    period: "per month",
    description: "For active job seekers who want more reach.",
    highlighted: true,
    cta: "Upgrade to Pro",
    href: "/signup?plan=pro",
    features: [
      "Apply to up to 30 jobs per month",
      "Unlimited saved jobs",
      "Application tracking",
      "Salary insights",
    ],
  },
  {
    name: "Premium",
    id: "seeker_premium",
    price: "$39",
    period: "per month",
    description: "Everything you need to land your next role faster.",
    highlighted: false,
    cta: "Go Premium",
    href: "/signup?plan=premium",
    features: [
      "Everything in Pro",
      "Unlimited applications",
      "Profile boost to recruiters",
      "Early access to new jobs",
      "Priority support",
    ],
  },
];

// ── Recruiter plans data ──────────────────────────────────────────

const RECRUITER_PLANS = [
  {
    name: "Free",

    price: "$0",
    period: "forever",
    description: "Great for a company's first year of hiring.",
    highlighted: false,
    cta: "Get Started",
    href: "/signup?role=recruiter",
    features: [
      "Up to 3 active job posts",
      "Basic applicant management",
      "Standard listing visibility",
    ],
  },
  {
    name: "Growth",
    id: "recruiter_growth",
    price: "$49",
    period: "per month",
    description: "For teams that hire regularly and need more control.",
    highlighted: true,
    cta: "Upgrade to Growth",
    href: "/signup?role=recruiter&plan=growth",
    features: [
      "Up to 10 active job posts",
      "Applicant tracking",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    name: "Enterprise",
    id: "recruiter_enterprise",
    price: "$149",
    period: "per month",
    description: "Full-scale hiring for large organisations.",
    highlighted: false,
    cta: "Contact Sales",
    href: "/contact",
    features: [
      "Up to 50 active job posts",
      "Advanced analytics dashboard",
      "Featured job listings",
      "Team collaboration",
      "Custom branding",
      "Priority support",
    ],
  },
];

// ── FAQ data

const FAQS = [
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes. You can cancel your subscription at any time from your account settings. Your plan will remain active until the end of your current billing period, after which you will be moved to the Free plan.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 7-day refund policy for new subscribers. If you are not satisfied within the first 7 days of your paid plan, contact our support team and we will issue a full refund. Refunds are not available after the 7-day window.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards including Visa, Mastercard, and American Express. We also support payments via PayPal. All payments are processed securely.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Absolutely. You can upgrade or downgrade your plan at any time. When upgrading, the change takes effect immediately and you are billed the prorated difference. When downgrading, the change takes effect at the start of your next billing cycle.",
  },
  {
    question:
      "Is there a difference between the Job Seeker and Recruiter plans?",
    answer:
      "Yes. Job Seeker plans are designed for individuals looking for work — they control how many jobs you can apply to and what tools you have to manage your search. Recruiter plans are for companies and hiring managers — they control how many jobs you can post and what hiring tools you have access to.",
  },
];

// ── Plan card component

function PlanCard({ plan }) {
  return (
    <article
      className={`bg-surface rounded-lg flex flex-col relative ${
        plan.highlighted ? "border-2 border-blue-600" : "border border-border"
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-bold text-white bg-blue-600 rounded-md whitespace-nowrap">
            <Zap size={12} aria-hidden="true" />
            Most Popular
          </span>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Name + price */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-text-primary leading-tight">
            {plan.name}
          </h3>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-bold text-text-primary leading-tight">
              {plan.price}
            </span>
            <span className="text-base text-text-muted">/ {plan.period}</span>
          </div>
          <p className="text-base text-text-secondary mt-2 leading-relaxed">
            {plan.description}
          </p>
        </div>

        <div className="border-t border-border mb-4" />

        {/* Features */}
        <ul className="flex flex-col gap-3 flex-1 mb-6">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check
                size={16}
                className="text-success flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span className="text-base text-text-secondary leading-snug">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <form action="/api/checkout_sessions" method="POST">
          <input type="hidden" name="plan_id" value={plan.id}></input>
          <section>
            <button
              type="submit"
              role="link"
              className={`w-full py-3 text-base font-bold text-center rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] min-h-11 block ${
                plan.highlighted
                  ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-600"
                  : "bg-page-bg text-text-primary border-2 border-border hover:border-blue-600 hover:text-blue-600 focus:ring-blue-600"
              }`}
            >
              Checkout
            </button>
          </section>
        </form>
      </div>
    </article>
  );
}

// ── FAQ accordion item

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0 ">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-inset"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-text-primary pr-4">
          {question}
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`text-text-muted flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="text-base text-text-secondary leading-relaxed pb-4">
          {answer}
        </p>
      )}
    </div>
  );
}

// ── Tab button

function TabButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 py-2.5 text-base font-semibold rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 ${
        active
          ? "bg-blue-600 text-white"
          : "bg-transparent text-text-secondary hover:text-text-primary"
      }`}
    >
      {label}
    </button>
  );
}

// ── Page

export default function PricingPage() {
  const [tab, setTab] = useState("seeker");
  const plans = tab === "seeker" ? SEEKER_PLANS : RECRUITER_PLANS;

  return (
    <main className="min-h-screen bg-page-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 xl:py-10">
        {/* Page header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary leading-tight">
            Simple, transparent pricing
          </h1>
          <p className="text-base text-text-secondary mt-3 max-w-2xl mx-auto leading-relaxed">
            Choose the plan that fits your goals. Upgrade or cancel anytime — no
            hidden fees.
          </p>
        </div>

        {/* Toggle tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-surface border border-border rounded-lg p-1 flex gap-1 w-full max-w-xs">
            <TabButton
              label="Job Seekers"
              active={tab === "seeker"}
              onClick={() => setTab("seeker")}
            />
            <TabButton
              label="Recruiters"
              active={tab === "recruiter"}
              onClick={() => setTab("recruiter")}
            />
          </div>
        </div>

        {/* Plan cards */}
        <section
          aria-label={`${tab === "seeker" ? "Job seeker" : "Recruiter"} pricing plans`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
        </section>

        <p className="text-sm text-text-muted text-center mt-8">
          All prices are in USD &bull; Cancel anytime &bull; 7-day refund policy
        </p>

        {/* FAQ section */}
        <section aria-label="Frequently asked questions" className="mt-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg sm:text-xl font-semibold text-text-primary leading-tight mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="bg-surface border border-border rounded-lg px-6">
              {FAQS.map((faq) => (
                <FaqItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
