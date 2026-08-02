/**
 * motionVariants.ts
 *
 * Shared Framer Motion animation variants used across all page sections.
 *
 * Why a shared file?
 *   - DRY: avoids copy-pasting the same variant object in every component
 *   - Type-safe: the Framer Motion Variants type is applied once here
 *   - Consistent: all sections have the same timing and easing curve
 *
 * Usage:
 *   import { fadeUpVariants } from "@/lib/motionVariants";
 *
 *   <motion.div
 *     variants={fadeUpVariants}
 *     initial="hidden"
 *     animate={inView ? "visible" : "hidden"}
 *     custom={0.2}   // <- delay in seconds
 *   />
 *
 * Note on `custom`:
 *   Framer Motion passes the `custom` prop value to the variant function
 *   as its first argument. This lets each element have a different delay
 *   while sharing the same variant definition.
 */

import type { Variants } from "framer-motion";

// ---------------------------------------------------------------------------
// fadeUpVariants
//
// Fades in and slides up from 30px below its natural position.
// `custom` prop = delay in seconds (number).
//
// Easing: [0.22, 1, 0.36, 1] is an "expo out" cubic bezier — fast start,
// slow relaxed finish. Typed as `[number, number, number, number]` to
// satisfy Framer Motion's Easing union type.
// ---------------------------------------------------------------------------
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  }),
};

// ---------------------------------------------------------------------------
// fadeInVariants
//
// Simple opacity fade — no movement. Useful for overlays and background
// elements that shouldn't shift position on reveal.
// ---------------------------------------------------------------------------
export const fadeInVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay,
    },
  }),
};

// ---------------------------------------------------------------------------
// scaleInVariants
//
// Scales in from 92% to 100%. Good for cards and icons.
// ---------------------------------------------------------------------------
export const scaleInVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  }),
};
