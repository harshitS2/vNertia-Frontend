/**
 * ExpertiseSection.tsx
 *
 * "Our Expertise" section — showcases all 6 services Vnertia offers.
 *
 * Layout:
 *   - 3-column grid on desktop, 2-column on tablet, 1-column on mobile
 *   - Each service card has: icon, number, title, description, deliverables
 *   - Cards lift and show a teal border on hover
 *   - The featured card (Growth Strategy) is visually accented
 *
 * Services (from the brief):
 *   1. Growth Strategy
 *   2. Performance Marketing
 *   3. Content & Creative
 *   4. Funnel & Conversion Optimization
 *   5. Systems & Automation
 *   6. Analytics & Insights
 */

"use client";

import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { fadeUpVariants } from "@/lib/motionVariants";
import {
  Compass,
  BarChart2,
  Palette,
  Filter,
  Settings2,
  LineChart,
} from "lucide-react";

// Service definitions — content taken directly from the brief
const SERVICES = [
  {
    number:       "01",
    icon:         Compass,
    title:        "Growth Strategy",
    description:  "We start by understanding your business deeply — your market, audience, and current bottlenecks. Then we design a clear, actionable roadmap focused on sustainable growth.",
    deliverables: [
      "Market and audience insights",
      "Growth roadmap with clear priorities",
      "Channel and messaging strategy",
      "Defined success metrics",
    ],
    featured: true,
  },
  {
    number:       "02",
    icon:         BarChart2,
    title:        "Performance Marketing",
    description:  "We create and manage campaigns that are built to perform — not just spend. Every decision is driven by clarity, efficiency, and outcomes that matter.",
    deliverables: [
      "Paid media campaigns (Meta, Google, etc.)",
      "Continuous optimization and testing",
      "Budget efficiency and scaling plans",
      "Clear performance reporting",
    ],
    featured: false,
  },
  {
    number:       "03",
    icon:         Palette,
    title:        "Content & Creative",
    description:  "We craft content that doesn't just look good — it converts, connects, and compounds over time.",
    deliverables: [
      "Ad creatives and campaign visuals",
      "Brand messaging and positioning",
      "Social media content strategy",
      "High-converting copy",
    ],
    featured: false,
  },
  {
    number:       "04",
    icon:         Filter,
    title:        "Funnel & Conversion",
    description:  "Traffic means nothing without conversion. We ensure every touchpoint moves users closer to action.",
    deliverables: [
      "Landing page strategy and optimization",
      "Funnel design and user journey mapping",
      "A/B testing and performance improvements",
      "Conversion rate optimization (CRO)",
    ],
    featured: false,
  },
  {
    number:       "05",
    icon:         Settings2,
    title:        "Systems & Automation",
    description:  "We build systems that reduce manual effort and increase consistency — so your growth doesn't rely on constant intervention.",
    deliverables: [
      "Marketing automation workflows",
      "Lead nurturing systems",
      "CRM and tool integration",
      "Scalable backend processes",
    ],
    featured: false,
  },
  {
    number:       "06",
    icon:         LineChart,
    title:        "Analytics & Insights",
    description:  "Clarity drives better decisions. We give you full visibility into what's working and why.",
    deliverables: [
      "Performance dashboards",
      "Actionable insights and recommendations",
      "KPI tracking aligned with business goals",
      "Regular reporting with strategic direction",
    ],
    featured: false,
  },
];

export default function ExpertiseSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Track which card is expanded (shows deliverables)
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-28 md:py-36 bg-navy overflow-hidden"
    >
      {/* Background texture — faint diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--teal-primary) 0px, var(--teal-primary) 1px, transparent 1px, transparent 40px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div variants={fadeUpVariants} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}>
            <SectionLabel>Our Expertise</SectionLabel>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.1}
            className="mt-4 text-4xl md:text-5xl font-black text-text-primary leading-tight tracking-tight"
          >
            One engine.{" "}
            <span className="text-gradient-teal">
              Six capabilities.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.2}
            className="mt-4 text-text-secondary text-lg leading-relaxed"
          >
            We don&apos;t believe in isolated services. Every capability is designed to work
            together — creating a unified growth engine for consistent results.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ number, icon: Icon, title, description, deliverables, featured }, index) => (
            <motion.div
              key={title}
              variants={fadeUpVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.1 + index * 0.08}
              onClick={() => setExpanded(expanded === index ? null : index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setExpanded(expanded === index ? null : index)}
              aria-expanded={expanded === index}
              className={[
                "group relative p-7 rounded-2xl cursor-pointer",
                "transition-all duration-300 ease-out",
                "border",
                featured
                  ? "bg-gradient-to-br from-teal-primary/15 to-teal-dark/5 border-teal-primary/40 hover:border-teal-primary/70"
                  : "bg-glass-bg border-glass-border hover:border-teal-primary/30 hover:bg-glass-bg/15",
                "hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-950/20",
              ].join(" ")}
            >
              {/* Featured badge */}
              {featured && (
                <span className="absolute top-5 right-5 text-[10px] font-bold tracking-widest uppercase text-teal-primary bg-teal-primary/10 px-2.5 py-1 rounded-full">
                  Foundation
                </span>
              )}

              {/* Number + Icon row */}
              <div className="flex items-start justify-between mb-5">
                <span className="text-xs font-bold tracking-wider text-text-muted/30">{number}</span>
                <div className={[
                  "w-11 h-11 rounded-xl flex items-center justify-center border border-glass-border",
                  featured ? "bg-teal-primary/20 text-teal-primary border-teal-primary/30" : "bg-glass-bg text-text-muted group-hover:bg-teal-primary/10 group-hover:text-teal-primary group-hover:border-teal-primary/20",
                  "transition-all duration-300",
                ].join(" ")}>
                  <Icon size={20} />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-text-primary font-bold text-xl mb-3 leading-tight">{title}</h3>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed">{description}</p>

              {/* Deliverables — shown when card is expanded */}
              <div
                className={[
                  "overflow-hidden transition-all duration-400 ease-out",
                  expanded === index ? "max-h-64 mt-5 opacity-100" : "max-h-0 mt-0 opacity-0",
                ].join(" ")}
              >
                <div className="border-t border-glass-border pt-4">
                  <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-teal-primary mb-3">
                    What we deliver
                  </p>
                  <ul className="space-y-2">
                    {deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Expand hint */}
              <div className="mt-5 flex items-center gap-1.5 text-xs text-text-muted/50 group-hover:text-teal-primary/70 transition-colors duration-200">
                <span>{expanded === index ? "Click to collapse" : "Click to see deliverables"}</span>
                <span
                  className={[
                    "transition-transform duration-300",
                    expanded === index ? "rotate-180" : "rotate-0",
                  ].join(" ")}
                >
                  ↓
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing line from the brief */}
        <motion.div
          variants={fadeUpVariants} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.6}
          className="mt-16 text-center"
        >
          <p className="text-text-muted/50 text-base italic">
            &ldquo;Growth isn&apos;t a one-time effort. It&apos;s a system, a mindset, and a continuous process.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
