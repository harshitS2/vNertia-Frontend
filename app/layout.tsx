/**
 * app/layout.tsx
 *
 * Root layout for the Vnertia.com Next.js app.
 *
 * Responsibilities:
 *   - Sets the HTML lang attribute for accessibility + SEO
 *   - Defines global metadata (title, description, Open Graph, favicon)
 *   - Loads the Inter font via next/font/google (zero layout shift)
 *   - Wraps every page with the sticky Navbar and Footer
 *   - Applies the global CSS file
 *
 * This layout wraps every page in the app/ directory automatically
 * (Next.js App Router convention).
 */

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

// ---------------------------------------------------------------------------
// Font — loaded at build time, zero layout shift, self-hosted by Next.js
// ---------------------------------------------------------------------------
const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-inter",
  display:  "swap",
  weight:   ["300", "400", "500", "600", "700", "800", "900"],
});

// ---------------------------------------------------------------------------
// Metadata — controls <title>, <meta>, and Open Graph tags
// These improve SEO and how the site appears when shared on social media.
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: {
    default:  "Vnertia — Where Effort Turns Into Momentum",
    template: "%s | Vnertia",  // used for inner pages: "Services | Vnertia"
  },
  description:
    "Vnertia is a growth strategy and performance marketing agency. " +
    "We combine strategy, execution, and scalable systems to build consistent, " +
    "compounding growth for your brand.",
  keywords: [
    "growth strategy",
    "performance marketing",
    "digital marketing agency",
    "brand growth",
    "marketing automation",
    "conversion optimization",
    "Vnertia",
  ],
  authors: [{ name: "Vnertia" }],
  creator: "Vnertia",

  // Open Graph — controls how the page looks when shared on Facebook, LinkedIn, etc.
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         "https://vnertia.com",
    siteName:    "Vnertia",
    title:       "Vnertia — Where Effort Turns Into Momentum",
    description: "We don't chase growth. We build it — with structured thinking, practical execution, and systems designed for lasting results.",
    images: [
      {
        url:    "/og-image.png",  // Add this image to /public when ready
        width:  1200,
        height: 630,
        alt:    "Vnertia — Growth Strategy & Performance Marketing",
      },
    ],
  },

  // Twitter card
  twitter: {
    card:        "summary_large_image",
    title:       "Vnertia — Where Effort Turns Into Momentum",
    description: "We don't chase growth. We build it.",
    creator:     "@vnertia",  // Update when Twitter account is active
    images:      ["/og-image.png"],
  },

  // Favicon — served from /public
  icons: {
    icon:    "/favicon.svg",
    shortcut: "/favicon.svg",
    apple:   "/apple-touch-icon.png",  // Add when ready
  },

  // Prevent search engine indexing while in development/staging
  // Remove or change to "index, follow" before production launch
  robots: {
    index:  true,
    follow: true,
  },
};

// ---------------------------------------------------------------------------
// Viewport — controls theme colour (browser chrome on mobile)
// ---------------------------------------------------------------------------
export const viewport: Viewport = {
  themeColor:  "#0D2326",  // Dark navy — matches the hero background
  width:       "device-width",
  initialScale: 1,
};

// ---------------------------------------------------------------------------
// Root layout component
// ---------------------------------------------------------------------------
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('vnertia-theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-inter antialiased bg-navy-deep text-text-primary overflow-x-hidden">
        <ThemeProvider>
          {/* Global navigation — sticky, appears on every page */}
          <Navbar />

          {/* Page content — supplied by each route's page.tsx */}
          <main>
            {children}
          </main>

          {/* Global footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
