import { createContext, useContext, useState, ReactNode } from "react";

export interface SettingsState {
  anomalyThresholds: Record<string, number>;
}

interface SettingsContextValue {
  settings: SettingsState;
  updateAnomalyThreshold: (kpiTitle: string, threshold: number) => void;
  getAnomalyThreshold: (kpiTitle: string, defaultThreshold: number) => number;
}

const SettingsContext = createContext<SettingsContextValue>({} as SettingsContextValue);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SettingsState>({
    anomalyThresholds: {},
  });

  const updateAnomalyThreshold = (kpiTitle: string, threshold: number) => {
    setSettings((prev) => ({
      ...prev,
      anomalyThresholds: {
        ...prev.anomalyThresholds,
        [kpiTitle]: threshold,
      },
    }));
  };

  const getAnomalyThreshold = (kpiTitle: string, defaultThreshold: number) => {
    return settings.anomalyThresholds[kpiTitle] ?? defaultThreshold;
  };

  return (
    <SettingsContext.Provider value={{ settings, updateAnomalyThreshold, getAnomalyThreshold }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}