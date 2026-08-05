"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

interface LogoProps {
  variant?: "light" | "dark" | "dynamic";
  size?: number;
  className?: string;
}

export default function Logo({
  variant = "dynamic",
  size = 180,
  className = "",
}: LogoProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine which image path to use
  let src = "/logo_dark_v2.png"; // Default fallback (e.g. for dark/cyberpunk or during SSR)

  if (variant === "light") {
    src = "/logo_light_v2.png";
  } else if (variant === "dark") {
    src = "/logo_dark_v2.png";
  } else {
    // variant is dynamic
    if (mounted) {
      src = theme === "light" ? "/logo_light_v2.png" : "/logo_dark_v2.png";
    } else {
      src = "/logo_dark_v2.png"; // Server-side or initial mount default (since default theme is dark)
    }
  }

  // Crop size is 583x291, so aspect ratio is 2.003436
  const width = size;
  const height = Math.round(size * (291 / 583));

  return (
    <div className={`inline-flex items-center justify-start ${className}`} style={{ width, height }}>
      <Image
        src={src}
        alt="Vnertia Logo"
        width={width}
        height={height}
        priority
        className="w-full h-full object-contain"
      />
    </div>
  );
}

