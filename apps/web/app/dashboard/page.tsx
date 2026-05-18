import { AppShell } from "../../components/app-shell";
import { LeadTable } from "../../components/lead-table";
import { MetricCard } from "../../components/metric-card";
import { dashboardMetrics, interactions, leads } from "../../lib/mock-data";

export default function DashboardPage() {
  return (
    <AppShell>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
      </section>
      <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_380px]">
        <div>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Leads em risco</h2>
              <p className="text-slate-400">Priorizados por score, janela de follow-up e sinais de intenção.</p>
            </div>
          </div>
          <LeadTable leads={leads} />
        </div>
        <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xl font-semibold">Histórico recente</h2>
          <div className="mt-5 space-y-4">
            {interactions.map((interaction) => (
              <article key={interaction.id} className="rounded-2xl bg-slate-900/80 p-4">
                <p className="text-xs uppercase text-slate-500">{interaction.channel} · {interaction.direction}</p>
                <p className="mt-2 text-sm text-slate-200">{interaction.body}</p>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
