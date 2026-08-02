import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "./index";

// Button hover/press micro-animations (scale pop).
// Elements tagged with the `btn-anime` class get the effect.
export const initButtonEffects = (scope = document) => {
  if (prefersReducedMotion()) return () => {};

  const handlers = new Map();
  scope.querySelectorAll(".btn-anime").forEach((btn) => {
    const enter = () => animate(btn, { scale: 1.05, duration: 200, ease: "outQuad" });
    const leave = () => animate(btn, { scale: 1, duration: 250, ease: "outQuad" });
    const press = () => animate(btn, { scale: 0.94, duration: 120, ease: "outQuad" });
    const release = () => animate(btn, { scale: 1, duration: 300, ease: "outBack" });

    btn.addEventListener("mouseenter", enter);
    btn.addEventListener("mouseleave", leave);
    btn.addEventListener("mousedown", press);
    btn.addEventListener("mouseup", release);
    btn.addEventListener("blur", release);

    handlers.set(btn, { enter, leave, press, release });
  });

  // Cleanup removes listeners so effects don't stack across mounts.
  return () => {
    handlers.forEach(({ enter, leave, press, release }, btn) => {
      btn.removeEventListener("mouseenter", enter);
      btn.removeEventListener("mouseleave", leave);
      btn.removeEventListener("mousedown", press);
      btn.removeEventListener("mouseup", release);
      btn.removeEventListener("blur", release);
    });
    handlers.clear();
  };
};

// Form input focus state (glowing accent ring).
// Elements tagged with the `input-anime` class get the effect.
export const initInputFocus = (scope = document) => {
  if (prefersReducedMotion()) return () => {};

  const handlers = new Map();
  scope.querySelectorAll(".input-anime").forEach((input) => {
    const focus = () =>
      animate(input, {
        boxShadow: ["0 0 0 0 rgba(225,29,46,0)", "0 0 0 3px rgba(225,29,46,0.45)"],
        duration: 300,
        ease: "outQuad",
      });
    const blur = () =>
      animate(input, {
        boxShadow: "0 0 0 0 rgba(225,29,46,0)",
        duration: 300,
        ease: "outQuad",
      });

    input.addEventListener("focus", focus);
    input.addEventListener("blur", blur);
    handlers.set(input, { focus, blur });
  });

  return () => {
    handlers.forEach(({ focus, blur }, input) => {
      input.removeEventListener("focus", focus);
      input.removeEventListener("blur", blur);
    });
    handlers.clear();
  };
};

// Icon hover bounce/rotate for feature icons (warranty, financing, etc.).
// Elements tagged with the `icon-bounce` class get the effect.
export const initIconBounce = (scope = document) => {
  if (prefersReducedMotion()) return () => {};

  const handlers = new Map();
  scope.querySelectorAll(".icon-bounce").forEach((icon) => {
    const bounce = () =>
      animate(icon, {
        translateY: [-8, 0],
        rotate: [0, 8, -8, 0],
        duration: 550,
        ease: "outBack",
      });

    icon.addEventListener("mouseenter", bounce);
    handlers.set(icon, { bounce });
  });

  return () => {
    handlers.forEach(({ bounce }, icon) => {
      icon.removeEventListener("mouseenter", bounce);
    });
    handlers.clear();
  };
};

// Mobile menu: staggered entrance for links + fade for the overlay panel.
export const openMobileMenu = ({ panel, links }) => {
  if (prefersReducedMotion()) {
    panel.style.opacity = "1";
    panel.style.transform = "none";
    return;
  }

  animate(panel, { opacity: [0, 1], duration: 260, ease: "outQuad" });
  animate(links, {
    translateY: [18, 0],
    opacity: [0, 1],
    duration: 320,
    ease: "outQuad",
    delay: stagger(60),
  });
};

// Mobile menu close: fade + slide the panel away, then run onComplete.
export const closeMobileMenu = ({ panel, onComplete }) => {
  if (prefersReducedMotion()) {
    panel.style.opacity = "0";
    panel.style.transform = "translateY(-12px)";
    onComplete?.();
    return;
  }

  animate(panel, {
    opacity: [1, 0],
    translateY: [0, -12],
    duration: 220,
    ease: "inQuad",
    onComplete,
  });
};

export { stagger };
