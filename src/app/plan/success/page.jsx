// app/success/page.jsx
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { email } from "better-auth";
import { createSubscription } from "@/lib/actions/subscription";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) return redirect("/");

  const {
    status,
    customer_details: { email: customerEmail },
    metadata,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") return redirect("/");

  if (status === "complete") {
    const subsInfo = {
      email: customerEmail,
      planId: metadata.planId,
    };
    // update the user plan
    const result = await createSubscription(subsInfo);
    console.log("this is create subscription", result);
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-12">
        <div className="bg-[#141414] border border-white/10 rounded-lg w-full max-w-md p-8">
          {/* Icon + heading */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
              <Check
                size={22}
                className="text-green-400"
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </div>
            <h1 className="text-2xl font-bold text-white text-center">
              Payment confirmed
            </h1>
            <p className="text-base text-white/50 text-center mt-1">
              Your plan is active. Welcome to HireLoop.
            </p>
          </div>

          {/* Email row */}
          <div className="bg-white/5 border border-white/10 rounded-md px-4 py-3 mb-6">
            <p className="text-sm font-medium text-white/40 mb-0.5">
              Receipt sent to
            </p>
            <p className="text-base font-medium text-white break-all">
              {customerEmail}
            </p>
          </div>

          {/* Checklist */}
          <ul className="flex flex-col gap-3 mb-8">
            {[
              "Your new plan limits are active immediately",
              "A receipt has been sent to your email",
              "Manage or cancel your plan anytime in account settings",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check
                    size={11}
                    className="text-green-400"
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                </div>
                <span className="text-base text-white/60">{item}</span>
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <Link
              href="/jobs"
              className="w-full py-2.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-150 flex items-center justify-center gap-2 min-h-11 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-[#141414]"
            >
              Browse jobs
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/plan"
              className="w-full py-2.5 text-base font-medium text-white/70 hover:text-white bg-transparent border border-white/10 hover:border-white/30 rounded-md transition-colors duration-150 text-center min-h-11 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#141414]"
            >
              View my plan
            </Link>
          </div>

          {/* Support */}
          <p className="text-sm text-white/30 text-center mt-6">
            Questions?{" "}
            <a
              href="mailto:support@hireloop.com"
              className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-150"
            >
              Contact support
            </a>
          </p>
        </div>
      </main>
    );
  }
}
