import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Maximize2, MoreHorizontal, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface WidgetCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  span?: number;
  className?: string;
  tooltip?: string;
  actions?: ReactNode;
}

export function WidgetCard({ title, subtitle, children, span = 6, className = "", tooltip, actions }: WidgetCardProps) {
  const colSpan = `col-span-12 lg:col-span-${span}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`atlas-panel flex flex-col ${colSpan} ${className}`}
      style={{ gridColumn: `span ${span} / span ${span}` }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {tooltip && (
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3.5 w-3.5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[200px]">{tooltip}</TooltipContent>
            </Tooltip>
          )}
          {subtitle && <span className="text-xs text-muted-foreground">· {subtitle}</span>}
        </div>
        <div className="flex items-center gap-1">
          {actions}
          <button className="rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
          <button className="rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </motion.div>
  );
}
