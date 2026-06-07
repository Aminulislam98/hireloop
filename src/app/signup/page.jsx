"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";

export default function AuthForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get(`callbackUrl`) || "/";
  console.log("this is redirect params:", redirectTo);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [role, setRole] = useState("seeker");
  console.log("this role output:", role);

  const handleSubmit = async (e) => {
    // 1. Stop the page from reloading on submit
    e.preventDefault();
    setIsLoading(true);

    // 2. Gather all the data from the form fields
    const formData = new FormData(e.currentTarget);

    // 3. Convert the FormData entries into a standard key-value object
    const form = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
        role,
      });

      // Handle Better-Auth/AuthClient specific errors returned in the response
      if (error) {
        throw new Error(
          error.message || "Something went wrong during sign up.",
        );
      }
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push("/");
      }

      // Success notification
      toast.success("Account created successfully! Welcome aboard.");

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
    <div className="max-w-full min-h-screen bg-white py-5">
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              disabled={isLoading}
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 disabled:opacity-50"
            />
          </div>

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
              disabled={isLoading}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 disabled:opacity-50"
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
              disabled={isLoading}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 disabled:opacity-50"
            />
          </div>

          {/* this is role based access */}
          <div className="flex flex-col gap-4">
            <Label>Subscription plan</Label>
            <RadioGroup
              defaultValue="seeker"
              name="plan-orientation"
              orientation="horizontal"
              onChange={(value) => setRole(value)}
            >
              <Radio value="seeker">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Starter</Label>
                  <Description>For side projects</Description>
                </Radio.Content>
              </Radio>
              <Radio value="recruiter">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Pro</Label>
                  <Description>Advanced reporting</Description>
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 mt-2 disabled:bg-blue-400 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="text-black flex flex-col justify-center items-center mt-4 space-y-2">
          <div className="text-gray-400 text-sm">or</div>
          <button
            disabled={isLoading}
            className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium disabled:opacity-50"
          >
            Google
          </button>
        </div>

        <div className="text-black flex flex-col justify-center items-center mt-6 text-sm">
          <p className="text-gray-600">Already have an account?</p>
          <Link
            href={`/signin?callbackUrl=${redirectTo}`}
            className="underline text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
