/**
 * app/(education)/education/(portal)/page.tsx
 *
 * Home page for the Vnertia Education portal.
 */

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Layers, Users, TrendingUp } from "lucide-react";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import Button from "@/components/ui/Button";
import { PROGRAMS } from "@/lib/programsData";

export default function EducationHomePage() {
  const steps = [
    {
      number: "01",
      title: "Register for a free overview session",
      description: "Get a real look at the program structure and the professional behind it before you commit.",
    },
    {
      number: "02",
      title: "Get matched to the next batch",
      description: "Our team reaches out directly with program options, schedules, and the rolling batch fee details.",
    },
    {
      number: "03",
      title: "Learn live from verified experts",
      description: "Participate in live cohorts with real-world case studies, practical assignments, and feedback.",
    },
    {
      number: "04",
      title: "Expand your career readiness",
      description: "Walk away with a stronger resume, interview readiness, and access to our professional peer community.",
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* ================================================================ */}
      {/* Hero Section                                                     */}
      {/* ================================================================ */}
      <section className="relative max-w-7xl mx-auto px-6 pt-12 md:pt-20 text-center space-y-8">
        {/* Glow decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <VerifiedBadge variant="eyebrow" text="Verified Working Professionals" className="mx-auto" />
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
          Learn the Work. <br />
          <span className="text-gradient-teal">Not Just the Theory.</span>
        </h1>

        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Every program is taught by a professional currently working at companies like Swiggy and Amazon — verified for their company, role, and experience before they ever teach a session.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button variant="primary" size="lg" href="/education/register">
            Register for a Free Overview Session
          </Button>
          <Button variant="secondary" size="lg" href="/education/programs">
            Explore Programs
          </Button>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Why Vnertia Section                                              */}
      {/* ================================================================ */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <VerifiedBadge variant="pill" text="Why Vnertia" />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              A curriculum built on actual execution, not generic slide decks.
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Each program is curated from that instructor's own experience — what it actually takes to grow a business, query warehouse data, or ship a product inside a real-time environment.
            </p>
          </div>

          <div className="lg:col-span-7 bg-navy border border-glass-border rounded-3xl p-8 md:p-10 space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-primary/5 rounded-full blur-2xl" />
            <h3 className="text-xl font-bold text-teal-primary">Concepts vs. Reality</h3>
            <p className="text-text-secondary leading-relaxed text-sm md:text-base">
              Most learning platforms teach generic, static concepts. Vnertia verifies real working professionals — their current company, role, and experience — and puts you directly in front of them.
            </p>
            <p className="text-text-secondary leading-relaxed text-sm md:text-base">
              Not <span className="text-text-primary font-semibold">"learn Growth Marketing,"</span> but <span className="text-text-primary font-semibold">"learn from someone who is currently doing Growth Marketing at a company like yours, verified."</span> Because they live the job every day, no two mentors teach it the same way.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* How It Works Section                                            */}
      {/* ================================================================ */}
      <section className="bg-navy/30 border-y border-glass-border py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">How It Works</h2>
            <p className="text-text-secondary">A straightforward path to real skills, direct mentorship, and professional community access.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-navy border border-glass-border rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-teal-primary/30 transition-colors duration-300"
              >
                <span className="text-4xl font-extrabold text-teal-primary/20 absolute right-4 top-4">
                  {step.number}
                </span>
                <div className="space-y-3 pt-6">
                  <h3 className="font-bold text-lg text-text-primary">{step.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Programs Snapshot Section                                        */}
      {/* ================================================================ */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <VerifiedBadge variant="eyebrow" text="Curated Programs" />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Get Practical Exposure</h2>
          </div>
          <Link
            href="/education/programs"
            className="group inline-flex items-center gap-2 text-teal-primary font-semibold hover:text-teal-light transition-colors"
          >
            <span>See all programs</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRAMS.map((program) => {
            const Icon = program.slug === "analytics" ? TrendingUp : program.slug === "ui-ux" ? Layers : BookOpen;
            return (
              <div
                key={program.slug}
                className="bg-navy border border-glass-border rounded-3xl p-8 flex flex-col justify-between hover:border-teal-primary/30 hover:shadow-teal-sm transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-teal-primary/10 border border-teal-primary/20 flex items-center justify-center text-teal-primary">
                      <Icon size={24} />
                    </div>
                    {program.instructor.isConfirmed ? (
                      <VerifiedBadge variant="pill" />
                    ) : (
                      <span className="text-xs text-text-muted bg-glass-bg border border-glass-border px-2.5 py-1 rounded-full">
                        Curator finalising
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary group-hover:text-teal-primary transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Curated by {program.instructor.isConfirmed ? (
                      <span className="text-text-primary font-semibold">
                        {program.instructor.role} at {program.instructor.company}
                      </span>
                    ) : (
                      <span className="italic">{program.curatorLabel}</span>
                    )}
                  </p>
                  <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
                    {program.shortDescription}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-glass-border flex justify-between items-center">
                  <Link
                    href={`/education/programs/${program.slug}`}
                    className="text-sm font-semibold text-teal-primary group-hover:text-teal-light flex items-center gap-1"
                  >
                    <span>Know More</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================ */}
      {/* Career Support Section                                           */}
      {/* ================================================================ */}
      <section className="bg-navy/30 border-y border-glass-border py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-teal-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <VerifiedBadge variant="pill" text="Community & Support" />
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Career Support Beyond the Syllabus</h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            Vnertia helps you move forward with resume crafting, interview preparation, exposure to freelance project opportunities, and referral opportunities through our professional peer community.
          </p>
          <div className="p-4 bg-teal-primary/5 border border-teal-primary/20 rounded-2xl max-w-xl mx-auto">
            <p className="text-xs text-teal-light leading-relaxed">
              <strong>Notice:</strong> Career support is designed to improve your readiness and access to the industry. Employment or job placement is not guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Bottom CTA                                                       */}
      {/* ================================================================ */}
      <section className="max-w-4xl mx-auto px-6 text-center py-10 space-y-6">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Start with a free overview session and see if this is the right next step for you.
        </h2>
        <div className="pt-4">
          <Button variant="primary" size="lg" href="/education/register">
            Register Now
          </Button>
        </div>
      </section>
    </div>
  );
}
