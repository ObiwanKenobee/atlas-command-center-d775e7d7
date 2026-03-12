import { KPICard } from "@/components/atlas/KPICard";
import { WidgetCard } from "@/components/atlas/WidgetCard";
import { PageHeader } from "@/components/atlas/PageHeader";
import { FilterBar } from "@/components/atlas/FilterBar";
import { DataTable } from "@/components/atlas/DataTable";
import { DrilldownDrawer, DrilldownSection, DrilldownMetric } from "@/components/atlas/DrilldownDrawer";
import { useState } from "react";

const myDeals = [
  { deal: "Acme Corp Expansion", stage: "Negotiation", value: 180000, age: 28, probability: 75, nextStep: "Contract review", close: "2026-04-15" },
  { deal: "TechFlow Renewal", stage: "Proposal", value: 95000, age: 14, probability: 60, nextStep: "Pricing call", close: "2026-04-30" },
  { deal: "NewCo Enterprise", stage: "Discovery", value: 250000, age: 7, probability: 20, nextStep: "Demo scheduled", close: "2026-06-30" },
  { deal: "FinServ Upsell", stage: "Qualification", value: 65000, age: 21, probability: 40, nextStep: "Stakeholder map", close: "2026-05-15" },
  { deal: "RetailMax Phase 2", stage: "Procurement", value: 120000, age: 45, probability: 85, nextStep: "PO pending", close: "2026-04-10" },
];

export default function MyPipeline() {
  const [selectedDeal, setSelectedDeal] = useState<typeof myDeals[0] | null>(null);

  const totalPipeline = myDeals.reduce((a, b) => a + b.value, 0);
  const weightedPipeline = myDeals.reduce((a, b) => a + b.value * b.probability / 100, 0);

  return (
    <div className="flex flex-col gap-4 p-4">
      <PageHeader title="My Pipeline" description="Your owned deals, quota progress, and personal deal flow." />
      <FilterBar />

      <div className="atlas-kpi-ribbon">
        <KPICard title="My Pipeline" value={`$${(totalPipeline / 1000).toFixed(0)}K`} delta={12} quality="high" />
        <KPICard title="Weighted" value={`$${(weightedPipeline / 1000).toFixed(0)}K`} delta={5} quality="medium" />
        <KPICard title="Quota" value="$450K" delta={0} quality="high" />
        <KPICard title="Attainment" value={`${Math.round((weightedPipeline / 450000) * 100)}%`} delta={8} quality="medium" />
        <KPICard title="Deals" value={myDeals.length.toString()} delta={0} quality="high" />
      </div>

      <div className="atlas-grid">
        <WidgetCard title="My Deals" span={12}>
          <DataTable
            columns={[
              { key: "deal", label: "Deal", render: (r: any) => (
                <button onClick={() => setSelectedDeal(r)} className="text-primary hover:underline text-left font-medium">{r.deal}</button>
              )},
              { key: "stage", label: "Stage", render: (r: any) => (
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px]">{r.stage}</span>
              )},
              { key: "value", label: "Value", align: "right", mono: true, render: (r: any) => `$${(r.value / 1000).toFixed(0)}K` },
              { key: "probability", label: "Prob%", align: "center", mono: true, render: (r: any) => (
                <span className={r.probability >= 70 ? "text-atlas-positive" : r.probability >= 40 ? "text-atlas-warning" : "text-atlas-negative"}>{r.probability}%</span>
              )},
              { key: "age", label: "Age", align: "right", mono: true, render: (r: any) => `${r.age}d` },
              { key: "close", label: "Close Date", align: "right", mono: true },
              { key: "nextStep", label: "Next Step" },
            ]}
            data={myDeals as any}
          />
        </WidgetCard>

        <WidgetCard title="Stage Distribution" span={6}>
          <div className="space-y-2 mt-2">
            {["Discovery", "Qualification", "Proposal", "Negotiation", "Procurement"].map((stage) => {
              const deals = myDeals.filter((d) => d.stage === stage);
              const total = deals.reduce((a, b) => a + b.value, 0);
              return (
                <div key={stage} className="flex items-center gap-3">
                  <span className="w-24 text-xs text-muted-foreground">{stage}</span>
                  <div className="flex-1 h-5 rounded bg-secondary overflow-hidden">
                    <div className="h-full rounded bg-primary" style={{ width: `${(total / totalPipeline) * 100}%` }} />
                  </div>
                  <span className="font-metric text-xs w-14 text-right text-foreground">${(total / 1000).toFixed(0)}K</span>
                  <span className="font-metric text-[10px] text-muted-foreground w-6 text-right">{deals.length}</span>
                </div>
              );
            })}
          </div>
        </WidgetCard>

        <WidgetCard title="Tasks & Actions" span={6}>
          <div className="space-y-2">
            {myDeals.map((deal) => (
              <div key={deal.deal} className="flex items-center justify-between rounded border border-border p-2.5">
                <div>
                  <span className="text-xs font-medium text-foreground">{deal.deal}</span>
                  <p className="text-[10px] text-muted-foreground">{deal.nextStep}</p>
                </div>
                <span className="font-metric text-[10px] text-muted-foreground">{deal.close}</span>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>

      <DrilldownDrawer
        open={!!selectedDeal}
        onClose={() => setSelectedDeal(null)}
        title={selectedDeal?.deal ?? ""}
        subtitle={`${selectedDeal?.stage} · Close: ${selectedDeal?.close}`}
      >
        {selectedDeal && (
          <>
            <DrilldownSection label="Deal Summary">
              <DrilldownMetric label="Value" value={`$${((selectedDeal.value) / 1000).toFixed(0)}K`} />
              <DrilldownMetric label="Probability" value={`${selectedDeal.probability}%`} />
              <DrilldownMetric label="Deal Age" value={`${selectedDeal.age} days`} />
              <DrilldownMetric label="Next Step" value={selectedDeal.nextStep} />
            </DrilldownSection>
            <DrilldownSection label="Activity Timeline">
              {[
                { action: "Pricing proposal sent", date: "Mar 10", by: "You" },
                { action: "Demo completed", date: "Mar 5", by: "You" },
                { action: "Discovery call", date: "Feb 28", by: "You" },
                { action: "Lead assigned", date: "Feb 25", by: "System" },
              ].map((a, i) => (
                <div key={i} className="flex items-center justify-between py-1 border-b border-border/30 last:border-0">
                  <span className="text-xs text-foreground">{a.action}</span>
                  <span className="text-[10px] text-muted-foreground">{a.date} · {a.by}</span>
                </div>
              ))}
            </DrilldownSection>
          </>
        )}
      </DrilldownDrawer>
    </div>
  );
}
