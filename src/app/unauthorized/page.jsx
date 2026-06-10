// app/unauthorized/page.jsx
import Link from "next/link";
import { ShieldOff, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "401 — Unauthorized | Aminul Islam",
  description: "You do not have permission to access this page.",
  robots: { index: false, follow: false },
};

export default function UnauthorizedPage() {
  return (
    <main
      className="min-h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden"
      aria-labelledby="unauthorized-heading"
    >
      {/* Dot grid texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      {/* Card */}
      <article className="relative z-10 w-full max-w-md bg-[#111111] border border-[#262626] rounded-lg px-8 py-12 sm:px-12 flex flex-col items-center text-center gap-6">
        {/* Icon badge — full solid red */}
        <div
          className="flex items-center justify-center w-16 h-16 rounded-full bg-[#d93025]"
          aria-hidden="true"
        >
          <ShieldOff size={28} strokeWidth={1.75} className="text-white" />
        </div>

        {/* Status code */}
        <p
          className="text-sm font-medium tracking-widest uppercase text-white select-none"
          aria-hidden="true"
        >
          Error 401
        </p>

        {/* Heading */}
        <h1
          id="unauthorized-heading"
          className="text-2xl sm:text-3xl font-bold leading-tight text-white -mt-2"
        >
          Access Denied
        </h1>

        {/* Description */}
        <p className="text-base font-normal leading-relaxed text-white max-w-xs">
          You don&apos;t have permission to view this page. Contact support to
          request access.
        </p>

        {/* Divider */}
        <div className="w-full border-t border-[#262626]" aria-hidden="true" />

        {/* CTA */}
        <nav
          className="flex items-center justify-center w-full"
          aria-label="Recovery options"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] px-8 rounded-md bg-[#3b82f6] text-base font-semibold text-white transition-all duration-150 hover:bg-[#2563eb] active:scale-[0.98] active:bg-[#1d4ed8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
          >
            <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
            Go Home
          </Link>
        </nav>
      </article>

      {/* Footer */}
      <footer className="relative z-10 mt-8 text-center">
        <p className="text-sm text-white">
          Need access?{" "}
          <Link
            href="mailto:aminul@aminulislam.co.uk"
            className="text-[#3b82f6] underline underline-offset-4 transition-colors duration-150 hover:text-[#2563eb] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:rounded-sm"
          >
            Contact support
          </Link>
        </p>
      </footer>
    </main>
  );
}
