/**
 * app/(education)/education/(portal)/layout.tsx
 *
 * Shared layout for the main education portal.
 * Applies the EducationNavbar and EducationFooter to all inner pages.
 */

import React from "react";
import EducationNavbar from "@/components/education/Navbar";
import EducationFooter from "@/components/education/Footer";

export default function EducationPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EducationNavbar />
      <div className="pt-24 min-h-screen">
        {children}
      </div>
      <EducationFooter />
    </>
  );
}
