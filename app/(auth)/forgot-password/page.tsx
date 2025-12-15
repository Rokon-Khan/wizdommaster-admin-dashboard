"use client";

import { authApi } from "@/lib/api/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    setError("");
    
    try {
      const result = await authApi.forgotPassword({ email: data.email });
      
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message || "Failed to send reset email");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
    
    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 text-center">
        <div className="text-green-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Email Sent!</h2>
        <p className="text-gray-400 mb-4">
          We've sent a password reset link to your email address.
        </p>
        <Link
          href="/login"
          className="text-purple-400 hover:text-purple-300 text-sm"
        >
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Forgot Password</h1>
        <p className="text-gray-400">Enter your email to reset your password</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>

        <div className="text-center">
          <Link
            href="/login"
            className="text-purple-400 hover:text-purple-300 text-sm"
          >
            Back to login
          </Link>
        </div>
      </form>
    </div>
  );
}