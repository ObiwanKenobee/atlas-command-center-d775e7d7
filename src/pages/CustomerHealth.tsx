import { KPICard } from "@/components/atlas/KPICard";
import { WidgetCard } from "@/components/atlas/WidgetCard";
import { PageHeader } from "@/components/atlas/PageHeader";
import { FilterBar } from "@/components/atlas/FilterBar";
import { DataTable } from "@/components/atlas/DataTable";
import { healthScores, cohortRetention } from "@/lib/mock-data";

export default function CustomerHealth() {
  const renewalCalendar = [
    { month: "Apr", count: 8, revenue: 680000, atRisk: 2 },
    { month: "May", count: 12, revenue: 920000, atRisk: 3 },
    { month: "Jun", count: 6, revenue: 540000, atRisk: 1 },
    { month: "Jul", count: 9, revenue: 780000, atRisk: 2 },
    { month: "Aug", count: 5, revenue: 450000, atRisk: 0 },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      <PageHeader title="Customer Health" description="Retention, adoption, expansion — the full customer lifecycle." />
      <FilterBar />

      <div className="atlas-kpi-ribbon">
        <KPICard title="Health Score Avg" value="74" delta={-2.1} quality="medium" tooltip="Weighted average across all accounts" />
        <KPICard title="Renewal Rate" value="91.2%" delta={0.8} quality="high" />
        <KPICard title="Churn Rate" value="4.8%" delta={-1.2} quality="medium" />
        <KPICard title="NRR" value="112%" delta={3.1} quality="high" />
        <KPICard title="Renewals (90d)" value="$2.1M" delta={0} quality="medium" tooltip="Revenue up for renewal in next 90 days" />
        <KPICard title="At-Risk Accounts" value="5" delta={25} quality="low" />
      </div>

      <div className="atlas-grid">
        <WidgetCard title="Account Health Matrix" span={7}>
          <DataTable
            columns={[
              { key: "account", label: "Account" },
              { key: "score", label: "Score", align: "center", mono: true, render: (r: any) => {
                const bg = r.score >= 80 ? "bg-atlas-success/20 text-atlas-success" :
                           r.score >= 60 ? "bg-atlas-warning/20 text-atlas-warning" : "bg-atlas-danger/20 text-atlas-danger";
                return <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${bg}`}>{r.score}</span>;
              }},
              { key: "trend", label: "Trend", align: "center", render: (r: any) => (
                <span className={r.trend === "up" ? "text-atlas-positive" : r.trend === "down" ? "text-atlas-negative" : "text-atlas-neutral"}>
                  {r.trend === "up" ? "↑" : r.trend === "down" ? "↓" : "→"}
                </span>
              )},
              { key: "revenue", label: "ARR", align: "right", mono: true, render: (r: any) => `$${(r.revenue / 1000).toFixed(0)}K` },
              { key: "renewal", label: "Renewal", align: "right", mono: true },
              { key: "risk", label: "Risk", align: "center", render: (r: any) => (
                <span className={`text-[10px] font-semibold uppercase ${
                  r.risk === "high" ? "text-atlas-danger" : r.risk === "medium" ? "text-atlas-warning" : "text-atlas-success"
                }`}>{r.risk}</span>
              )},
            ]}
            data={healthScores as any}
          />
        </WidgetCard>

        <WidgetCard title="Renewal Calendar" span={5}>
          <div className="space-y-3 mt-2">
            {renewalCalendar.map((month) => (
              <div key={month.month} className="flex items-center gap-3">
                <span className="w-10 font-metric text-xs text-muted-foreground">{month.month}</span>
                <div className="flex-1 h-6 rounded bg-secondary overflow-hidden flex">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${((month.count - month.atRisk) / 12) * 100}%` }}
                  />
                  {month.atRisk > 0 && (
                    <div
                      className="h-full bg-atlas-danger"
                      style={{ width: `${(month.atRisk / 12) * 100}%` }}
                    />
                  )}
                </div>
                <span className="font-metric text-xs text-foreground w-16 text-right">${(month.revenue / 1000).toFixed(0)}K</span>
                {month.atRisk > 0 && (
                  <span className="font-metric text-[10px] text-atlas-danger w-12 text-right">{month.atRisk} risk</span>
                )}
              </div>
            ))}
          </div>
        </WidgetCard>

        <WidgetCard title="Cohort Retention" span={8} tooltip="Percentage of customers retained by cohort">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-2 text-left font-medium uppercase tracking-wider text-muted-foreground">Cohort</th>
                  {["M1", "M2", "M3", "M4", "M5", "M6"].map(m => (
                    <th key={m} className="px-3 py-2 text-center font-medium uppercase tracking-wider text-muted-foreground">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cohortRetention.map((row) => (
                  <tr key={row.cohort} className="border-b border-border/50">
                    <td className="px-3 py-2.5 font-metric text-foreground">{row.cohort}</td>
                    {[row.m1, row.m2, row.m3, row.m4, row.m5, row.m6].map((val, i) => (
                      <td key={i} className="px-3 py-2.5 text-center">
                        {val !== null ? (
                          <span
                            className="inline-block rounded px-2 py-0.5 font-metric text-[11px] font-semibold"
                            style={{
                              background: `hsl(${160}, ${70}%, ${50}%, ${(val / 100) * 0.4})`,
                              color: val >= 85 ? "hsl(160, 70%, 60%)" : val >= 75 ? "hsl(38, 92%, 55%)" : "hsl(0, 72%, 60%)",
                            }}
                          >
                            {val}%
                          </span>
                        ) : (
                          <span className="text-muted-foreground/30">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </WidgetCard>

        <WidgetCard title="Expansion Opportunities" span={4}>
          <div className="space-y-2">
            {healthScores.filter(a => a.score >= 75).map(account => (
              <div key={account.account} className="rounded border border-atlas-success/30 bg-atlas-success/5 p-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-foreground">{account.account}</span>
                  <span className="font-metric text-[10px] text-atlas-positive">{account.score} health</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>${(account.revenue / 1000).toFixed(0)}K current ARR</span>
                  <button className="font-medium text-primary hover:underline">View expansion →</button>
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
