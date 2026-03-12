import { PageHeader } from "@/components/atlas/PageHeader";
import { FileText, Download, Calendar, Share2, Clock, Star } from "lucide-react";

const reports = [
  { category: "Executive", items: [
    { name: "Executive Summary", desc: "Weekly revenue & pipeline overview", lastRun: "2h ago", schedule: "Weekly", starred: true },
    { name: "Board Report", desc: "Monthly board-ready metrics pack", lastRun: "3d ago", schedule: "Monthly", starred: true },
  ]},
  { category: "Revenue", items: [
    { name: "Weekly Revenue Review", desc: "ARR, MRR, churn, expansion breakdown", lastRun: "1d ago", schedule: "Weekly", starred: false },
    { name: "Sales Forecast Pack", desc: "Commit, best case, upside by rep/team", lastRun: "6h ago", schedule: "Weekly", starred: true },
  ]},
  { category: "Marketing", items: [
    { name: "Marketing Performance", desc: "Campaign ROI, channel attribution, CAC", lastRun: "12h ago", schedule: "Weekly", starred: false },
    { name: "Lead Quality Report", desc: "MQL-to-SQL conversion, scoring accuracy", lastRun: "1d ago", schedule: "Bi-weekly", starred: false },
  ]},
  { category: "Customer", items: [
    { name: "Customer Retention Report", desc: "Churn analysis, cohort retention, NRR", lastRun: "2d ago", schedule: "Monthly", starred: false },
    { name: "Expansion Readiness Report", desc: "Cross-sell/upsell opportunities by account", lastRun: "1d ago", schedule: "Bi-weekly", starred: false },
  ]},
  { category: "Operations", items: [
    { name: "Segment Profitability", desc: "LTV/CAC, margins, support burden by segment", lastRun: "5d ago", schedule: "Monthly", starred: false },
    { name: "Data Quality Audit", desc: "CRM completeness, duplicates, stale records", lastRun: "1d ago", schedule: "Weekly", starred: false },
  ]},
];

export default function Reports() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <PageHeader title="Reports" description="Pre-built and scheduled reports — exportable, shareable, versioned." />

      <div className="flex flex-col gap-6">
        {reports.map((group) => (
          <div key={group.category}>
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">{group.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.items.map((report) => (
                <div key={report.name} className="atlas-panel flex flex-col gap-2 hover:border-primary/30 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary shrink-0" />
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{report.name}</h3>
                        <p className="text-xs text-muted-foreground">{report.desc}</p>
                      </div>
                    </div>
                    {report.starred && <Star className="h-3.5 w-3.5 text-atlas-warning fill-atlas-warning shrink-0" />}
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-border/50">
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{report.lastRun}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{report.schedule}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground">
                        <Download className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground">
                        <Share2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
