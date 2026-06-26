import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Sobre | Bio-A",
  description:
    "Conheça a Bio-A: propósito, missão, valores e como criamos experiências de design biofílico com curadoria premium.",
};

export default function SobrePage() {
  return (
    <main className="pt-24 md:pt-28">
      <section className="relative py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="rounded-[var(--radius-shell)] bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-2xl p-7 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
              Sobre a Bio-A
            </h1>
            <p className="text-zinc-700 dark:text-zinc-200 text-base md:text-lg leading-relaxed">
              Somos uma marca de curadoria botânica e design biofílico voltada a
              ambientes que precisam comunicar sofisticação, credibilidade e
              bem-estar. Unimos estética, funcionalidade e um olhar técnico para
              selecionar espécies e composições que “fazem sentido” para cada
              espaço — com entrega premium e suporte pós-venda.
            </p>
            <div className="mt-6 flex gap-3 flex-wrap">
              <Link
                href="/solucoes"
                className="px-6 py-3 rounded-full bg-green-700 text-white font-semibold shadow-lg hover:bg-green-800 transition-colors"
              >
                Ver Soluções
              </Link>
              <Link
                href="/contato"
                className="px-6 py-3 rounded-full bg-white/70 dark:bg-zinc-900/50 backdrop-blur border border-green-200 dark:border-zinc-700 text-green-800 dark:text-zinc-100 font-semibold hover:bg-white/80 dark:hover:bg-zinc-900/60 transition-colors"
              >
                Falar com a Bio-A
              </Link>
            </div>
          </div>

          <div className="relative rounded-[var(--radius-shell)] overflow-hidden shadow-2xl min-h-[360px]">
            <Image
              src="/plants/about.jpg"
              alt="Ambiente com plantas e composição biofílica"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/55 via-zinc-900/15 to-transparent" />
          </div>
        </div>
      </section>

      <section className="relative py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-[var(--radius-card)] bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-xl p-7">
            <h2 className="text-xl font-bold text-green-700 mb-2">Missão</h2>
            <p className="text-zinc-700 dark:text-zinc-200">
              Transformar ambientes em experiências vivas, promovendo bem-estar,
              produtividade e sofisticação.
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-xl p-7">
            <h2 className="text-xl font-bold text-green-700 mb-2">Visão</h2>
            <p className="text-zinc-700 dark:text-zinc-200">
              Ser referência em curadoria premium e projetos biofílicos para
              residências e ambientes corporativos de alto padrão.
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-xl p-7">
            <h2 className="text-xl font-bold text-green-700 mb-2">Valores</h2>
            <p className="text-zinc-700 dark:text-zinc-200">
              Sustentabilidade, excelência, personalização e respeito à natureza
              em cada detalhe.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-14 px-4">
        <div className="max-w-5xl mx-auto rounded-[var(--radius-shell)] bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-2xl p-7 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
            O que entregamos na prática
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-800 mb-2">
                Curadoria com critério
              </h3>
              <p className="text-zinc-700 dark:text-zinc-200">
                Selecionamos espécies, vasos e composições considerando luz,
                ventilação, rotina do ambiente e intenção estética.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-green-800 mb-2">
                Resultado com presença
              </h3>
              <p className="text-zinc-700 dark:text-zinc-200">
                O verde vira parte do design — não um item decorativo solto. O
                objetivo é elevar a percepção do espaço.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-green-800 mb-2">
                Entrega premium
              </h3>
              <p className="text-zinc-700 dark:text-zinc-200">
                Montagem e posicionamento no local, com acabamento limpo e
                orientação de cuidados.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-green-800 mb-2">Pós-venda</h3>
              <p className="text-zinc-700 dark:text-zinc-200">
                Suporte para manutenção e ajustes — para o seu investimento
                permanecer impecável.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/contato"
              className="px-8 py-4 rounded-full bg-green-700 text-white font-semibold shadow-lg hover:bg-green-800 transition-colors"
            >
              Solicitar um diagnóstico
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
