/**
 * app/(agency)/page.tsx
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
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <HowWeWorkSection />
      <WhatYouGetSection />
      <ContactSection />
    </>
  );
}
