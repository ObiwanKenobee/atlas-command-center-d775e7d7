import { KPICard } from "@/components/atlas/KPICard";
import { WidgetCard } from "@/components/atlas/WidgetCard";
import { PageHeader } from "@/components/atlas/PageHeader";
import { FilterBar } from "@/components/atlas/FilterBar";
import { DataTable } from "@/components/atlas/DataTable";
import { DrilldownDrawer, DrilldownSection, DrilldownMetric } from "@/components/atlas/DrilldownDrawer";
import { pipelineByStage, repPerformance } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const chartTooltipStyle = {
  contentStyle: { background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 16%, 18%)", borderRadius: "8px", fontSize: "12px" },
  labelStyle: { color: "hsl(210, 20%, 90%)" },
};

const staleDeals = [
  { deal: "StateGov RFP", stage: "Negotiation", age: 68, value: 420000, nextStep: "None", risk: "high" },
  { deal: "EduCorp Expansion", stage: "Procurement", age: 45, value: 280000, nextStep: "Pending legal", risk: "medium" },
  { deal: "RetailMax Upsell", stage: "Proposal", age: 52, value: 150000, nextStep: "None", risk: "high" },
  { deal: "HealthNet Pilot", stage: "Discovery", age: 38, value: 95000, nextStep: "Demo scheduled", risk: "low" },
];

export default function PipelineIntelligence() {
  const [selectedRep, setSelectedRep] = useState<any>(null);
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openRep) {
      const rep = repPerformance.find(r => r.name === location.state.openRep);
      if (rep) setSelectedRep(rep);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <PageHeader title="Pipeline Intelligence" description="Sales command central — health, flow, and risk across every deal." />
      <FilterBar />

      <div className="atlas-kpi-ribbon">
        <KPICard title="Open Pipeline" value="$6.8M" delta={5.2} sparkData={[52, 56, 58, 62, 65, 64, 66, 68, 68]} quality="high" anomalyThreshold={10} anomalyDirection="negative" />
        <KPICard title="Weighted Pipeline" value="$3.4M" delta={-2.1} quality="medium" tooltip="Pipeline adjusted by stage probability" anomalyThreshold={5} anomalyDirection="negative" />
        <KPICard title="Win Rate" value="26.2%" delta={1.8} quality="medium" anomalyThreshold={5} anomalyDirection="negative" />
        <KPICard title="Avg Sales Cycle" value="48 days" delta={-3.5} quality="high" anomalyThreshold={10} anomalyDirection="positive" />
        <KPICard title="Slipped Deals" value="$1.2M" delta={15} quality="low" tooltip="Deals that moved past close date" anomalyThreshold={10} anomalyDirection="positive" />
        <KPICard title="Created This Month" value="42" delta={8.2} quality="high" anomalyThreshold={15} anomalyDirection="negative" />
      </div>

      <div className="atlas-grid">
        <WidgetCard title="Pipeline by Stage" span={6}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={pipelineByStage}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
              <XAxis dataKey="stage" tick={{ fontSize: 10, fill: "hsl(215, 15%, 50%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}K`} />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {pipelineByStage.map((_, i) => (
                  <Cell key={i} fill={`hsl(${195 - i * 10}, ${90 - i * 5}%, ${45 + i * 3}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </WidgetCard>

        <WidgetCard title="Stage Aging" subtitle="Days in stage" span={6}>
          <div className="space-y-3 mt-2">
            {pipelineByStage.map((stage) => {
              const avgAge = Math.floor(Math.random() * 30) + 10;
              const maxAge = 45;
              const isOverdue = avgAge > 25;
              return (
                <div key={stage.stage} className="flex items-center gap-3">
                  <span className="w-24 text-xs text-muted-foreground">{stage.stage}</span>
                  <div className="flex-1 h-5 rounded bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${(avgAge / maxAge) * 100}%`,
                        background: isOverdue ? "hsl(38, 92%, 55%)" : "hsl(195, 90%, 50%)",
                      }}
                    />
                  </div>
                  <span className={`font-metric text-xs w-14 text-right ${isOverdue ? "text-atlas-warning" : "text-foreground"}`}>
                    {avgAge}d
                  </span>
                  <span className="font-metric text-[10px] text-muted-foreground w-10 text-right">{stage.count} deals</span>
                </div>
              );
            })}
          </div>
        </WidgetCard>

        <WidgetCard title="Rep Leaderboard" span={7}>
          <DataTable
            columns={[
              { key: "name", label: "Rep" },
              { key: "closed", label: "Closed", align: "right", mono: true, render: (r: any) => `$${(r.closed / 1000).toFixed(0)}K` },
              { key: "quota", label: "Quota", align: "right", mono: true, render: (r: any) => `$${(r.quota / 1000).toFixed(0)}K` },
              { key: "attainment", label: "Attain%", align: "right", mono: true, render: (r: any) => {
                const pct = Math.round((r.closed / r.quota) * 100);
                return <span className={pct >= 80 ? "text-atlas-positive" : pct >= 60 ? "text-atlas-warning" : "text-atlas-negative"}>{pct}%</span>;
              }},
              { key: "winRate", label: "Win%", align: "right", mono: true, render: (r: any) => `${r.winRate}%` },
              { key: "avgCycle", label: "Cycle", align: "right", mono: true, render: (r: any) => `${r.avgCycle}d` },
            ]}
            data={repPerformance as any}
            onRowClick={(row: any) => setSelectedRep(row)}
          />
        </WidgetCard>

        <WidgetCard title="Stale & At-Risk Deals" span={5}>
          <div className="space-y-2">
            {staleDeals.map(deal => (
              <div key={deal.deal} onClick={() => setSelectedDeal(deal)} className={`rounded border p-2.5 cursor-pointer transition-colors ${
                deal.risk === "high" ? "border-atlas-danger/30 bg-atlas-danger/5 hover:bg-atlas-danger/10" :
                deal.risk === "medium" ? "border-atlas-warning/30 bg-atlas-warning/5 hover:bg-atlas-warning/10" : "border-border hover:bg-secondary"
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-foreground">{deal.deal}</span>
                  <span className={`text-[10px] font-semibold uppercase ${
                    deal.risk === "high" ? "text-atlas-danger" : deal.risk === "medium" ? "text-atlas-warning" : "text-atlas-success"
                  }`}>{deal.risk}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span>{deal.stage}</span>
                  <span className="font-metric">{deal.age}d old</span>
                  <span className="font-metric">${(deal.value / 1000).toFixed(0)}K</span>
                  <span className="truncate">Next: {deal.nextStep}</span>
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>

      {/* Rep Drilldown */}
      <DrilldownDrawer
        open={!!selectedRep}
        onClose={() => setSelectedRep(null)}
        title={selectedRep?.name ?? ""}
        subtitle="Sales Rep Performance"
      >
        {selectedRep && (
          <>
            <DrilldownSection label="Performance Summary">
              <DrilldownMetric label="Closed Revenue" value={`$${(selectedRep.closed / 1000).toFixed(0)}K`} delta={Math.round((selectedRep.closed / selectedRep.quota) * 100 - 100)} />
              <DrilldownMetric label="Quota" value={`$${(selectedRep.quota / 1000).toFixed(0)}K`} />
              <DrilldownMetric label="Attainment" value={`${Math.round((selectedRep.closed / selectedRep.quota) * 100)}%`} />
              <DrilldownMetric label="Win Rate" value={`${selectedRep.winRate}%`} />
              <DrilldownMetric label="Avg Cycle" value={`${selectedRep.avgCycle} days`} />
              <DrilldownMetric label="Open Pipeline" value={`$${(selectedRep.pipeline / 1000).toFixed(0)}K`} />
            </DrilldownSection>
            <DrilldownSection label="Active Deals">
              {[
                { deal: "Enterprise Cloud Migration", value: "$180K", stage: "Negotiation" },
                { deal: "Platform Expansion", value: "$95K", stage: "Proposal" },
                { deal: "New Logo — TechCo", value: "$250K", stage: "Discovery" },
              ].map((d, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0">
                  <div>
                    <span className="text-xs text-foreground">{d.deal}</span>
                    <span className="ml-2 text-[10px] text-muted-foreground">{d.stage}</span>
                  </div>
                  <span className="font-metric text-xs text-foreground">{d.value}</span>
                </div>
              ))}
            </DrilldownSection>
          </>
        )}
      </DrilldownDrawer>

      {/* Deal Drilldown */}
      <DrilldownDrawer
        open={!!selectedDeal}
        onClose={() => setSelectedDeal(null)}
        title={selectedDeal?.deal ?? ""}
        subtitle={`${selectedDeal?.stage} · ${selectedDeal?.age}d old`}
      >
        {selectedDeal && (
          <>
            <DrilldownSection label="Deal Summary">
              <DrilldownMetric label="Value" value={`$${(selectedDeal.value / 1000).toFixed(0)}K`} />
              <DrilldownMetric label="Stage" value={selectedDeal.stage} />
              <DrilldownMetric label="Deal Age" value={`${selectedDeal.age} days`} />
              <DrilldownMetric label="Risk Level" value={selectedDeal.risk} />
              <DrilldownMetric label="Next Step" value={selectedDeal.nextStep || "None defined"} />
            </DrilldownSection>
            <DrilldownSection label="Blockers">
              {selectedDeal.risk === "high" ? (
                <>
                  <div className="flex items-center justify-between py-1 border-b border-border/30">
                    <span className="text-xs text-foreground">No next step defined</span>
                    <span className="text-[10px] text-atlas-danger font-semibold">Critical</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-xs text-foreground">Deal age exceeds stage SLA</span>
                    <span className="text-[10px] text-atlas-warning font-semibold">Warning</span>
                  </div>
                </>
              ) : (
                <p className="text-xs text-muted-foreground">No critical blockers detected.</p>
              )}
            </DrilldownSection>
          </>
        )}
      </DrilldownDrawer>
    </div>
  );
}
