"use client";

import { useEffect } from "react";

/**
 * Ensures the page starts at the top (Hero section) on load and prevents
 * scroll restoration from restoring a previous position.
 */
export default function ScrollToTop() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);
  return null;
}
