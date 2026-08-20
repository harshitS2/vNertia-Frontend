/**
 * app/(education)/education/(portal)/programs/page.tsx
 *
 * Programs listing page for the Vnertia Education portal.
 */

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Layers, Users, TrendingUp } from "lucide-react";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import Button from "@/components/ui/Button";
import { PROGRAMS } from "@/lib/programsData";

export default function ProgramsListPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <VerifiedBadge variant="eyebrow" text="Verified Working Professionals" className="mx-auto" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Programs Curated by People Who <span className="text-gradient-teal">Actually Do the Job</span>
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          Every Vnertia program is built and taught by a professional currently working in that field — not a generic instructor reading from a script. What's inside each program comes from their own day-to-day work, so no two instructors teach it exactly the same way.
        </p>
      </div>

      {/* Programs List */}
      <div className="grid grid-cols-1 gap-8">
        {PROGRAMS.map((program) => {
          const Icon = program.slug === "analytics" ? TrendingUp : program.slug === "ui-ux" ? Layers : BookOpen;
          return (
            <div
              key={program.slug}
              className={[
                "bg-navy border rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center",
                "hover:border-teal-primary/30 transition-all duration-300 shadow-xl",
              ].join(" ")}
            >
              <div className="space-y-6 max-w-3xl">
                {/* Badge and Icon header */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-primary/10 border border-teal-primary/20 flex items-center justify-center text-teal-primary">
                    <Icon size={20} />
                  </div>
                  {program.instructor.isConfirmed ? (
                    <VerifiedBadge variant="pill" text="Verified" />
                  ) : (
                    <span className="text-xs text-text-muted bg-glass-bg border border-glass-border px-3 py-1 rounded-full">
                      Instructor finalizing
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <div className="space-y-3">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary">
                    {program.title}
                  </h2>
                  <p className="text-text-secondary leading-relaxed">
                    {program.shortDescription}
                  </p>
                </div>

                {/* Instructor Credibility Line */}
                <div className="pt-2 text-sm">
                  <span className="text-text-muted">Curated by: </span>
                  {program.instructor.isConfirmed ? (
                    <span className="text-text-primary font-semibold">
                      {program.instructor.role} at {program.instructor.company}
                    </span>
                  ) : (
                    <span className="text-text-muted bg-glass-bg border border-glass-border/40 px-2 py-0.5 rounded italic">
                      [Role] at [Company] — Instructor not yet confirmed
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto shrink-0 pt-4 lg:pt-0 border-t border-glass-border/40 lg:border-t-0">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full lg:w-48"
                  href={`/education/programs/${program.slug}`}
                >
                  Know More
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full lg:w-48"
                  href={`/education/register?program=${program.slug}`}
                >
                  Register Free
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Disclosure Note */}
      <div className="bg-navy border border-glass-border rounded-2xl p-6 text-center max-w-4xl mx-auto shadow-md">
        <p className="text-sm text-text-secondary leading-relaxed">
          <strong>Note:</strong> Batches form on a rolling basis. Register your interest in any program and our team will reach out with the next available batch details, format schedule, and program fee.
        </p>
      </div>
    </div>
  );
}
