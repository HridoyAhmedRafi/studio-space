"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Image,
  Lock,
  Clapperboard,
} from "lucide-react";
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const isPasswordValid = hasUppercase && hasLowercase && hasMinLength;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    console.log(user, "user register");
    if (!isPasswordValid) return;

    // Implement registration logic here.
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-card text-card-foreground p-6 sm:p-8 shadow-xl shadow-black/5 dark:shadow-black/40">
        {/* Header */}
        <div className="text-center ">
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d1234c] text-white text-2xl font-bold">
            <Clapperboard></Clapperboard>
          </div>

          <h1 className="text-3xl font-bold text-foreground">
            Create an account
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Join us today! Create your account to get started.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="mb-1  block text-sm font-bold text-foreground">
              Full Name
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

              <input
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                className="w-full rounded-lg border border-border bg-transparent text-foreground placeholder:text-muted-foreground py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#d1234c] focus:ring-2 focus:ring-[#d1234c]/20"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-bold text-foreground">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-border bg-transparent text-foreground placeholder:text-muted-foreground py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#d1234c] focus:ring-2 focus:ring-[#d1234c]/20"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="mb-1 block text-sm font-bold text-foreground">
              Photo URL
            </label>

            <div className="relative">
              <Image className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

              <input
                name="image"
                required
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="w-full rounded-lg border border-border bg-transparent text-foreground placeholder:text-muted-foreground py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#d1234c] focus:ring-2 focus:ring-[#d1234c]/20"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-bold text-foreground">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-transparent text-foreground placeholder:text-muted-foreground py-3 pl-11 pr-12 text-sm outline-none transition focus:border-[#d1234c] focus:ring-2 focus:ring-[#d1234c]/20"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            {password.length > 0 && !isPasswordValid && (
              <p className="mt-2 text-xs text-red-500">
                Please meet all password requirements.
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={!isPasswordValid}
            className="w-full rounded-lg bg-[#d1234c] py-3 font-semibold text-white transition  disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">
            OR CONTINUE WITH
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Social Login */}
        <div className="  grid grid-cols-1 w-full gap-3">
          <button
            type="button"
            className=" flex items-center justify-center gap-2 rounded-lg border border-border py-3 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            <svg viewBox="0 0 48 48" className="h-5 w-5">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.13 13.22l7.98 6.19C13 13.72 18.11 9.5 24 9.5Z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.19 5.59c4.2-3.88 6.57-9.59 6.57-17.24Z"
              />
              <path
                fill="#FBBC05"
                d="M11.11 28.59A14.4 14.4 0 0 1 10.36 24c0-1.59.27-3.12.75-4.59l-7.98-6.19A23.8 23.8 0 0 0 0 24c0 3.88.93 7.55 3.13 10.78l7.98-6.19Z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.47 0 11.9-2.13 15.87-5.79l-7.19-5.59c-2 1.35-4.56 2.15-8.68 2.15-5.89 0-11-3.97-12.89-9.36l-7.98 6.19C6.51 43.62 14.62 48 24 48Z"
              />
            </svg>
            Google
          </button>

          {/* <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg border border-border py-3 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
            GitHub
          </button> */}
        </div>

        {/* Login Link */}
        <p className="mt-7 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#d1234c] dark:text-[#f06a8f]"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
