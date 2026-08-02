/**
 * Logo.tsx
 *
 * Vnertia SVG logo — hand-coded from the official brand construction guide.
 *
 * Architecture:
 *   [ Arc + V ]  +  [ nertia ]
 *
 * The arc is an open circular stroke (132° → 308°, sweep = 176°) drawn
 * exclusively around the letter "V". It does NOT wrap the full wordmark.
 * A teal gradient flows along the arc path.
 *
 * All proportions are derived from H = height of the "V" glyph.
 *   Circle diameter : 1.38H
 *   Stroke thickness: 0.115H
 *   Arc start angle : 132°  (upper-left of V)
 *   Arc end angle   : 308°  (lower-left of V)
 *   V-to-n gap      : 0.135H
 *   "nertia" height : 0.91H (slightly smaller than V for hierarchy)
 *   Total width     : ≈ 4H
 *
 * Props:
 *   variant  — "light" (dark text, for light backgrounds)
 *              "dark"  (white text, for dark backgrounds)
 *   size     — SVG width in pixels (height scales proportionally)
 *   className — extra Tailwind / CSS classes
 */

import React from "react";

interface LogoProps {
  variant?: "light" | "dark" | "dynamic";
  size?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Helper: convert polar angle (degrees) to Cartesian (x, y) on a circle.
// cx, cy = circle center; r = radius; angleDeg = angle from positive X-axis.
// ---------------------------------------------------------------------------
function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180; // rotate so 0° is at top
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

// ---------------------------------------------------------------------------
// Helper: build an SVG arc path string (large-arc-flag, sweep-flag).
// ---------------------------------------------------------------------------
function arcPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const sweep = endAngle - startAngle;
  const largeArc = sweep > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Logo({
  variant = "dynamic",
  size = 180,
  className = "",
}: LogoProps) {
  // ------------------------------------------------------------------
  // Base unit: H = height of the "V" glyph in SVG user units.
  // We set H = 40 and derive everything from that.
  // ------------------------------------------------------------------
  const H = 40;

  // Arc geometry (brand guide ratios)
  const circleDiameter = 1.38 * H;         // 55.2
  const circleRadius   = circleDiameter / 2; // 27.6
  const strokeWidth    = 0.115 * H;         // 4.6
  const arcStart       = 132;               // degrees
  const arcEnd         = 308;               // degrees

  // "V" position inside the arc
  const topGap         = 0.075 * H;        // 3
  const opticalShiftX  = 0.028 * H;        // 1.12 (nudge right)

  // The arc zone spans ≈ 1.12H horizontally.
  // We place the circle center at arcZoneWidth / 2 horizontally, with padding
  // for the stroke so it's not clipped.
  const padding        = strokeWidth;
  const cx             = padding + circleRadius;
  const cy             = padding + circleRadius;

  // "V" position: centered in the circle, nudged right optically
  const vWidth         = H * 0.72;          // 28.8 — V glyph width
  const vX             = cx - vWidth / 2 + opticalShiftX;
  const vY             = cy - H / 2;        // vertically centered

  // Gap between V's right edge and start of "nertia"
  const gapVN          = 0.135 * H;         // 5.4
  const nertiaHeight   = 0.91 * H;          // 36.4
  const nertiaX        = cx + circleRadius - strokeWidth / 2 + gapVN; // roughly right of arc
  // We align "nertia" baseline to the V baseline
  const vBaseline      = vY + H;
  const nertiaY        = vBaseline;

  // Overall SVG viewBox width (≈ 4H + padding on both sides)
  const totalWidth     = padding * 2 + 4 * H;
  const totalHeight    = padding * 2 + circleDiameter;

  // Colour tokens from brand guide
  const tealLight      = "var(--teal-primary, #25C4CB)";
  const tealDark       = "var(--teal-dark, #1A8C96)";
  const wordmarkColor  = variant === "dark" ? "#FFFFFF" : (variant === "light" ? "#0D2326" : "currentColor");

  // Unique gradient ID (avoids SVG conflicts when multiple logos on page)
  const gradientId     = `vnertia-arc-gradient-${variant}`;

  return (
    <svg
      width={size}
      height={(size / totalWidth) * totalHeight}
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Vnertia"
      role="img"
      className={className}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Gradient definition — teal gradient flowing along the arc           */}
      {/* ------------------------------------------------------------------ */}
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={tealLight} />
          <stop offset="100%" stopColor={tealDark}  />
        </linearGradient>
      </defs>

      {/* ------------------------------------------------------------------ */}
      {/* Arc — open circular stroke around the V only (132° → 308°)         */}
      {/* ------------------------------------------------------------------ */}
      <path
        d={arcPath(cx, cy, circleRadius, arcStart, arcEnd)}
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />

      {/* ------------------------------------------------------------------ */}
      {/* "V" glyph — bold geometric sans-serif V                             */}
      {/* We draw the V as a polygon path for exact control.                 */}
      {/* The V has two diagonal strokes meeting at a sharp apex.            */}
      {/* ------------------------------------------------------------------ */}
      <text
        x={vX + vWidth / 2}
        y={vBaseline}
        textAnchor="middle"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="900"
        fontSize={H}
        fill={wordmarkColor}
        letterSpacing="-0.02em"
      >
        V
      </text>

      {/* ------------------------------------------------------------------ */}
      {/* "nertia" — slightly smaller, same baseline, tight tracking          */}
      {/* ------------------------------------------------------------------ */}
      <text
        x={nertiaX}
        y={nertiaY}
        textAnchor="start"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="900"
        fontSize={nertiaHeight}
        fill={wordmarkColor}
        letterSpacing="-0.018em"
      >
        nertia
      </text>
    </svg>
  );
}
