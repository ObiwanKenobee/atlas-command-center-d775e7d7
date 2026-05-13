import { KPICard } from "@/components/atlas/KPICard";
import { WidgetCard } from "@/components/atlas/WidgetCard";
import { PageHeader } from "@/components/atlas/PageHeader";
import { FilterBar } from "@/components/atlas/FilterBar";
import { DataTable } from "@/components/atlas/DataTable";
import { DrilldownDrawer, DrilldownSection, DrilldownMetric } from "@/components/atlas/DrilldownDrawer";
import { revenueData, funnelData, segmentPerformance, healthScores } from "@/lib/mock-data";
import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from "recharts";

const chartTooltipStyle = {
  contentStyle: { background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 16%, 18%)", borderRadius: "8px", fontSize: "12px" },
  labelStyle: { color: "hsl(210, 20%, 90%)" },
};

export default function ExecutiveCommand() {
  const [selectedAccount, setSelectedAccount] = useState<any>(null);

  return (
    <div className="flex flex-col gap-4 p-4">
      <PageHeader title="Executive Command" description="Revenue performance at a glance — real-time signals, not lagging reports." />
      <FilterBar />

      <div className="atlas-kpi-ribbon">
        <KPICard title="ARR" value="$5.8M" delta={12.4} deltaLabel="vs prev Q" sparkData={[24, 28, 32, 36, 41, 45, 49, 52, 58]} prefix="" quality="high" tooltip="Annual Recurring Revenue" anomalyThreshold={20} anomalyDirection="negative" />
        <KPICard title="New Revenue" value="$1.2M" delta={18.2} sparkData={[8, 12, 10, 14, 16, 15, 18, 20, 22]} quality="high" anomalyThreshold={25} anomalyDirection="negative" />
        <KPICard title="Expansion" value="$680K" delta={8.5} sparkData={[40, 45, 42, 50, 55, 52, 58, 62, 68]} quality="medium" anomalyThreshold={15} anomalyDirection="negative" />
        <KPICard title="Churned" value="$320K" delta={-4.2} sparkData={[30, 28, 35, 32, 38, 34, 30, 28, 32]} quality="medium" anomalyThreshold={10} anomalyDirection="negative" />
        <KPICard title="NRR" value="112%" delta={3.1} quality="high" tooltip="Net Revenue Retention" anomalyThreshold={5} anomalyDirection="negative" />
        <KPICard title="Pipeline Coverage" value="3.2x" delta={-8} quality="medium" tooltip="Pipeline / Quota remaining" anomalyThreshold={15} anomalyDirection="negative" />
        <KPICard title="Forecast Confidence" value="72%" delta={-6} quality="low" anomalyThreshold={10} anomalyDirection="negative" />
      </div>

      <div className="atlas-grid">
        <WidgetCard title="Revenue Trend" subtitle="ARR vs Target" span={5} tooltip="Monthly ARR progression against quarterly targets">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="arrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(195, 90%, 50%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(195, 90%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip {...chartTooltipStyle} />
              <Area type="monotone" dataKey="arr" stroke="hsl(195, 90%, 50%)" fill="url(#arrGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="target" stroke="hsl(215, 15%, 50%)" fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </WidgetCard>

        <WidgetCard title="Revenue Funnel" subtitle="Lifecycle conversion" span={4}>
          <div className="space-y-2">
            {funnelData.map((stage, i) => {
              const width = (stage.value / funnelData[0].value) * 100;
              return (
                <div key={stage.stage} className="flex items-center gap-3">
                  <span className="w-24 text-xs text-muted-foreground truncate">{stage.stage}</span>
                  <div className="flex-1 h-6 rounded bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded transition-all"
                      style={{
                        width: `${width}%`,
                        background: `hsl(${195 - i * 15}, ${90 - i * 8}%, ${50 + i * 3}%)`,
                      }}
                    />
                  </div>
                  <span className="font-metric text-xs text-foreground w-14 text-right">{stage.value.toLocaleString()}</span>
                  <span className="font-metric text-[10px] text-muted-foreground w-10 text-right">{stage.rate}%</span>
                </div>
              );
            })}
          </div>
        </WidgetCard>

        <WidgetCard title="Target vs Actual" subtitle="Waterfall" span={3}>
          <div className="flex flex-col gap-2 mt-2">
            {[
              { label: "Target", value: 4600, color: "hsl(215, 15%, 50%)" },
              { label: "New Biz", value: 2800, color: "hsl(195, 90%, 50%)" },
              { label: "Expansion", value: 1200, color: "hsl(160, 70%, 50%)" },
              { label: "Churn", value: -680, color: "hsl(0, 72%, 55%)" },
              { label: "Contraction", value: -320, color: "hsl(38, 92%, 55%)" },
              { label: "Actual", value: 3000, color: "hsl(195, 90%, 50%)" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="w-20 text-xs text-muted-foreground">{item.label}</span>
                <div className="flex-1 h-5 rounded bg-secondary overflow-hidden flex items-center">
                  <div
                    className="h-full rounded"
                    style={{ width: `${(Math.abs(item.value) / 4600) * 100}%`, background: item.color }}
                  />
                </div>
                <span className={`font-metric text-xs w-16 text-right ${item.value < 0 ? "text-atlas-negative" : "text-foreground"}`}>
                  {item.value < 0 ? "-" : ""}${Math.abs(item.value / 1000).toFixed(0)}K
                </span>
              </div>
            ))}
          </div>
        </WidgetCard>

        <WidgetCard title="Segment Performance" span={5}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={segmentPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
              <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <YAxis type="category" dataKey="segment" tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} axisLine={false} tickLine={false} width={80} />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="arr" radius={[0, 4, 4, 0]}>
                {segmentPerformance.map((_, i) => (
                  <Cell key={i} fill={`hsl(${195 - i * 20}, ${90 - i * 10}%, ${50 + i * 5}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </WidgetCard>

        <WidgetCard title="At-Risk Revenue" span={3}>
          <div className="space-y-2">
            {healthScores.filter(a => a.risk === "high").map(account => (
              <div key={account.account} className="rounded border border-atlas-danger/30 bg-atlas-danger/5 p-2.5 cursor-pointer hover:bg-atlas-danger/10 transition-colors" onClick={() => setSelectedAccount(account)}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-foreground">{account.account}</span>
                  <span className="font-metric text-[10px] font-semibold text-atlas-danger">Score: {account.score}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-metric text-xs text-foreground">${(account.revenue / 1000).toFixed(0)}K ARR</span>
                  <span className="text-[10px] text-muted-foreground">Renews {account.renewal}</span>
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>

        <WidgetCard title="Strategic Accounts" span={4}>
          <DataTable
            columns={[
              { key: "account", label: "Account" },
              { key: "score", label: "Health", align: "center", mono: true, render: (r: any) => (
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  r.score >= 80 ? "bg-atlas-success/20 text-atlas-success" :
                  r.score >= 60 ? "bg-atlas-warning/20 text-atlas-warning" : "bg-atlas-danger/20 text-atlas-danger"
                }`}>{r.score}</span>
              )},
              { key: "revenue", label: "Revenue", align: "right", mono: true, render: (r: any) => `$${(r.revenue / 1000).toFixed(0)}K` },
              { key: "risk", label: "Risk", align: "center", render: (r: any) => (
                <span className={`text-[10px] font-semibold uppercase ${
                  r.risk === "high" ? "text-atlas-danger" : r.risk === "medium" ? "text-atlas-warning" : "text-atlas-success"
                }`}>{r.risk}</span>
              )},
            ]}
            data={healthScores as any}
            onRowClick={(row: any) => setSelectedAccount(row)}
          />
        </WidgetCard>
      </div>

      <DrilldownDrawer
        open={!!selectedAccount}
        onClose={() => setSelectedAccount(null)}
        title={selectedAccount?.account ?? ""}
        subtitle={`Health: ${selectedAccount?.score} · ${selectedAccount?.risk} risk`}
      >
        {selectedAccount && (
          <>
            <DrilldownSection label="Account Summary">
              <DrilldownMetric label="ARR" value={`$${(selectedAccount.revenue / 1000).toFixed(0)}K`} delta={6} />
              <DrilldownMetric label="Health Score" value={selectedAccount.score.toString()} delta={selectedAccount.trend === "up" ? 4 : selectedAccount.trend === "down" ? -8 : 0} />
              <DrilldownMetric label="Risk Level" value={selectedAccount.risk} />
              <DrilldownMetric label="Renewal Date" value={selectedAccount.renewal} />
              <DrilldownMetric label="Trend" value={selectedAccount.trend === "up" ? "↑ Improving" : selectedAccount.trend === "down" ? "↓ Declining" : "→ Stable"} />
            </DrilldownSection>
            <DrilldownSection label="Risk Drivers">
              {selectedAccount.risk === "high" ? (
                <>
                  <div className="flex items-center justify-between py-1 border-b border-border/30">
                    <span className="text-xs text-foreground">Usage declining 42%</span>
                    <span className="text-[10px] text-atlas-danger font-semibold">Critical</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-border/30">
                    <span className="text-xs text-foreground">Sponsor inactive 21 days</span>
                    <span className="text-[10px] text-atlas-warning font-semibold">Warning</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-xs text-foreground">Support tickets up 3x</span>
                    <span className="text-[10px] text-atlas-warning font-semibold">Warning</span>
                  </div>
                </>
              ) : (
                <p className="text-xs text-muted-foreground">No critical risk drivers detected.</p>
              )}
            </DrilldownSection>
            <DrilldownSection label="Recent Activity">
              {[
                { action: "QBR completed", date: "Mar 10" },
                { action: "Feature request submitted", date: "Mar 5" },
                { action: "Support ticket resolved", date: "Feb 28" },
              ].map((a, i) => (
                <div key={i} className="flex items-center justify-between py-1 border-b border-border/30 last:border-0">
                  <span className="text-xs text-foreground">{a.action}</span>
                  <span className="text-[10px] text-muted-foreground">{a.date}</span>
                </div>
              ))}
            </DrilldownSection>
          </>
        )}
      </DrilldownDrawer>
    </div>
  );
}
