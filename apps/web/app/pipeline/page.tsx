import { AppShell } from "../../components/app-shell";
import { leads } from "../../lib/mock-data";

const stages = ["new", "contacted", "qualified", "proposal", "won"] as const;

export default function PipelinePage() {
  return (
    <AppShell>
      <div className="grid gap-4 xl:grid-cols-5">
        {stages.map((stage) => (
          <section key={stage} className="min-h-96 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">{stage}</h2>
            <div className="space-y-3">
              {leads.filter((lead) => lead.status === stage).map((lead) => (
                <article key={lead.id} className="rounded-2xl bg-slate-900 p-4">
                  <p className="font-medium text-white">{lead.name}</p>
                  <p className="text-sm text-slate-400">{lead.company}</p>
                  <p className="mt-3 text-xs text-rose-200">Urgência {lead.urgencyScore}/100</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
