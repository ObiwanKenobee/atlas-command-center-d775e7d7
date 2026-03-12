import { KPICard } from "@/components/atlas/KPICard";
import { WidgetCard } from "@/components/atlas/WidgetCard";
import { PageHeader } from "@/components/atlas/PageHeader";
import { FilterBar } from "@/components/atlas/FilterBar";
import { DataTable } from "@/components/atlas/DataTable";
import { DrilldownDrawer, DrilldownSection, DrilldownMetric } from "@/components/atlas/DrilldownDrawer";
import { useState } from "react";

const myAccounts = [
  { account: "Acme Corp", health: 92, arr: 240000, renewal: "2026-06-15", usage: 88, modules: 4, risk: "low", trend: "up" },
  { account: "TechFlow Inc", health: 78, arr: 180000, renewal: "2026-04-30", usage: 62, modules: 2, risk: "medium", trend: "stable" },
  { account: "FinServ Pro", health: 88, arr: 150000, renewal: "2026-08-22", usage: 76, modules: 3, risk: "low", trend: "up" },
  { account: "RetailMax", health: 71, arr: 95000, renewal: "2026-07-01", usage: 45, modules: 2, risk: "medium", trend: "stable" },
];

export default function MyAccounts() {
  const [selectedAccount, setSelectedAccount] = useState<typeof myAccounts[0] | null>(null);
  const totalARR = myAccounts.reduce((a, b) => a + b.arr, 0);

  return (
    <div className="flex flex-col gap-4 p-4">
      <PageHeader title="My Accounts" description="Your assigned accounts — health, renewals, and expansion opportunities." />
      <FilterBar />

      <div className="atlas-kpi-ribbon">
        <KPICard title="My ARR" value={`$${(totalARR / 1000).toFixed(0)}K`} delta={6.4} quality="high" />
        <KPICard title="Accounts" value={myAccounts.length.toString()} delta={0} quality="high" />
        <KPICard title="Avg Health" value={Math.round(myAccounts.reduce((a, b) => a + b.health, 0) / myAccounts.length).toString()} delta={2.1} quality="medium" />
        <KPICard title="Upcoming Renewals" value="2" delta={0} quality="medium" />
      </div>

      <div className="atlas-grid">
        <WidgetCard title="Account Portfolio" span={12}>
          <DataTable
            columns={[
              { key: "account", label: "Account", render: (r: any) => (
                <button onClick={() => setSelectedAccount(r)} className="text-primary hover:underline text-left font-medium">{r.account}</button>
              )},
              { key: "health", label: "Health", align: "center", mono: true, render: (r: any) => (
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  r.health >= 80 ? "bg-atlas-success/20 text-atlas-success" :
                  r.health >= 60 ? "bg-atlas-warning/20 text-atlas-warning" : "bg-atlas-danger/20 text-atlas-danger"
                }`}>{r.health}</span>
              )},
              { key: "arr", label: "ARR", align: "right", mono: true, render: (r: any) => `$${(r.arr / 1000).toFixed(0)}K` },
              { key: "usage", label: "Usage", align: "center", mono: true, render: (r: any) => `${r.usage}%` },
              { key: "modules", label: "Modules", align: "center", mono: true },
              { key: "renewal", label: "Renewal", align: "right", mono: true },
              { key: "risk", label: "Risk", align: "center", render: (r: any) => (
                <span className={`text-[10px] font-semibold uppercase ${
                  r.risk === "high" ? "text-atlas-danger" : r.risk === "medium" ? "text-atlas-warning" : "text-atlas-success"
                }`}>{r.risk}</span>
              )},
            ]}
            data={myAccounts as any}
          />
        </WidgetCard>

        <WidgetCard title="Health Trend" span={6}>
          <div className="space-y-2 mt-2">
            {myAccounts.map((a) => (
              <div key={a.account} className="flex items-center gap-3">
                <span className="w-24 text-xs text-muted-foreground truncate">{a.account}</span>
                <div className="flex-1 h-4 rounded bg-secondary overflow-hidden">
                  <div className="h-full rounded" style={{
                    width: `${a.health}%`,
                    background: a.health >= 80 ? "hsl(160, 70%, 50%)" : a.health >= 60 ? "hsl(38, 92%, 55%)" : "hsl(0, 72%, 55%)"
                  }} />
                </div>
                <span className="font-metric text-xs w-8 text-right text-foreground">{a.health}</span>
                <span className={a.trend === "up" ? "text-atlas-positive" : a.trend === "down" ? "text-atlas-negative" : "text-atlas-neutral"}>
                  {a.trend === "up" ? "↑" : a.trend === "down" ? "↓" : "→"}
                </span>
              </div>
            ))}
          </div>
        </WidgetCard>

        <WidgetCard title="Renewal Calendar" span={6}>
          <div className="space-y-2">
            {myAccounts.sort((a, b) => a.renewal.localeCompare(b.renewal)).map((a) => (
              <div key={a.account} className={`flex items-center justify-between rounded border p-2.5 ${
                a.risk === "medium" ? "border-atlas-warning/30 bg-atlas-warning/5" : "border-border"
              }`}>
                <div>
                  <span className="text-xs font-medium text-foreground">{a.account}</span>
                  <p className="text-[10px] text-muted-foreground">${(a.arr / 1000).toFixed(0)}K ARR</p>
                </div>
                <span className="font-metric text-xs text-foreground">{a.renewal}</span>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>

      <DrilldownDrawer
        open={!!selectedAccount}
        onClose={() => setSelectedAccount(null)}
        title={selectedAccount?.account ?? ""}
        subtitle={`Health: ${selectedAccount?.health} · ${selectedAccount?.risk} risk`}
      >
        {selectedAccount && (
          <>
            <DrilldownSection label="Account Overview">
              <DrilldownMetric label="ARR" value={`$${(selectedAccount.arr / 1000).toFixed(0)}K`} delta={6} />
              <DrilldownMetric label="Health Score" value={selectedAccount.health.toString()} delta={2} />
              <DrilldownMetric label="Usage" value={`${selectedAccount.usage}%`} />
              <DrilldownMetric label="Modules" value={selectedAccount.modules.toString()} />
              <DrilldownMetric label="Renewal" value={selectedAccount.renewal} />
            </DrilldownSection>
            <DrilldownSection label="Recent Activity">
              {[
                { action: "QBR completed", date: "Mar 8" },
                { action: "New users onboarded (3)", date: "Mar 3" },
                { action: "Support ticket resolved", date: "Feb 28" },
                { action: "Feature request submitted", date: "Feb 20" },
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
