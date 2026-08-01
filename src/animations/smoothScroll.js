import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./index";

let lenis = null;

// Smooth scrolling via Lenis, synced with GSAP's ticker so every
// ScrollTrigger animation follows the eased scroll position.
// Also enables smooth anchor-link navigation (`anchors: true`).
export const initSmoothScroll = () => {
  if (prefersReducedMotion()) return () => {};

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
    anchors: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    lenis = null;
  };
};

// Programmatic scroll-to (used by buttons/links that aren't plain anchors).
export const scrollTo = (target, options) => {
  if (!lenis) return;
  lenis.scrollTo(target, { offset: -80, ...options });
};

// Jump straight to the top (used on route changes).
export const scrollToTop = () => {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
};
