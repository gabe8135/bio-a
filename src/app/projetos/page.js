import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Projetos | Bio-A",
  description:
    "Veja projetos e composições da Bio-A: soluções biofílicas para ambientes residenciais e corporativos.",
};

const PROJETOS = [
  {
    title: "Recepção corporativa — presença e sobriedade",
    desc: "Composição com folhagens de grande porte e vaso mineral, alinhada à arquitetura moderna.",
    img: "/plants/2.jpg",
    tag: "Corporativo",
  },
  {
    title: "Sala de reunião — foco e conforto",
    desc: "Verde pontual para reduzir o ruído visual, mantendo uma linguagem premium.",
    img: "/plants/1.jpg",
    tag: "Corporativo",
  },
  {
    title: "Varanda gourmet — elegância natural",
    desc: "Volume equilibrado e espécies resistentes ao clima, com acabamento clean.",
    img: "/plants/5.jpg",
    tag: "Residencial",
  },
  {
    title: "Living — escultura viva",
    desc: "Ponto focal com planta de porte e textura marcante para valorizar o ambiente.",
    img: "/plants/3.jpg",
    tag: "Residencial",
  },
  {
    title: "Hall de entrada — boas-vindas sofisticada",
    desc: "Arranjo com folhagens nobres e vaso artesanal para impacto imediato.",
    img: "/plants/4.jpg",
    tag: "Residencial",
  },
  {
    title: "Área de convivência — leveza e identidade",
    desc: "Composições moduladas para manter consistência estética em todo o espaço.",
    img: "/plants/about.jpg",
    tag: "Corporativo",
  },
];

export default function ProjetosPage() {
  return (
    <main className="pt-24 md:pt-28">
      <section className="relative py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
            Projetos e composições
          </h1>
          <p className="text-zinc-700 dark:text-zinc-200 max-w-3xl mx-auto text-base md:text-lg">
            Referências de linguagem estética e presença. Cada projeto é pensado
            para o contexto: luz, rotina, arquitetura e objetivo do ambiente.
          </p>
        </div>
      </section>

      <section className="relative py-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJETOS.map((p) => (
            <article
              key={p.title}
              className="group relative rounded-[var(--radius-card)] overflow-hidden shadow-2xl min-h-[360px]"
            >
              <div className="absolute inset-0">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover scale-110 group-hover:scale-105 transition-transform duration-700"
                  style={{ filter: "brightness(0.86)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/30 to-transparent" />
              </div>
              <div className="relative z-10 p-6 flex flex-col h-full justify-end">
                <span className="inline-flex self-start mb-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur border border-white/30 text-white">
                  {p.tag}
                </span>
                <h2 className="text-xl font-bold text-white drop-shadow mb-2">
                  {p.title}
                </h2>
                <p className="text-zinc-100/90">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative py-14 px-4">
        <div className="max-w-4xl mx-auto rounded-[var(--radius-shell)] bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-2xl p-7 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-3">
            Quer um projeto com a sua identidade?
          </h2>
          <p className="text-zinc-700 dark:text-zinc-200 mb-7">
            Nos diga o tipo de ambiente, a rotina e o estilo desejado. A Bio-A
            monta uma proposta com curadoria e implantação.
          </p>
          <Link
            href="/contato"
            className="inline-block px-8 py-4 rounded-full bg-green-700 text-white font-semibold shadow-lg hover:bg-green-800 transition-colors"
          >
            Solicitar orçamento
          </Link>
        </div>
      </section>
    </main>
  );
}
