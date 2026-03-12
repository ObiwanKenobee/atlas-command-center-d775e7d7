import { KPICard } from "@/components/atlas/KPICard";
import { WidgetCard } from "@/components/atlas/WidgetCard";
import { PageHeader } from "@/components/atlas/PageHeader";
import { FilterBar } from "@/components/atlas/FilterBar";
import { DataTable } from "@/components/atlas/DataTable";
import { campaignData, leadsBySource, funnelData } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const chartTooltipStyle = {
  contentStyle: { background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 16%, 18%)", borderRadius: "8px", fontSize: "12px" },
  labelStyle: { color: "hsl(210, 20%, 90%)" },
};

export default function DemandEngine() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <PageHeader title="Demand Engine" description="Marketing performance, lead quality, and channel attribution." />
      <FilterBar />

      <div className="atlas-kpi-ribbon">
        <KPICard title="Total Leads" value="4,200" delta={14.2} sparkData={[320, 340, 380, 400, 420, 410, 440, 460, 480]} quality="high" />
        <KPICard title="MQLs" value="1,680" delta={22.5} sparkData={[120, 130, 145, 150, 160, 155, 170, 175, 180]} quality="high" />
        <KPICard title="SQLs" value="756" delta={18.8} quality="high" />
        <KPICard title="Lead Velocity" value="+12%" delta={4.5} quality="medium" tooltip="Month-over-month lead growth rate" />
        <KPICard title="CAC" value="$4,200" delta={-6.3} quality="medium" tooltip="Customer Acquisition Cost" />
        <KPICard title="Pipeline Created" value="$2.9M" delta={28.4} quality="high" />
      </div>

      <div className="atlas-grid">
        <WidgetCard title="Leads by Source" span={6}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={leadsBySource}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
              <XAxis dataKey="source" tick={{ fontSize: 10, fill: "hsl(215, 15%, 50%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} axisLine={false} tickLine={false} />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="leads" fill="hsl(195, 90%, 50%)" radius={[4, 4, 0, 0]} opacity={0.4} />
              <Bar dataKey="mqls" fill="hsl(195, 90%, 50%)" radius={[4, 4, 0, 0]} opacity={0.7} />
              <Bar dataKey="sqls" fill="hsl(195, 90%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </WidgetCard>

        <WidgetCard title="Conversion Funnel" subtitle="Visitor → Closed Won" span={6}>
          <div className="space-y-3 mt-2">
            {funnelData.map((stage, i) => {
              const width = (stage.value / funnelData[0].value) * 100;
              return (
                <div key={stage.stage} className="flex items-center gap-3">
                  <span className="w-28 text-xs text-muted-foreground">{stage.stage}</span>
                  <div className="flex-1 h-7 rounded bg-secondary overflow-hidden relative">
                    <div
                      className="h-full rounded flex items-center justify-end pr-2 transition-all"
                      style={{ width: `${Math.max(width, 5)}%`, background: `hsl(${195 - i * 12}, 80%, ${45 + i * 4}%)` }}
                    >
                      <span className="font-metric text-[10px] font-semibold text-foreground">{stage.value.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    {i > 0 && <span className="font-metric text-xs text-atlas-metric">{stage.rate}%</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </WidgetCard>

        <WidgetCard title="Campaign Performance" span={12}>
          <DataTable
            columns={[
              { key: "name", label: "Campaign" },
              { key: "spend", label: "Spend", align: "right", mono: true, render: (r: any) => `$${(r.spend / 1000).toFixed(0)}K` },
              { key: "leads", label: "Leads", align: "right", mono: true },
              { key: "mqls", label: "MQLs", align: "right", mono: true },
              { key: "sqls", label: "SQLs", align: "right", mono: true },
              { key: "pipeline", label: "Pipeline", align: "right", mono: true, render: (r: any) => `$${(r.pipeline / 1000).toFixed(0)}K` },
              { key: "roi", label: "ROI", align: "right", mono: true, render: (r: any) => (
                <span className={r.roi >= 20 ? "text-atlas-positive" : r.roi >= 10 ? "text-atlas-warning" : "text-atlas-negative"}>
                  {r.roi}x
                </span>
              )},
            ]}
            data={campaignData as any}
          />
        </WidgetCard>
      </div>
    </div>
  );
}
