import type { Lead } from "@followflow/types";

const statusLabel: Record<Lead["status"], string> = {
  new: "Novo",
  contacted: "Contatado",
  qualified: "Qualificado",
  proposal: "Proposta",
  won: "Ganho",
  lost: "Perdido",
};

export function LeadTable({ leads }: Readonly<{ leads: Lead[] }>) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-slate-400">
          <tr>
            <th className="px-5 py-4">Lead</th>
            <th className="px-5 py-4">Etapa</th>
            <th className="px-5 py-4">Score</th>
            <th className="px-5 py-4">Próxima ação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-white/[0.03]">
              <td className="px-5 py-4">
                <p className="font-medium text-white">{lead.name}</p>
                <p className="text-slate-400">{lead.company}</p>
              </td>
              <td className="px-5 py-4 text-slate-300">{statusLabel[lead.status]}</td>
              <td className="px-5 py-4">
                <span className="rounded-full bg-rose-400/10 px-3 py-1 text-rose-200">{lead.urgencyScore}/100</span>
              </td>
              <td className="px-5 py-4 text-slate-300">{lead.nextFollowUpAt ? "Follow-up automático agendado" : "IA avaliando janela ideal"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
