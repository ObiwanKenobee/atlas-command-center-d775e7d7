import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Info, AlertTriangle, Settings2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSettings } from "@/lib/settings";
import { useState } from "react";

interface KPICardProps {
  title: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  sparkData?: number[];
  quality?: "high" | "medium" | "low";
  tooltip?: string;
  prefix?: string;
  /** Absolute % delta beyond which the card pulses as an anomaly. Default 15. */
  anomalyThreshold?: number;
  /** "negative" (default) flags large drops; "positive" flags large gains; "any" flags both directions. */
  anomalyDirection?: "negative" | "positive" | "any";
}

export function KPICard({ title, value, delta, deltaLabel, sparkData, quality, tooltip, prefix, anomalyThreshold = 15, anomalyDirection = "negative" }: KPICardProps) {
  const { getAnomalyThreshold, updateAnomalyThreshold } = useSettings();
  const currentThreshold = getAnomalyThreshold(title, anomalyThreshold);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const isPositive = delta && delta > 0;
  const isNegative = delta && delta < 0;

  const isAnomaly =
    delta !== undefined &&
    (anomalyDirection === "any"
      ? Math.abs(delta) >= currentThreshold
      : anomalyDirection === "positive"
      ? delta >= currentThreshold
      : delta <= -currentThreshold);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`atlas-panel group min-w-[180px] flex-1 flex flex-col gap-2 relative ${isAnomaly ? "atlas-anomaly-pulse" : ""}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</span>
        <div className="flex items-center gap-1">
          {isAnomaly && (
            <Tooltip>
              <TooltipTrigger>
                <AlertTriangle className="h-3 w-3 text-atlas-danger" />
              </TooltipTrigger>
              <TooltipContent>Anomaly: {delta}% deviation exceeds {currentThreshold}% threshold</TooltipContent>
            </Tooltip>
          )}
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
          
          <Popover open={settingsOpen} onOpenChange={setSettingsOpen}>
            <PopoverTrigger asChild>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity rounded p-1 hover:bg-secondary text-muted-foreground hover:text-foreground">
                <Settings2 className="h-3 w-3" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3" align="end" onClick={(e) => e.stopPropagation()}>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm">Anomaly Sensitivity</h4>
                  <p className="text-xs text-muted-foreground">Alert when deviation exceeds this threshold.</p>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={currentThreshold}
                    onChange={(e) => updateAnomalyThreshold(title, Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="font-metric text-sm w-8 text-right">{currentThreshold}%</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
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
