import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  Megaphone,
  GitBranch,
  HeartPulse,
  TrendingUp,
  ShieldCheck,
  PieChart,
  Sparkles,
  FileText,
  User,
  Briefcase,
  Building2,
  Target,
} from "lucide-react";
import {
  healthScores,
  repPerformance,
  campaignData,
} from "@/lib/mock-data";

const screens = [
  { label: "Executive Command", path: "/", icon: LayoutDashboard },
  { label: "Demand Engine", path: "/demand", icon: Megaphone },
  { label: "Pipeline Intelligence", path: "/pipeline", icon: GitBranch },
  { label: "Customer Health", path: "/health", icon: HeartPulse },
  { label: "Forecast Lab", path: "/forecast", icon: TrendingUp },
  { label: "Operational Integrity", path: "/operations", icon: ShieldCheck },
  { label: "Segment Economics", path: "/segments", icon: PieChart },
  { label: "Expansion Signals", path: "/expansion", icon: Sparkles },
  { label: "Reports", path: "/reports", icon: FileText },
  { label: "My Pipeline", path: "/my-pipeline", icon: Briefcase },
  { label: "My Accounts", path: "/my-accounts", icon: User },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: Props) {
  const navigate = useNavigate();

  const go = (path: string) => {
    onOpenChange(false);
    navigate(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search dashboards, accounts, deals, campaigns…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Dashboards">
          {screens.map((s) => (
            <CommandItem key={s.path} onSelect={() => go(s.path)} value={`dash ${s.label}`}>
              <s.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{s.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Accounts">
          {healthScores.map((a) => (
            <CommandItem key={a.account} onSelect={() => go("/health")} value={`acct ${a.account}`}>
              <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{a.account}</span>
              <span className="ml-auto font-metric text-xs text-muted-foreground">Health {a.score}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Reps & Deals">
          {repPerformance.map((r) => (
            <CommandItem key={r.name} onSelect={() => go("/pipeline")} value={`deal ${r.name}`}>
              <Target className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{r.name}</span>
              <span className="ml-auto font-metric text-xs text-muted-foreground">
                ${(r.pipeline / 1000).toFixed(0)}K pipeline
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Campaigns">
          {campaignData.map((c) => (
            <CommandItem key={c.name} onSelect={() => go("/demand")} value={`camp ${c.name}`}>
              <Megaphone className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{c.name}</span>
              <span className="ml-auto font-metric text-xs text-muted-foreground">{c.roi}x ROI</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function useCommandPaletteHotkey(setOpen: (v: boolean | ((p: boolean) => boolean)) => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((p: boolean) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);
}
