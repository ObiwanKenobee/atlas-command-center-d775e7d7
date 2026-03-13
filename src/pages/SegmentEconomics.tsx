import { KPICard } from "@/components/atlas/KPICard";
import { WidgetCard } from "@/components/atlas/WidgetCard";
import { PageHeader } from "@/components/atlas/PageHeader";
import { FilterBar } from "@/components/atlas/FilterBar";
import { DataTable } from "@/components/atlas/DataTable";
import { DrilldownDrawer, DrilldownSection, DrilldownMetric } from "@/components/atlas/DrilldownDrawer";
import { segmentPerformance } from "@/lib/mock-data";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter, ZAxis } from "recharts";

const chartTooltipStyle = {
  contentStyle: { background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 16%, 18%)", borderRadius: "8px", fontSize: "12px" },
  labelStyle: { color: "hsl(210, 20%, 90%)" },
};

const profitabilityData = [
  { segment: "Enterprise", margin: 78, supportBurden: 12, strategicFit: 95 },
  { segment: "Mid-Market", margin: 65, supportBurden: 22, strategicFit: 80 },
  { segment: "SMB", margin: 42, supportBurden: 45, strategicFit: 55 },
  { segment: "Government", margin: 82, supportBurden: 8, strategicFit: 70 },
];

const scatterData = segmentPerformance.map((s) => ({
  name: s.segment,
  x: s.cac / 1000,
  y: s.ltv / 1000,
  z: s.arr,
}));

export default function SegmentEconomics() {
  const [selectedSegment, setSelectedSegment] = useState<any>(null);

  return (
    <div className="flex flex-col gap-4 p-4">
      <PageHeader title="Segment Economics" description="Who actually makes money — LTV, CAC, retention, and profitability by segment." />
      <FilterBar />

      <div className="atlas-kpi-ribbon">
        <KPICard title="LTV/CAC Ratio" value="12.4x" delta={8.2} quality="high" tooltip="Lifetime Value / Customer Acquisition Cost" />
        <KPICard title="Avg ACV" value="$48K" delta={5.1} quality="high" />
        <KPICard title="Retention Rate" value="91.2%" delta={1.2} quality="high" />
        <KPICard title="Gross Margin" value="67%" delta={-2.1} quality="medium" />
        <KPICard title="Blended CAC" value="$9.2K" delta={-4.5} quality="medium" />
      </div>

      <div className="atlas-grid">
        <WidgetCard title="Segment Performance" span={7}>
          <DataTable
            columns={[
              { key: "segment", label: "Segment" },
              { key: "arr", label: "ARR ($K)", align: "right", mono: true, render: (r: any) => `$${(r.arr / 1000).toFixed(0)}K` },
              { key: "cac", label: "CAC", align: "right", mono: true, render: (r: any) => `$${(r.cac / 1000).toFixed(1)}K` },
              { key: "ltv", label: "LTV", align: "right", mono: true, render: (r: any) => `$${(r.ltv / 1000).toFixed(0)}K` },
              { key: "ratio", label: "LTV/CAC", align: "right", mono: true, render: (r: any) => {
                const ratio = (r.ltv / r.cac).toFixed(1);
                return <span className={Number(ratio) >= 10 ? "text-atlas-positive" : Number(ratio) >= 5 ? "text-atlas-warning" : "text-atlas-negative"}>{ratio}x</span>;
              }},
              { key: "churn", label: "Churn%", align: "right", mono: true, render: (r: any) => (
                <span className={r.churn <= 3 ? "text-atlas-positive" : r.churn <= 6 ? "text-atlas-warning" : "text-atlas-negative"}>{r.churn}%</span>
              )},
            ]}
            data={segmentPerformance as any}
            onRowClick={(row: any) => setSelectedSegment(row)}
          />
        </WidgetCard>

        <WidgetCard title="LTV vs CAC" subtitle="Bubble = ARR" span={5}>
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
              <XAxis type="number" dataKey="x" name="CAC" unit="K" tick={{ fontSize: 10, fill: "hsl(215, 15%, 50%)" }} axisLine={false} />
              <YAxis type="number" dataKey="y" name="LTV" unit="K" tick={{ fontSize: 10, fill: "hsl(215, 15%, 50%)" }} axisLine={false} />
              <ZAxis type="number" dataKey="z" range={[60, 400]} />
              <Tooltip {...chartTooltipStyle} />
              <Scatter data={scatterData} fill="hsl(195, 90%, 50%)" />
            </ScatterChart>
          </ResponsiveContainer>
        </WidgetCard>

        <WidgetCard title="Profitability by Segment" span={6}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={profitabilityData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
              <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(215, 15%, 50%)" }} axisLine={false} domain={[0, 100]} />
              <YAxis type="category" dataKey="segment" tick={{ fontSize: 10, fill: "hsl(215, 15%, 50%)" }} axisLine={false} width={80} />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="margin" name="Margin %" fill="hsl(160, 70%, 50%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </WidgetCard>

        <WidgetCard title="Churn by Segment" span={6}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={segmentPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
              <XAxis dataKey="segment" tick={{ fontSize: 10, fill: "hsl(215, 15%, 50%)" }} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(215, 15%, 50%)" }} axisLine={false} unit="%" />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="churn" radius={[4, 4, 0, 0]}>
                {segmentPerformance.map((s, i) => (
                  <Cell key={i} fill={s.churn <= 3 ? "hsl(160, 70%, 50%)" : s.churn <= 6 ? "hsl(38, 92%, 55%)" : "hsl(0, 72%, 55%)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </WidgetCard>
      </div>

      <DrilldownDrawer
        open={!!selectedSegment}
        onClose={() => setSelectedSegment(null)}
        title={`${selectedSegment?.segment ?? ""} Segment`}
        subtitle="Segment Economics Detail"
      >
        {selectedSegment && (() => {
          const prof = profitabilityData.find(p => p.segment === selectedSegment.segment);
          return (
            <>
              <DrilldownSection label="Revenue Metrics">
                <DrilldownMetric label="ARR" value={`$${(selectedSegment.arr / 1000).toFixed(0)}K`} delta={8} />
                <DrilldownMetric label="LTV" value={`$${(selectedSegment.ltv / 1000).toFixed(0)}K`} />
                <DrilldownMetric label="CAC" value={`$${(selectedSegment.cac / 1000).toFixed(1)}K`} />
                <DrilldownMetric label="LTV/CAC" value={`${(selectedSegment.ltv / selectedSegment.cac).toFixed(1)}x`} />
                <DrilldownMetric label="Churn Rate" value={`${selectedSegment.churn}%`} delta={-selectedSegment.churn} />
              </DrilldownSection>
              <DrilldownSection label="Profitability">
                <DrilldownMetric label="Gross Margin" value={`${prof?.margin ?? 0}%`} />
                <DrilldownMetric label="Support Burden" value={`${prof?.supportBurden ?? 0}%`} />
                <DrilldownMetric label="Strategic Fit" value={`${prof?.strategicFit ?? 0}/100`} />
              </DrilldownSection>
              <DrilldownSection label="Top Accounts">
                {[
                  { name: "Account Alpha", arr: "$120K", health: 88 },
                  { name: "Account Beta", arr: "$95K", health: 72 },
                  { name: "Account Gamma", arr: "$78K", health: 91 },
                ].map((a, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0">
                    <span className="text-xs text-foreground">{a.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-metric text-xs text-foreground">{a.arr}</span>
                      <span className={`font-metric text-[10px] ${a.health >= 80 ? "text-atlas-positive" : "text-atlas-warning"}`}>{a.health}</span>
                    </div>
                  </div>
                ))}
              </DrilldownSection>
            </>
          );
        })()}
      </DrilldownDrawer>
    </div>
  );
}
