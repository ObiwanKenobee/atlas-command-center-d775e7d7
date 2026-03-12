import { AlertTriangle, AlertCircle, Info, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface AlertCardProps {
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  impact: string;
  action: string;
  timestamp: string;
}

const severityConfig = {
  high: { icon: AlertTriangle, bg: "bg-atlas-danger/10", border: "border-atlas-danger/30", text: "text-atlas-danger", label: "HIGH" },
  medium: { icon: AlertCircle, bg: "bg-atlas-warning/10", border: "border-atlas-warning/30", text: "text-atlas-warning", label: "MED" },
  low: { icon: Info, bg: "bg-atlas-info/10", border: "border-atlas-info/30", text: "text-atlas-info", label: "LOW" },
};

export function AlertCard({ severity, title, description, impact, action, timestamp }: AlertCardProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      className={`rounded-lg border ${config.border} ${config.bg} p-3 transition-colors hover:brightness-110 cursor-pointer`}
    >
      <div className="mb-2 flex items-start gap-2">
        <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${config.text}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${config.text}`}>{config.label}</span>
            <span className="text-[10px] text-muted-foreground">{timestamp}</span>
          </div>
          <p className="mt-0.5 text-xs font-semibold text-foreground leading-tight">{title}</p>
        </div>
      </div>
      <p className="mb-2 text-[11px] leading-relaxed text-muted-foreground">{description}</p>
      <div className="flex items-center justify-between">
        <span className="font-metric text-[11px] font-semibold text-foreground">{impact}</span>
        <button className="flex items-center gap-0.5 text-[11px] font-medium text-primary hover:underline">
          {action.length > 25 ? action.slice(0, 25) + "…" : action}
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </motion.div>
  );
}
