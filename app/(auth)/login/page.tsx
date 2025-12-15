"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError("");
    
    const result = await login(data.email, data.password);
    
    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "Login failed");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-400">Sign in to your admin dashboard</p>
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
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        <div className="text-center space-y-2">
          <Link
            href="/forgot-password"
            className="text-purple-400 hover:text-purple-300 text-sm"
          >
            Forgot your password?
          </Link>
          <div className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-purple-400 hover:text-purple-300">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}