import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "ceo" | "cro" | "revops" | "marketing" | "sales_manager" | "ae" | "cs_lead" | "csm" | "finance" | "product";

export const roleLabels: Record<UserRole, string> = {
  ceo: "CEO / Founder",
  cro: "CRO / Head of Revenue",
  revops: "RevOps Lead",
  marketing: "Marketing Lead",
  sales_manager: "Sales Manager",
  ae: "Account Executive",
  cs_lead: "CS Lead",
  csm: "Customer Success Manager",
  finance: "Finance Lead",
  product: "Product / Strategy Lead",
};

export const roleNavItems: Record<UserRole, string[]> = {
  ceo: ["/", "/forecast", "/segments", "/expansion"],
  cro: ["/", "/pipeline", "/forecast", "/demand", "/health"],
  revops: ["/", "/demand", "/pipeline", "/health", "/operations", "/reports", "/segments"],
  marketing: ["/demand", "/", "/reports"],
  sales_manager: ["/pipeline", "/", "/forecast"],
  ae: ["/my-pipeline", "/my-accounts", "/pipeline"],
  cs_lead: ["/health", "/expansion", "/", "/reports"],
  csm: ["/my-accounts", "/health"],
  finance: ["/forecast", "/segments", "/", "/reports"],
  product: ["/expansion", "/health", "/segments", "/"],
};

interface RoleContextValue {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextValue>({ role: "revops", setRole: () => {} });

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("revops");
  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
}

export function useRole() {
  return useContext(RoleContext);
}
