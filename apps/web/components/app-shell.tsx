import Link from "next/link";
import { Activity, Bot, Gauge, ShieldCheck } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/pipeline", label: "Pipeline" },
  { href: "/admin", label: "Admin" },
];

export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-slate-950/90 p-6 lg:block">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-white">
            <Bot className="h-5 w-5" />
          </span>
          FollowFlow AI
        </Link>
        <nav className="mt-10 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
          <ShieldCheck className="mb-3 h-5 w-5" />
          RLS, auditoria e isolamento multi-tenant habilitados na camada de dados.
        </div>
      </aside>
      <main className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-500">Autonomous revenue ops</p>
              <h1 className="text-xl font-semibold">Centro de comando comercial</h1>
            </div>
            <div className="hidden items-center gap-3 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 sm:flex">
              <Activity className="h-4 w-4 text-emerald-400" />
              Operação saudável
              <Gauge className="h-4 w-4 text-sky-400" />
              SLA 7 min
            </div>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
