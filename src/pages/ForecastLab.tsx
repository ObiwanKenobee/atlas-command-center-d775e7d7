import { KPICard } from "@/components/atlas/KPICard";
import { WidgetCard } from "@/components/atlas/WidgetCard";
import { PageHeader } from "@/components/atlas/PageHeader";
import { FilterBar } from "@/components/atlas/FilterBar";
import { forecastData } from "@/lib/mock-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { useState } from "react";

const chartTooltipStyle = {
  contentStyle: { background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 16%, 18%)", borderRadius: "8px", fontSize: "12px" },
  labelStyle: { color: "hsl(210, 20%, 90%)" },
};

const quarterlyData = [
  { quarter: "Q1", commit: 1200, bestCase: 1500, upside: 1800, target: 1400 },
  { quarter: "Q2", commit: 1450, bestCase: 1800, upside: 2200, target: 1700 },
  { quarter: "Q3", commit: 1600, bestCase: 2100, upside: 2700, target: 2000 },
  { quarter: "Q4", commit: 1800, bestCase: 2400, upside: 3100, target: 2300 },
];

export default function ForecastLab() {
  const [winRate, setWinRate] = useState(26);
  const [acv, setAcv] = useState(50);
  const [churn, setChurn] = useState(5);
  const [cycle, setCycle] = useState(48);

  const adjustedForecast = quarterlyData.map(q => ({
    ...q,
    adjusted: Math.round(q.commit * (winRate / 26) * (acv / 50) * (1 - churn / 100)),
  }));

  return (
    <div className="flex flex-col gap-4 p-4">
      <PageHeader title="Forecast Lab" description="Revenue scenario planning — half BI dashboard, half mission control simulator." />
      <FilterBar />

      <div className="atlas-kpi-ribbon">
        <KPICard title="Commit" value="$1.2M" delta={0} quality="medium" tooltip="Deals with >80% probability" />
        <KPICard title="Best Case" value="$1.5M" delta={8.2} quality="medium" />
        <KPICard title="Upside" value="$1.8M" delta={12} quality="low" />
        <KPICard title="Target" value="$1.4M" delta={0} quality="high" />
        <KPICard title="Gap to Target" value="$200K" delta={-14.3} quality="low" tooltip="Commit vs Target delta" />
        <KPICard title="Forecast Accuracy" value="72%" delta={-6} quality="low" />
      </div>

      <div className="atlas-grid">
        <WidgetCard title="Forecast Cone" subtitle="Commit / Best Case / Upside vs Target" span={8}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={adjustedForecast}>
              <defs>
                <linearGradient id="upsideGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(195, 90%, 50%)" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="hsl(195, 90%, 50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="bestGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(195, 90%, 50%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(195, 90%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
              <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip {...chartTooltipStyle} />
              <Area type="monotone" dataKey="upside" stroke="hsl(195, 90%, 50%)" fill="url(#upsideGrad)" strokeWidth={1} strokeDasharray="3 3" />
              <Area type="monotone" dataKey="bestCase" stroke="hsl(195, 80%, 55%)" fill="url(#bestGrad)" strokeWidth={1.5} />
              <Area type="monotone" dataKey="commit" stroke="hsl(195, 90%, 50%)" fill="hsl(195, 90%, 50%, 0.15)" strokeWidth={2} />
              <Area type="monotone" dataKey="adjusted" stroke="hsl(160, 70%, 50%)" fill="none" strokeWidth={2} strokeDasharray="6 3" />
              <Area type="monotone" dataKey="target" stroke="hsl(38, 92%, 55%)" fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </WidgetCard>

        <WidgetCard title="Scenario Controls" span={4}>
          <div className="space-y-5 mt-2">
            {[
              { label: "Win Rate", value: winRate, set: setWinRate, min: 10, max: 50, unit: "%", base: 26 },
              { label: "Avg ACV", value: acv, set: setAcv, min: 20, max: 100, unit: "K", base: 50 },
              { label: "Churn Rate", value: churn, set: setChurn, min: 0, max: 15, unit: "%", base: 5 },
              { label: "Sales Cycle", value: cycle, set: setCycle, min: 20, max: 90, unit: "d", base: 48 },
            ].map((control) => (
              <div key={control.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground">{control.label}</span>
                  <span className="font-metric text-sm font-semibold text-foreground">{control.value}{control.unit}</span>
                </div>
                <input
                  type="range"
                  min={control.min}
                  max={control.max}
                  value={control.value}
                  onChange={(e) => control.set(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer accent-primary"
                />
                <div className="flex justify-between mt-0.5">
                  <span className="text-[10px] text-muted-foreground">{control.min}{control.unit}</span>
                  <span className="text-[10px] text-muted-foreground">Base: {control.base}{control.unit}</span>
                  <span className="text-[10px] text-muted-foreground">{control.max}{control.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>

        <WidgetCard title="Gap to Target" subtitle="Waterfall Analysis" span={6}>
          <div className="space-y-2 mt-2">
            {[
              { label: "Q1 Target", value: 1400, color: "hsl(215, 15%, 50%)" },
              { label: "Commit", value: 1200, color: "hsl(195, 90%, 50%)" },
              { label: "Gap", value: -200, color: "hsl(0, 72%, 55%)" },
              { label: "Best Case Fill", value: 300, color: "hsl(160, 70%, 50%)" },
              { label: "Net Position", value: 100, color: "hsl(160, 70%, 50%)" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="w-28 text-xs text-muted-foreground">{item.label}</span>
                <div className="flex-1 h-5 rounded bg-secondary overflow-hidden">
                  <div className="h-full rounded" style={{ width: `${(Math.abs(item.value) / 1400) * 100}%`, background: item.color }} />
                </div>
                <span className={`font-metric text-xs w-16 text-right ${item.value < 0 ? "text-atlas-negative" : "text-foreground"}`}>
                  {item.value < 0 ? "-" : ""}${Math.abs(item.value)}K
                </span>
              </div>
            ))}
          </div>
        </WidgetCard>

        <WidgetCard title="Assumption Log" span={6}>
          <div className="space-y-2">
            {[
              { change: "Win rate adjusted from 26% → 30%", user: "Alex M.", time: "2h ago", impact: "+$120K forecast" },
              { change: "Enterprise churn revised to 3.2%", user: "Sarah C.", time: "1d ago", impact: "+$80K NRR" },
              { change: "Mid-market ACV lowered to $45K", user: "Marcus J.", time: "2d ago", impact: "-$90K pipeline" },
              { change: "Q2 hiring plan added 3 AEs", user: "Alex M.", time: "3d ago", impact: "+$450K capacity" },
            ].map((log, i) => (
              <div key={i} className="flex items-start gap-3 rounded border border-border p-2.5">
                <div className="flex-1">
                  <p className="text-xs text-foreground">{log.change}</p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span>{log.user}</span>
                    <span>·</span>
                    <span>{log.time}</span>
                  </div>
                </div>
                <span className="font-metric text-[11px] font-semibold text-atlas-metric">{log.impact}</span>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
