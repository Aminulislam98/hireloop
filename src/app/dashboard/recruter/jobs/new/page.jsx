"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  MapPin,
  FileText,
  Building2,
  ChevronDown,
} from "lucide-react";

// ── Validation ────────────────────────────────────────────────────────────────

function validate(data, isRemote) {
  const errors = {};

  if (!data.title.trim()) errors.title = "Job title is required";
  if (!data.category) errors.category = "Please select a category";
  if (!data.type) errors.type = "Please select a job type";
  if (!data.deadline) errors.deadline = "Application deadline is required";
  if (!data.responsibilities.trim())
    errors.responsibilities = "Responsibilities are required";
  if (!data.requirements.trim())
    errors.requirements = "Requirements are required";

  if (!isRemote) {
    if (!data.city.trim()) errors.city = "City is required for on-site roles";
    if (!data.country.trim())
      errors.country = "Country is required for on-site roles";
  }

  if (data.salaryMin && data.salaryMax) {
    if (Number(data.salaryMin) > Number(data.salaryMax)) {
      errors.salaryMin = "Min salary cannot be greater than max";
    }
  }

  return errors;
}

// ── Field components ──────────────────────────────────────────────────────────

function Label({ children, required }) {
  return (
    <label className="block text-sm font-medium text-zinc-300 mb-1.5">
      {children}
      {required && <span className="text-rose-400 ml-1">*</span>}
    </label>
  );
}

function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-rose-400">{message}</p>;
}

function Input({ name, error, ...props }) {
  return (
    <>
      <input
        name={name}
        {...props}
        className={`w-full bg-zinc-900 border rounded-lg px-4 py-2.5 text-zinc-100 text-sm placeholder:text-zinc-600 focus:outline-none transition-colors
          ${error ? "border-rose-500 focus:border-rose-400" : "border-zinc-700 focus:border-zinc-500"}`}
      />
      <FieldError message={error} />
    </>
  );
}

function Textarea({ name, error, ...props }) {
  return (
    <>
      <textarea
        name={name}
        {...props}
        rows={5}
        className={`w-full bg-zinc-900 border rounded-lg px-4 py-2.5 text-zinc-100 text-sm placeholder:text-zinc-600 focus:outline-none transition-colors resize-none
          ${error ? "border-rose-500 focus:border-rose-400" : "border-zinc-700 focus:border-zinc-500"}`}
      />
      <FieldError message={error} />
    </>
  );
}

function Select({ name, error, children, ...props }) {
  return (
    <>
      <div className="relative">
        <select
          name={name}
          {...props}
          className={`w-full appearance-none bg-zinc-900 border rounded-lg px-4 py-2.5 text-zinc-100 text-sm focus:outline-none transition-colors
            ${error ? "border-rose-500 focus:border-rose-400" : "border-zinc-700 focus:border-zinc-500"}`}
        >
          {children}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-3 top-3.5 text-zinc-500 pointer-events-none"
        />
      </div>
      <FieldError message={error} />
    </>
  );
}

function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className="p-1.5 rounded-md bg-zinc-800 text-zinc-400">
        <Icon size={15} />
      </div>
      <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">
        {title}
      </h2>
    </div>
  );
}

function Section({ children }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
      {children}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function PostJobPage() {
  const router = useRouter();
  const [isRemote, setIsRemote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      title: formData.get("title"),
      category: formData.get("category"),
      type: formData.get("type"),
      salaryMin: formData.get("salaryMin"),
      salaryMax: formData.get("salaryMax"),
      currency: formData.get("currency"),
      city: formData.get("city") ?? "",
      country: formData.get("country") ?? "",
      deadline: formData.get("deadline"),
      responsibilities: formData.get("responsibilities"),
      requirements: formData.get("requirements"),
      benefits: formData.get("benefits"),
    };

    // Run validation — stop if any errors
    const validationErrors = validate(data, isRemote);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorEl = document.querySelector("[data-error='true']");
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Clear errors and submit
    setErrors({});
    setIsSubmitting(true);

    const payload = { ...data, isRemote, status: "active" };
    console.log("Submitting:", payload);

    try {
      // TODO: replace with your actual API endpoint
      const res = await fetch("/api/recruiter/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/dashboard/recruiter/jobs");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100">Post a Job</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Fill in the details below to publish a new job listing.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* ── Job Info ──────────────────────────────────────────────────── */}
        <Section>
          <SectionHeader icon={Briefcase} title="Job Info" />
          <div className="space-y-4">
            <div data-error={!!errors.title}>
              <Label required>Job Title</Label>
              <Input
                name="title"
                placeholder="e.g. Senior Frontend Developer"
                error={errors.title}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div data-error={!!errors.category}>
                <Label required>Job Category</Label>
                <Select name="category" defaultValue="" error={errors.category}>
                  <option value="" disabled>
                    Select category
                  </option>
                  <option>Engineering</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                  <option>Finance</option>
                  <option>Customer Support</option>
                  <option>Operations</option>
                  <option>Healthcare</option>
                  <option>Education</option>
                  <option>Other</option>
                </Select>
              </div>
              <div data-error={!!errors.type}>
                <Label required>Job Type</Label>
                <Select name="type" defaultValue="" error={errors.type}>
                  <option value="" disabled>
                    Select type
                  </option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="remote">Remote</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </Select>
              </div>
            </div>

            <div>
              <Label>Salary Range</Label>
              <div className="grid grid-cols-3 gap-3">
                <div data-error={!!errors.salaryMin}>
                  <Input
                    name="salaryMin"
                    placeholder="Min"
                    type="number"
                    error={errors.salaryMin}
                  />
                </div>
                <Input name="salaryMax" placeholder="Max" type="number" />
                <Select name="currency" defaultValue="GBP">
                  <option value="GBP">GBP £</option>
                  <option value="USD">USD $</option>
                  <option value="EUR">EUR €</option>
                  <option value="BDT">BDT ৳</option>
                </Select>
              </div>
            </div>

            <div data-error={!!errors.deadline}>
              <Label required>Application Deadline</Label>
              <Input name="deadline" type="date" error={errors.deadline} />
            </div>
          </div>
        </Section>

        {/* ── Location ──────────────────────────────────────────────────── */}
        <Section>
          <SectionHeader icon={MapPin} title="Location" />

          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-zinc-400">
              This is a remote position
            </span>
            <button
              type="button"
              onClick={() => setIsRemote((v) => !v)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${isRemote ? "bg-zinc-100" : "bg-zinc-700"}`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-zinc-900 transition-transform duration-200 ${isRemote ? "translate-x-5" : ""}`}
              />
            </button>
          </div>

          {!isRemote && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div data-error={!!errors.city}>
                <Label>City</Label>
                <Input
                  name="city"
                  placeholder="e.g. London"
                  error={errors.city}
                />
              </div>
              <div data-error={!!errors.country}>
                <Label>Country</Label>
                <Input
                  name="country"
                  placeholder="e.g. United Kingdom"
                  error={errors.country}
                />
              </div>
            </div>
          )}
        </Section>

        {/* ── Job Description ────────────────────────────────────────────── */}
        <Section>
          <SectionHeader icon={FileText} title="Job Description" />
          <div className="space-y-4">
            <div data-error={!!errors.responsibilities}>
              <Label required>Responsibilities</Label>
              <Textarea
                name="responsibilities"
                placeholder="List the key responsibilities of this role..."
                error={errors.responsibilities}
              />
            </div>

            <div data-error={!!errors.requirements}>
              <Label required>Requirements</Label>
              <Textarea
                name="requirements"
                placeholder="Skills, experience, and qualifications required..."
                error={errors.requirements}
              />
            </div>

            <div>
              <Label>
                Benefits{" "}
                <span className="text-zinc-600 font-normal">(optional)</span>
              </Label>
              <Textarea
                name="benefits"
                placeholder="e.g. Health insurance, flexible hours, equity..."
              />
            </div>
          </div>
        </Section>

        {/* ── Company (auto-filled) ──────────────────────────────────────── */}
        <Section>
          <SectionHeader icon={Building2} title="Company" />
          <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/60 border border-zinc-700/50">
            <div className="w-9 h-9 rounded-md bg-zinc-700 flex items-center justify-center text-zinc-400">
              <Building2 size={16} />
            </div>
            <div>
              {/* TODO: session?.user?.company?.name */}
              <p className="text-sm font-medium text-zinc-200">
                Your Company Name
              </p>
              <p className="text-xs text-zinc-500">
                Auto-filled from your registered company
              </p>
            </div>
          </div>
        </Section>

        {/* ── Submit ─────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Publishing..." : "Publish Job"}
          </button>
        </div>
      </form>
    </div>
  );
}
