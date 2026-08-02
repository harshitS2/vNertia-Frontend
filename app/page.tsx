/**
 * app/page.tsx
 *
 * Home page for Vnertia.com.
 *
 * This is the single-page scroll layout — all sections live here
 * and are navigated via anchor links in the Navbar.
 *
 * Section order (matches Navbar links):
 *   1. HeroSection        — full-viewport above-the-fold
 *   2. AboutSection       — brand story + 3 core principles
 *   3. ExpertiseSection   — 6 services grid
 *   4. HowWeWorkSection   — 4-step process
 *   5. WhatYouGetSection  — value propositions
 *   6. ContactSection     — CTA + contact form
 *
 * Each section manages its own scroll-triggered animations internally
 * via Framer Motion's useInView hook, so this file stays clean and
 * focused on composition only.
 */

import HeroSection       from "@/components/sections/HeroSection";
import AboutSection      from "@/components/sections/AboutSection";
import ExpertiseSection  from "@/components/sections/ExpertiseSection";
import HowWeWorkSection  from "@/components/sections/HowWeWorkSection";
import WhatYouGetSection from "@/components/sections/WhatYouGetSection";
import ContactSection    from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Section 1: Hero — full-viewport dark hero with animated arc ring  */}
      {/* ---------------------------------------------------------------- */}
      <HeroSection />

      {/* ---------------------------------------------------------------- */}
      {/* Section 2: About — brand story, core principles                   */}
      {/* ---------------------------------------------------------------- */}
      <AboutSection />

      {/* ---------------------------------------------------------------- */}
      {/* Section 3: Expertise — 6 service cards (click to expand)         */}
      {/* ---------------------------------------------------------------- */}
      <ExpertiseSection />

      {/* ---------------------------------------------------------------- */}
      {/* Section 4: How We Work — 4-step process                          */}
      {/* ---------------------------------------------------------------- */}
      <HowWeWorkSection />

      {/* ---------------------------------------------------------------- */}
      {/* Section 5: What You Get — value proposition cards                */}
      {/* ---------------------------------------------------------------- */}
      <WhatYouGetSection />

      {/* ---------------------------------------------------------------- */}
      {/* Section 6: Contact — CTA copy + validated contact form           */}
      {/* ---------------------------------------------------------------- */}
      <ContactSection />
    </>
  );
}
