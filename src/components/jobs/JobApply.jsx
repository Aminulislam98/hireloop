"use client";

import { useState } from "react";
import { Link2, FileText, Globe, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { submitApplication } from "@/lib/actions/applicaitons";

const JobApply = ({ job, applicant }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect all form values from the form element
    const form = e.target;
    const resumeUrl = form.resumeUrl.value.trim();
    const portfolioUrl = form.portfolioUrl.value.trim();
    const linkedinUrl = form.linkedinUrl.value.trim();
    const phone = form.phone.value.trim();
    const coverLetter = form.coverLetter.value.trim();

    // Build the application data object to send to API
    const applicationData = {
      jobId: job?._id,
      jobTitle: job?.title,
      companyId: job?.companyId,
      companyName: job?.companyName,
      applicantId: applicant?._id,
      applicantName: applicant?.name,
      applicantEmail: applicant?.email,
      resumeUrl,
      portfolioUrl,
      linkedinUrl,
      phone,
      coverLetter,
    };

    try {
      setLoading(true);
      await submitApplication(applicationData);
      toast.success("Application submitted successfully!");
      form.reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Application error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-page-bg">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary leading-tight">
            Apply for {job?.title}
          </h1>
          <p className="text-base text-text-secondary mt-1">
            {job?.companyName} &bull; {job?.city}, {job?.country}
          </p>
        </div>

        {/* Applicant info — read only */}
        <div className="bg-surface border border-border rounded-lg p-5 mb-6">
          <h2 className="text-base font-semibold text-text-primary mb-3">
            Your Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-text-muted">Full Name</p>
              <p className="text-base text-text-primary mt-0.5">
                {applicant?.name || "—"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-text-muted">Email</p>
              <p className="text-base text-text-primary mt-0.5">
                {applicant?.email || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Application form */}
        <div className="bg-surface border border-border rounded-lg p-5">
          <h2 className="text-base font-semibold text-text-primary mb-5">
            Application Details
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Resume link — required */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="resumeUrl"
                className="text-base font-medium text-text-primary"
              >
                Resume Link <span className="text-error">*</span>
              </label>
              <p className="text-sm text-text-muted">
                Paste a link to your CV — Google Drive, Dropbox, or any public
                URL
              </p>
              <div className="relative">
                <Link2
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="resumeUrl"
                  name="resumeUrl"
                  type="url"
                  required
                  placeholder="https://drive.google.com/your-resume"
                  className="w-full text-base bg-page-bg border-2 border-border rounded-md pl-9 pr-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-colors duration-150"
                />
              </div>
            </div>

            {/* Portfolio — optional */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="portfolioUrl"
                className="text-base font-medium text-text-primary"
              >
                Portfolio URL
                <span className="text-sm font-normal text-text-muted ml-2">
                  (optional)
                </span>
              </label>
              <div className="relative">
                <FileText
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="portfolioUrl"
                  name="portfolioUrl"
                  type="url"
                  placeholder="https://yourportfolio.com"
                  className="w-full text-base bg-page-bg border-2 border-border rounded-md pl-9 pr-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-colors duration-150"
                />
              </div>
            </div>

            {/* LinkedIn — optional */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="linkedinUrl"
                className="text-base font-medium text-text-primary"
              >
                LinkedIn Profile
                <span className="text-sm font-normal text-text-muted ml-2">
                  (optional)
                </span>
              </label>
              <div className="relative">
                <Globe
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  type="url"
                  placeholder="https://linkedin.com/in/yourname"
                  className="w-full text-base bg-page-bg border-2 border-border rounded-md pl-9 pr-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-colors duration-150"
                />
              </div>
            </div>

            {/* Phone — optional */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="phone"
                className="text-base font-medium text-text-primary"
              >
                Phone Number
                <span className="text-sm font-normal text-text-muted ml-2">
                  (optional)
                </span>
              </label>
              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+44 7700 900000"
                  className="w-full text-base bg-page-bg border-2 border-border rounded-md pl-9 pr-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-colors duration-150"
                />
              </div>
            </div>

            {/* Cover letter — optional */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="coverLetter"
                className="text-base font-medium text-text-primary"
              >
                Cover Letter
                <span className="text-sm font-normal text-text-muted ml-2">
                  (optional)
                </span>
              </label>
              <p className="text-sm text-text-muted">
                Tell the employer why you are a great fit for this role
              </p>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows={5}
                placeholder="I am excited to apply for this role because..."
                className="w-full text-base bg-page-bg border-2 border-border rounded-md px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-colors duration-150 resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 text-base font-bold text-on-brand bg-brand hover:bg-brand-hover rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 active:scale-[0.98] min-h-11 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
              <button
                type="reset"
                disabled={loading}
                className="flex-1 py-3 text-base font-medium text-text-secondary bg-surface border-2 border-border hover:border-brand hover:text-brand rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-11 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default JobApply;
