/**
 * Button.tsx
 *
 * Reusable button component with three visual variants:
 *   - "primary"   : teal gradient background, white text — main CTA
 *   - "secondary" : transparent with teal border and text — soft CTA
 *   - "ghost"     : no border, subtle text link style — tertiary action
 *
 * Also accepts a "size" prop:
 *   - "sm" : compact, for inline use
 *   - "md" : standard (default)
 *   - "lg" : hero CTAs
 *
 * Hover states use smooth CSS transitions. An optional icon can be passed
 * as a React node and will render to the right of the label.
 */

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  asChild?: boolean; // when true, renders as <a> semantically (pass href via onClick)
  href?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  href,
  ...props
}: ButtonProps) {
  // ------------------------------------------------------------------
  // Size classes
  // ------------------------------------------------------------------
  const sizeClasses = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
  };

  // ------------------------------------------------------------------
  // Variant classes
  // ------------------------------------------------------------------
  const variantClasses = {
    primary: [
      "bg-gradient-to-r from-[#25C4CB] to-[#1A8C96]",
      "text-white font-semibold",
      "shadow-lg shadow-teal-500/25",
      "hover:from-[#1A8C96] hover:to-[#156e77]",
      "hover:shadow-teal-500/40 hover:shadow-xl",
      "hover:-translate-y-0.5",
      "active:translate-y-0 active:shadow-md",
    ].join(" "),

    secondary: [
      "border-2 border-[#25C4CB]",
      "text-[#25C4CB] font-semibold",
      "bg-transparent",
      "hover:bg-[#25C4CB]/10",
      "hover:border-[#25C4CB]",
      "hover:-translate-y-0.5",
      "active:translate-y-0",
    ].join(" "),

    ghost: [
      "text-[#25C4CB] font-medium",
      "bg-transparent border-transparent",
      "hover:text-[#1A8C96]",
      "underline-offset-4 hover:underline",
    ].join(" "),
  };

  // ------------------------------------------------------------------
  // Shared base classes applied to all variants
  // ------------------------------------------------------------------
  const baseClasses = [
    "inline-flex items-center justify-center",
    "rounded-xl",
    "transition-all duration-200 ease-out",
    "focus:outline-none focus:ring-2 focus:ring-[#25C4CB] focus:ring-offset-2 focus:ring-offset-transparent",
    "cursor-pointer select-none",
    "font-inter",
  ].join(" ");

  const allClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  // Render as anchor tag if href is provided
  if (href) {
    return (
      <a href={href} className={allClasses}>
        {children}
        {icon && <span className="flex-shrink-0">{icon}</span>}
      </a>
    );
  }

  return (
    <button className={allClasses} {...props}>
      {children}
      {icon && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
}
