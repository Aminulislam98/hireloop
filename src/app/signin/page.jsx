"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    // 1. Stop the page from reloading on submit
    e.preventDefault();
    setIsLoading(true);

    // 2. Gather all the data from the form fields
    const formData = new FormData(e.currentTarget);

    // 3. Convert the FormData entries into a standard key-value object
    const form = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: form.email,
        password: form.password,
        callbackURL: "/",
      });

      // Handle Better-Auth/AuthClient specific errors returned in the response
      if (error) {
        throw new Error(
          error.message || "Something went wrong during sign in.",
        );
      }

      // Success notification
      toast.success("Sign in successfully! Welcome aboard.");

      // Optional: Reset form fields on success
      e.target.reset();
    } catch (err) {
      // Error notification
      toast.error(err.message || "Failed to create account. Please try again.");
      console.error("Sign up error:", err);
    } finally {
      // Always turn off loading state whether it succeeded or failed
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Create an Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
          />
        </div>

        {/* Password Input */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 mt-2"
        >
          Sign In
        </button>
      </form>
      <div className="text-black flex flex-col justify-center items-center">
        <p>Do not have Account!</p>
        <Link href={"/signup"} className="underline">
          Register
        </Link>
      </div>
    </div>
  );
}
