/**
 * app/(education)/education/(portal)/contact/page.tsx
 *
 * Contact & Community page for the Vnertia Education portal.
 */

"use client";

import React, { useState, FormEvent } from "react";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import Button from "@/components/ui/Button";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, Users } from "lucide-react";
import { submitContactForm } from "@/lib/api";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function EducationContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Simple validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      // Reuse submitContactForm from api helper (company can be blank/placeholder)
      await submitContactForm({
        ...formData,
        company: "Vnertia Education Candidate",
      });
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
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
  ].join(" ");

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-6 max-w-xl mx-auto">
        <VerifiedBadge variant="eyebrow" text="Connect" className="mx-auto" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Have a Question, or Want to <span className="text-gradient-teal">Join Our Community?</span>
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          Reach out and our team will get back to you. We're here to help you guide your learning journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Direct Info & Community details */}
        <div className="space-y-8">
          <div className="bg-navy border border-glass-border rounded-2xl p-6 space-y-4 shadow-md">
            <h2 className="text-xl font-bold text-text-primary">Contact Details</h2>
            <p className="text-sm text-text-secondary">
              Feel free to send us an email directly or submit the contact form. Our team will get back to you within 24 hours.
            </p>
            <div className="flex items-center gap-3 text-teal-primary font-medium pt-2">
              <Mail size={18} />
              <a href="mailto:hello@vnertia.com" className="hover:underline text-sm md:text-base">
                hello@vnertia.com
              </a>
            </div>
          </div>

          <div className="bg-navy/40 border border-glass-border rounded-2xl p-6 space-y-4 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-primary/5 rounded-full blur-2xl" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-primary/10 border border-teal-primary/20 flex items-center justify-center text-teal-primary shrink-0">
                <Users size={16} />
              </div>
              <h2 className="text-lg font-bold text-text-primary">Vnertia Community</h2>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Vnertia learners get access to a professional peer community for continued learning, discussion, and referral opportunities — available after you register for any program.
            </p>
          </div>
        </div>

        {/* Right Column: Contact form */}
        <div className="bg-navy border border-glass-border rounded-3xl p-6 md:p-8 shadow-xl">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">
                Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className={inputClass}
              />
            </div>

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
              <label htmlFor="message" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help? Tell us what you're looking to explore..."
                required
                rows={5}
                className={`${inputClass} resize-none`}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={status === "loading"}
              className="w-full justify-center"
              icon={
                status === "loading" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )
              }
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </Button>

            {status === "success" && (
              <div className="flex items-start gap-2.5 p-4 rounded-xl bg-teal-primary/10 border border-teal-primary/25 text-teal-primary text-xs">
                <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" />
                <span>
                  Thank you! Your message was submitted successfully.
                </span>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-start gap-2.5 p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
