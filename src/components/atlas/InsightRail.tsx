import { AlertCard } from "./AlertCard";
import { alerts } from "@/lib/mock-data";
import { Sparkles, Bell } from "lucide-react";

export function InsightRail() {
  return (
    <div className="flex w-72 shrink-0 flex-col gap-4 border-l border-border bg-atlas-surface-1 p-4 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Alerts</h3>
        </div>
        <span className="rounded-full bg-atlas-danger/20 px-2 py-0.5 font-metric text-[10px] font-semibold text-atlas-danger">
          {alerts.filter(a => a.severity === "high").length} critical
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} {...alert} />
        ))}
      </div>

      <div className="mt-2 border-t border-border pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">AI Insights</h3>
        </div>
        <div className="space-y-3">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <p className="text-[11px] leading-relaxed text-foreground">
              Accounts using 3+ modules show <span className="font-semibold text-atlas-positive">3.2x higher expansion rate</span>. 
              Consider bundling onboarding for multi-module adoption.
            </p>
          </div>
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <p className="text-[11px] leading-relaxed text-foreground">
              Enterprise deals with executive sponsor engagement close <span className="font-semibold text-atlas-positive">40% faster</span>.
              12 deals in pipeline lack sponsor mapping.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
