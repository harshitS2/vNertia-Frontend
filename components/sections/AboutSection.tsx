/**
 * AboutSection.tsx
 *
 * "About Vnertia" section — tells the brand story.
 *
 * Layout: two-column on desktop (copy left, visual right), stacked on mobile.
 *
 * Left column:
 *   - Eyebrow label "About Vnertia"
 *   - Headline with "momentum" highlighted in teal
 *   - Brand story paragraphs (from the brief)
 *
 * Right column:
 *   - Three principle cards: Continuity · Collaboration · Clarity
 *   - Each card has an icon, title, and 1-line description
 *
 * Animation: Framer Motion scroll-triggered fade-up via useInView hook.
 */

"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { fadeUpVariants } from "@/lib/motionVariants";
import { RefreshCw, Handshake, Eye } from "lucide-react";

// The three core principles that define Vnertia's approach
const PRINCIPLES = [
  {
    icon:        RefreshCw,
    title:       "Continuity",
    description: "Your brand never loses momentum. We ensure campaigns, strategies, and execution stay consistent — always moving forward.",
    color:       "from-teal-primary/15 to-teal-dark/5 bg-glass-bg",
    iconColor:   "text-teal-primary",
    border:      "border-glass-border",
  },
  {
    icon:        Handshake,
    title:       "Collaboration",
    description: "We operate as an extension of your team — transparent in decisions, accountable in execution, aligned with your vision.",
    color:       "from-teal-dark/15 to-slate-brand/5 bg-glass-bg",
    iconColor:   "text-teal-light",
    border:      "border-glass-border",
  },
  {
    icon:        Eye,
    title:       "Clarity",
    description: "No vanity metrics. No noise. Just clear priorities, measurable progress, and decisions backed by real data.",
    color:       "from-slate-brand/20 to-navy-alt/10 bg-glass-bg",
    iconColor:   "text-teal-light",
    border:      "border-glass-border",
  },
];


export default function AboutSection() {
  // Trigger animation when the section enters the viewport
  const ref     = useRef<HTMLElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 md:py-36 bg-navy-deep overflow-hidden"
    >
      {/* Subtle background accent — very faint teal radial on left */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--teal-primary) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ============================================================ */}
          {/* Left column — brand story copy                               */}
          {/* ============================================================ */}
          <div>
            {/* Eyebrow */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0}
            >
              <SectionLabel>About Vnertia</SectionLabel>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={fadeUpVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.1}
              className="mt-4 text-4xl md:text-5xl font-black text-text-primary leading-tight tracking-tight"
            >
              Growth isn&apos;t something
              <br />
              you chase — it&apos;s something
              <br />
              you{" "}
              <span className="text-gradient-teal">
                build
              </span>
              .
            </motion.h2>

            {/* Brand story paragraphs */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.2}
              className="mt-7 space-y-4 text-text-secondary text-base leading-relaxed"
            >
              <p>
                Most brands don&apos;t fail because of lack of effort — they fail because
                their efforts don&apos;t compound. Campaigns come and go. Strategies shift.
                Momentum breaks. And growth becomes inconsistent.
              </p>
              <p>
                Vnertia was built to create{" "}
                <span className="text-text-primary font-medium">continuity</span> in a space
                full of noise. We don&apos;t see ourselves as an external agency executing
                tasks — we operate as an extension of your team, aligned with your vision,
                invested in your outcomes, and committed to your long-term success.
              </p>
              <p>
                Every strategy we design, every system we implement, and every action we
                take is focused on one thing: ensuring your brand keeps moving forward —
                consistently, predictably, and sustainably.
              </p>
            </motion.div>

            {/* Core principle callout */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.3}
              className="mt-8 pl-5 border-l-2 border-teal-primary"
            >
              <p className="text-text-primary text-lg font-semibold leading-snug">
                &ldquo;Our approach is rooted in one core principle:{" "}
                <span className="text-teal-primary">momentum</span>.&rdquo;
              </p>
              <p className="text-text-muted text-sm mt-1">
                Not short bursts of performance, but steady, intentional progress that builds over time.
              </p>
            </motion.div>
          </div>

          {/* ============================================================ */}
          {/* Right column — three principle cards                         */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-4">
            {PRINCIPLES.map(({ icon: Icon, title, description, color, iconColor, border }, index) => (
              <motion.div
                key={title}
                variants={fadeUpVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={0.15 + index * 0.12}
                className={[
                  "group relative p-6 rounded-2xl border",
                  `bg-gradient-to-br ${color}`,
                  border,
                  "hover:border-teal-primary/45 transition-all duration-300",
                  "hover:shadow-lg hover:shadow-teal-950/20",
                  "hover:-translate-y-0.5",
                ].join(" ")}
              >
                {/* Icon */}
                <div className={`mb-4 ${iconColor}`}>
                  <Icon size={22} />
                </div>

                {/* Title */}
                <h3 className="text-text-primary font-bold text-lg mb-2">{title}</h3>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed">{description}</p>

                {/* Subtle hover glow on right edge */}
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-12 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to bottom, var(--teal-primary), var(--teal-dark))" }}
                  aria-hidden="true"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
