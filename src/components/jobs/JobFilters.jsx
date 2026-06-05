// components/jobs/JobFilters.jsx
"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

const CATEGORIES = [
  "Engineering",
  "Design",
  "Marketing",
  "Product",
  "Artificial Intelligence",
  "Data & Analytics",
  "Security",
  "Operations",
];

const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

const WORK_MODES = [
  { value: "remote", label: "Remote" },
  { value: "on-site", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
];

const EXPERIENCE = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior Level" },
  { value: "lead", label: "Lead / Manager" },
];

// ── One collapsible section ───────────────────────────────────────
function FilterSection({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 px-4 text-left focus:outline-none focus:ring-2 focus:ring-brand focus:ring-inset"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-text-primary">
          {title}
        </span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={
            open
              ? "text-text-muted rotate-180 transition-transform duration-200"
              : "text-text-muted transition-transform duration-200"
          }
        />
      </button>

      {open && <div className="px-4 pb-4 flex flex-col">{children}</div>}
    </div>
  );
}

// ── One filter option row
function FilterOption({ label }) {
  return (
    <button
      type="button"
      className="w-full text-left py-1.5 text-base text-text-secondary hover:text-text-primary hover:underline underline-offset-2 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-inset rounded"
    >
      {label}
    </button>
  );
}

// ── The full filter panel
function FilterPanel() {
  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-base font-semibold text-text-primary">Filters</h2>
      </div>

      <FilterSection title="Category" defaultOpen={true}>
        {CATEGORIES.map((cat) => (
          <FilterOption key={cat} label={cat} />
        ))}
      </FilterSection>

      <FilterSection title="Job Type" defaultOpen={true}>
        {JOB_TYPES.map((t) => (
          <FilterOption key={t.value} label={t.label} />
        ))}
      </FilterSection>

      <FilterSection title="Work Mode" defaultOpen={true}>
        {WORK_MODES.map((m) => (
          <FilterOption key={m.value} label={m.label} />
        ))}
      </FilterSection>

      <FilterSection title="Experience Level" defaultOpen={false}>
        {EXPERIENCE.map((e) => (
          <FilterOption key={e.value} label={e.label} />
        ))}
      </FilterSection>
    </div>
  );
}

// ── Exported — desktop shows panel, mobile shows button + drawer ──
export default function JobFilters({ isMobile = false }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!isMobile) {
    return <FilterPanel />;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setDrawerOpen(!drawerOpen)}
        className="flex items-center gap-2 px-4 py-2.5 text-base font-medium text-text-secondary bg-surface border border-border rounded-md hover:bg-surface-hover transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-11"
      >
        <SlidersHorizontal size={16} aria-hidden="true" />
        Filters
      </button>

      {drawerOpen && (
        <div className="mt-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-base font-semibold text-text-primary">Filters</p>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close filters"
              className="p-1 rounded text-text-muted hover:text-text-primary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1"
            >
              <X size={18} />
            </button>
          </div>
          <FilterPanel />
        </div>
      )}
    </>
  );
}
