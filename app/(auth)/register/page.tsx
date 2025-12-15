"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  full_name: z.string().min(2, "Full name must be at least 2 characters long"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    setError("");
    
    const result = await registerUser({
      email: data.email,
      password: data.password,
      fullName: data.full_name,
      role: "admin",
    });
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setError(result.error || "Registration failed");
    }
    
    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 text-center">
        <div className="text-green-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Registration Successful!</h2>
        <p className="text-gray-400">Redirecting to login page...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-gray-400">Join the admin dashboard</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>
          <input
            {...register("full_name")}
            type="text"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            placeholder="Enter your full name"
          />
          {errors.full_name && (
            <p className="text-red-400 text-sm mt-1">{errors.full_name.message}</p>
          )}
        </div>

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

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>

        <div className="text-center">
          <div className="text-gray-400 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400 hover:text-purple-300">
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}