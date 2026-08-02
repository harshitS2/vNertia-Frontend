/**
 * Navbar.tsx
 *
 * Site-wide navigation bar for Vnertia.com.
 *
 * Features:
 *   - Sticky positioning — stays at top of viewport on scroll
 *   - Scroll-aware background: transparent on hero, dark glass on scroll
 *   - Smooth glass-morphism backdrop blur effect
 *   - Desktop: logo left, nav links centre-right, CTA button far right
 *   - Mobile: hamburger icon opens a full-height slide-in drawer
 *   - Active link highlighting based on scroll position (IntersectionObserver)
 *   - "Let's Talk" CTA scrolls to the contact section
 *
 * Nav sections (matching section IDs in page.tsx):
 *   About · Services · How We Work · Contact
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

// Navigation link definitions — label + anchor href
const NAV_LINKS = [
  { label: "About",       href: "#about"       },
  { label: "Services",    href: "#services"    },
  { label: "How We Work", href: "#how-we-work" },
  { label: "Contact",     href: "#contact"     },
];

export default function Navbar() {
  // -----------------------------------------------------------------------
  // State: whether the user has scrolled past the hero (triggers bg change)
  // -----------------------------------------------------------------------
  const [scrolled,     setScrolled]     = useState(false);
  // State: mobile drawer open/closed
  const [mobileOpen,   setMobileOpen]   = useState(false);
  // State: which section is currently in view (for active link)
  const [activeSection, setActiveSection] = useState<string>("");

  // -----------------------------------------------------------------------
  // Listen for scroll — update `scrolled` flag and `activeSection`
  // -----------------------------------------------------------------------
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // -----------------------------------------------------------------------
  // Close mobile drawer when user resizes to desktop width
  // -----------------------------------------------------------------------
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // -----------------------------------------------------------------------
  // Smooth-scroll helper: closes drawer then scrolls to target
  // -----------------------------------------------------------------------
  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const targetId = href.replace("#", "");
    const el = document.getElementById(targetId);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100); // small delay lets drawer animate closed first
    }
  };

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  return (
    <>
      {/* ================================================================ */}
      {/* Main navbar                                                       */}
      {/* ================================================================ */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-300 ease-out",
          scrolled
            ? "bg-navy/90 backdrop-blur-md border-b border-glass-border py-3 shadow-2xl"
            : "bg-transparent py-5",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#hero"
            onClick={() => handleNavClick("#hero")}
            aria-label="Vnertia — go to top"
            className="flex-shrink-0"
          >
            <Logo size={150} />
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.replace("#", "");
              const isActive  = activeSection === sectionId;
              return (
                <button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className={[
                    "text-sm font-medium transition-colors duration-200",
                    "relative pb-0.5",
                    "after:absolute after:bottom-0 after:left-0 after:h-px",
                    "after:bg-teal-primary after:transition-all after:duration-300",
                    isActive
                      ? "text-teal-primary after:w-full"
                      : "text-text-secondary hover:text-text-primary after:w-0 hover:after:w-full",
                  ].join(" ")}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleNavClick("#contact")}
            >
              Let&apos;s Talk
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-2 rounded-lg hover:bg-glass-bg"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ================================================================ */}
      {/* Mobile drawer overlay                                             */}
      {/* ================================================================ */}
      {/* Backdrop */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden",
          "transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={[
          "fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden",
          "bg-navy border-l border-glass-border",
          "flex flex-col",
          "transition-transform duration-300 ease-out",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-glass-border">
          <Logo size={120} />
          <button
            onClick={() => setMobileOpen(false)}
            className="text-text-muted hover:text-text-primary transition-colors p-1.5 rounded-lg hover:bg-glass-bg"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="flex flex-col gap-1 px-4 py-6 flex-1" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ label, href }) => {
            const sectionId = href.replace("#", "");
            const isActive  = activeSection === sectionId;
            return (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                className={[
                  "text-left px-4 py-3 rounded-xl text-base font-medium",
                  "transition-all duration-200",
                  isActive
                    ? "text-teal-primary bg-teal-primary/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-glass-bg",
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </nav>

        {/* Drawer CTA */}
        <div className="px-6 pb-8 space-y-4">
          <div className="flex items-center justify-between border-t border-glass-border pt-4">
            <span className="text-xs font-semibold tracking-wider text-text-muted uppercase">Theme</span>
            <ThemeToggle />
          </div>
          <Button
            variant="primary"
            size="md"
            className="w-full justify-center"
            onClick={() => handleNavClick("#contact")}
          >
            Let&apos;s Talk
          </Button>
        </div>
      </div>
    </>
  );
}
