/**
 * components/education/Navbar.tsx
 *
 * Sticky, responsive navigation bar for the Vnertia Education portal.
 * Features mobile slide-out drawer, theme toggle, and route-aware link active states.
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { label: "Programs", href: "/education/programs" },
  { label: "Mentors",  href: "/education/mentors"  },
  { label: "Why Vnertia", href: "/education/about" },
  { label: "FAQ",      href: "/education/faq"      },
  { label: "Contact",  href: "/education/contact"  },
];

export default function EducationNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on resize/navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
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
          <Link href="/education" className="flex-shrink-0 flex items-center gap-2">
            <Logo size={140} />
            <span className="text-[10px] tracking-[0.25em] font-bold text-teal-primary uppercase border border-teal-primary/30 px-1.5 py-0.5 rounded ml-2">
              Edu
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Education navigation">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
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
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="primary"
              size="sm"
              href="/education/register"
            >
              Register for Free
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-2 rounded-lg hover:bg-glass-bg"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden",
          "transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={[
          "fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden",
          "bg-navy border-l border-glass-border",
          "flex flex-col",
          "transition-transform duration-300 ease-out",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-glass-border">
          <Link href="/education" className="flex items-center gap-1">
            <Logo size={110} />
            <span className="text-[9px] tracking-[0.2em] font-bold text-teal-primary uppercase border border-teal-primary/20 px-1 py-0.2 rounded ml-1">
              Edu
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-text-muted hover:text-text-primary p-1.5 rounded-lg hover:bg-glass-bg"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "px-4 py-3 rounded-xl text-base font-medium",
                  "transition-all duration-200",
                  isActive
                    ? "text-teal-primary bg-teal-primary/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-glass-bg",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-6 pb-8 space-y-4">
          <div className="flex items-center justify-between border-t border-glass-border pt-4">
            <span className="text-xs font-semibold text-text-muted uppercase">Theme</span>
            <ThemeToggle />
          </div>
          <Button
            variant="primary"
            size="md"
            className="w-full justify-center"
            href="/education/register"
          >
            Register for Free
          </Button>
        </div>
      </div>
    </>
  );
}
