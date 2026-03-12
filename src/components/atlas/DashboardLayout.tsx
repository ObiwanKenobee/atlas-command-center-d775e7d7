import { Outlet } from "react-router-dom";
import { TopNav } from "@/components/atlas/TopNav";
import { AppSidebar } from "@/components/atlas/AppSidebar";
import { InsightRail } from "@/components/atlas/InsightRail";
import { useState } from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

export function DashboardLayout() {
  const [railOpen, setRailOpen] = useState(true);

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <button
          onClick={() => setRailOpen(!railOpen)}
          className="absolute right-0 top-14 z-10 rounded-l-md border border-r-0 border-border bg-card p-1.5 text-muted-foreground hover:text-foreground"
          style={{ right: railOpen ? "288px" : "0" }}
        >
          {railOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
        </button>
        {railOpen && <InsightRail />}
      </div>
    </div>
  );
}
