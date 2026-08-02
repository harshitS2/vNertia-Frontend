/**
 * SectionLabel.tsx
 *
 * Small uppercase eyebrow label that appears above section headings.
 * Creates visual hierarchy by announcing the section type before the
 * main headline. Styled with the brand teal color and letter-spacing.
 *
 * Example usage:
 *   <SectionLabel>Our Expertise</SectionLabel>
 *   <h2>What We Do</h2>
 */

import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  /** If true, renders on a light background (dark text). Defaults to dark bg (teal text). */
  onLight?: boolean;
}

export default function SectionLabel({
  children,
  className = "",
  onLight = false,
}: SectionLabelProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2",
        "text-xs font-semibold tracking-[0.2em] uppercase",
        onLight ? "text-[#1A8C96]" : "text-[#25C4CB]",
        className,
      ].join(" ")}
    >
      {/* Decorative teal dash before the label text */}
      <span
        className="block h-px w-6 bg-gradient-to-r from-[#25C4CB] to-[#1A8C96]"
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
