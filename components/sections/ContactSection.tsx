/**
 * ContactSection.tsx
 *
 * CTA + Contact Form section — final section before the footer.
 *
 * Features:
 *   - Pure client-side EmailJS integration (works with static export out/)
 *   - Fields: Name *, Company, Email *, Subject *, Message *
 *   - Comprehensive client-side validation (required fields + email regex)
 *   - Duplicate submission protection with loading state & disabled controls
 *   - Clean success & error alert feedback
 *   - Dark glassmorphic responsive design
 */

"use client";

import React, { useState, useRef, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import { fadeUpVariants } from "@/lib/motionVariants";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { sendContactEmail } from "@/lib/emailjs";

// Form field state shape
interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

// Status of the form submission
type SubmitStatus = "idle" | "loading" | "success" | "error";

// Standard email validation pattern
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // -------------------------------------------------------------------------
  // Handle input changes
  // -------------------------------------------------------------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error once user starts editing
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  // -------------------------------------------------------------------------
  // Validate form fields
  // -------------------------------------------------------------------------
  const validateForm = (): string | null => {
    if (!formData.name.trim()) {
      return "Please enter your name.";
    }
    if (!formData.email.trim()) {
      return "Please enter your email address.";
    }
    if (!EMAIL_REGEX.test(formData.email.trim())) {
      return "Please enter a valid email address (e.g. name@domain.com).";
    }
    if (!formData.subject.trim()) {
      return "Please enter a subject for your message.";
    }
    if (!formData.message.trim()) {
      return "Please enter your message.";
    }
    if (formData.message.trim().length < 10) {
      return "Please enter a message with at least 10 characters.";
    }
    return null;
  };

  // -------------------------------------------------------------------------
  // Handle form submission with duplicate prevention & EmailJS
  // -------------------------------------------------------------------------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Guard against duplicate clicks while request is in-flight
    if (status === "loading") {
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        subject: formData.subject,
        message: formData.message,
      });

      setStatus("success");
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong sending your message. Please try again.";
      setErrorMessage(message);
    }
  };

  // Shared input class — dynamic glass input field
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
    <section
      id="contact"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden bg-navy-deep"
    >
      {/* Gradient backdrop — teal wash from left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 10% 50%, color-mix(in srgb, var(--teal-primary) 8%, transparent) 0%, transparent 70%), " +
            "radial-gradient(ellipse 50% 80% at 90% 80%, color-mix(in srgb, var(--teal-dark) 6%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-primary/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ============================================================ */}
          {/* Left column — CTA copy                                        */}
          {/* ============================================================ */}
          <div>
            <motion.div variants={fadeUpVariants} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}>
              <SectionLabel>Get In Touch</SectionLabel>
            </motion.div>

            <motion.h2
              variants={fadeUpVariants} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.1}
              className="mt-4 text-4xl md:text-5xl font-black text-text-primary leading-tight tracking-tight"
            >
              Let&apos;s build it
              <br />
              <span className="text-gradient-teal">
                — together.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUpVariants} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.2}
              className="mt-5 text-text-secondary text-lg leading-relaxed max-w-md"
            >
              Growth isn&apos;t a one-time effort. It&apos;s a system, a mindset, and a continuous
              process. Tell us about your brand — and let&apos;s start building momentum.
            </motion.p>

            {/* Quick trust signals */}
            <motion.div
              variants={fadeUpVariants} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.3}
              className="mt-8 space-y-3"
            >
              {[
                "No commitment. Just a real conversation.",
                "Response within 24 hours.",
                "Built for founders and growth teams.",
              ].map((point) => (
                <div key={point} className="flex items-center gap-2.5 text-sm text-text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-primary flex-shrink-0" />
                  {point}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ============================================================ */}
          {/* Right column — Contact form                                   */}
          {/* ============================================================ */}
          <motion.div
            variants={fadeUpVariants} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.2}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-8 rounded-2xl bg-glass-bg border border-glass-border space-y-5"
              aria-label="Contact form"
            >
              {/* Row 1: Name + Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
                    Name <span className="text-teal-primary">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder="Your name"
                    required
                    className={inputClass}
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label htmlFor="contact-company" className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
                    Company
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder="Your company (optional)"
                    className={inputClass}
                    suppressHydrationWarning
                  />
                </div>
              </div>

              {/* Row 2: Email + Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
                    Email <span className="text-teal-primary">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder="you@company.com"
                    required
                    className={inputClass}
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
                    Subject <span className="text-teal-primary">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder="e.g. Website Redesign"
                    required
                    className={inputClass}
                    suppressHydrationWarning
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
                  Message <span className="text-teal-primary">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder="Tell us about your brand, goals, or where you're stuck..."
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit button */}
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

              {/* Success feedback */}
              {status === "success" && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 p-4 rounded-xl bg-teal-primary/10 border border-teal-primary/25 text-teal-primary text-sm animate-fade-in"
                >
                  <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="text-xs text-teal-primary/80 mt-0.5">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Error feedback */}
              {status === "error" && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm animate-fade-in"
                >
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Submission failed</p>
                    <p className="text-xs text-red-300/90 mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
