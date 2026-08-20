/**
 * app/(agency)/layout.tsx
 *
 * Layout for agency-facing pages (e.g. the main homepage).
 * Mounts the main sticky Navbar and the primary agency Footer.
 */

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
