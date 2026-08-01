/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

// KokonutUI "Slide Text Button" — text slides up to reveal an alternate label on hover.
// Renders a router <Link> when `to` is provided, otherwise a plain anchor.
export default function SlideTextButton({
  text = "Explorer",
  hoverText,
  href = "#",
  to,
  className,
  variant = "default",
  onClick,
}) {
  const slideText = hoverText ?? text;
  const variantStyles =
    variant === "ghost"
      ? "border border-white/10 text-white hover:bg-white/5"
      : "bg-white text-black hover:bg-white/90";

  const Comp = to ? Link : "a";

  return (
    <Comp
      to={to}
      href={to ? undefined : href}
      onClick={onClick}
      className={cn(
        "group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg px-8 text-sm font-medium tracking-tight transition-all duration-300",
        variantStyles,
        className
      )}
    >
      <span className="relative inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
        <span className="flex items-center gap-2 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
          {text}
        </span>
        <span className="absolute left-0 top-full flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {slideText}
        </span>
      </span>
    </Comp>
  );
}
