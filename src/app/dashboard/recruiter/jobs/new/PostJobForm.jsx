"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Form,
  TextField,
  Input,
  TextArea,
  Label,
  FieldError,
  Switch,
  SwitchControl,
  SwitchThumb,
} from "@heroui/react";
import {
  Briefcase,
  MapPin,
  FileText,
  Building2,
  ChevronDown,
  Clock,
} from "lucide-react";
import { createJobs } from "@/lib/actions/jobs";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const inputCls =
  "w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 aria-invalid:border-rose-500 transition-colors";

const selectCls =
  "w-full appearance-none bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-zinc-500 transition-colors cursor-pointer";

const fieldCls = "flex flex-col gap-1.5";
const labelCls = "text-sm font-medium text-zinc-300";
const errorCls = "text-xs text-rose-400";

// Native select with touch-based validation
function NativeSelect({ name, required, label, placeholder, children }) {
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState("");
  const invalid = required && touched && !value;

  return (
    <div className={fieldCls}>
      {label && (
        <label className={labelCls}>
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          name={name}
          required={required}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          className={`${selectCls} ${invalid ? "border-rose-500" : ""}`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-3 top-3.5 text-zinc-500 pointer-events-none"
        />
      </div>
      {invalid && <p className={errorCls}>This field is required</p>}
    </div>
  );
}

export default function PostJobForm({ company }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isRemote, setIsRemote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPending = company?.result?.status === "pending";

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    const data = Object.fromEntries(new FormData(e.currentTarget));

    const res = await createJobs({
      ...data,
      isRemote,
      status: "active",
      companyId: company?.result?._id,
      companyName: company?.result?.name,
    });

    if (res) {
      toast.success("Job posted successfully!");
      e.target.reset();
      redirect("/dashboard/recruiter/jobs");
    }

    setIsSubmitting(false);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Page header — subtitle adapts to status */}
      <header>
        <h1 className="text-2xl font-semibold text-zinc-100">Post a job</h1>
        <p className="text-base text-zinc-400 mt-1 leading-relaxed">
          {isPending
            ? "Your company is being verified before you can publish a job."
            : "Fill in the details below to publish a new listing."}
        </p>
      </header>

      {/* Status-aware content */}
      {isPending ? (
        <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 sm:p-12 flex flex-col items-center text-center">
          <Clock
            className="w-8 h-8 text-amber-400 mb-5"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <h2 className="text-lg font-semibold text-zinc-100 mb-2">
            Your company is under review
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed mb-6 max-w-md">
            We're verifying your company details. You'll be able to post jobs
            once the review is complete — this usually takes 1–2 business days.
          </p>
          <Link
            href="/dashboard/recruiter/company"
            className="inline-flex items-center justify-center h-11 px-5 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-100 text-base font-medium transition-colors duration-150 hover:bg-zinc-800 hover:border-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            View company details
          </Link>
        </section>
      ) : (
        <Form
          onSubmit={handleSubmit}
          validationBehavior="aria"
          className="space-y-6"
        >
          {/* ── Job Info ── */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-md bg-zinc-800 text-zinc-400">
                <Briefcase size={15} />
              </div>
              <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">
                Job Info
              </h2>
            </div>

            <TextField name="title" isRequired className={fieldCls}>
              <Label className={labelCls}>
                Job Title <span className="text-rose-400">*</span>
              </Label>
              <Input
                className={inputCls}
                placeholder="e.g. Senior Frontend Developer"
              />
              <FieldError className={errorCls} />
            </TextField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NativeSelect
                name="category"
                required
                label="Category"
                placeholder="Select category"
              >
                {[
                  "Engineering",
                  "Design",
                  "Marketing",
                  "Sales",
                  "Finance",
                  "Customer Support",
                  "Operations",
                  "Healthcare",
                  "Education",
                  "Other",
                ].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </NativeSelect>

              <NativeSelect
                name="type"
                required
                label="Job Type"
                placeholder="Select type"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="remote">Remote</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </NativeSelect>
            </div>

            <div>
              <p className={`${labelCls} mb-1.5`}>Salary Range</p>
              <div className="grid grid-cols-3 gap-3">
                <input
                  name="salaryMin"
                  type="number"
                  min={0}
                  placeholder="Min"
                  className={inputCls}
                />
                <input
                  name="salaryMax"
                  type="number"
                  min={0}
                  placeholder="Max"
                  className={inputCls}
                />
                <div className="relative">
                  <select
                    name="currency"
                    defaultValue="GBP"
                    className={selectCls}
                  >
                    <option value="GBP">GBP £</option>
                    <option value="USD">USD $</option>
                    <option value="EUR">EUR €</option>
                    <option value="BDT">BDT ৳</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-3.5 text-zinc-500 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            <TextField name="deadline" isRequired className={fieldCls}>
              <Label className={labelCls}>
                Application Deadline <span className="text-rose-400">*</span>
              </Label>
              <Input type="date" className={inputCls} />
              <FieldError className={errorCls} />
            </TextField>
          </div>

          {/* ── Location ── */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-md bg-zinc-800 text-zinc-400">
                <MapPin size={15} />
              </div>
              <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">
                Location
              </h2>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">
                This is a remote position
              </span>
              <Switch
                isSelected={isRemote}
                onChange={setIsRemote}
                aria-label="Remote position"
                className="cursor-pointer"
              >
                <SwitchControl
                  className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors duration-200 ${isRemote ? "bg-zinc-100" : "bg-zinc-700"}`}
                >
                  <SwitchThumb
                    className={`w-4 h-4 rounded-full bg-zinc-900 transition-transform duration-200 ${isRemote ? "translate-x-5" : "translate-x-0"}`}
                  />
                </SwitchControl>
              </Switch>
            </div>

            {!isRemote && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField name="city" isRequired className={fieldCls}>
                  <Label className={labelCls}>
                    City <span className="text-rose-400">*</span>
                  </Label>
                  <Input className={inputCls} placeholder="e.g. London" />
                  <FieldError className={errorCls} />
                </TextField>
                <TextField name="country" isRequired className={fieldCls}>
                  <Label className={labelCls}>
                    Country <span className="text-rose-400">*</span>
                  </Label>
                  <Input
                    className={inputCls}
                    placeholder="e.g. United Kingdom"
                  />
                  <FieldError className={errorCls} />
                </TextField>
              </div>
            )}
          </div>

          {/* ── Job Description ── */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-md bg-zinc-800 text-zinc-400">
                <FileText size={15} />
              </div>
              <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">
                Job Description
              </h2>
            </div>

            <TextField name="responsibilities" isRequired className={fieldCls}>
              <Label className={labelCls}>
                Responsibilities <span className="text-rose-400">*</span>
              </Label>
              <TextArea
                rows={5}
                className={inputCls}
                placeholder="List the key responsibilities of this role..."
              />
              <FieldError className={errorCls} />
            </TextField>

            <TextField name="requirements" isRequired className={fieldCls}>
              <Label className={labelCls}>
                Requirements <span className="text-rose-400">*</span>
              </Label>
              <TextArea
                rows={5}
                className={inputCls}
                placeholder="Skills, experience, and qualifications required..."
              />
              <FieldError className={errorCls} />
            </TextField>

            <TextField name="benefits" className={fieldCls}>
              <Label className={labelCls}>
                Benefits{" "}
                <span className="text-zinc-600 font-normal">(optional)</span>
              </Label>
              <TextArea
                rows={5}
                className={inputCls}
                placeholder="e.g. Health insurance, flexible hours, equity..."
              />
            </TextField>
          </div>

          {/* ── Company ── auto-filled from session, not a form field ── */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-md bg-zinc-800 text-zinc-400">
                <Building2 size={15} />
              </div>
              <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">
                Company
              </h2>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/60 border border-zinc-700/50">
              <div className="w-9 h-9 rounded-md bg-zinc-700 flex items-center justify-center text-zinc-400">
                <Building2 size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">
                  {session?.user?.name ?? "Your Company"}
                </p>
                <p className="text-xs text-zinc-500">{session?.user?.email}</p>
              </div>
            </div>
          </div>

          {/* ── Submit ── */}
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
        </Form>
      )}
    </div>
  );
}
