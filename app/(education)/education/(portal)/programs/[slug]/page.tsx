/**
 * app/(education)/education/(portal)/programs/[slug]/page.tsx
 *
 * Dynamic detail page for individual Vnertia Education programs.
 */

import React from "react";
import { notFound } from "next/navigation";
import { BookOpen, Calendar, HelpCircle, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import Button from "@/components/ui/Button";
import { PROGRAMS } from "@/lib/programsData";

interface ProgramDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static routes for all programs at build time
export function generateStaticParams() {
  return PROGRAMS.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const resolvedParams = await params;
  const program = PROGRAMS.find((p) => p.slug === resolvedParams.slug);

  if (!program) {
    notFound();
  }

  const isConfirmed = program.instructor.isConfirmed;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/education/programs"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-teal-primary transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to all programs</span>
        </Link>
      </div>

      {/* Hero / Header Section */}
      <section className="bg-navy border border-glass-border rounded-3xl p-8 md:p-12 space-y-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Verification Status */}
        <div className="flex items-center gap-3">
          {isConfirmed ? (
            <VerifiedBadge variant="pill" text={program.instructor.verifiedText || "Verified"} />
          ) : (
            <span className="text-xs text-text-muted bg-glass-bg border border-glass-border px-3 py-1 rounded-full">
              Curator details being finalized
            </span>
          )}
        </div>

        {/* Title & Short Description */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {program.title}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            {program.shortDescription}
          </p>
        </div>

        {/* Instructor Meta Panel */}
        <div className="pt-6 border-t border-glass-border/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs tracking-[0.1em] text-text-muted uppercase block">Curated by</span>
            {isConfirmed ? (
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-bold text-text-primary text-lg">{program.instructor.name}</h3>
                  <p className="text-sm text-text-secondary">
                    {program.instructor.role} at <span className="font-semibold text-text-primary">{program.instructor.company}</span>
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-text-muted italic">{program.instructor.name}</h3>
                <p className="text-xs text-text-muted">Instructor and bio details will be confirmed shortly.</p>
              </div>
            )}
          </div>

          <Button
            variant="primary"
            size="md"
            href={`/education/register?program=${program.slug}`}
            className="w-full md:w-auto"
          >
            Register for a Free Overview Session
          </Button>
        </div>
      </section>

      {/* Detailed Bio (only if instructor is confirmed) */}
      {isConfirmed && program.instructor.bio && (
        <section className="bg-navy border border-glass-border rounded-3xl p-8 space-y-4 shadow-lg">
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <span>About the Curator</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
            <div className="md:col-span-1 border-r border-glass-border/40 pr-4 space-y-1">
              <p className="text-sm font-semibold text-teal-primary">{program.instructor.experience}</p>
              <p className="text-xs text-text-muted">Verified Experience</p>
            </div>
            <div className="md:col-span-3">
              <p className="text-text-secondary text-sm md:text-base leading-relaxed italic">
                "{program.instructor.bio}"
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Syllabus / What's Inside */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs tracking-[0.15em] text-teal-primary font-bold uppercase block">Curriculum Detail</span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">What's Inside</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {program.syllabus.map((module, index) => (
            <div
              key={module.title}
              className="bg-navy/50 border border-glass-border hover:border-glass-border/80 rounded-2xl p-6 transition-all duration-200"
            >
              <span className="text-xs font-semibold text-teal-primary bg-teal-primary/10 border border-teal-primary/20 px-2 py-0.5 rounded-full mb-3 inline-block">
                Module {index + 1}
              </span>
              <h3 className="font-bold text-text-primary mb-2 text-lg">{module.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{module.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Format & Schedule Details */}
      <section className="bg-navy/30 border border-glass-border rounded-3xl p-8 space-y-6">
        <h2 className="text-xl font-bold text-text-primary">Program Format</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-lg bg-teal-primary/10 border border-teal-primary/20 flex items-center justify-center text-teal-primary shrink-0">
              <BookOpen size={20} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-text-primary text-sm">Session Structure</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{program.format}</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-lg bg-teal-primary/10 border border-teal-primary/20 flex items-center justify-center text-teal-primary shrink-0">
              <Calendar size={20} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-text-primary text-sm">Batch Frequency</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Batches form and run on a rolling basis. Exact cohort dates and pricing options will be provided by the team after overview registration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Registration Panel */}
      <section className="text-center bg-navy border border-glass-border rounded-3xl p-10 space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-teal-primary/5 rounded-full blur-[80px] pointer-events-none" />
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Explore if this program matches your goals</h2>
        <p className="text-text-secondary max-w-xl mx-auto text-sm">
          Register for the overview session to get matched to the next rolling batch. Our team will reach out with format, pricing, and timing.
        </p>
        <div className="pt-2">
          <Button variant="primary" size="lg" href={`/education/register?program=${program.slug}`}>
            Register for a Free Overview Session
          </Button>
        </div>
      </section>
    </div>
  );
}
