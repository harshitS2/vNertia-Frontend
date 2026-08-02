/**
 * HowWeWorkSection.tsx
 *
 * "How We Work" section — explains Vnertia's 4-step process.
 *
 * Layout:
 *   - Headline + subheadline at top
 *   - 4 steps arranged in a 2×2 grid on desktop, vertical stack on mobile
 *   - Each step: large step number, title, description
 *   - Animated connector line between steps (CSS)
 *   - Closing statement: "No chaos. No random efforts."
 *
 * Steps (from the brief):
 *   1. Deep Understanding
 *   2. Build the Engine
 *   3. Create Momentum
 *   4. Scale with Confidence
 */

"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { fadeUpVariants } from "@/lib/motionVariants";
import { Search, Wrench, Rocket, TrendingUp } from "lucide-react";

// Steps content — exact copy from the brand brief
const STEPS = [
  {
    number: "01",
    icon:   Search,
    title:  "Deep Understanding",
    body:   "We start by getting close to your business — your goals, your challenges, and what's holding growth back. No assumptions. No surface-level analysis. Just clarity from the ground up.",
    accent: "from-teal-primary/15 to-transparent",
  },
  {
    number: "02",
    icon:   Wrench,
    title:  "Build the Engine",
    body:   "We design strategies, systems, and execution that work together — not in silos. Every action is intentional, aligned, and built to create forward movement.",
    accent: "from-teal-dark/15 to-transparent",
  },
  {
    number: "03",
    icon:   Rocket,
    title:  "Create Momentum",
    body:   "Once the foundation is set, we focus on consistency. Testing, refining, and improving — so results don't spike, they build.",
    accent: "from-slate-brand/20 to-transparent",
  },
  {
    number: "04",
    icon:   TrendingUp,
    title:  "Scale with Confidence",
    body:   "We double down on what works and remove what doesn't. Growth becomes structured, predictable, and ready to expand.",
    accent: "from-teal-primary/10 to-transparent",
  },
];


export default function HowWeWorkSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-we-work"
      ref={ref}
      className="relative py-28 md:py-36 bg-navy-deep overflow-hidden"
    >
      {/* Background: large centred teal glow for depth */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-[700px] h-[700px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, var(--teal-primary) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <motion.div variants={fadeUpVariants} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}>
            <SectionLabel>How We Work</SectionLabel>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.1}
            className="mt-4 text-4xl md:text-5xl font-black text-text-primary leading-tight tracking-tight"
          >
            How We Turn{" "}
            <span className="text-gradient-teal">
              Effort Into Momentum
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.2}
            className="mt-4 text-text-secondary text-lg leading-relaxed"
          >
            A focused approach designed to eliminate guesswork and build consistent,
            compounding growth.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STEPS.map(({ number, icon: Icon, title, body, accent }, index) => (
            <motion.div
              key={title}
              variants={fadeUpVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.15 + index * 0.1}
              className={[
                "group relative p-8 rounded-2xl border border-glass-border",
                `bg-gradient-to-br ${accent}`,
                "hover:border-teal-primary/30 transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-950/30",
                "overflow-hidden",
              ].join(" ")}
            >
              {/* Large ghost number in the background */}
              <div
                className="absolute -right-4 -bottom-4 text-[120px] font-black leading-none text-text-primary/[0.02] select-none pointer-events-none transition-all duration-500 group-hover:text-teal-primary/[0.05]"
                aria-hidden="true"
              >
                {number}
              </div>

              {/* Step header row */}
              <div className="relative z-10 flex items-start gap-5 mb-5">
                {/* Teal step number pill */}
                <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-bold tracking-[0.15em] text-teal-primary uppercase">
                    Step
                  </span>
                  <span className="text-3xl font-black text-text-primary leading-none">
                    {number}
                  </span>
                </div>

                {/* Divider */}
                <div className="w-px self-stretch bg-glass-border flex-shrink-0" />

                {/* Icon + Title */}
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-primary/10 flex items-center justify-center mb-3 group-hover:bg-teal-primary/20 transition-colors duration-300">
                    <Icon size={18} className="text-teal-primary" />
                  </div>
                  <h3 className="text-text-primary font-bold text-xl leading-tight">{title}</h3>
                </div>
              </div>

              {/* Body text */}
              <p className="relative z-10 text-text-secondary text-sm leading-relaxed pl-[72px]">
                {body}
              </p>

              {/* Bottom-left accent line */}
              <div
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-out rounded-b-2xl"
                style={{ background: "linear-gradient(to right, var(--teal-primary), transparent)" }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          variants={fadeUpVariants} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.55}
          className="mt-16 text-center"
        >
          <div className="inline-block px-8 py-5 rounded-2xl border border-glass-border bg-glass-bg">
            <p className="text-text-secondary text-xl font-semibold">
              No chaos. No random efforts.
            </p>
            <p className="text-text-muted text-base mt-1">
              Just a clear path from where you are to where you want to be.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
