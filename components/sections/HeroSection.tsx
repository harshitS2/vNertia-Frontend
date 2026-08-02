/**
 * HeroSection.tsx
 *
 * Above-the-fold hero — the first thing visitors see on Vnertia.com.
 *
 * Design choices:
 *   - Full viewport height, dark navy background (#0D2326)
 *   - Headline: "Where Effort Turns Into Momentum" (brand tagline)
 *   - Animated floating teal arc ring in the background (CSS keyframes)
 *   - Subtle dot-grid overlay for texture
 *   - Two CTAs: "Start Growing" (primary) + "See How We Work" (secondary)
 *   - Scroll-down indicator that fades out on scroll
 *   - Fade-in + slide-up entry animation via Framer Motion
 *   - Stats bar at the bottom: 3 key numbers
 */

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { fadeUpVariants } from "@/lib/motionVariants";
import { ArrowDown, TrendingUp, Users, Zap } from "lucide-react";

// Three highlight stats shown at the bottom of the hero
const STATS = [
  { icon: TrendingUp, value: "3×",   label: "Average growth multiplier"    },
  { icon: Users,      value: "50+",  label: "Brands scaled"                },
  { icon: Zap,        value: "90d",  label: "To measurable momentum"       },
];

export default function HeroSection() {
  // Detect scroll to fade out the scroll indicator
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToHowWeWork = () => {
    document.getElementById("how-we-work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy"
    >
      {/* ================================================================ */}
      {/* Background layers                                                 */}
      {/* ================================================================ */}

      {/* Dot-grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--teal-primary) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Large ambient teal glow — top-right corner */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, var(--teal-primary) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Smaller teal glow — bottom-left */}
      <div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, var(--teal-dark) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Animated floating arc ring — mirrors the brand logo arc */}
      <div
        className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-[0.12] hero-arc"
        aria-hidden="true"
        style={{
          border: "2px solid transparent",
          borderRadius: "50%",
          background:
            "linear-gradient(var(--bg-secondary), var(--bg-secondary)) padding-box, " +
            "conic-gradient(from 132deg, var(--teal-primary) 0deg, var(--teal-dark) 176deg, transparent 176deg) border-box",
          animation: "arcSpin 12s linear infinite",
        }}
      />
      {/* Second, slightly smaller arc for depth */}
      <div
        className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[320px] h-[320px] opacity-[0.07]"
        aria-hidden="true"
        style={{
          border: "1.5px solid transparent",
          borderRadius: "50%",
          background:
            "linear-gradient(var(--bg-secondary), var(--bg-secondary)) padding-box, " +
            "conic-gradient(from 132deg, var(--teal-light) 0deg, transparent 140deg) border-box",
          animation: "arcSpin 18s linear infinite reverse",
        }}
      />

      {/* ================================================================ */}
      {/* Hero content                                                      */}
      {/* ================================================================ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 flex flex-col items-start">

        {/* Eyebrow label */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-teal-primary">
            <span className="block h-px w-6 bg-gradient-to-r from-teal-primary to-teal-dark" />
            Growth · Strategy · Momentum
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-5xl md:text-6xl lg:text-7xl font-black text-text-primary leading-[1.05] tracking-tight max-w-4xl"
        >
          Where Effort
          <br />
          <span className="text-gradient-teal">
            Turns Into
          </span>
          <br />
          Momentum.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.22}
          className="mt-7 text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed"
        >
          We don&apos;t chase growth. We build it — with structured thinking,
          practical execution, and systems designed for lasting results.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.34}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start Growing
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={scrollToHowWeWork}
          >
            See How We Work
          </Button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.48}
          className="mt-20 flex flex-wrap gap-8 md:gap-16"
        >
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-teal-primary" />
              </div>
              <div>
                <div className="text-2xl font-black text-text-primary">{value}</div>
                <div className="text-xs text-text-muted mt-0.5">{label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ================================================================ */}
      {/* Scroll-down indicator                                             */}
      {/* ================================================================ */}
      <button
        onClick={scrollToAbout}
        aria-label="Scroll to About section"
        className={[
          "absolute bottom-8 left-1/2 -translate-x-1/2 z-10",
          "flex flex-col items-center gap-2 group",
          "transition-opacity duration-500",
          scrolled ? "opacity-0 pointer-events-none" : "opacity-100",
        ].join(" ")}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-text-muted/70 group-hover:text-text-secondary transition-colors">
          Scroll
        </span>
        <div className="w-5 h-8 border border-glass-border rounded-full flex items-start justify-center pt-1.5 group-hover:border-teal-primary/40 transition-colors">
          <div className="w-1 h-1.5 rounded-full bg-teal-primary animate-bounce" />
        </div>
      </button>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--bg-primary))",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
