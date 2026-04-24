"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

const BG_IMG = "/image/shot-ostrich-fern-s-blossomed-plants.jpg";

const NAV_LINKS = [
  { label: "Início", href: "/", anchor: "#inicio" },
  { label: "Sobre", href: "/sobre", anchor: "#sobre" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Projetos", href: "/projetos" },
  { label: "Contato", href: "/contato", anchor: "#contato" },
];

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
  const [bgPos, setBgPos] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    if (prefersReducedMotion) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setBgPos(y * 0.4);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [prefersReducedMotion]);

  // Fecha menu ao mudar de rota
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Scroll suave para âncora na mesma página
  const handleNavClick = useCallback(
    (e, link) => {
      if (pathname === "/" && link.anchor) {
        e.preventDefault();
        setMenuOpen(false);
        const el = document.querySelector(link.anchor);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        setMenuOpen(false);
      }
    },
    [pathname],
  );

  return (
    <div className="font-sans text-zinc-900 dark:text-zinc-100">
      <div
        className="fixed inset-0 z-0 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-sm pointer-events-none"
        aria-hidden="true"
      />

      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-30 transition-all duration-500 ${
          scrolled
            ? "bg-zinc-900/75 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
            : "bg-zinc-700/20 backdrop-blur-sm border-b border-zinc-200/30 dark:border-zinc-800/30"
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
              className="h-10 w-auto object-contain drop-shadow transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-1 text-base font-medium items-center">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 group ${
                    isActive
                      ? "text-green-400 font-semibold"
                      : "text-zinc-100 hover:text-green-300"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Hover / active background pill */}
                  <span
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-green-700/25"
                        : "bg-transparent group-hover:bg-white/10"
                    }`}
                  />
                  {/* Active underline dot */}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`block w-6 h-0.5 bg-zinc-100 rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-zinc-100 rounded transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-zinc-100 rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } bg-zinc-900/90 backdrop-blur-md border-t border-white/10`}
        >
          <nav className="flex flex-col px-6 py-4 gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`px-4 py-3 rounded-xl transition-all duration-200 font-medium text-base ${
                    isActive
                      ? "bg-green-700/30 text-green-300"
                      : "text-zinc-200 hover:bg-white/10 hover:text-green-300"
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
        className="fixed inset-0 -z-10 w-full h-full"
        style={{
          backgroundImage: `url(${BG_IMG})`,
          backgroundAttachment: prefersReducedMotion
            ? "scroll"
            : isMobile
              ? "scroll"
              : "fixed",
          backgroundPosition: isMobile ? "center top" : `center ${-bgPos}px`,
          backgroundRepeat: isMobile ? "repeat-y" : "no-repeat",
          backgroundSize: "cover",
          transition: prefersReducedMotion
            ? undefined
            : "background-position 0s",
        }}
      />

      <div className="relative z-10">{children}</div>

      <footer className="relative z-10 py-8 px-4 bg-zinc-900 text-zinc-100 text-center text-sm mt-0">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold">Bio-A</span> &copy;{" "}
            {new Date().getFullYear()}
            <br />
            Design biofílico e curadoria premium
          </div>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-green-400 transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-green-400 transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-green-400 transition-colors">
              WhatsApp
            </a>
          </div>
        </div>
        <div className="mt-4 text-zinc-400 text-xs">
          Otimizado para visualização em todos os dispositivos.
        </div>
      </footer>
    </div>
  );
}
