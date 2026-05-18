import { AppShell } from "../../components/app-shell";

const controls = [
  { title: "Integrações", description: "Gmail e WhatsApp com health-check e webhooks assinados." },
  { title: "Automação", description: "Políticas de follow-up por etapa, horário comercial e SLA." },
  { title: "Auditoria", description: "Logs de ações automatizadas, operador responsável e payload mínimo." },
  { title: "Billing", description: "Planos por volume de leads, mensagens e seats." },
];

export default function AdminPage() {
  return (
    <AppShell>
      <div className="grid gap-5 md:grid-cols-2">
        {controls.map((control) => (
          <article key={control.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold text-white">{control.title}</h2>
            <p className="mt-3 text-slate-400">{control.description}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
