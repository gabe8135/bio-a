import Link from "next/link";

export const metadata = {
  title: "Contato | Bio-A",
  description:
    "Fale com a Bio-A e solicite uma proposta de curadoria premium ou projeto biofílico.",
};

export default function ContatoPage() {
  return (
    <main className="pt-24 md:pt-28">
      <section className="relative py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="rounded-[var(--radius-shell)] bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-2xl p-7 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-3">
              Contato
            </h1>
            <p className="text-zinc-700 dark:text-zinc-200 mb-6">
              Conte rapidamente o objetivo do ambiente (residencial ou
              corporativo). Em seguida, um especialista retorna com um
              direcionamento de curadoria e próximos passos.
            </p>

            <div className="space-y-4 text-zinc-700 dark:text-zinc-200">
              <div>
                <div className="font-semibold text-green-800">Atendimento</div>
                <div>Seg–Sex, 09:00–18:00</div>
              </div>
              <div>
                <div className="font-semibold text-green-800">WhatsApp</div>
                <div>(11) 99999-9999</div>
              </div>
              <div>
                <div className="font-semibold text-green-800">E-mail</div>
                <div>contato@bio-a.com.br</div>
              </div>
              <div>
                <div className="font-semibold text-green-800">Atuação</div>
                <div>São Paulo e região (consultar outras cidades)</div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/solucoes"
                className="inline-block px-6 py-3 rounded-full bg-white/70 dark:bg-zinc-900/50 backdrop-blur border border-green-200 dark:border-zinc-700 text-green-800 dark:text-zinc-100 font-semibold hover:bg-white/80 dark:hover:bg-zinc-900/60 transition-colors"
              >
                Ver soluções
              </Link>
            </div>
          </div>

          <div className="rounded-[var(--radius-shell)] bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-2xl p-7 md:p-10">
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              Solicitar atendimento
            </h2>
            <p className="text-zinc-700 dark:text-zinc-200 mb-6">
              Preencha seus dados. Se preferir, informe também o estilo desejado
              (moderno, clássico, orgânico) e a iluminação do ambiente.
            </p>

            <form className="w-full flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nome"
                className="rounded-[var(--radius-control)] border border-green-200 px-5 py-3 bg-white/80 backdrop-blur placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all shadow w-full"
                required
              />
              <input
                type="email"
                placeholder="E-mail"
                className="rounded-[var(--radius-control)] border border-green-200 px-5 py-3 bg-white/80 backdrop-blur placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all shadow w-full"
                required
              />
              <input
                type="tel"
                placeholder="Telefone"
                className="rounded-[var(--radius-control)] border border-green-200 px-5 py-3 bg-white/80 backdrop-blur placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all shadow w-full"
                required
              />
              <select
                className="rounded-[var(--radius-control)] border border-green-200 px-5 py-3 bg-white/80 backdrop-blur text-zinc-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all shadow w-full"
                required
              >
                <option value="">Área de Interesse</option>
                <option value="residencial">Residencial</option>
                <option value="corporativo">Corporativo</option>
              </select>
              <textarea
                placeholder="Mensagem (opcional)"
                rows={4}
                className="rounded-[var(--radius-control)] border border-green-200 px-5 py-3 bg-white/80 backdrop-blur placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all shadow w-full"
              />
              <button
                type="submit"
                className="mt-2 px-6 py-3 rounded-full bg-green-700/90 text-white font-semibold shadow-lg hover:bg-green-800 transition-colors text-lg w-full"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
