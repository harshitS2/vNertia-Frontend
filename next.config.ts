import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    EMAILJS_PUBLIC_KEY:
      process.env.EMAILJS_PUBLIC_KEY ||
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
      "",
    EMAILJS_SERVICE_ID:
      process.env.EMAILJS_SERVICE_ID ||
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
      "",
    EMAILJS_TEMPLATE_ID:
      process.env.EMAILJS_TEMPLATE_ID ||
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
      "",
    SITE_URL:
      process.env.SITE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.vnertia.com",
    API_URL:
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:4000",
  },
};

export default nextConfig;
