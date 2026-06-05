// components/jobs/JobSearchBar.jsx
// Top search bar — job title + location + search button
// Hardcoded UI only — wire up later

"use client";

import { Search, MapPin } from "lucide-react";

export default function JobSearchBar() {
  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Job title input */}
        <div className="flex-1 min-w-0">
          <label
            htmlFor="search-title"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Job Title
          </label>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="search-title"
              type="search"
              placeholder="e.g. Frontend Engineer"
              className="w-full text-base bg-page-bg border border-border-secondary rounded-md pl-9 pr-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-colors duration-150"
            />
          </div>
        </div>

        {/* Location input */}
        <div className="flex-1 min-w-0">
          <label
            htmlFor="search-location"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Location
          </label>
          <div className="relative">
            <MapPin
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="search-location"
              type="search"
              placeholder="e.g. San Francisco or Remote"
              className="w-full text-base bg-page-bg border border-border-secondary rounded-md pl-9 pr-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-colors duration-150"
            />
          </div>
        </div>

        {/* Search button — aligns to bottom of inputs */}
        <div className="flex items-end">
          <button
            type="button"
            className="w-full sm:w-auto border border-border-secondary px-8 py-2.5 text-base font-bold text-on-brand bg-brand hover:bg-brand-hover rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 active:scale-[0.98] min-h-11 whitespace-nowrap"
          >
            Search Jobs
          </button>
        </div>
      </div>
    </div>
  );
}
