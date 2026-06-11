// src/components/layout/navbar/Navbar.jsx
"use client";

import { useState } from "react";
import { Menu, X, Briefcase, ChevronDown } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = session?.user;
  console.log("this is user data :", user);

  const handleSignOut = async () => {
    await authClient.signOut();
    setMenuOpen(false);
  };
  const NAV_LINKS = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Companies", href: "/dashboard/recruiter/company" },
    { label: "Pricing", href: "/plan" },
  ];
  const dashboardLinks = {
    seeker: "/dashboard/seeker",
    recruiter: "/dashboard/recruiter",
    admin: "/dashboard/admin",
  };
  if (user?.email) {
    NAV_LINKS.push({
      label: "Dashboard",
      href: dashboardLinks[user?.role || "seeker"],
    });
  }

  return (
    <header className=" top-0 left-0 right-0 z-50 bg-surface border-b border-border sticky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* ── Logo ─────────────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-2.5 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded-md"
          aria-label="HireLoop home"
        >
          <div className="w-8 h-8 bg-brand rounded-md flex items-center justify-center flex-shrink-0">
            <Briefcase size={16} className="text-on-brand" aria-hidden="true" />
          </div>
          <span className="text-base font-bold text-text-primary tracking-tight">
            Hire<span className="text-brand">Loop</span>
          </span>
        </Link>

        {/* ── Desktop nav ───────────────────────────────────── */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop right actions ─────────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          {isPending ? (
            // Skeleton while session loads
            <div className="h-8 w-24 rounded-md bg-page-bg animate-pulse" />
          ) : user ? (
            // Signed-in state
            <div className="flex items-center gap-3">
              <span className="text-base font-medium text-text-secondary truncate max-w-40">
                {user.name}
              </span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-base font-medium text-text-secondary border border-border rounded-md hover:border-brand hover:text-brand transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-11"
              >
                Sign Out
              </button>
            </div>
          ) : (
            // Signed-out state
            <>
              <Link
                href="/signin"
                className="px-4 py-2 text-base font-medium text-text-secondary hover:text-text-primary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded-md min-h-11 flex items-center"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-base font-bold text-on-brand bg-brand hover:bg-brand-hover rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 active:scale-[0.98] min-h-11 flex items-center"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile menu button ────────────────────────────── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1 min-h-11 min-w-11 flex items-center justify-center"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────── */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-surface">
          <nav
            className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-3 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-inset"
              >
                {link.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="border-t border-border my-2" />

            {isPending ? (
              <div className="h-10 w-full rounded-md bg-page-bg animate-pulse" />
            ) : user ? (
              <div className="flex flex-col gap-2">
                <p className="px-3 py-2 text-base font-medium text-text-muted truncate">
                  {user.name}
                </p>
                <button
                  onClick={handleSignOut}
                  className="w-full px-3 py-3 text-base font-medium text-text-secondary border border-border rounded-md hover:border-brand hover:text-brand transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-inset text-left min-h-11"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="w-full px-3 py-3 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-inset min-h-11 block"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="w-full px-3 py-3 text-base font-bold text-on-brand bg-brand hover:bg-brand-hover rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-inset active:scale-[0.98] min-h-11 block text-center"
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
