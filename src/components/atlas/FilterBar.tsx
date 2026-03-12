import { Filter, Calendar, ChevronDown, X, Save } from "lucide-react";

const filters = [
  { label: "Date Range", value: "Last 90 Days" },
  { label: "Segment", value: "All" },
  { label: "Region", value: "All" },
  { label: "Product", value: "All" },
];

export function FilterBar() {
  return (
    <div className="atlas-filter-bar">
      <Filter className="h-3.5 w-3.5 text-muted-foreground" />
      
      {filters.map((filter) => (
        <button
          key={filter.label}
          className="flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent"
        >
          {filter.label === "Date Range" && <Calendar className="h-3 w-3" />}
          <span className="text-muted-foreground">{filter.label}:</span>
          <span>{filter.value}</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
      ))}

      <div className="ml-auto flex items-center gap-2">
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <Save className="h-3 w-3" />
          Save View
        </button>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <X className="h-3 w-3" />
          Clear
        </button>
      </div>
    </div>
  );
}
