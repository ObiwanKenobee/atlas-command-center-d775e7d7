import { KPICard } from "@/components/atlas/KPICard";
import { WidgetCard } from "@/components/atlas/WidgetCard";
import { PageHeader } from "@/components/atlas/PageHeader";
import { FilterBar } from "@/components/atlas/FilterBar";
import { DataTable } from "@/components/atlas/DataTable";
import { segmentPerformance } from "@/lib/mock-data";
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
    </div>
  );
}
