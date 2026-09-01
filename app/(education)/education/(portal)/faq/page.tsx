/**
 * app/(education)/education/(portal)/faq/page.tsx
 *
 * FAQ page for the Vnertia Education portal.
 * Features an interactive Accordion interface.
 */

"use client";

import React, { useState } from "react";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { HelpCircle, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const faqs: FAQItem[] = [
    {
      question: "Is this a course or a program?",
      answer: "It's a program — live, cohort-based, and built around practical work, not passive video lessons.",
    },
    {
      question: "How much does it cost?",
      answer: "Fees vary by program. We share the exact fee with you after you register your interest and go through the free overview session.",
    },
    {
      question: "When does the next batch start?",
      answer: "We run batches on a rolling basis. Register your interest and our team will reach out with the next available batch for your chosen program.",
    },
    {
      question: "Do I get a job at the end of this?",
      answer: "Vnertia helps you get job-ready through resume support, interview preparation, freelance project exposure, and referral opportunities through our community — but we do not guarantee placement or employment.",
    },
    {
      question: "Who teaches these programs?",
      answer: "Every program is curated and taught by a professional currently working in that role at a verified company — not a dedicated full-time instructor reading from a script.",
    },
    {
      question: "Can working professionals join, or is this only for students?",
      answer: "Both. Vnertia programs are built for students, freshers, and working professionals looking to upskill or switch roles.",
    },
    {
      question: "Are sessions live or recorded?",
      answer: "Live. The value of a Vnertia program is direct access to a working professional — recordings may be shared for reference, but sessions are run live.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-6 max-w-xl mx-auto">
        <VerifiedBadge variant="eyebrow" text="FAQ" className="mx-auto" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Frequently Asked <span className="text-gradient-teal">Questions</span>
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          Got questions about cohorts, pricing, or career support? Find answers here.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              className="bg-navy border border-glass-border rounded-2xl overflow-hidden transition-all duration-300 shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-glass-bg transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-text-primary text-base md:text-lg pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={[
                    "text-teal-primary transition-transform duration-300 shrink-0",
                    isOpen ? "rotate-180" : "",
                  ].join(" ")}
                />
              </button>

              <div
                className={[
                  "transition-all duration-300 ease-in-out overflow-hidden",
                  isOpen ? "max-h-40 border-t border-glass-border/40" : "max-h-0",
                ].join(" ")}
              >
                <div className="px-6 py-5 text-sm md:text-base text-text-secondary leading-relaxed bg-navy-deep/20">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom helper CTA */}
      <div className="bg-teal-primary/5 border border-teal-primary/20 rounded-2xl p-6 text-center space-y-4 max-w-xl mx-auto">
        <h3 className="font-bold text-text-primary text-base">Still have questions?</h3>
        <p className="text-xs text-text-secondary">
          Register for a free overview session. There is no commitment, and you'll get a detailed walkthrough.
        </p>
        <div className="pt-2">
          <Button variant="secondary" size="sm" href="/education/register">
            Register for Free Session
          </Button>
        </div>
      </div>
    </div>
  );
}
