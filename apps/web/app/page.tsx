import Link from "next/link";
import { ArrowRight, Bot, Mail, MessageCircle } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1d4ed8_0%,#020617_42%)] px-6 py-8 text-slate-100">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3 font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-brand-700">
            <Bot className="h-5 w-5" />
          </span>
          FollowFlow AI
        </div>
        <Link href="/dashboard" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
          Abrir dashboard
        </Link>
      </nav>
      <section className="mx-auto grid max-w-6xl gap-10 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200">IA que executa follow-ups reais, não apenas recomenda.</p>
          <h1 className="text-5xl font-semibold leading-tight tracking-tight md:text-7xl">Pare de perder receita por leads esquecidos.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            O FollowFlow AI monitora Gmail, WhatsApp e pipeline comercial para detectar oportunidades em risco, resumir contexto e executar o próximo contato no momento certo.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 font-semibold text-white hover:bg-brand-700">
              Ver operação <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/admin" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10">
              Painel administrativo
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-brand-950/40 backdrop-blur">
          <div className="grid gap-4">
            {["Lead sem resposta há 48h", "Resposta recebida no WhatsApp", "Proposta parada em aprovação"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Evento detectado</p>
                <p className="mt-1 font-medium text-white">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-emerald-400/10 p-4 text-emerald-100"><Mail className="mb-3 h-5 w-5" /> Gmail conectado</div>
            <div className="rounded-2xl bg-sky-400/10 p-4 text-sky-100"><MessageCircle className="mb-3 h-5 w-5" /> WhatsApp ativo</div>
          </div>
        </div>
      </section>
    </main>
  );
}
