import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once so every component can use it.
gsap.registerPlugin(ScrollTrigger);

// Accessibility: respect prefers-reduced-motion.
// All animations should short-circuit when the user asks for less motion.
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Refresh ScrollTrigger after layout/images settle (prevents janky triggers).
export const refreshScrollTriggers = () => ScrollTrigger.refresh();

export { gsap, ScrollTrigger };
