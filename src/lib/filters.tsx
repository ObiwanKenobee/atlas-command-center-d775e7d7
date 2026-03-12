import { createContext, useContext, useState, ReactNode } from "react";

export interface FilterState {
  dateRange: string;
  segment: string[];
  region: string[];
  product: string[];
  owner: string[];
}

const defaultFilters: FilterState = {
  dateRange: "Last 90 Days",
  segment: [],
  region: [],
  product: [],
  owner: [],
};

export interface SavedView {
  id: string;
  name: string;
  filters: FilterState;
}

const defaultViews: SavedView[] = [
  { id: "1", name: "Enterprise Q1", filters: { ...defaultFilters, segment: ["Enterprise"], dateRange: "Q1 2026" } },
  { id: "2", name: "All Regions", filters: { ...defaultFilters } },
];

interface FilterContextValue {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  clearFilters: () => void;
  savedViews: SavedView[];
  saveCurrentView: (name: string) => void;
  loadView: (id: string) => void;
  activeFilterCount: number;
}

const FilterContext = createContext<FilterContextValue>({} as FilterContextValue);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [savedViews, setSavedViews] = useState<SavedView[]>(defaultViews);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters(defaultFilters);

  const saveCurrentView = (name: string) => {
    setSavedViews((prev) => [...prev, { id: Date.now().toString(), name, filters: { ...filters } }]);
  };

  const loadView = (id: string) => {
    const view = savedViews.find((v) => v.id === id);
    if (view) setFilters({ ...view.filters });
  };

  const activeFilterCount =
    (filters.dateRange !== defaultFilters.dateRange ? 1 : 0) +
    filters.segment.length +
    filters.region.length +
    filters.product.length +
    filters.owner.length;

  return (
    <FilterContext.Provider value={{ filters, setFilters, updateFilter, clearFilters, savedViews, saveCurrentView, loadView, activeFilterCount }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  return useContext(FilterContext);
}

export const filterOptions = {
  dateRange: ["Last 30 Days", "Last 60 Days", "Last 90 Days", "Q1 2026", "Q2 2026", "YTD", "Last 12 Months"],
  segment: ["Enterprise", "Mid-Market", "SMB", "Government"],
  region: ["North America", "EMEA", "APAC", "LATAM"],
  product: ["Core Platform", "Analytics", "Automation", "Integration"],
  owner: ["Sarah Chen", "Marcus Johnson", "Elena Rodriguez", "David Kim", "Aisha Patel"],
};
