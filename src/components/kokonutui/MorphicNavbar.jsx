import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { navbarScrollEffect } from "../../animations/gsap";
import { openMobileMenu, closeMobileMenu } from "../../animations/microInteractions";

const LINKS = [
  { label: "Accueil", to: "/" },
  { label: "Inventaire", to: "/listing" },
  { label: "Contact", to: "/contact" },
];

export default function MorphicNavbar() {
  const pillRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Highlight the link matching the current route.
  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

  // Glass pill condenses on scroll (GSAP animates the padding).
  useEffect(() => {
    const cleanNav = navbarScrollEffect({
      target: pillRef.current,
      shrinkTo: 6,
      growTo: 10,
    });
    return () => cleanNav();
  }, []);

  // Mobile menu open/close (anime.js staggered entrance).
  useEffect(() => {
    const panel = menuRef.current;
    if (!panel) return;

    if (menuOpen) {
      panel.classList.remove("hidden");
      panel.classList.add("flex");
      openMobileMenu({ panel, links: panel.querySelectorAll(".mobile-link") });
    } else {
      closeMobileMenu({
        panel,
        onComplete: () => {
          panel.classList.add("hidden");
          panel.classList.remove("flex");
        },
      });
    }
  }, [menuOpen]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-3 sm:px-6">
      {/* Glass pill — full width on small screens, shrink-to-fit on desktop */}
      <nav
        ref={pillRef}
        className={cn(
          "mt-3 flex w-full max-w-full items-center justify-between gap-2 rounded-2xl border border-white/10 bg-zinc-900/70 py-2 pl-4 pr-2 backdrop-blur-lg transition-colors duration-300 sm:mt-4 sm:w-auto sm:gap-3 sm:pl-5 sm:pr-3",
          "nav-scrolled:border-white/15 nav-scrolled:bg-zinc-900/90"
        )}
      >
        <Link to="/" className="logo whitespace-nowrap text-lg font-extrabold tracking-wider text-white sm:text-xl">
          frereauto<span className="text-accent">10</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "block rounded-xl px-3 py-1.5 text-sm transition-all duration-300",
                  isActive(item.to)
                    ? "bg-white font-semibold text-black"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            aria-label="Basculer le menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="btn-glow flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div
        ref={menuRef}
        className="absolute left-1/2 top-full mt-2 hidden w-[min(90vw,26rem)] -translate-x-1/2 flex-col gap-1 rounded-2xl border border-white/10 bg-zinc-900/95 p-3 opacity-0 backdrop-blur-lg md:hidden"
      >
        {LINKS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setMenuOpen(false)}
            className={cn(
              "mobile-link rounded-xl px-4 py-3 text-base font-medium",
              isActive(item.to)
                ? "bg-white font-semibold text-black"
                : "text-white/80 hover:bg-white/5"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  )
}
