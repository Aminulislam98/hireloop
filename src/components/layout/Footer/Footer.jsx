// src/components/layout/footer/Footer.jsx
"use client";

import { LogoFacebook, LogoLinkedin } from "@gravity-ui/icons";
import React from "react";
// Import icons from lucide-react (using standard Facebook and Linkedin, and a stylized globe/icon for Pinterest)

export default function Footer() {
  return (
    /* HTML5 <footer> semantic tag for layout structure.
       Uses a deep matte black background matching the landing page theme.
    */
    <footer className="w-full bg-[#0A0A0A] border-t border-white/5 text-white py-16 px-4 md:px-8 dark">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* ==========================================
            1. TOP LAYER: BRAND INFO & LINKS GRID
            ========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-4">
          {/* Brand Presentation Section (Spans 5 columns on desktop) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-3 select-none">
              {/* Pure CSS Geometric Brand Logo Placeholder matching the Nav Header */}
              <div className="w-9 h-9 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <span className="text-white font-black text-lg">P</span>
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-sm font-extrabold tracking-tight text-white uppercase">
                  Hiring
                </span>
                <span className="text-sm font-extrabold tracking-tight text-white uppercase">
                  Loop
                </span>
              </div>
            </div>

            {/* Platform short mission description paragraph */}
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Links Grid System (Spans 7 columns on desktop - 3 distinct blocks) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Category: Product */}
            <nav className="flex flex-col gap-4">
              {/* Custom branding blue text styling matching your exact image layout */}
              <h3 className="text-sm font-semibold text-[#4F46E5] tracking-wider uppercase">
                Product
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-neutral-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Job discovery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Worker AI
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Companies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Salary data
                  </a>
                </li>
              </ul>
            </nav>

            {/* Category: Navigations */}
            <nav className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-[#4F46E5] tracking-wider uppercase">
                Navigations
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-neutral-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Career library
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            {/* Category: Resources */}
            <nav className="flex flex-col gap-4 col-span-2 sm:col-span-1">
              <h3 className="text-sm font-semibold text-[#4F46E5] tracking-wider uppercase">
                Resources
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-neutral-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Brand Guideline
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Newsroom
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </section>

        {/* ==========================================
            2. BOTTOM LAYER: SOCIALS & LEGAL DATA
            ========================================== */}
        <section className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Social Platforms Row (No external images used, blocks styled via CSS) */}
          <div className="flex items-center gap-3">
            {/* Facebook Icon Block */}
            <a
              href="#"
              aria-label="Facebook Profile"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
            >
              <LogoFacebook size={18} fill="currentColor" />
            </a>

            {/* Pinterest Style Brand Accent Icon Block */}
            <a
              href="#"
              aria-label="Pinterest Profile"
              className="w-10 h-10 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white flex items-center justify-center transition-colors"
            >
              {/* Fallback geometric vectors representing a platform icon seamlessly */}
              <span className="font-serif font-extrabold italic text-lg text-white">
                P
              </span>
            </a>

            {/* LinkedIn Icon Block */}
            <a
              href="#"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
            >
              <LogoLinkedin size={18} fill="currentColor" />
            </a>
          </div>

          {/* Legal Declarations & Meta Content Row */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-neutral-500 text-center sm:text-right">
            <span>Copyright 2024 — Programming Hero</span>
            <div className="hidden sm:block w-1 h-1 bg-neutral-700 rounded-full" />
            <div className="flex gap-4">
              <a href="#" className="hover:text-neutral-300 transition-colors">
                Terms & Policy
              </a>
              <a href="#" className="hover:text-neutral-300 transition-colors">
                Privacy Guideline
              </a>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
