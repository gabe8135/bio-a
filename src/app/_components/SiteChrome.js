"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

const BG_IMG = "/image/shot-ostrich-fern-s-blossomed-plants.jpg";

const NAV_LINKS = [
  { label: "Início", href: "/", anchor: "#inicio" },
  { label: "Sobre", href: "/sobre", anchor: "#sobre" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Projetos", href: "/projetos" },
  { label: "Contato", href: "/contato", anchor: "#contato" },
];

const HOME_ANCHORS = ["#inicio", "#sobre", "#curadoria", "#contato"];

function smoothScrollTo(targetY, duration = 860) {
  if (typeof window === "undefined") return;
  const startY = window.scrollY;
  const diff = targetY - startY;
  if (Math.abs(diff) < 1) return;
  let startTime = null;
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const frame = (now) => {
    if (!startTime) startTime = now;
    const pct = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + diff * ease(pct));
    if (pct < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setTimeout(() => setReduced(mq.matches), 0);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export default function SiteChrome({ children }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState("#inicio");
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha menu ao mudar de rota
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Marca o item ativo da home com base na seção visível.
  useEffect(() => {
    if (typeof window === "undefined" || pathname !== "/") return;

    const updateActiveAnchor = () => {
      const y = window.scrollY + 140;
      let nextActive = "#inicio";

      HOME_ANCHORS.forEach((anchor) => {
        const el = document.querySelector(anchor);
        if (el && y >= el.offsetTop) {
          nextActive = anchor;
        }
      });

      setActiveAnchor(nextActive);
    };

    window.addEventListener("scroll", updateActiveAnchor, { passive: true });
    updateActiveAnchor();

    return () => {
      window.removeEventListener("scroll", updateActiveAnchor);
    };
  }, [pathname]);

  // Scroll suave para âncora na mesma página
  const handleNavClick = useCallback(
    (e, link) => {
      if (pathname === "/" && link.anchor) {
        e.preventDefault();
        setMenuOpen(false);
        setActiveAnchor(link.anchor);
        const el = document.querySelector(link.anchor);
        if (el) {
          const headerH = document.querySelector("header")?.offsetHeight ?? 72;
          smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - headerH);
        }
      } else {
        setMenuOpen(false);
      }
    },
    [pathname],
  );

  const isLinkActive = useCallback(
    (link) => {
      if (pathname === "/" && link.anchor) {
        return activeAnchor === link.anchor;
      }
      if (link.href === "/") return pathname === "/" && !link.anchor;
      return pathname.startsWith(link.href);
    },
    [activeAnchor, pathname],
  );

  // Mede posição do item ativo e desloca o pill indicador.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const activeLink = NAV_LINKS.find((l) => isLinkActive(l));
      if (!activeLink) return;
      const el = linkRefs.current[activeLink.href];
      const nav = navRef.current;
      if (!el || !nav) return;
      const navRect = nav.getBoundingClientRect();
      const linkRect = el.getBoundingClientRect();
      setPill({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        ready: true,
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, activeAnchor, isLinkActive]);

  return (
    <div className="font-sans text-zinc-900 dark:text-zinc-100">
      <div className="noise-overlay" aria-hidden="true" />
      <div
        className="fixed inset-0 z-0 bg-emerald-50/35 dark:bg-emerald-950/20 backdrop-blur-[1px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed top-[-20vh] left-[-10vw] z-0 h-[45vh] w-[40vw] rounded-full bg-emerald-300/35 dark:bg-emerald-500/20 blur-3xl pointer-events-none parallax-drift"
        aria-hidden="true"
      />
      <div
        className="fixed top-[5vh] right-[-12vw] z-0 h-[40vh] w-[35vw] rounded-full bg-cyan-300/25 dark:bg-cyan-500/15 blur-3xl pointer-events-none parallax-float"
        aria-hidden="true"
      />

      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-30 transition-all duration-500 ${
          scrolled
            ? "bg-zinc-950/70 backdrop-blur-xl border-b border-emerald-200/20 shadow-[0_18px_45px_-28px_rgba(0,0,0,.85)]"
            : "bg-white/30 dark:bg-zinc-900/20 backdrop-blur-lg border-b border-white/35 dark:border-white/10"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={(e) => handleNavClick(e, { anchor: "#inicio", href: "/" })}
          >
            <Image
              src="/image/BIO-A.png"
              alt="Logo BioAmbiente"
              width={160}
              height={40}
              priority
              className="h-10 w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,.4)] transition-transform duration-500 group-hover:scale-105"
              style={{ width: "auto", height: "auto" }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            ref={navRef}
            className="relative hidden md:flex gap-0.5 text-base font-medium items-center rounded-full border border-white/25 dark:border-white/10 bg-white/25 dark:bg-zinc-900/25 p-1.5 shadow-[0_10px_30px_-20px_rgba(0,0,0,.65)]"
          >
            {/* Sliding pill indicator */}
            {pill.ready && (
              <span
                aria-hidden="true"
                className="absolute top-1.5 bottom-1.5 rounded-full bg-linear-to-r from-emerald-600/90 to-teal-600/85 pointer-events-none z-0 shadow-[0_4px_18px_-6px_rgba(16,130,90,.65)]"
                style={{
                  left: pill.left,
                  width: pill.width,
                  transition:
                    "left 360ms cubic-bezier(.4,0,.2,1), width 360ms cubic-bezier(.4,0,.2,1)",
                }}
              />
            )}
            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => {
                    if (el) linkRefs.current[link.href] = el;
                  }}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative z-10 px-4 py-2 rounded-full font-medium transition-all duration-250 group ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-200 hover:-translate-y-px"
                  }`}
                >
                  {link.label}
                  {/* Hover tint when not active */}
                  {!isActive && (
                    <span className="absolute inset-0 rounded-full bg-transparent group-hover:bg-white/25 dark:group-hover:bg-white/10 transition-colors duration-200" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-[var(--radius-control)] hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`block w-6 h-0.5 bg-zinc-800 dark:bg-zinc-100 rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-zinc-800 dark:bg-zinc-100 rounded transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-zinc-800 dark:bg-zinc-100 rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } bg-zinc-950/80 backdrop-blur-2xl border-t border-white/10`}
        >
          <nav className="flex flex-col px-6 py-4 gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`px-4 py-3 rounded-[var(--radius-control)] transition-all duration-200 font-medium text-base ${
                    isActive
                      ? "bg-emerald-700/35 text-emerald-200"
                      : "text-zinc-200 hover:bg-white/10 hover:text-emerald-200"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <div
        aria-hidden="true"
        className="site-backdrop"
        style={{
          "--backdrop-image": `url(${BG_IMG})`,
          backgroundAttachment: prefersReducedMotion ? "scroll" : isMobile ? "scroll" : "fixed",
          backgroundPosition: isMobile ? "center top" : "center center",
          backgroundRepeat: isMobile ? "repeat-y" : "no-repeat",
        }}
      />

      <div className="relative z-10">{children}</div>

      <footer className="relative z-10 py-10 px-4 bg-linear-to-b from-zinc-950/35 to-zinc-950/70 text-zinc-100 text-center text-sm mt-0 border-t border-white/10 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold tracking-wide">Bio-A</span> &copy; {new Date().getFullYear()}
            <br />
            Design biofilico e curadoria premium
          </div>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-emerald-300 transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-emerald-300 transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-emerald-300 transition-colors">
              WhatsApp
            </a>
          </div>
        </div>
        <div className="mt-4 text-zinc-400 text-xs">
          Experiencia imersiva otimizada para desktop e mobile.
        </div>
      </footer>
    </div>
  );
}
