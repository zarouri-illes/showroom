import { gsap, ScrollTrigger, prefersReducedMotion } from "./index";

// Staggered scroll reveal for a group of elements (e.g. a grid of car cards).
// Elements fade + slide up ~0.1s apart once they enter the viewport.
// Returns a cleanup function that kills the timeline + trigger.
export const revealStagger = ({
  targets,
  trigger,
  y = 60,
  duration = 0.9,
  stagger = 0.1,
  start = "top 85%",
}) => {
  // Reduced motion: keep elements visible, skip the hide/reveal entirely.
  if (prefersReducedMotion()) return () => {};

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger ?? targets[0],
      start,
      once: true,
    },
  });

  tl.fromTo(
    targets,
    { y, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration, ease: "power2.out", stagger }
  );

  return () => {
    if (tl.scrollTrigger) tl.scrollTrigger.kill();
    tl.kill();
  };
};

// Scroll-linked parallax: shifts a target vertically while scrolling past.
// Animates transform only (GPU-friendly, no layout reflow).
export const parallax = ({ target, trigger, yPercent = 15, scrub = 0.6 }) => {
  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    gsap.to(target, {
      yPercent,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top top",
        end: "bottom top",
        scrub,
      },
    });
  });

  return () => ctx.revert();
};

// Navbar: smooth height/blur shrink once the user scrolls past the hero.
// Toggles a `.nav-scrolled` class (CSS adds the frosted-glass bg) and
// animates vertical padding instead of jumping between sizes.
export const navbarScrollEffect = ({ target, shrinkTo = 10, growTo = 18 }) => {
  if (prefersReducedMotion()) return () => {};

  let wasScrolled = false;
  const ctx = gsap.context(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          const scrolled = self.scroll() > 0;
          target.classList.toggle("nav-scrolled", scrolled);
          if (scrolled !== wasScrolled) {
            wasScrolled = scrolled;
            gsap.to(target, {
              paddingTop: scrolled ? shrinkTo : growTo,
              paddingBottom: scrolled ? shrinkTo : growTo,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        },
      },
    });
  }, target);

  return () => ctx.revert();
};

// Mouse tilt: gently rotates an element (e.g. hero car image) toward the
// cursor. GPU-friendly (rotateX/rotateY/scale transforms only).
export const mouseTilt = ({ target, rotateMax = 8, scaleOnHover = 1.03 }) => {
  if (prefersReducedMotion()) return () => {};

  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return () => {};

  gsap.set(el, { transformPerspective: 600 });
  const toRotX = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power2.out" });
  const toRotY = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power2.out" });
  const toScale = gsap.quickTo(el, "scale", { duration: 0.6, ease: "power2.out" });

  const onMove = (e) => {
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    toRotY(nx * rotateMax);
    toRotX(ny * -rotateMax);
    toScale(scaleOnHover);
  };
  const onLeave = () => {
    toRotX(0);
    toRotY(0);
    toScale(1);
  };

  el.addEventListener("mousemove", onMove);
  el.addEventListener("mouseleave", onLeave);

  return () => {
    el.removeEventListener("mousemove", onMove);
    el.removeEventListener("mouseleave", onLeave);
    gsap.set(el, { clearProps: "transform" });
  };
};

// Count-up stat: animates a number from 0 to `to` when scrolled into view.
// The target element's textContent is replaced by the running number.
export const countUp = ({
  target,
  to,
  duration = 1.6,
  start = "top 85%",
  prefix = "",
  suffix = "",
}) => {
  if (prefersReducedMotion()) {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (el) el.textContent = `${prefix}${to}${suffix}`;
    return () => {};
  }

  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return () => {};

  const tl = gsap.timeline({
    scrollTrigger: { trigger: el, start, once: true },
  });

  tl.fromTo(
    el,
    { innerText: 0 },
    {
      innerText: to,
      duration,
      ease: "power1.out",
      snap: { innerText: 1 },
      onUpdate() {
        el.textContent = `${prefix}${Math.round(el.innerText)}${suffix}`;
      },
    }
  );

  return () => {
    if (tl.scrollTrigger) tl.scrollTrigger.kill();
    tl.kill();
  };
};

export { ScrollTrigger };
