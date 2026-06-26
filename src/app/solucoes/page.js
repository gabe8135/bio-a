import Link from "next/link";

export const metadata = {
  title: "Soluções | Bio-A",
  description:
    "Soluções da Bio-A: curadoria premium, projetos biofílicos e manutenção para ambientes residenciais e corporativos.",
};

const SOLUCOES = [
  {
    title: "Curadoria Premium",
    desc: "Seleção de espécies e vasos com foco em estética, praticidade e intenção do ambiente.",
    bullets: [
      "Recomendação por luminosidade e rotina",
      "Composição com presença (proporção e textura)",
      "Vasos e acabamentos compatíveis com o espaço",
    ],
  },
  {
    title: "Projeto Biofílico",
    desc: "Planejamento completo para integrar o verde à arquitetura e à experiência do usuário.",
    bullets: [
      "Mapeamento do espaço e pontos de destaque",
      "Proposta estética e especificação",
      "Implantação e posicionamento no local",
    ],
  },
  {
    title: "Ambientes Corporativos",
    desc: "Verde estratégico para recepção, salas de reunião e áreas de convivência com linguagem premium.",
    bullets: [
      "Composições sóbrias e elegantes",
      "Espécies resistentes e de baixa manutenção",
      "Entrega com acabamento impecável",
    ],
  },
  {
    title: "Residencial Alto Padrão",
    desc: "Curadoria para salas, varandas e áreas gourmet, valorizando o imóvel com naturalidade.",
    bullets: [
      "Composição por estilo (moderno, clássico, orgânico)",
      "Equilíbrio entre volume e leveza",
      "Orientação de cuidados para longevidade",
    ],
  },
  {
    title: "Manutenção Assistida",
    desc: "Acompanhamento para preservar saúde e estética das plantas com ajustes e recomendações.",
    bullets: [
      "Checklist de rega e luminosidade",
      "Correções de posicionamento",
      "Dicas práticas para sua rotina",
    ],
  },
  {
    title: "Assinatura de Verde",
    desc: "Renovação periódica e ajustes de composição para manter o ambiente sempre impecável.",
    bullets: [
      "Atualizações sazonais",
      "Substituições planejadas",
      "Padronização visual constante",
    ],
  },
];

export default function SolucoesPage() {
  return (
    <main className="pt-24 md:pt-28">
      <section className="relative py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
            Soluções Bio-A
          </h1>
          <p className="text-zinc-700 dark:text-zinc-200 max-w-3xl mx-auto text-base md:text-lg">
            Um portfólio de serviços pensado para quem busca sofisticação,
            consistência estética e praticidade. Você escolhe o nível de
            profundidade — nós garantimos a execução.
          </p>
        </div>
      </section>

      <section className="relative py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {SOLUCOES.map((s) => (
            <div
              key={s.title}
              className="rounded-[var(--radius-card)] bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-2xl p-7"
            >
              <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-2">
                {s.title}
              </h2>
              <p className="text-zinc-700 dark:text-zinc-200 mb-4">{s.desc}</p>
              <ul className="space-y-2 text-zinc-700 dark:text-zinc-200">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-green-700 font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="relative py-14 px-4">
        <div className="max-w-4xl mx-auto rounded-[var(--radius-shell)] bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-2xl p-7 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-3">
            Quer uma recomendação personalizada?
          </h2>
          <p className="text-zinc-700 dark:text-zinc-200 mb-7">
            Conte o objetivo do ambiente e nós sugerimos a melhor solução (com
            espécies, volumes e linguagem estética).
          </p>
          <Link
            href="/contato"
            className="inline-block px-8 py-4 rounded-full bg-green-700 text-white font-semibold shadow-lg hover:bg-green-800 transition-colors"
          >
            Solicitar proposta
          </Link>
        </div>
      </section>
    </main>
  );
}
