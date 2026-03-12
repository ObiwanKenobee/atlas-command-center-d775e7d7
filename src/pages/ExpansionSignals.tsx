import { KPICard } from "@/components/atlas/KPICard";
import { WidgetCard } from "@/components/atlas/WidgetCard";
import { PageHeader } from "@/components/atlas/PageHeader";
import { FilterBar } from "@/components/atlas/FilterBar";
import { DataTable } from "@/components/atlas/DataTable";
import { healthScores } from "@/lib/mock-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartTooltipStyle = {
  contentStyle: { background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 16%, 18%)", borderRadius: "8px", fontSize: "12px" },
  labelStyle: { color: "hsl(210, 20%, 90%)" },
};

const adoptionData = [
  { account: "Acme Corp", modules: 4, depth: 88, stakeholders: 12, readiness: 92 },
  { account: "FinServ Pro", modules: 3, depth: 76, stakeholders: 8, readiness: 85 },
  { account: "TechFlow Inc", modules: 2, depth: 58, stakeholders: 5, readiness: 62 },
  { account: "RetailMax", modules: 2, depth: 45, stakeholders: 4, readiness: 48 },
  { account: "GlobalEd", modules: 1, depth: 22, stakeholders: 2, readiness: 18 },
  { account: "MediCare Plus", modules: 3, depth: 65, stakeholders: 7, readiness: 55 },
];

const usageCorrelation = [
  { month: "Jul", singleModule: 78, multiModule: 95 },
  { month: "Aug", singleModule: 75, multiModule: 94 },
  { month: "Sep", singleModule: 72, multiModule: 96 },
  { month: "Oct", singleModule: 70, multiModule: 95 },
  { month: "Nov", singleModule: 68, multiModule: 97 },
  { month: "Dec", singleModule: 65, multiModule: 96 },
];

export default function ExpansionSignals() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <PageHeader title="Strategic Expansion Signals" description="Discover which accounts are primed to grow — usage, adoption, and engagement intelligence." />
      <FilterBar />

      <div className="atlas-kpi-ribbon">
        <KPICard title="Avg Modules/Account" value="2.5" delta={12} quality="medium" />
        <KPICard title="Expansion Readiness" value="62%" delta={8.4} quality="medium" tooltip="% of accounts scoring >70 on readiness" />
        <KPICard title="Multi-Module Rate" value="58%" delta={15} quality="high" />
        <KPICard title="Stakeholder Density" value="6.3" delta={4.2} quality="medium" tooltip="Avg engaged stakeholders per account" />
        <KPICard title="Expansion Pipeline" value="$1.8M" delta={22} quality="high" />
      </div>

      <div className="atlas-grid">
        <WidgetCard title="Expansion Readiness Matrix" span={7}>
          <DataTable
            columns={[
              { key: "account", label: "Account" },
              { key: "modules", label: "Modules", align: "center", mono: true },
              { key: "depth", label: "Depth", align: "center", mono: true, render: (r: any) => (
                <div className="flex items-center gap-2 justify-center">
                  <div className="h-1.5 w-12 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${r.depth}%` }} />
                  </div>
                  <span>{r.depth}%</span>
                </div>
              )},
              { key: "stakeholders", label: "Stakeholders", align: "center", mono: true },
              { key: "readiness", label: "Readiness", align: "center", mono: true, render: (r: any) => (
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  r.readiness >= 80 ? "bg-atlas-success/20 text-atlas-success" :
                  r.readiness >= 50 ? "bg-atlas-warning/20 text-atlas-warning" : "bg-atlas-danger/20 text-atlas-danger"
                }`}>{r.readiness}</span>
              )},
            ]}
            data={adoptionData as any}
          />
        </WidgetCard>

        <WidgetCard title="Usage vs Renewal Retention" subtitle="Single vs Multi-module" span={5}>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={usageCorrelation}>
              <defs>
                <linearGradient id="multiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(160, 70%, 50%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(160, 70%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(215, 15%, 50%)" }} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(215, 15%, 50%)" }} axisLine={false} domain={[50, 100]} unit="%" />
              <Tooltip {...chartTooltipStyle} />
              <Area type="monotone" dataKey="multiModule" name="Multi-Module" stroke="hsl(160, 70%, 50%)" fill="url(#multiGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="singleModule" name="Single Module" stroke="hsl(38, 92%, 55%)" fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </WidgetCard>

        <WidgetCard title="Adoption Fingerprint" span={6}>
          <div className="space-y-3 mt-2">
            {adoptionData.slice(0, 4).map((account) => (
              <div key={account.account} className="rounded border border-border p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-foreground">{account.account}</span>
                  <span className="font-metric text-[10px] text-atlas-metric">{account.modules} modules</span>
                </div>
                <div className="flex gap-1">
                  {["Core", "Analytics", "Automation", "Integration"].map((mod, i) => (
                    <div
                      key={mod}
                      className={`flex-1 h-5 rounded text-center text-[9px] leading-5 font-medium ${
                        i < account.modules ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground/40"
                      }`}
                    >
                      {mod}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>

        <WidgetCard title="Executive Engagement" span={6}>
          <div className="space-y-2">
            {[
              { account: "Acme Corp", sponsor: "VP Ops", lastActivity: "2 days ago", engagement: "high" },
              { account: "FinServ Pro", sponsor: "CTO", lastActivity: "5 days ago", engagement: "high" },
              { account: "TechFlow Inc", sponsor: "Dir. Eng", lastActivity: "14 days ago", engagement: "medium" },
              { account: "GlobalEd", sponsor: "None mapped", lastActivity: "N/A", engagement: "low" },
              { account: "MediCare Plus", sponsor: "COO", lastActivity: "21 days ago", engagement: "low" },
            ].map((a) => (
              <div key={a.account} className="flex items-center justify-between rounded border border-border p-2.5">
                <div>
                  <span className="text-xs font-semibold text-foreground">{a.account}</span>
                  <p className="text-[10px] text-muted-foreground">{a.sponsor} · {a.lastActivity}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  a.engagement === "high" ? "bg-atlas-success/20 text-atlas-success" :
                  a.engagement === "medium" ? "bg-atlas-warning/20 text-atlas-warning" : "bg-atlas-danger/20 text-atlas-danger"
                }`}>{a.engagement}</span>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
