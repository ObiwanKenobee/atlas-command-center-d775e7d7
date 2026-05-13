import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { X, RotateCcw } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useFilters } from "@/lib/filters";

interface DrilldownDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function DrilldownDrawer({ open, onClose, title, subtitle, children }: DrilldownDrawerProps) {
  const { clearFilters } = useFilters();
  const [cached, setCached] = useState({ title, subtitle, children });

  useEffect(() => {
    if (open) {
      setCached({ title, subtitle, children });
    }
  }, [open, title, subtitle, children]);

  const displayTitle = open ? title : cached.title;
  const displaySubtitle = open ? subtitle : cached.subtitle;
  const displayChildren = open && children ? children : cached.children;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-[520px] sm:max-w-[520px] bg-card border-border overflow-y-auto">
        <SheetHeader className="mb-4">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-foreground">{displayTitle}</SheetTitle>
              {displaySubtitle && <SheetDescription className="text-muted-foreground">{displaySubtitle}</SheetDescription>}
            </div>
            <button
              onClick={() => {
                clearFilters();
                onClose();
              }}
              className="flex items-center gap-1.5 rounded-md bg-secondary/50 px-2 py-1 text-[10px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              Reset View
            </button>
          </div>
        </SheetHeader>
        <div className="flex flex-col gap-4">{displayChildren}</div>
      </SheetContent>
    </Sheet>
  );
}

interface DrilldownSectionProps {
  label: string;
  children: ReactNode;
}

export function DrilldownSection({ label, children }: DrilldownSectionProps) {
  return (
    <div className="rounded-lg border border-border bg-secondary/30 p-3">
      <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">{label}</h4>
      {children}
    </div>
  );
}

export function DrilldownMetric({ label, value, delta }: { label: string; value: string; delta?: number }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-metric text-sm font-semibold text-foreground">{value}</span>
        {delta !== undefined && (
          <span className={`font-metric text-[10px] font-semibold ${delta >= 0 ? "text-atlas-positive" : "text-atlas-negative"}`}>
            {delta >= 0 ? "+" : ""}{delta}%
          </span>
        )}
      </div>
    </div>
  );
}
