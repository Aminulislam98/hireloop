// actions/company.actions.js
"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverMutation = async (path, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    // ← was /api/company
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save company");
  return res.json();
};
