"use client";

import { useState, useRef } from "react";
import { Modal, Label, Select, ListBox, useOverlayState } from "@heroui/react";
import { Pencil, ArrowUpFromSquare, GeoFill } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { CreateCompany } from "@/lib/actions/companies";

// ─── Constants ────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Retail",
  "Manufacturing",
  "Legal",
  "Consulting",
  "Other",
];
const EMPLOYEES = ["1-10", "11-50", "51-200", "201-500", "500+"];

const inputCls =
  "w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 transition-colors";

const STATUS_STYLE = {
  pending: "bg-amber-500/10  text-amber-400  border border-amber-500/20",
  approved: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  rejected: "bg-rose-500/10   text-rose-400   border border-rose-500/20",
};

// ─────────────────────────────────────────────────────────────────────────────

export default function CompanySection({ recruiter, recruiterCompany }) {
  const [company, setCompany] = useState(recruiterCompany?.result || null);
  console.log("this is company:", company);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  const { isOpen, open, close } = useOverlayState();
  const industryRef = useRef("");
  const employeesRef = useRef("");
  const fileInputRef = useRef(null);

  // ── Open modal ─────────────────────────────────────────────────────────────

  function openRegisterModal() {
    setIsEditing(false);
    setLogoPreview(null);
    setLogoFile(null);
    industryRef.current = "";
    employeesRef.current = "";
    open();
  }

  function openEditModal() {
    setIsEditing(true);
    setLogoPreview(company.logoUrl ?? null);
    setLogoFile(null);
    industryRef.current = company.industry ?? "";
    employeesRef.current = company.employees ?? "";
    open();
  }

  // ── Logo picked by user ────────────────────────────────────────────────────

  function onLogoPicked(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  }

  // ── Upload logo to imgbb ───────────────────────────────────────────────────

  async function uploadLogo(file) {
    const body = new FormData();
    body.append("image", file);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
      { method: "POST", body },
    );
    const json = await res.json();
    if (!json.success) throw new Error("Logo upload failed");
    return json.data.url;
  }

  // ── Form submit ────────────────────────────────────────────────────────────

  async function onFormSubmit(e) {
    e.preventDefault();
    setSaving(true);
    console.log("▶ Form submitted");

    try {
      const data = new FormData(e.target);

      const payload = {
        name: data.get("name"),
        industry: industryRef.current,
        location: data.get("location"),
        employees: employeesRef.current,
        website: data.get("website"),
        description: data.get("description"),
        logoUrl: isEditing ? (company.logoUrl ?? null) : null,
        status: isEditing ? company.status : "pending",
        recruiterId: recruiter.id,
      };

      console.log("📦 Payload before logo upload:", payload);

      if (logoFile) {
        console.log("🖼 Uploading logo...");
        payload.logoUrl = await uploadLogo(logoFile);
        console.log("✅ Logo uploaded:", payload.logoUrl);
      }

      console.log("📤 Sending to server action:", payload);
      await CreateCompany(payload);
      console.log("✅ Company saved successfully");

      setCompany(payload);
      close();
      toast.success(isEditing ? "Company updated!" : "Company registered!");
    } catch (err) {
      console.error("❌ Error:", err.message);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
      console.log("🏁 Done");
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* No company yet */}
      {!company && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 flex flex-col items-center gap-4 text-center">
          <p className="text-base font-semibold text-zinc-100">
            No company registered yet
          </p>
          <p className="text-sm text-zinc-400">
            Register your company to start posting jobs on HireLoop.
          </p>
          <button
            onClick={openRegisterModal}
            className="px-6 py-2.5 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold text-sm rounded-lg transition-colors"
          >
            Register Company
          </button>
        </div>
      )}

      {/* Company card */}
      {company && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-zinc-100">Company</h2>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${STATUS_STYLE[company.status] ?? STATUS_STYLE.pending}`}
              >
                {company.status ?? "Pending"}
              </span>
              <button
                onClick={openEditModal}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-sm rounded-lg transition-colors"
              >
                <Pencil size={13} /> Edit
              </button>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-zinc-800 border border-zinc-700 rounded-xl">
            <div className="w-16 h-16 shrink-0 rounded-xl bg-zinc-700 border border-zinc-600 overflow-hidden flex items-center justify-center text-zinc-100 text-2xl font-bold">
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                company.name?.[0]
              )}
            </div>
            <div className="space-y-1">
              <p className="text-base font-semibold text-zinc-100">
                {company.name}
              </p>
              <p className="text-sm text-zinc-300">
                {company.industry} · {company.location} · {company.employees}
              </p>
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-white underline block"
                >
                  {company.website}
                </a>
              )}
              {company.description && (
                <p className="text-sm text-zinc-400 line-clamp-2">
                  {company.description}
                </p>
              )}
            </div>
          </div>

          {company.status === "pending" && (
            <p className="text-sm text-amber-400 bg-amber-500/5 border border-amber-500/20 rounded-lg px-4 py-3">
              Your company is under review. You can post jobs once approved.
            </p>
          )}
          {company.status === "rejected" && (
            <p className="text-sm text-rose-400 bg-rose-500/5 border border-rose-500/20 rounded-lg px-4 py-3">
              Your registration was rejected. Please update your details and
              resubmit.
            </p>
          )}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={(v) => {
          if (!v) close();
        }}
      >
        <Modal.Backdrop>
          <Modal.Container size="lg">
            <Modal.Dialog
              style={{ maxWidth: "780px", width: "100%" }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl"
            >
              <Modal.CloseTrigger />

              <Modal.Header className="px-8 pt-7 pb-0">
                <Modal.Heading className="text-xl font-semibold text-zinc-100">
                  {isEditing ? "Edit Company" : "Register New Company"}
                </Modal.Heading>
                <p className="text-sm text-zinc-400 mt-1">
                  Enter your business details to start hiring on HireLoop.
                </p>
              </Modal.Header>

              <Modal.Body className="px-8 py-6">
                <form
                  id="co-form"
                  onSubmit={onFormSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Company Name *
                      </label>
                      <input
                        name="name"
                        required
                        className={inputCls}
                        placeholder="e.g. Acme Corp"
                        defaultValue={isEditing ? company.name : ""}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Industry *
                      </label>
                      <input
                        type="hidden"
                        name="industry"
                        id="industry-hidden"
                        defaultValue={isEditing ? company.industry : ""}
                      />
                      <Select
                        defaultSelectedKey={isEditing ? company.industry : null}
                        onSelectionChange={(val) => {
                          industryRef.current = val;
                        }}
                        placeholder="Select industry"
                        aria-label="Industry"
                        className="w-full"
                      >
                        <Select.Trigger
                          className={`${inputCls} flex items-center justify-between`}
                        >
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {INDUSTRIES.map((i) => (
                              <ListBox.Item key={i} value={i}>
                                <Label>{i}</Label>
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Location *
                      </label>
                      <div className="relative">
                        <GeoFill
                          size={15}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                        />
                        <input
                          name="location"
                          required
                          className={`${inputCls} pl-10`}
                          placeholder="City, Country"
                          defaultValue={isEditing ? company.location : ""}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Employees *
                      </label>
                      <input
                        type="hidden"
                        name="employees"
                        id="employees-hidden"
                        defaultValue={isEditing ? company.employees : ""}
                      />
                      <Select
                        defaultSelectedKey={
                          isEditing ? company.employees : null
                        }
                        onSelectionChange={(val) => {
                          employeesRef.current = val;
                        }}
                        placeholder="Select range"
                        aria-label="Employees"
                        className="w-full"
                      >
                        <Select.Trigger
                          className={`${inputCls} flex items-center justify-between`}
                        >
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {EMPLOYEES.map((r) => (
                              <ListBox.Item key={r} value={r}>
                                <Label>{r}</Label>
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Website
                    </label>
                    <input
                      name="website"
                      className={inputCls}
                      placeholder="https://company.com"
                      defaultValue={isEditing ? company.website : ""}
                    />
                  </div>

                  <div className="grid grid-cols-[1fr_110px] gap-5 items-start">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        rows={4}
                        className={inputCls}
                        placeholder="Tell us about your company..."
                        defaultValue={isEditing ? company.description : ""}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Logo
                      </label>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-square rounded-xl border-2 border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-800 flex items-center justify-center overflow-hidden relative group transition-colors"
                      >
                        {logoPreview ? (
                          <>
                            <img
                              src={logoPreview}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                              <Pencil size={16} className="text-white" />
                            </div>
                          </>
                        ) : (
                          <ArrowUpFromSquare
                            size={20}
                            className="text-zinc-500"
                          />
                        )}
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onLogoPicked}
                      />
                    </div>
                  </div>
                </form>
              </Modal.Body>

              <Modal.Footer className="px-8 pb-7 pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={close}
                  className="px-5 py-2.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="co-form"
                  disabled={saving}
                  className="px-6 py-2.5 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold text-sm rounded-lg transition-colors disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : isEditing
                      ? "Save Changes"
                      : "Register Company"}
                </button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
