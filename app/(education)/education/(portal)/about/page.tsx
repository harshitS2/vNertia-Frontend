/**
 * app/(education)/education/(portal)/about/page.tsx
 *
 * About/Why Vnertia page for the Vnertia Education portal.
 */

import React from "react";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import Button from "@/components/ui/Button";
import { CheckCircle2, ShieldCheck, HelpCircle, Users2, Star } from "lucide-react";

export default function EducationAboutPage() {
  const principles = [
    {
      icon: ShieldCheck,
      title: "Experience the field before you commit",
      description: "Start with a free overview session to see the curriculum details and meet the verified mentor before registration.",
    },
    {
      icon: Users2,
      title: "Learn live, together",
      description: "Cohort-based, interactive lessons where you can ask questions in real time. We prioritize active sessions over pre-recorded videos.",
    },
    {
      icon: Star,
      title: "Learn from working professionals",
      description: "Every mentor is thoroughly verified for their current company, role, and years of experience. You learn from practitioners, not professional readers.",
    },
    {
      icon: CheckCircle2,
      title: "Build execution skills",
      description: "Work on real case studies and complete a capstone project derived from actual projects the instructor has solved at work.",
    },
  ];

  const targetAudiences = [
    {
      title: "Students",
      description: "Exploring different career paths and trying to understand what real roles entail before choosing a direction."
    },
    {
      title: "Freshers",
      description: "Preparing for your very first professional opportunity, aiming to gain practical skills that stand out in resumes."
    },
    {
      title: "Working Professionals",
      description: "Upskilling in your current field or planning a transition to a new role with hands-on, live training."
    },
    {
      title: "Practical Learners",
      description: "Anyone who wants real exposure to day-to-day corporate toolkits instead of theoretical concepts alone."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-20">
      {/* Hero / Header */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <VerifiedBadge variant="eyebrow" text="Learn Real Work" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Learn the Work. <br />
          <span className="text-gradient-teal">Build the Confidence to Do It.</span>
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          Most courses teach concepts. Vnertia helps you understand how those concepts get applied in the real world — because every program is built by someone who applies them at work, every day.
        </p>
      </section>

      {/* Difference / Core Proposition */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-navy/40 border border-glass-border rounded-3xl p-8 md:p-10 shadow-lg">
        <div className="md:col-span-4 space-y-3">
          <span className="text-xs font-bold text-teal-primary uppercase tracking-[0.15em] block">Syllabus Origin</span>
          <h2 className="text-2xl font-extrabold text-text-primary">What makes a Vnertia program different</h2>
        </div>
        <div className="md:col-span-8 text-text-secondary text-sm md:text-base space-y-4 leading-relaxed">
          <p>
            A Vnertia program isn't a fixed, generic syllabus. It's curated directly from a working professional's own experience — what actually works, when it fails, and how they've had to adapt in real-time.
          </p>
          <p>
            Because of this practical, lived approach, two instructors in the same field may teach their program differently, because they've lived and solved problems differently.
          </p>
        </div>
      </section>

      {/* Four core principles / Why Vnertia */}
      <section className="space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-[0.2em] text-text-muted uppercase">Framework</span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">The Vnertia Experience</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-navy border border-glass-border rounded-2xl p-6 flex gap-4 items-start hover:border-teal-primary/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-primary/10 border border-teal-primary/20 flex items-center justify-center text-teal-primary shrink-0">
                  <Icon size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-text-primary text-base">{p.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{p.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Target Audience */}
      <section className="space-y-8 bg-navy/20 border-y border-glass-border py-12 px-6 rounded-3xl">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-center">Who is this for?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {targetAudiences.map((audience) => (
            <div key={audience.title} className="space-y-2 bg-navy border border-glass-border/40 p-5 rounded-xl hover:border-glass-border transition-colors">
              <h3 className="font-bold text-teal-primary text-sm uppercase tracking-wide">{audience.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{audience.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Career support details */}
      <section className="bg-teal-primary/5 border border-teal-primary/20 rounded-3xl p-8 md:p-10 space-y-6 text-center max-w-4xl mx-auto shadow-sm">
        <h2 className="text-2xl font-extrabold tracking-tight text-text-primary">Career Support Policy</h2>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
          Vnertia supports your career progression by offering guidance on resume crafting, interview preparation, exposure to freelance project opportunities, and peer referrals through our professional community.
        </p>
        <div className="py-2.5 px-4 bg-navy border border-glass-border max-w-xl mx-auto rounded-xl">
          <p className="text-xs text-text-muted leading-relaxed">
            <strong>Important:</strong> All career support services are designed to improve your professional readiness and industry access. Employment or placement is not guaranteed.
          </p>
        </div>
      </section>

      {/* CTA section */}
      <section className="text-center pt-4">
        <Button variant="primary" size="lg" href="/education/register">
          Start with a Free Overview Session
        </Button>
      </section>
    </div>
  );
}
