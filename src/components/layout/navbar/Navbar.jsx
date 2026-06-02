// src/components/layout/navbar/Navbar.jsx
"use client"; // Required for client-side state handling of the mobile drawer switch

import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Lightweight mobile icons
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function PremiumNavbar() {
  // getting user data
  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession();

  // State to track mobile menu toggle smoothly without external UI dependencies
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const singOut = async () => {
    await authClient.signOut();
    console.log("signout:");
    console.log(session?.user?.id);
  };

  return (
    /* HTML5 <header> semantic tag for optimal SEO and screen-reader accessibility.
       Fixed position at top with a dark theme background color matching the design.
    */
    <header className="w-full bg-[#121212] border-b border-white/10 sticky top-0 z-50 dark">
      {/* HTML5 <section> container wrapper replacing the old Navbar element.
          Provides standard layout padding across all desktop break-points.
      */}
      <section className="h-20 max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        {/* ==========================================
            1. BRAND / LOGO SECTION
            ========================================== */}
        <div className="flex items-center gap-3 select-none">
          {/* Stylized pure CSS geometric logo icon */}
          <div className="w-9 h-9 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="text-white font-black text-lg">P</span>
          </div>

          {/* Typography layout mimicking the reference image's stacked font style */}
          <div className="flex flex-col text-left leading-none">
            <span className="text-sm font-extrabold tracking-tight text-white uppercase">
              Hire
            </span>
            <span className="text-sm font-extrabold tracking-tight text-white uppercase">
              Loop
            </span>
          </div>
        </div>

        {/* ==========================================
            2. DESKTOP LINKS & CENTRAL PILL
            ========================================== 
            Using standard HTML5 <nav> for core links. Implements the rounded-full 
            pill container style from your design screenshot. Hidden on mobile.
        */}
        <nav className="hidden md:flex items-center gap-8 bg-[#1A1A1A] border border-white/5 px-8 py-3 rounded-full">
          <a
            href="#"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Browse Jobs
          </a>
          <a
            href="#"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Company
          </a>
          <a
            href="#"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Pricing
          </a>

          {/* The visual vertical separator line visible in your reference image */}
          <div className="w-[1px] h-4 bg-white/20 mx-1" />

          {session?.user ? (
            <button onClick={() => singOut()} className="hover:underline">
              Sign out
            </button>
          ) : (
            <Link
              href={"/signin"}
              className="text-sm font-semibold text-[#6366F1] hover:text-[#818CF8] transition-colors"
            >
              Sign In
            </Link>
          )}

          {/* Custom purple color match for your design's Sign In link */}
        </nav>

        {/* ==========================================
            3. CALL TO ACTION / MOBILE CONTROLLER
            ========================================== */}
        <div className="flex items-center gap-4">
          {/* Main button: White block text style matching the image exactly */}
          {session?.user ? (
            <p>{session?.user?.name}</p>
          ) : (
            <Link
              href="/signup"
              className="hidden sm:inline-flex items-center justify-center bg-white text-black font-semibold px-6 h-11 text-sm rounded-xl hover:bg-white/90 transition-all active:scale-95"
            >
              Get Started
            </Link>
          )}

          {/* Mobile Menu Button. Only renders on small screens (md:hidden).
           */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </section>

      {/* ==========================================
          4. MOBILE RESPONSIVE DRAWER OVERLAY
          ========================================== 
          Using HTML5 <aside> for separate visual layer drawer layout. 
          Opens and closes smoothly using Tailwind standard transitions.
      */}
      {isMenuOpen && (
        <aside className="md:hidden w-full bg-[#121212] border-t border-white/5 px-6 py-6 absolute left-0 right-0 top-20 shadow-2xl z-40 transition-all duration-200">
          <nav className="flex flex-col gap-5">
            <a
              href="#"
              className="text-lg font-medium text-white/80 hover:text-white py-1"
            >
              Browse Jobs
            </a>
            <a
              href="#"
              className="text-lg font-medium text-white/80 hover:text-white py-1"
            >
              Company
            </a>
            <a
              href="#"
              className="text-lg font-medium text-white/80 hover:text-white py-1"
            >
              Pricing
            </a>

            <div className="w-full h-[1px] bg-white/10 my-1" />

            {session?.user ? (
              <button onClick={() => singOut()} className="hover:underline">
                Sign out
              </button>
            ) : (
              <Link
                href={"/signin"}
                className="text-sm font-semibold text-[#6366F1] hover:text-[#818CF8] transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* CTA falls into the mobile stack for simple mobile access */}
            {session?.user ? (
              <p>{session?.user?.name}</p>
            ) : (
              <Link
                href="/signup"
                className="hidden sm:inline-flex items-center justify-center bg-white text-black font-semibold px-6 h-11 text-sm rounded-xl hover:bg-white/90 transition-all active:scale-95"
              >
                Get Started
              </Link>
            )}
          </nav>
        </aside>
      )}
    </header>
  );
}
