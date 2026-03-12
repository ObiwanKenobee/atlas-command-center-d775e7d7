import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface KPICardProps {
  title: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  sparkData?: number[];
  quality?: "high" | "medium" | "low";
  tooltip?: string;
  prefix?: string;
}

export function KPICard({ title, value, delta, deltaLabel, sparkData, quality, tooltip, prefix }: KPICardProps) {
  const isPositive = delta && delta > 0;
  const isNegative = delta && delta < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="atlas-panel min-w-[180px] flex-1 flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</span>
        <div className="flex items-center gap-1">
          {quality && (
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                quality === "high" ? "bg-atlas-success" : quality === "medium" ? "bg-atlas-warning" : "bg-atlas-danger"
              }`}
            />
          )}
          {tooltip && (
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      <div className="font-metric text-2xl font-semibold text-foreground">
        {prefix}{value}
      </div>

      <div className="flex items-center justify-between">
        {delta !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            isPositive ? "text-atlas-positive" : isNegative ? "text-atlas-negative" : "text-atlas-neutral"
          }`}>
            {isPositive ? <TrendingUp className="h-3 w-3" /> : isNegative ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
            <span>{isPositive ? "+" : ""}{delta}%</span>
            {deltaLabel && <span className="text-muted-foreground">{deltaLabel}</span>}
          </div>
        )}

        {sparkData && (
          <svg viewBox="0 0 60 20" className="h-5 w-16">
            <polyline
              fill="none"
              stroke={isPositive ? "hsl(160, 70%, 50%)" : isNegative ? "hsl(0, 72%, 58%)" : "hsl(195, 90%, 50%)"}
              strokeWidth="1.5"
              points={sparkData.map((v, i) => `${(i / (sparkData.length - 1)) * 60},${20 - (v / Math.max(...sparkData)) * 18}`).join(" ")}
            />
          </svg>
        )}
      </div>
    </motion.div>
  );
}
