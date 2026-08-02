/**
 * Footer.tsx
 *
 * Site footer for Vnertia.com.
 *
 * Layout (3 columns on desktop, stacked on mobile):
 *   Left  : Logo + brand tagline
 *   Centre: Navigation quick-links
 *   Right : Contact info placeholder + social icons
 *
 * Bottom bar: copyright + "BUILD · SCALE · LEAD" triptych
 *
 * The teal gradient on the top border mirrors the logo arc gradient.
 */

import React from "react";
import Logo from "@/components/ui/Logo";
import { Globe, Send, AtSign, Mail, ArrowUpRight } from "lucide-react";

// Quick-link sections shown in the footer
const FOOTER_LINKS = [
  {
    heading: "Company",
    links: [
      { label: "About",       href: "#about"       },
      { label: "Services",    href: "#services"    },
      { label: "How We Work", href: "#how-we-work" },
      { label: "Contact",     href: "#contact"     },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Growth Strategy",     href: "#services" },
      { label: "Performance Marketing", href: "#services" },
      { label: "Content & Creative",  href: "#services" },
      { label: "Analytics & Insights", href: "#services" },
    ],
  },
];

// Placeholder social links — update URLs when accounts are live
const SOCIAL_LINKS = [
  { icon: Globe,  label: "LinkedIn",  href: "https://linkedin.com"  },
  { icon: AtSign, label: "Twitter/X", href: "https://twitter.com"   },
  { icon: Send,   label: "Instagram", href: "https://instagram.com" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-text-secondary">

      {/* Top gradient border — mirrors the brand arc gradient */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-teal-primary to-transparent opacity-60" />

      {/* ================================================================ */}
      {/* Main footer body                                                  */}
      {/* ================================================================ */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ---- Column 1: Brand ---- */}
          <div className="lg:col-span-2">
            <Logo size={160} className="mb-5" />
            <p className="text-sm text-text-muted leading-relaxed max-w-sm">
              Where effort turns into momentum—and momentum turns into lasting success.
              We are the growth partner that stays.
            </p>

            {/* Contact email placeholder */}
            <a
              href="mailto:hello@vnertia.com"
              className="inline-flex items-center gap-2 mt-5 text-sm text-teal-primary hover:text-teal-light transition-colors group"
            >
              <Mail size={14} />
              hello@vnertia.com
              <ArrowUpRight
                size={12}
                className="opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200"
              />
            </a>
          </div>

          {/* ---- Columns 2 & 3: Quick links ---- */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.heading}>
              <h3 className="text-text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-4">
                {section.heading}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-teal-primary transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* Bottom bar                                                        */}
      {/* ================================================================ */}
      <div className="border-t border-glass-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-xs text-text-muted">
            © {currentYear} Vnertia. All rights reserved.
          </p>

          {/* BUILD · SCALE · LEAD triptych — from brand guide */}
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-text-muted">
            BUILD{" "}
            <span className="text-teal-primary mx-1">·</span>
            {" "}SCALE{" "}
            <span className="text-teal-primary mx-1">·</span>
            {" "}LEAD
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
