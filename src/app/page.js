"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const PRODUCTS = [
  {
    name: "Orquidea Signature",
    desc: "Composicao de entrada para recepcoes executivas com forte presenca visual.",
    img: "/plants/1.jpg",
    price: "R$ 249,00",
  },
  {
    name: "Ficus Escultura",
    desc: "Volume vertical para criar eixo de elegancia em salas amplas e halls.",
    img: "/plants/2.jpg",
    price: "R$ 399,00",
  },
  {
    name: "Vaso Mineral Quartz",
    desc: "Acabamento texturizado com linguagem contemporanea para interiores premium.",
    img: "/plants/3.jpg",
    price: "R$ 189,00",
  },
  {
    name: "Zamioculca Vital",
    desc: "Baixa manutencao com impacto visual alto para operacoes de ritmo intenso.",
    img: "/plants/4.jpg",
    price: "R$ 129,00",
  },
  {
    name: "Arranjo Lobby Prime",
    desc: "Folhagens nobres para areas de espera que pedem acolhimento e autoridade.",
    img: "/plants/5.jpg",
    price: "R$ 159,00",
  },
  {
    name: "Kit Conselho",
    desc: "Curadoria para salas de reuniao com composicao equilibrada de texturas.",
    img: "/plants/about-desktop.jpg",
    price: "R$ 289,00",
  },
];

const BENEFITS = [
  {
    title: "Leitura de marca",
    text: "Elementos biofilicos elevam a percepcao de valor e reforcam uma narrativa de inovacao.",
  },
  {
    title: "Performance humana",
    text: "Ambientes verdes melhoram foco, conforto termico subjetivo e sensacao de equilibrio.",
  },
  {
    title: "Memoria espacial",
    text: "A composicao vegetal cria pontos de referencia marcantes e experiencia memoravel.",
  },
];

const PROCESS = [
  "Imersao no espaco e leitura arquitetonica",
  "Direcao criativa com moodboard biofilico",
  "Curadoria, montagem cenografica e calibracao final",
  "Acompanhamento e evolucao sazonal do projeto",
];

const STATS = [
  { number: "+180", label: "ambientes transformados" },
  { number: "97%", label: "clientes recorrentes" },
  { number: "24h", label: "primeira proposta" },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [revealed, setRevealed] = useState(Array(PRODUCTS.length).fill(false));
  const [leafState, setLeafState] = useState("static");

  const heroRef = useRef(null);
  const contactRef = useRef(null);
  const beneficiosRef = useRef(null);
  const showcaseRefs = useRef([]);
  const leafTimeoutRef = useRef(null);
  const leafLastShouldBeVisibleRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (leafTimeoutRef.current) {
      clearTimeout(leafTimeoutRef.current);
      leafTimeoutRef.current = null;
    }

    const handleLeafBySection = () => {
      const beneficios = beneficiosRef.current;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const beneficiosTop = beneficios
        ? beneficios.getBoundingClientRect().top + y
        : Number.POSITIVE_INFINITY;
      const pivot = y + vh * 0.45;
      const shouldBeVisible = pivot < beneficiosTop;

      if (prefersReducedMotion) {
        setLeafState(shouldBeVisible ? "static" : "hidden");
        leafLastShouldBeVisibleRef.current = shouldBeVisible;
        return;
      }

      if (leafLastShouldBeVisibleRef.current === null) {
        setLeafState(shouldBeVisible ? "static" : "hidden");
        leafLastShouldBeVisibleRef.current = shouldBeVisible;
        return;
      }

      if (leafLastShouldBeVisibleRef.current === shouldBeVisible) return;

      if (leafTimeoutRef.current) {
        clearTimeout(leafTimeoutRef.current);
        leafTimeoutRef.current = null;
      }

      if (shouldBeVisible) {
        setLeafState("enter");
        leafTimeoutRef.current = setTimeout(() => {
          setLeafState("static");
          leafTimeoutRef.current = null;
        }, 1300);
      } else {
        setLeafState("exit");
        leafTimeoutRef.current = setTimeout(() => {
          setLeafState("hidden");
          leafTimeoutRef.current = null;
        }, 1300);
      }

      leafLastShouldBeVisibleRef.current = shouldBeVisible;
    };

    window.addEventListener("scroll", handleLeafBySection, { passive: true });
    handleLeafBySection();
    return () => {
      window.removeEventListener("scroll", handleLeafBySection);
      if (leafTimeoutRef.current) {
        clearTimeout(leafTimeoutRef.current);
        leafTimeoutRef.current = null;
      }
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );
    const el = heroRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    const el = contactRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion) {
      setRevealed(Array(PRODUCTS.length).fill(true));
      return;
    }
    const observers = [];
    const elements = showcaseRefs.current.slice();
    elements.forEach((el, i) => {
      if (!el) return;
      const obs = new window.IntersectionObserver(
        ([entry]) => {
          setRevealed((current) => {
            const next = [...current];
            next[i] = entry.isIntersecting;
            return next;
          });
        },
        { threshold: 0.28 },
      );
      obs.observe(el);
      observers.push({ obs, el });
    });

    return () => {
      observers.forEach(({ obs, el }) => {
        obs.unobserve(el);
        obs.disconnect();
      });
    };
  }, [prefersReducedMotion]);

  const heroParallax = useMemo(() => {
    const value = Math.min(scrollY * 0.32, 120);
    return prefersReducedMotion ? 0 : value;
  }, [scrollY, prefersReducedMotion]);

  const leafLeftTransform =
    leafState === "exit" || leafState === "hidden"
      ? "translate(-220vw, -50%) rotate(-34deg)"
      : `translate(calc(-102% - 2rem), calc(-50% + ${heroParallax * 0.12}px)) rotate(-10deg)`;

  const leafRightTransform =
    leafState === "exit" || leafState === "hidden"
      ? "translate(220vw, -50%) rotate(34deg) scaleX(-1)"
      : `translate(calc(102% + 2rem), calc(-50% + ${heroParallax * 0.12}px)) rotate(10deg) scaleX(-1)`;

  return (
    <>
      <Image
        src="/image/folhas-01.png"
        alt=""
        aria-hidden="true"
        width={1400}
        height={1400}
        className={`pointer-events-none select-none fixed left-1/2 z-3 ${isMobile ? "w-[185vw] max-w-none" : "w-[110vw] sm:w-[90vw] md:w-180 lg:w-245"}`}
        style={{
          top: "44vh",
          transform: leafLeftTransform,
          opacity: leafState === "hidden" || leafState === "exit" ? 0 : 0.9,
          filter: "blur(2.7px) drop-shadow(0 26px 36px rgba(0,0,0,0.35))",
          transition: "all 1.3s cubic-bezier(.22,1,.36,1)",
        }}
      />
      <Image
        src="/image/folhas-02.png"
        alt=""
        aria-hidden="true"
        width={1400}
        height={1400}
        className={`pointer-events-none select-none fixed right-1/2 z-3 ${isMobile ? "w-[185vw] max-w-none" : "w-[110vw] sm:w-[90vw] md:w-180 lg:w-245"}`}
        style={{
          top: "44vh",
          transform: leafRightTransform,
          opacity: leafState === "hidden" || leafState === "exit" ? 0 : 0.9,
          filter: "blur(2.7px) drop-shadow(0 26px 36px rgba(0,0,0,0.35))",
          transition: "all 1.3s cubic-bezier(.22,1,.36,1)",
        }}
      />

      <main className="relative z-10 pt-16 md:pt-20 overflow-hidden">
        <section
          id="inicio"
          ref={heroRef}
          className="relative min-h-[calc(100vh-4.5rem)] md:min-h-[calc(100vh-5rem)] flex items-start md:items-center justify-center px-4 sm:px-6 lg:px-8 pt-10 md:pt-12 pb-16 md:pb-20"
        >
          <div
            className="aurora-layer h-[32vh] w-[42vw] left-[8vw] top-[24vh] bg-emerald-300/55"
            style={{ transform: `translateY(${heroParallax * 0.4}px)` }}
            aria-hidden="true"
          />
          <div
            className="aurora-layer h-[30vh] w-[35vw] right-[4vw] top-[18vh] bg-cyan-300/45"
            style={{ transform: `translateY(${heroParallax * 0.55}px)` }}
            aria-hidden="true"
          />

          <div className="relative max-w-6xl w-full mx-auto">
            <div className="glass-card rounded-[var(--radius-shell)] p-6 pt-9 sm:p-8 sm:pt-9 md:p-11 lg:p-14 section-frame overflow-hidden">
              <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 md:gap-12 lg:gap-14 items-start lg:items-center">
                <div className="space-y-6 sm:space-y-7 pt-1 md:pt-0">
                  <p
                    className={`inline-flex max-w-full uppercase tracking-[0.11em] sm:tracking-[0.18em] md:tracking-[0.22em] text-[10px] sm:text-xs md:text-sm font-semibold text-emerald-900/80 dark:text-emerald-200/90 transition-all duration-700 leading-tight ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  >
                    Estudio Bio-A
                  </p>
                  <h1
                    className={`headline-gradient text-4xl sm:text-5xl lg:text-7xl leading-[1.02] sm:leading-[0.97] md:leading-[0.92] transition-all duration-1200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  >
                    Parallax botanico com assinatura de luxo.
                  </h1>
                  <p
                    className={`text-zinc-700 dark:text-zinc-200 text-base md:text-lg max-w-xl leading-relaxed transition-all duration-1200 delay-150 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  >
                    Transformamos arquitetura em experiencia sensorial com camadas de movimento, luz
                    e natureza. Um site que nao apenas mostra um portfolio, mas prova dominio
                    tecnico e estatico de animacao parallax.
                  </p>
                  <div
                    className={`flex flex-wrap gap-3.5 md:gap-4 pt-1 transition-all duration-1200 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  >
                    <a
                      href="#curadoria"
                      className="w-full sm:w-auto text-center px-7 py-3 rounded-full bg-linear-to-r from-emerald-700 to-teal-600 text-white font-semibold shadow-[0_18px_38px_-18px_rgba(12,111,76,.8)] hover:scale-[1.02] transition"
                    >
                      Ver Experiencias
                    </a>
                    <a
                      href="#contato"
                      className="w-full sm:w-auto text-center px-7 py-3 rounded-full border border-emerald-900/25 dark:border-emerald-100/30 text-emerald-900 dark:text-emerald-100 font-semibold hover:bg-white/40 dark:hover:bg-white/10 transition"
                    >
                      Agendar Consultoria
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4 md:gap-4.5">
                  {STATS.map((item, i) => (
                    <div
                      key={item.label}
                      className={`glass-card rounded-[var(--radius-card)] p-4 md:p-5 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                      style={{ transitionDelay: `${250 + i * 120}ms` }}
                    >
                      <p className="text-3xl md:text-4xl font-bold text-emerald-800 dark:text-emerald-200 leading-none">
                        {item.number}
                      </p>
                      <p className="text-zinc-700 dark:text-zinc-200 text-sm mt-2">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="relative py-24 md:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-32">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[var(--radius-shell)] bg-linear-to-br from-emerald-400/40 to-cyan-300/25 blur-2xl" />
              <div className="relative overflow-hidden rounded-[var(--radius-shell)] border border-white/35 dark:border-white/10 shadow-2xl">
                <Image
                  src="/plants/about.jpg"
                  alt="Ambiente biofilico premium"
                  width={680}
                  height={680}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="glass-card rounded-[var(--radius-shell)] p-8 md:p-10 lg:p-11 section-frame">
              <h2 className="text-3xl md:text-5xl text-emerald-900 dark:text-emerald-100 mb-4">
                Excelencia em cada detalhe botanico.
              </h2>
              <p className="text-zinc-700 dark:text-zinc-200 leading-relaxed mb-7">
                A Bio-A combina design biofilico, curadoria de especies e linguagem arquitetonica
                para criar ambientes inesqueciveis. O resultado e um espaco com presenca, serenidade
                e performance.
              </p>
              <div className="grid md:grid-cols-2 gap-4.5 pt-2">
                <div className="rounded-[var(--radius-card)] bg-white/45 dark:bg-zinc-900/40 border border-white/45 dark:border-white/10 p-4.5 md:p-5">
                  <h3 className="text-emerald-800 dark:text-emerald-200 font-semibold mb-1">
                    Missao
                  </h3>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    Elevar ambientes com natureza estrategica e elegancia.
                  </p>
                </div>
                <div className="rounded-[var(--radius-card)] bg-white/45 dark:bg-zinc-900/40 border border-white/45 dark:border-white/10 p-4.5 md:p-5">
                  <h3 className="text-emerald-800 dark:text-emerald-200 font-semibold mb-1">
                    Diferencial
                  </h3>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    Curadoria autoral e implantacao premium com acompanhamento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={beneficiosRef} className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl text-center text-emerald-900 dark:text-emerald-100 mb-10">
              Por que investir em ambientes verdes?
            </h2>
            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {BENEFITS.map((item) => (
                <article
                  key={item.title}
                  className="glass-card rounded-[var(--radius-card)] p-6 md:p-7 hover:-translate-y-1 transition-transform"
                >
                  <h3 className="text-xl text-emerald-800 dark:text-emerald-200 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-zinc-700 dark:text-zinc-200">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto glass-card rounded-[var(--radius-shell)] p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl text-center text-emerald-900 dark:text-emerald-100 mb-8">
              Nossa metodologia cenografica
            </h2>
            <div className="grid md:grid-cols-4 gap-4 md:gap-5">
              {PROCESS.map((step, i) => (
                <div
                  key={step}
                  className="rounded-[var(--radius-card)] border border-white/35 dark:border-white/10 bg-white/35 dark:bg-zinc-900/30 p-5"
                >
                  <p className="text-emerald-800 dark:text-emerald-200 font-bold mb-2">0{i + 1}</p>
                  <p className="text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="curadoria" className="relative py-24 md:py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl text-center text-emerald-900 dark:text-emerald-100 mb-4">
              Showcase de composicoes
            </h2>
            <p className="text-center text-zinc-700 dark:text-zinc-200 max-w-2xl mx-auto mb-12">
              Cartoes com profundidade, brilho e resposta de movimento para destacar cada especie
              como uma peca de design.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
              {PRODUCTS.map((prod, i) => (
                <article
                  key={prod.name}
                  ref={(el) => (showcaseRefs.current[i] = el)}
                  className={`group relative overflow-hidden rounded-[var(--radius-card)] min-h-80 md:min-h-96 border border-white/35 dark:border-white/10 shadow-[0_28px_45px_-30px_rgba(0,0,0,.75)] transition-all duration-1200 ${revealed[i] ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.97]"}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <Image
                    src={prod.img}
                    alt={prod.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950/90 via-zinc-900/35 to-transparent" />
                  <div className="absolute -inset-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top_right,rgba(147,245,189,.34),transparent_58%)]" />
                  <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                    <p className="text-emerald-300 text-sm font-semibold tracking-wide mb-2">
                      BIO-A SIGNATURE
                    </p>
                    <h3 className="text-white text-2xl mb-2 wrap-break-word">{prod.name}</h3>
                    <p className="text-zinc-100/90 text-sm leading-relaxed mb-4">{prod.desc}</p>
                    <div className="inline-flex w-fit px-4 py-2 rounded-full bg-white/15 border border-white/25 text-emerald-200 font-semibold">
                      {prod.price}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="relative py-24 md:py-28 px-4 sm:px-6 lg:px-8">
          <div
            ref={contactRef}
            className={`max-w-4xl mx-auto glass-card rounded-[var(--radius-shell)] p-6 md:p-10 transition-all duration-1200 ${contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-6 md:gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl text-emerald-900 dark:text-emerald-100 mb-3">
                  Vamos criar seu proximo ambiente icone.
                </h2>
                <p className="text-zinc-700 dark:text-zinc-200">
                  Receba uma proposta com conceito visual, especies indicadas e estrutura de
                  implantacao para seu espaco.
                </p>
              </div>
              <form className="grid gap-3">
                <input
                  type="text"
                  placeholder="Nome"
                  className="rounded-[var(--radius-control)] border border-emerald-200/70 dark:border-emerald-100/20 bg-white/70 dark:bg-zinc-900/40 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="rounded-[var(--radius-control)] border border-emerald-200/70 dark:border-emerald-100/20 bg-white/70 dark:bg-zinc-900/40 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                />
                <input
                  type="tel"
                  placeholder="Telefone"
                  className="rounded-[var(--radius-control)] border border-emerald-200/70 dark:border-emerald-100/20 bg-white/70 dark:bg-zinc-900/40 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                />
                <button
                  type="submit"
                  className="mt-2 px-6 py-3 rounded-full bg-linear-to-r from-emerald-700 to-teal-600 text-white font-semibold shadow-[0_16px_34px_-16px_rgba(14,126,86,.8)] hover:scale-[1.01] transition"
                >
                  Solicitar proposta premium
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
