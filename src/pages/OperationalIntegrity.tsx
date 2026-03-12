import { KPICard } from "@/components/atlas/KPICard";
import { WidgetCard } from "@/components/atlas/WidgetCard";
import { PageHeader } from "@/components/atlas/PageHeader";
import { FilterBar } from "@/components/atlas/FilterBar";
import { crmQuality } from "@/lib/mock-data";

const processRules = [
  { rule: "Opportunity missing close date", count: 24, severity: "high" },
  { rule: "Contact without email", count: 156, severity: "medium" },
  { rule: "Deal >60 days without activity", count: 18, severity: "high" },
  { rule: "Lead unassigned >2 hours", count: 8, severity: "high" },
  { rule: "Account missing industry tag", count: 342, severity: "low" },
  { rule: "Duplicate contact records", count: crmQuality.duplicates, severity: "medium" },
];

const handoffMetrics = [
  { handoff: "MQL → SDR", sla: "< 4 hours", compliance: 78, avgTime: "5.2h", leakage: 12 },
  { handoff: "SDR → AE", sla: "< 24 hours", compliance: 92, avgTime: "18h", leakage: 4 },
  { handoff: "AE → CS", sla: "< 48 hours", compliance: 85, avgTime: "36h", leakage: 8 },
  { handoff: "CS → Renewal", sla: "90 day advance", compliance: 71, avgTime: "62 days", leakage: 15 },
];

export default function OperationalIntegrity() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <PageHeader title="Operational Integrity" description="RevOps hygiene, system discipline, and process sanity. Not glamorous. Essential." />
      <FilterBar />

      <div className="atlas-kpi-ribbon">
        <KPICard title="CRM Completeness" value={`${crmQuality.completeness}%`} delta={-2.4} quality="medium" />
        <KPICard title="Duplicate Records" value={crmQuality.duplicates.toString()} delta={8} quality="low" />
        <KPICard title="Stale Records" value={crmQuality.staleRecords.toString()} delta={15} quality="low" />
        <KPICard title="SLA Compliance" value={`${crmQuality.slaCompliance}%`} delta={-3.1} quality="medium" />
        <KPICard title="Avg Response Time" value={`${crmQuality.avgResponseTime}h`} delta={12} quality="low" />
        <KPICard title="Missing Fields" value={crmQuality.missingFields.toString()} delta={5} quality="low" />
      </div>

      <div className="atlas-grid">
        <WidgetCard title="Data Quality Score" span={4}>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative">
              <svg viewBox="0 0 120 120" className="h-32 w-32">
                <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(220, 16%, 18%)" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="50" fill="none"
                  stroke={crmQuality.completeness >= 80 ? "hsl(160, 70%, 50%)" : crmQuality.completeness >= 60 ? "hsl(38, 92%, 55%)" : "hsl(0, 72%, 55%)"}
                  strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${(crmQuality.completeness / 100) * 314} 314`}
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-metric text-3xl font-bold text-foreground">{crmQuality.completeness}%</span>
                <span className="text-[10px] text-muted-foreground">completeness</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 w-full">
              <div className="rounded border border-border p-2 text-center">
                <span className="font-metric text-sm font-semibold text-foreground">{crmQuality.duplicates}</span>
                <p className="text-[10px] text-muted-foreground">duplicates</p>
              </div>
              <div className="rounded border border-border p-2 text-center">
                <span className="font-metric text-sm font-semibold text-foreground">{crmQuality.missingFields}</span>
                <p className="text-[10px] text-muted-foreground">missing fields</p>
              </div>
            </div>
          </div>
        </WidgetCard>

        <WidgetCard title="Handoff Discipline" span={8}>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-2 text-left font-medium uppercase tracking-wider text-muted-foreground">Handoff</th>
                  <th className="px-3 py-2 text-center font-medium uppercase tracking-wider text-muted-foreground">SLA</th>
                  <th className="px-3 py-2 text-center font-medium uppercase tracking-wider text-muted-foreground">Compliance</th>
                  <th className="px-3 py-2 text-right font-medium uppercase tracking-wider text-muted-foreground">Avg Time</th>
                  <th className="px-3 py-2 text-right font-medium uppercase tracking-wider text-muted-foreground">Leakage</th>
                </tr>
              </thead>
              <tbody>
                {handoffMetrics.map((h) => (
                  <tr key={h.handoff} className="border-b border-border/50 hover:bg-secondary/50">
                    <td className="px-3 py-2.5 font-medium text-foreground">{h.handoff}</td>
                    <td className="px-3 py-2.5 text-center text-muted-foreground">{h.sla}</td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${h.compliance}%`,
                              background: h.compliance >= 85 ? "hsl(160, 70%, 50%)" : h.compliance >= 70 ? "hsl(38, 92%, 55%)" : "hsl(0, 72%, 55%)",
                            }}
                          />
                        </div>
                        <span className={`font-metric text-[11px] font-semibold ${
                          h.compliance >= 85 ? "text-atlas-positive" : h.compliance >= 70 ? "text-atlas-warning" : "text-atlas-negative"
                        }`}>{h.compliance}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right font-metric text-foreground">{h.avgTime}</td>
                    <td className="px-3 py-2.5 text-right font-metric text-atlas-negative">{h.leakage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </WidgetCard>

        <WidgetCard title="Broken Process Rules" span={6}>
          <div className="space-y-2">
            {processRules.map((rule, i) => (
              <div key={i} className={`flex items-center justify-between rounded border p-2.5 ${
                rule.severity === "high" ? "border-atlas-danger/30 bg-atlas-danger/5" :
                rule.severity === "medium" ? "border-atlas-warning/30 bg-atlas-warning/5" : "border-border"
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    rule.severity === "high" ? "bg-atlas-danger" : rule.severity === "medium" ? "bg-atlas-warning" : "bg-atlas-neutral"
                  }`} />
                  <span className="text-xs text-foreground">{rule.rule}</span>
                </div>
                <span className="font-metric text-xs font-semibold text-foreground">{rule.count}</span>
              </div>
            ))}
          </div>
        </WidgetCard>

        <WidgetCard title="Workflow Health" span={6}>
          <div className="space-y-3 mt-2">
            {[
              { name: "Lead Routing", status: "healthy", lastRun: "2m ago", successRate: 98 },
              { name: "Opportunity Sync", status: "warning", lastRun: "15m ago", successRate: 84 },
              { name: "Health Score Calc", status: "healthy", lastRun: "1h ago", successRate: 100 },
              { name: "Renewal Alerts", status: "error", lastRun: "6h ago", successRate: 62 },
              { name: "Attribution Sync", status: "healthy", lastRun: "30m ago", successRate: 95 },
            ].map((wf) => (
              <div key={wf.name} className="flex items-center justify-between rounded border border-border p-2.5">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${
                    wf.status === "healthy" ? "bg-atlas-success" : wf.status === "warning" ? "bg-atlas-warning animate-pulse-glow" : "bg-atlas-danger animate-pulse-glow"
                  }`} />
                  <span className="text-xs font-medium text-foreground">{wf.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground">{wf.lastRun}</span>
                  <span className={`font-metric text-[11px] font-semibold ${
                    wf.successRate >= 90 ? "text-atlas-positive" : wf.successRate >= 70 ? "text-atlas-warning" : "text-atlas-negative"
                  }`}>{wf.successRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
