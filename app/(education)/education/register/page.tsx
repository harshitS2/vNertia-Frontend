/**
 * app/(education)/education/register/page.tsx
 *
 * Distraction-free Overview Registration landing page.
 * Minimal navigation, single focused registration form.
 */

"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { submitRegisterForm } from "@/lib/api";
import { CheckCircle2, AlertCircle, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";

interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  program: string;
  status: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

function RegisterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract program from query parameters (e.g. ?program=analytics)
  const queryProgram = searchParams.get("program") || "";

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    phone: "",
    program: "",
    status: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Pre-populate program from query params if valid
  useEffect(() => {
    const validPrograms = ["growth-marketing", "brand-marketing", "analytics", "ui-ux"];
    if (queryProgram && validPrograms.includes(queryProgram)) {
      setFormData((prev) => ({ ...prev, program: queryProgram }));
    }
  }, [queryProgram]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Validation checks
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.program || !formData.status) {
      setStatus("error");
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      await submitRegisterForm(formData);
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(msg);
    }
  };

  const inputClass = [
    "w-full px-4 py-3 rounded-xl",
    "bg-glass-bg border border-glass-border",
    "text-text-primary placeholder-text-muted/50",
    "text-sm focus:outline-none focus:border-teal-primary/60 focus:bg-glass-bg/20",
    "transition-all duration-200",
    "hover:border-teal-primary/20",
    "focus:ring-0",
  ].join(" ");

  const selectClass = [
    inputClass,
    "appearance-none bg-no-repeat bg-[right_1rem_center]",
    // Custom SVG arrow for dropdown matching the theme
    "bg-[image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394D3D8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')]",
    "bg-[size:0.65rem_auto]",
  ].join(" ");

  if (status === "success") {
    return (
      <div className="bg-navy border border-glass-border rounded-3xl p-8 md:p-10 text-center space-y-6 shadow-2xl animate-fade-in-up">
        <div className="w-16 h-16 rounded-full bg-teal-primary/10 border border-teal-primary/30 flex items-center justify-center text-teal-primary mx-auto shadow-teal-sm">
          <CheckCircle2 size={36} className="stroke-[2.5]" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary">Overview Session Booked!</h2>
          <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-semibold text-text-primary">{formData.name}</span>. We've captured your interest in the <span className="font-semibold text-teal-primary">{formData.program === "growth-marketing" ? "Growth & Performance Marketing" : formData.program === "brand-marketing" ? "Brand & Content Marketing" : formData.program === "analytics" ? "Analytics" : "UI/UX Design"}</span> program.
          </p>
        </div>
        <div className="bg-navy-deep/40 border border-glass-border/60 rounded-2xl p-5 text-xs text-text-muted leading-relaxed max-w-md mx-auto text-left space-y-2">
          <p className="font-semibold text-text-primary">What happens next?</p>
          <p>1. Our team will reach out directly on your provided phone/email within 24 hours.</p>
          <p>2. We will share the upcoming overview session link, next batch timelines, and the program fee schedule.</p>
          <p>3. You can attend the live session, meet the curator, and decide if you'd like to join.</p>
        </div>
        <div className="pt-2">
          <Button variant="secondary" size="md" href="/education">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-navy border border-glass-border rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative wash */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <form onSubmit={handleSubmit} noValidate className="space-y-5 relative z-10">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            required
            className={inputClass}
          />
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">
              Email *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">
              Phone Number *
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +91 98765 43210"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="program" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">
              Program of Interest *
            </label>
            <select
              id="program"
              name="program"
              value={formData.program}
              onChange={handleChange}
              required
              className={selectClass}
            >
              <option value="" disabled className="bg-navy text-text-muted">Select program</option>
              <option value="growth-marketing" className="bg-navy text-text-primary">Growth & Performance Marketing</option>
              <option value="brand-marketing" className="bg-navy text-text-primary">Brand & Content Marketing</option>
              <option value="analytics" className="bg-navy text-text-primary">Analytics</option>
              <option value="ui-ux" className="bg-navy text-text-primary">UI/UX Design</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">
              Current Status *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className={selectClass}
            >
              <option value="" disabled className="bg-navy text-text-muted">Select status</option>
              <option value="Student" className="bg-navy text-text-primary">Student</option>
              <option value="Fresher" className="bg-navy text-text-primary">Fresher</option>
              <option value="Working professional" className="bg-navy text-text-primary">Working professional</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "loading"}
          className="w-full justify-center mt-2"
          icon={
            status === "loading" ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <ShieldCheck size={18} />
            )
          }
        >
          {status === "loading" ? "Registering..." : "Register for Free"}
        </Button>

        {/* Bottom indicator */}
        <p className="text-center text-[11px] text-text-muted/70 leading-relaxed pt-2">
          No cost. No commitment. Just a real look at the program and the professional behind it.
        </p>

        {/* Validation Errors */}
        {status === "error" && (
          <div className="flex items-start gap-2.5 p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-navy-deep text-text-primary flex flex-col justify-between overflow-x-hidden">
      {/* Minimal Header */}
      <header className="py-6 border-b border-glass-border/40 bg-navy/20 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/education" className="flex items-center gap-1.5">
            <Logo size={135} />
            <span className="text-[9px] tracking-[0.2em] font-bold text-teal-primary uppercase border border-teal-primary/30 px-1 py-0.2 rounded ml-1">
              Edu
            </span>
          </Link>
          <Link
            href="/education/programs"
            className="text-xs font-semibold text-text-secondary hover:text-teal-primary flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Exit to Programs</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 md:py-16 relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-xl w-full space-y-8">
          <div className="text-center space-y-3">
            <VerifiedBadge variant="eyebrow" text="Free Overview Registration" className="mx-auto" />
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              See the Program <span className="text-gradient-teal">Before You Commit</span>
            </h1>
            <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
              A free session with a real look at what you'll learn, who teaches it, and what it takes to grow in this field.
            </p>
          </div>

          <Suspense fallback={<div className="bg-navy border border-glass-border rounded-3xl p-8 text-center text-text-muted">Loading registration context...</div>}>
            <RegisterForm />
          </Suspense>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 border-t border-glass-border/40 bg-navy/10 text-center relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-text-muted">
            © {new Date().getFullYear()} Vnertia Education. All rights reserved.
          </p>
          <p className="text-[11px] text-text-muted/80">
            Ad Traffic Landing page · Privacy & Trust Guaranteed
          </p>
        </div>
      </footer>
    </div>
  );
}
