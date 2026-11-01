"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  Mail,
  Lock,
  Clapperboard,
} from "lucide-react";
import { signIn } from "@/lib/auth-client";
import {
  dismissToast,
  toastError,
  toastLoading,
  toastSuccess,
} from "@/lib/toast";
import { useRouter } from "next/navigation";
export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (submitting) return;

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    setSubmitting(true);

    try {
      const { data, error } = await signIn.email({
        ...user,
      });

      if (error) {
        toastError(error);
      }
      if (data) {
        toastSuccess("Login successful!");
        router.push("/");
      }
    } catch (error) {
      toastError(error);
      console.log("Something went wrong:", error);
    } finally {
      setSubmitting(false);
    }
  }

  const handleLoginWithGoogle = async () => {
    toastLoading("Connecting with Google...");

    try {
      await signIn.social({
        provider: "google",
      });
    } catch (error) {
      toastError(error);
      console.log("Something went wrong:", error);
    } finally {
      dismissToast();
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-card text-card-foreground p-6 sm:p-8 shadow-xl shadow-black/5 dark:shadow-black/40">
        {/* Header */}
        <div className="text-center ">
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d1234c] text-white text-2xl font-bold">
            <Clapperboard></Clapperboard>
          </div>

          <h1 className="text-3xl font-bold text-foreground">
            Login your account
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Login your account.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label className="mb-1 block text-sm font-bold text-foreground">
                Password
              </label>
              <label className="text-[#d1234c] mb-1 block text-sm font-bold ">
                Forgot Password?
              </label>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
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
          </div>

          {/* login Button */}
          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className="inline-flex cursor-pointer w-full items-center justify-center gap-2 rounded-lg bg-[#d1234c] py-3 font-semibold text-white transition  disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting && <LoaderCircle className="size-4 animate-spin" />}
            {submitting ? "Logging in..." : "Login Account"}
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
            onClick={handleLoginWithGoogle}
            type="button"
            disabled={submitting}
            className="cursor-pointer flex items-center justify-center gap-2 rounded-lg border border-border py-3 text-sm font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
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
        </div>

        {/* Login Link */}
        <p className="mt-7 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#d1234c] dark:text-[#f06a8f]"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
