/**
 * app/(education)/education/(portal)/contact/page.tsx
 *
 * Contact & Community page for the Vnertia Education portal.
 * Integrated with client-side EmailJS service for static hosting.
 */

"use client";

import React, { useState, FormEvent } from "react";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import Button from "@/components/ui/Button";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, Users } from "lucide-react";
import { sendContactEmail } from "@/lib/emailjs";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EducationContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const validate = (): string | null => {
    if (!formData.name.trim()) return "Please enter your name.";
    if (!formData.email.trim()) return "Please enter your email address.";
    if (!EMAIL_REGEX.test(formData.email.trim())) return "Please enter a valid email address.";
    if (!formData.subject.trim()) return "Please enter a subject.";
    if (!formData.message.trim()) return "Please enter your message.";
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (status === "loading") return;

    const valError = validate();
    if (valError) {
      setStatus("error");
      setErrorMessage(valError);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        company: "Vnertia Education Portal",
      });
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
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
    "disabled:opacity-60 disabled:cursor-not-allowed",
  ].join(" ");

  const isLoading = status === "loading";

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-6 max-w-xl mx-auto">
        <VerifiedBadge variant="eyebrow" text="Connect" className="mx-auto" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Have a Question, or Want to <span className="text-gradient-teal">Join Our Community?</span>
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          Reach out and our team will get back to you. We&apos;re here to help you guide your learning journey.
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
          <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Education contact form">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">
                Name <span className="text-teal-primary">*</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="Your name"
                required
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">
                  Email <span className="text-teal-primary">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder="you@example.com"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">
                  Subject <span className="text-teal-primary">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder="e.g. Program Inquiry"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">
                Message <span className="text-teal-primary">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={isLoading}
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
              disabled={isLoading}
              className="w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              icon={
                isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )
              }
            >
              {isLoading ? "Sending Message..." : "Send Message"}
            </Button>

            {status === "success" && (
              <div role="alert" className="flex items-start gap-2.5 p-4 rounded-xl bg-teal-primary/10 border border-teal-primary/25 text-teal-primary text-xs">
                <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" />
                <span>
                  Thank you! Your message was submitted successfully.
                </span>
              </div>
            )}

            {status === "error" && (
              <div role="alert" className="flex items-start gap-2.5 p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs">
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
