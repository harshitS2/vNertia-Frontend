/**
 * app/(education)/education/(portal)/mentors/page.tsx
 *
 * Mentors page for the Vnertia Education portal.
 */

import React from "react";
import Link from "next/link";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { UserCheck, Clock, BookOpen, HelpCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function MentorsPage() {
  const placeholders = [
    {
      topic: "Growth & Performance Marketing",
      status: "Instructor being finalized",
      description: "We are currently verifying a growth marketing professional active in the industry to curate and lead this program."
    },
    {
      topic: "Brand & Content Marketing",
      status: "Instructor being finalized",
      description: "We are onboarding a brand and content strategy lead from a top-tier consumer brand to curate and lead this program."
    },
    {
      topic: "UI/UX Design",
      status: "Instructor being finalized",
      description: "We are verifying a senior product designer actively shipping digital experiences to curate and lead this program."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <VerifiedBadge variant="eyebrow" text="Verified Working Professionals" className="mx-auto" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Learn From People <span className="text-gradient-teal">Currently Doing the Job</span>
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          Every Vnertia mentor is verified for their current company, role, and experience before they teach. Learn directly from live practitioners.
        </p>
      </div>

      {/* Confirmed Mentor Card */}
      <section className="space-y-6">
        <h2 className="text-xs font-bold tracking-[0.2em] text-teal-primary uppercase">Confirmed Mentors</h2>
        
        <div className="bg-gradient-to-br from-navy to-navy-alt border border-glass-border rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group hover:border-teal-primary/30 transition-all duration-300">
          {/* Subtle decoration glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-primary/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="space-y-6 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold text-teal-primary bg-teal-primary/10 border border-teal-primary/20 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-teal-sm">
                  <UserCheck size={12} />
                  Teaches: Analytics
                </span>
                <VerifiedBadge variant="pill" text="Verified" />
                <span className="text-xs font-medium text-text-muted bg-glass-bg border border-glass-border/40 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Clock size={12} />
                  5+ Years Exp
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-extrabold text-text-primary">Anupam</h3>
                <p className="text-text-secondary text-base md:text-lg">
                  Senior Martech & AI Data Analyst, Central Growth at <span className="text-text-primary font-semibold">Swiggy</span>
                </p>
              </div>

              <blockquote className="border-l-2 border-teal-primary pl-4 py-1">
                <p className="text-sm md:text-base text-text-secondary leading-relaxed italic">
                  "Hi folks, I'm Anupam. I work as a Senior Martech & AI Data Analyst in Central Growth at Swiggy, with 5+ years of experience helping cross-functional business teams with end-to-end insights, analysis, and forecasting. I have a strong focus on AI, which I use daily in martech to help teams build tools and automate manual work."
                </p>
              </blockquote>
            </div>

            <Button
              variant="primary"
              size="md"
              href="/education/register?program=analytics"
              className="w-full md:w-auto shrink-0 self-stretch md:self-center flex items-center justify-center md:h-12"
            >
              Study with Anupam
            </Button>
          </div>
        </div>
      </section>

      {/* Placeholder Mentor Cards */}
      <section className="space-y-6">
        <h2 className="text-xs font-bold tracking-[0.2em] text-text-muted uppercase">Instructors Finalizing</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholders.map((mentor) => (
            <div
              key={mentor.topic}
              className="bg-navy/40 border border-glass-border/60 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-md relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Meta info */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider block">
                    {mentor.topic}
                  </span>
                  <span className="text-[10px] text-text-muted/70 bg-glass-bg border border-glass-border/30 px-2 py-0.5 rounded-full uppercase font-medium">
                    Coming Soon
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-text-muted text-lg">[Instructor to be confirmed]</h3>
                  <p className="text-xs text-text-muted/80">Role & company details verified before sessions launch.</p>
                </div>

                <p className="text-xs text-text-muted/65 leading-relaxed">
                  {mentor.description}
                </p>
              </div>

              <div className="pt-4 border-t border-glass-border/30 flex justify-between items-center">
                <span className="text-xs text-text-muted italic">Awaiting confirmation</span>
                <Link
                  href="/education/register"
                  className="text-xs font-semibold text-teal-primary hover:text-teal-light transition-colors"
                >
                  Register Interest
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
