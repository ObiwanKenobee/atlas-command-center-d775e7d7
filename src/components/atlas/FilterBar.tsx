import { Filter, Calendar, ChevronDown, X, Save, Check } from "lucide-react";
import { useFilters, filterOptions } from "@/lib/filters";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

function MultiSelectFilter({ label, options, selected, onChange }: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const toggle = (val: string) => {
    onChange(selected.includes(val) ? selected.filter((s) => s !== val) : [...selected, val]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent">
          <span className="text-muted-foreground">{label}:</span>
          <span>{selected.length > 0 ? `${selected.length} selected` : "All"}</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-1" align="start">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs hover:bg-secondary"
          >
            <div className={`flex h-3.5 w-3.5 items-center justify-center rounded border ${
              selected.includes(opt) ? "border-primary bg-primary" : "border-border"
            }`}>
              {selected.includes(opt) && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
            </div>
            <span className="text-foreground">{opt}</span>
          </button>
        ))}
        {selected.length > 0 && (
          <button onClick={() => onChange([])} className="mt-1 w-full rounded px-2 py-1 text-[10px] text-muted-foreground hover:text-foreground">
            Clear
          </button>
        )}
      </PopoverContent>
    </Popover>
  );
}

function DateRangeFilter({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent">
          <Calendar className="h-3 w-3" />
          <span className="text-muted-foreground">Date Range:</span>
          <span>{value}</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-1" align="start">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => { onChange(opt); setOpen(false); }}
            className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs hover:bg-secondary ${
              value === opt ? "text-primary font-medium" : "text-foreground"
            }`}
          >
            {opt}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function SavedViewMenu() {
  const { savedViews, loadView, saveCurrentView } = useFilters();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <Save className="h-3 w-3" />
          Save View
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end">
        {!saving ? (
          <>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1">Saved Views</p>
            {savedViews.map((v) => (
              <button key={v.id} onClick={() => { loadView(v.id); setOpen(false); }} className="flex w-full items-center rounded px-2 py-1.5 text-xs text-foreground hover:bg-secondary">
                {v.name}
              </button>
            ))}
            <button onClick={() => setSaving(true)} className="mt-1 w-full rounded border border-dashed border-border px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground">
              + Save current
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="View name..."
              className="rounded border border-border bg-secondary px-2 py-1 text-xs text-foreground outline-none focus:border-primary"
            />
            <div className="flex gap-1">
              <button onClick={() => { if (name) { saveCurrentView(name); setName(""); setSaving(false); setOpen(false); } }} className="flex-1 rounded bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">Save</button>
              <button onClick={() => { setSaving(false); setName(""); }} className="rounded border border-border px-2 py-1 text-xs text-muted-foreground">Cancel</button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export function FilterBar() {
  const { filters, updateFilter, clearFilters, activeFilterCount } = useFilters();

  return (
    <div className="flex flex-col gap-2">
      <div className="atlas-filter-bar">
        <Filter className="h-3.5 w-3.5 text-muted-foreground" />

        <DateRangeFilter value={filters.dateRange} options={filterOptions.dateRange} onChange={(v) => updateFilter("dateRange", v)} />
        <MultiSelectFilter label="Segment" options={filterOptions.segment} selected={filters.segment} onChange={(v) => updateFilter("segment", v)} />
        <MultiSelectFilter label="Region" options={filterOptions.region} selected={filters.region} onChange={(v) => updateFilter("region", v)} />
        <MultiSelectFilter label="Product" options={filterOptions.product} selected={filters.product} onChange={(v) => updateFilter("product", v)} />
        <MultiSelectFilter label="Owner" options={filterOptions.owner} selected={filters.owner} onChange={(v) => updateFilter("owner", v)} />

        <div className="ml-auto flex items-center gap-2">
          <SavedViewMenu />
          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <X className="h-3 w-3" />
              Clear ({activeFilterCount})
            </button>
          )}
        </div>
      </div>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {filters.dateRange !== "Last 90 Days" && (
            <span className="flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
              {filters.dateRange}
              <X className="h-2.5 w-2.5 cursor-pointer" onClick={() => updateFilter("dateRange", "Last 90 Days")} />
            </span>
          )}
          {(["segment", "region", "product", "owner"] as const).map((key) =>
            filters[key].map((val) => (
              <span key={`${key}-${val}`} className="flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
                {val}
                <X className="h-2.5 w-2.5 cursor-pointer" onClick={() => updateFilter(key, filters[key].filter((v) => v !== val))} />
              </span>
            ))
          )}
        </div>
      )}
    </div>
  );
}
