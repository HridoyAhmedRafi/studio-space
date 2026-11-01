"use client";

import { useState } from "react";
import { LoaderCircle, Send } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      // TODO: swap for a real subscribe endpoint once the API exposes one.
      await new Promise((resolve) => setTimeout(resolve, 600));

      toast.success("Thanks for subscribing! Watch your inbox for studio drops.");
      setEmail("");
    } catch {
      toast.error("Subscription failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 sm:flex-row"
      noValidate
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>

      <Input
        id="newsletter-email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@studio.com"
        autoComplete="email"
        aria-busy={submitting}
        className="h-11 rounded-xl border-gray-200 bg-white text-sm focus-visible:border-[#d1234c] focus-visible:ring-2 focus-visible:ring-[#d1234c]/30 dark:border-gray-700 dark:bg-white/5"
      />

      <Button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="h-11 shrink-0 gap-2 rounded-xl bg-[#d1234c] px-4 font-semibold text-white transition-colors hover:bg-[#b51f43]"
      >
        {submitting ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        {submitting ? "Joining..." : "Subscribe"}
      </Button>
    </form>
  );
};

export default NewsletterForm;
