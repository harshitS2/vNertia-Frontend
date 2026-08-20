/**
 * components/education/Footer.tsx
 *
 * Dedicated footer for the Vnertia Education portal.
 * Includes program quick links, support disclosures, and contact channels.
 */

import React from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { Globe, Send, AtSign, Mail, ArrowUpRight } from "lucide-react";

const FOOTER_LINKS = [
  {
    heading: "Education",
    links: [
      { label: "All Programs", href: "/education/programs" },
      { label: "Meet Mentors", href: "/education/mentors" },
      { label: "Why Vnertia",  href: "/education/about" },
      { label: "Contact Us",   href: "/education/contact" },
    ],
  },
  {
    heading: "Programs",
    links: [
      { label: "Growth & Performance", href: "/education/programs/growth-marketing" },
      { label: "Brand & Content",      href: "/education/programs/brand-marketing" },
      { label: "Analytics",            href: "/education/programs/analytics" },
      { label: "UI/UX Design",         href: "/education/programs/ui-ux" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: Globe,  label: "LinkedIn",  href: "https://www.linkedin.com/in/pramod-srivastava/" },
  { icon: AtSign, label: "Twitter",   href: "https://twitter.com" },
  { icon: Send,   label: "Instagram", href: "https://instagram.com" },
];

export default function EducationFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-text-secondary">
      {/* Gradient divider line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-teal-primary to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2">
            <Link href="/education" className="flex items-center gap-2 mb-5">
              <Logo size={145} />
              <span className="text-[9px] tracking-[0.2em] font-bold text-teal-primary uppercase border border-teal-primary/30 px-1 py-0.2 rounded">
                Edu
              </span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed max-w-sm">
              Taught by professionals currently working at real companies. Learn the actual day-to-day work, build momentum, and prepare for what comes next.
            </p>

            {/* Support warnings */}
            <div className="mt-6 space-y-2 text-xs text-text-muted/70 max-w-md">
              <p>
                * Batches form on a rolling basis. Register your interest and our team will share the next available batch, format, and fee.
              </p>
              <p>
                * Career support is designed to improve readiness and access—employment or job placement is not guaranteed.
              </p>
            </div>

            <a
              href="mailto:hello@vnertia.com"
              className="inline-flex items-center gap-2 mt-6 text-sm text-teal-primary hover:text-teal-light transition-colors group"
            >
              <Mail size={14} />
              hello@vnertia.com
              <ArrowUpRight
                size={12}
                className="opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200"
              />
            </a>
          </div>

          {/* Columns 2 & 3: Quick links */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.heading}>
              <h3 className="text-text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-4">
                {section.heading}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-teal-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom copyright & details bar */}
      <div className="border-t border-glass-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {currentYear} Vnertia. All rights reserved.
          </p>

          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-text-muted">
            LEARN <span className="text-teal-primary mx-1">·</span> PRACTISE <span className="text-teal-primary mx-1">·</span> GROW
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-glass-bg border border-glass-border hover:bg-teal-primary/20 hover:text-teal-primary transition-all duration-200"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
