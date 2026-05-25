// src/components/sections/StatsSection.jsx
"use client";

import React from "react";
// Using standard lightweight lucide icons matching your metrics
import { Briefcase, Building2, Users, Star } from "lucide-react";
import Image from "next/image";

export default function StatsSection() {
  return (
    /* HTML5 <section> block managing the structural layer. */
    <section className="relative w-full bg-[#0A0A0A] overflow-hidden py-24 px-4 md:px-8 text-white min-h-150 flex flex-col items-center justify-center">
      <Image
        fill
        src="/images/globe.png"
        alt="World Map Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none select-none z-0"
      />

      {/* Decorative Radial Top Glow to blend your background globe seamlessly with the deep dark theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Main content wrapper forcing text above the absolute image layout via relative z-10 */}
      <div className="relative z-10 max-w-7xl w-full flex flex-col items-center gap-16">
        {/* ==========================================
            1. CENTRAL BANNER HEADING
            ========================================== */}
        <header className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <h2 className="text-2xl md:text-4xl font-normal tracking-tight text-neutral-300 leading-snug">
            Assisting over{" "}
            {/* Bold contrast highlighting matching your screen reference capture */}
            <span className="font-semibold text-white">15,000 job seekers</span>{" "}
            <br className="hidden sm:block" />
            find their dream positions.
          </h2>
        </header>

        {/* ==========================================
            2. METRIC CARDS GRID CONTAINER
            ========================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {/* CARD 1: Active Jobs */}
          <article className="bg-[#121212]/90 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col gap-8 hover:border-white/10 transition-colors duration-200">
            <div className="text-neutral-400">
              <Briefcase size={20} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-1 text-left">
              <span className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                50K
              </span>
              <span className="text-xs font-medium text-neutral-400">
                Active Jobs
              </span>
            </div>
          </article>

          {/* CARD 2: Companies */}
          <article className="bg-[#121212]/90 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col gap-8 hover:border-white/10 transition-colors duration-200">
            <div className="text-neutral-400">
              <Building2 size={20} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-1 text-left">
              <span className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                12K
              </span>
              <span className="text-xs font-medium text-neutral-400">
                Companies
              </span>
            </div>
          </article>

          {/* CARD 3: Job Seekers */}
          <article className="bg-[#121212]/90 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col gap-8 hover:border-white/10 transition-colors duration-200">
            <div className="text-neutral-400">
              <Users size={20} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-1 text-left">
              <span className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                2M
              </span>
              <span className="text-xs font-medium text-neutral-400">
                Job Seekers
              </span>
            </div>
          </article>

          {/* CARD 4: Satisfaction Rate */}
          <article className="bg-[#121212]/90 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col gap-8 hover:border-white/10 transition-colors duration-200">
            <div className="text-neutral-400">
              <Star size={20} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-1 text-left">
              <span className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                97%
              </span>
              <span className="text-xs font-medium text-neutral-400">
                Satisfaction Rate
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
