import {
  BarChart3, Zap, Target, Heart, FlaskConical, PieChart, Settings2, ShieldCheck, Rocket, FileText,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { icon: BarChart3, label: "Executive Command", path: "/" },
  { icon: Zap, label: "Demand Engine", path: "/demand" },
  { icon: Target, label: "Pipeline Intelligence", path: "/pipeline" },
  { icon: Heart, label: "Customer Health", path: "/health" },
  { icon: FlaskConical, label: "Forecast Lab", path: "/forecast" },
  { icon: PieChart, label: "Segment Economics", path: "/segments" },
  { icon: ShieldCheck, label: "Operational Integrity", path: "/operations" },
  { icon: Rocket, label: "Expansion Signals", path: "/expansion" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: Settings2, label: "Admin", path: "/admin" },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav className={`flex flex-col border-r border-border bg-sidebar transition-all duration-300 ${collapsed ? "w-14" : "w-56"}`}>
      <div className="flex-1 overflow-y-auto py-3">
        <div className="flex flex-col gap-0.5 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                } ${collapsed ? "justify-center" : ""}`
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </div>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center border-t border-border py-3 text-muted-foreground hover:text-foreground"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </nav>
  );
}
