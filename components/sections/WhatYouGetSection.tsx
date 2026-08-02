/**
 * WhatYouGetSection.tsx
 *
 * "What You Get" — value proposition section.
 *
 * Shows what a client actually receives when working with Vnertia,
 * framing it not as services but as outcomes and a way of working.
 *
 * Content from the brief:
 *   - A team that thinks like owners
 *   - Strategies designed for long-term scale
 *   - Execution that's focused and accountable
 *   - Systems that keep delivering results over time
 *
 * Layout: 2×2 card grid on desktop, single column on mobile.
 * Background: alternating dark navy to create contrast with surrounding sections.
 */

"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { fadeUpVariants } from "@/lib/motionVariants";
import { Users2, Scale, Target, Infinity } from "lucide-react";

// Value props — content from the brief
const VALUES = [
  {
    icon:        Users2,
    title:       "A Team That Thinks Like Owners",
    body:        "When you work with us, you're not handing over your brand — you're gaining a team that treats it like their own. We're invested in your outcomes.",
    gradient:    "from-teal-primary/10 via-transparent to-transparent bg-glass-bg",
    iconBg:      "bg-teal-primary/15 border border-teal-primary/20",
    iconColor:   "text-teal-primary",
    borderColor: "border-glass-border",
  },
  {
    icon:        Scale,
    title:       "Strategies Designed for Long-Term Scale",
    body:        "No vanity metrics. No distractions. We design every roadmap for compounding results — clarity, focus, and measurable progress at every stage.",
    gradient:    "from-teal-dark/10 via-transparent to-transparent bg-glass-bg",
    iconBg:      "bg-teal-dark/15 border border-teal-dark/20",
    iconColor:   "text-teal-light",
    borderColor: "border-glass-border",
  },
  {
    icon:        Target,
    title:       "Execution That's Focused & Accountable",
    body:        "We combine structured thinking with practical execution to eliminate guesswork. Transparency in decisions, ownership in execution, shared commitment to winning.",
    gradient:    "from-slate-brand/15 via-transparent to-transparent bg-glass-bg",
    iconBg:      "bg-slate-brand/20 border border-slate-brand/30",
    iconColor:   "text-teal-light",
    borderColor: "border-glass-border",
  },
  {
    icon:        Infinity,
    title:       "Systems That Keep Delivering",
    body:        "Not short bursts of performance, but steady, intentional progress. Our systems are built so your growth doesn't rely on constant intervention — it compounds.",
    gradient:    "from-teal-primary/8 via-transparent to-transparent bg-glass-bg",
    iconBg:      "bg-teal-primary/10 border border-teal-primary/15",
    iconColor:   "text-teal-primary",
    borderColor: "border-glass-border",
  },
];


export default function WhatYouGetSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="results"
      ref={ref}
      className="relative py-28 md:py-36 bg-navy overflow-hidden"
    >
      {/* Diagonal teal line accent — top right */}
      <div
        className="absolute top-0 right-0 w-[300px] h-[300px] opacity-[0.06] pointer-events-none"
        style={{
          background: "conic-gradient(from 45deg, var(--teal-primary), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div variants={fadeUpVariants} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}>
            <SectionLabel>What You Actually Get</SectionLabel>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.1}
            className="mt-4 text-4xl md:text-5xl font-black text-text-primary leading-tight tracking-tight"
          >
            You&apos;re not buying services.
            <br />
            <span className="text-gradient-teal">
              You&apos;re building a growth engine.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.2}
            className="mt-4 text-text-secondary text-lg leading-relaxed"
          >
            The best results come from true collaboration. Here&apos;s what that looks like in practice.
          </motion.p>
        </div>

        {/* Value cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {VALUES.map(({ icon: Icon, title, body, gradient, iconBg, iconColor, borderColor }, index) => (
            <motion.div
              key={title}
              variants={fadeUpVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.15 + index * 0.1}
              className={[
                "group relative p-8 rounded-2xl border",
                `bg-gradient-to-br ${gradient}`,
                borderColor,
                "hover:border-teal-primary/45 transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-950/30",
              ].join(" ")}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${iconBg} ${iconColor} transition-all duration-300 group-hover:scale-110`}>
                <Icon size={22} />
              </div>

              {/* Title */}
              <h3 className="text-text-primary font-bold text-xl mb-3 leading-tight">{title}</h3>

              {/* Body */}
              <p className="text-text-secondary text-sm leading-relaxed">{body}</p>

              {/* Hover glow corner */}
              <div
                className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-tr-2xl overflow-hidden"
                aria-hidden="true"
              >
                <div className="w-full h-full bg-gradient-to-br from-teal-primary/10 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom call-to-action quote */}
        <motion.div
          variants={fadeUpVariants} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.55}
          className="mt-16 text-center"
        >
          <p className="text-text-muted/60 text-base leading-relaxed">
            Because in the end, growth feels different when it&apos;s built together.
          </p>
          <p className="text-teal-primary font-semibold text-lg mt-2">
            This is Vnertia.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
