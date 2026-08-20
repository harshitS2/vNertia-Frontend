/**
 * VerifiedBadge.tsx
 *
 * A reusable trust badge representing the "✓ Verified Working Professional" claim.
 * Consistent layout token used across:
 *   - Heros (eyebrow style)
 *   - Program lists (eyebrow or pill style)
 *   - Mentor profiles (pill style)
 */

import React from "react";
import { Check } from "lucide-react";

interface VerifiedBadgeProps {
  variant?: "eyebrow" | "pill" | "text-inline";
  text?: string;
  className?: string;
}

export default function VerifiedBadge({
  variant = "pill",
  text,
  className = "",
}: VerifiedBadgeProps) {
  if (variant === "eyebrow") {
    return (
      <div
        className={[
          "inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-teal-primary uppercase",
          "animate-pulse-subtle",
          className,
        ].join(" ")}
      >
        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-teal-primary/10 border border-teal-primary/30 shadow-teal-sm text-[10px]">
          ✓
        </span>
        <span>{text || "Verified Working Professionals"}</span>
      </div>
    );
  }

  if (variant === "text-inline") {
    return (
      <span
        className={[
          "inline-flex items-center gap-1 text-sm font-semibold text-teal-primary",
          className,
        ].join(" ")}
      >
        <Check size={14} className="stroke-[3]" />
        <span>{text || "Verified"}</span>
      </span>
    );
  }

  // Default: Pill badge style
  return (
    <div
      className={[
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
        "bg-teal-primary/10 border border-teal-primary/20 text-teal-primary shadow-teal-sm",
        className,
      ].join(" ")}
    >
      <Check size={12} className="stroke-[3] flex-shrink-0" />
      <span>{text || "Verified"}</span>
    </div>
  );
}
