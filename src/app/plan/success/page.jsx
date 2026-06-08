// app/success/page.jsx
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Mail, ArrowRight } from "lucide-react";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <main className="min-h-screen bg-page-bg flex items-center justify-center px-4 py-10">
        <div className="bg-white border border-border rounded-lg p-8 max-w-md w-full">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-5">
            <CheckCircle
              size={32}
              className="text-success"
              aria-hidden="true"
            />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-text-primary text-center leading-tight mb-2">
            Payment Successful
          </h1>
          <p className="text-base text-text-secondary text-center leading-relaxed mb-6">
            Your plan is now active. Thank you for choosing HireLoop.
          </p>

          <div className="border-t border-border mb-6" />

          {/* Email confirmation */}
          <div className="flex items-start gap-3 bg-page-bg border border-border rounded-lg p-4 mb-6">
            <Mail
              size={18}
              className="text-text-muted flex-shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-base font-medium text-text-primary">
                Confirmation email sent
              </p>
              <p className="text-sm text-text-secondary mt-0.5 break-all">
                {customerEmail}
              </p>
            </div>
          </div>

          {/* What's next */}
          <div className="mb-6">
            <p className="text-base font-semibold text-text-primary mb-3">
              What happens next?
            </p>
            <ul className="flex flex-col gap-2.5">
              <li className="flex items-start gap-2.5">
                <CheckCircle
                  size={16}
                  className="text-success flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-base text-text-secondary">
                  Your new plan limits are active immediately
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle
                  size={16}
                  className="text-success flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-base text-text-secondary">
                  A receipt has been sent to your email
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle
                  size={16}
                  className="text-success flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-base text-text-secondary">
                  Manage or cancel your subscription anytime from your account
                </span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Link
              href="/jobs"
              className="w-full py-3 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 active:scale-[0.98] min-h-11 flex items-center justify-center gap-2"
            >
              Start browsing jobs
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/plan"
              className="w-full py-3 text-base font-medium text-text-secondary bg-white border-2 border-border hover:border-blue-600 hover:text-blue-600 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 min-h-11 text-center block"
            >
              View my plan
            </Link>
          </div>

          {/* Support */}
          <p className="text-sm text-text-muted text-center mt-5">
            Questions?{" "}
            <a
              href="mailto:support@hireloop.com"
              className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
            >
              Contact support
            </a>
          </p>
        </div>
      </main>
    );
  }
}
