import type { DashboardMetric } from "@followflow/types";

export function MetricCard({ metric }: Readonly<{ metric: DashboardMetric }>) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-slate-950/40">
      <p className="text-sm text-slate-400">{metric.label}</p>
      <strong className="mt-3 block text-3xl font-semibold text-white">{metric.value}</strong>
      <span className="mt-3 inline-flex rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">{metric.trend}</span>
    </article>
  );
}
