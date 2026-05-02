import { Search, Bell, ChevronDown, Calendar, Bookmark, User } from "lucide-react";
import { useRole, roleLabels, UserRole } from "@/lib/roles";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { CommandPalette, useCommandPaletteHotkey } from "@/components/atlas/CommandPalette";

export function TopNav() {
  const { role, setRole } = useRole();
  const [roleOpen, setRoleOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  useCommandPaletteHotkey(setPaletteOpen);

  return (
    <header className="flex h-12 items-center justify-between border-b border-border bg-atlas-surface-1 px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <span className="font-metric text-sm font-bold text-primary-foreground">A</span>
          </div>
          <span className="text-sm font-bold text-foreground tracking-tight">ATLAS</span>
        </div>

        <button className="flex items-center gap-1 rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground hover:bg-accent">
          Acme Corp
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>

        <button className="flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground hover:bg-accent">
          <Calendar className="h-3 w-3" />
          Q1 2026
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setPaletteOpen(true)}
          className="flex items-center gap-2 rounded-md border border-border bg-secondary px-2.5 py-1 text-xs hover:bg-accent"
        >
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">Search…</span>
          <kbd className="rounded border border-border bg-atlas-surface-0 px-1 py-0.5 font-metric text-[10px] text-muted-foreground">⌘K</kbd>
        </button>

        <button className="rounded p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
          <Bookmark className="h-4 w-4" />
        </button>

        <button className="relative rounded p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-atlas-danger" />
        </button>

        {/* Role selector + user */}
        <Popover open={roleOpen} onOpenChange={setRoleOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-secondary">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                <User className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-xs font-medium text-foreground">Alex Morgan</span>
                <span className="text-[10px] text-muted-foreground">{roleLabels[role]}</span>
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-52 p-1" align="end">
            <p className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Switch Role</p>
            {(Object.keys(roleLabels) as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => { setRole(r); setRoleOpen(false); }}
                className={`flex w-full items-center rounded px-2 py-1.5 text-xs hover:bg-secondary ${
                  role === r ? "text-primary font-medium" : "text-foreground"
                }`}
              >
                {roleLabels[r]}
              </button>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
