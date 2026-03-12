// Mock data for Atlas RevOps dashboard

export const revenueData = [
  { month: "Jul", arr: 2400, mrr: 200, target: 2200 },
  { month: "Aug", arr: 2800, mrr: 233, target: 2500 },
  { month: "Sep", arr: 3200, mrr: 267, target: 2800 },
  { month: "Oct", arr: 3600, mrr: 300, target: 3100 },
  { month: "Nov", arr: 4100, mrr: 342, target: 3400 },
  { month: "Dec", arr: 4500, mrr: 375, target: 3700 },
  { month: "Jan", arr: 4900, mrr: 408, target: 4000 },
  { month: "Feb", arr: 5200, mrr: 433, target: 4300 },
  { month: "Mar", arr: 5800, mrr: 483, target: 4600 },
];

export const funnelData = [
  { stage: "Visitors", value: 24500, rate: 100 },
  { stage: "Leads", value: 4200, rate: 17.1 },
  { stage: "MQLs", value: 1680, rate: 40 },
  { stage: "SQLs", value: 756, rate: 45 },
  { stage: "Opportunities", value: 340, rate: 45 },
  { stage: "Closed Won", value: 89, rate: 26.2 },
];

export const pipelineByStage = [
  { stage: "Discovery", count: 42, value: 1260 },
  { stage: "Qualification", count: 38, value: 1520 },
  { stage: "Proposal", count: 24, value: 1440 },
  { stage: "Negotiation", count: 18, value: 1620 },
  { stage: "Procurement", count: 12, value: 960 },
  { stage: "Closed Won", count: 89, value: 4450 },
];

export const segmentPerformance = [
  { segment: "Enterprise", arr: 2800, cac: 12000, ltv: 180000, churn: 3.2 },
  { segment: "Mid-Market", arr: 1600, cac: 5500, ltv: 72000, churn: 5.8 },
  { segment: "SMB", arr: 900, cac: 1200, ltv: 18000, churn: 8.4 },
  { segment: "Government", arr: 500, cac: 18000, ltv: 240000, churn: 1.5 },
];

export const campaignData = [
  { name: "LinkedIn ABM Q1", spend: 45000, leads: 320, mqls: 128, sqls: 58, pipeline: 870000, roi: 19.3 },
  { name: "Google Ads Brand", spend: 28000, leads: 580, mqls: 174, sqls: 52, pipeline: 520000, roi: 18.6 },
  { name: "Content Syndication", spend: 15000, leads: 420, mqls: 84, sqls: 25, pipeline: 375000, roi: 25.0 },
  { name: "Webinar Series", spend: 8000, leads: 180, mqls: 90, sqls: 36, pipeline: 540000, roi: 67.5 },
  { name: "Event: SaaStr", spend: 65000, leads: 240, mqls: 96, sqls: 43, pipeline: 645000, roi: 9.9 },
];

export const repPerformance = [
  { name: "Sarah Chen", quota: 500000, closed: 420000, pipeline: 680000, winRate: 34, avgCycle: 42 },
  { name: "Marcus Johnson", quota: 500000, closed: 380000, pipeline: 520000, winRate: 28, avgCycle: 56 },
  { name: "Elena Rodriguez", quota: 450000, closed: 410000, pipeline: 390000, winRate: 38, avgCycle: 38 },
  { name: "David Kim", quota: 450000, closed: 290000, pipeline: 610000, winRate: 22, avgCycle: 65 },
  { name: "Aisha Patel", quota: 400000, closed: 360000, pipeline: 450000, winRate: 31, avgCycle: 48 },
];

export const healthScores = [
  { account: "Acme Corp", score: 92, trend: "up", revenue: 240000, renewal: "2026-06-15", risk: "low" },
  { account: "TechFlow Inc", score: 78, trend: "stable", revenue: 180000, renewal: "2026-04-30", risk: "medium" },
  { account: "GlobalEd", score: 45, trend: "down", revenue: 320000, renewal: "2026-05-10", risk: "high" },
  { account: "FinServ Pro", score: 88, trend: "up", revenue: 150000, renewal: "2026-08-22", risk: "low" },
  { account: "MediCare Plus", score: 62, trend: "down", revenue: 210000, renewal: "2026-04-15", risk: "high" },
  { account: "RetailMax", score: 71, trend: "stable", revenue: 95000, renewal: "2026-07-01", risk: "medium" },
];

export const forecastData = [
  { category: "Commit", q1: 1200, q2: 1450, q3: 1600, q4: 1800 },
  { category: "Best Case", q1: 1500, q2: 1800, q3: 2100, q4: 2400 },
  { category: "Upside", q1: 1800, q2: 2200, q3: 2700, q4: 3100 },
  { category: "Target", q1: 1400, q2: 1700, q3: 2000, q4: 2300 },
];

export const crmQuality = {
  completeness: 74,
  duplicates: 342,
  staleRecords: 128,
  missingFields: 856,
  slaCompliance: 82,
  avgResponseTime: 4.2,
};

export const alerts = [
  {
    id: "1",
    severity: "high" as const,
    title: "High churn risk — GlobalEd",
    description: "Health score dropped 18%, usage down 42%, sponsor inactive 21 days. Renewal in 38 days.",
    impact: "$320,000 ARR",
    action: "Schedule executive alignment call",
    entity: "GlobalEd",
    timestamp: "12 min ago",
  },
  {
    id: "2",
    severity: "high" as const,
    title: "Pipeline stagnation — Enterprise",
    description: "12 deals stuck in Negotiation >30 days. Combined value $1.6M.",
    impact: "$1,600,000 pipeline",
    action: "Review deal blockers with sales managers",
    entity: "Enterprise Segment",
    timestamp: "1h ago",
  },
  {
    id: "3",
    severity: "medium" as const,
    title: "Lead SLA breach — Inbound",
    description: "47 leads uncontacted >4 hours. Source: Google Ads Brand campaign.",
    impact: "~$235,000 potential pipeline",
    action: "Route to available SDRs immediately",
    entity: "Demand Engine",
    timestamp: "2h ago",
  },
  {
    id: "4",
    severity: "low" as const,
    title: "Expansion signal — FinServ Pro",
    description: "3 new departments activated. Usage up 67%. Executive sponsor engaged.",
    impact: "$150,000 expansion opportunity",
    action: "Trigger expansion playbook",
    entity: "FinServ Pro",
    timestamp: "3h ago",
  },
  {
    id: "5",
    severity: "medium" as const,
    title: "Forecast accuracy declining",
    description: "Q1 forecast confidence dropped from 82% to 68%. Commit deals slipping.",
    impact: "$400,000 forecast gap",
    action: "Audit commit category deals",
    entity: "Forecast Lab",
    timestamp: "4h ago",
  },
];

export const cohortRetention = [
  { cohort: "Q1 '25", m1: 100, m2: 94, m3: 91, m4: 88, m5: 85, m6: 83 },
  { cohort: "Q2 '25", m1: 100, m2: 92, m3: 88, m4: 84, m5: 81, m6: 79 },
  { cohort: "Q3 '25", m1: 100, m2: 95, m3: 92, m4: 90, m5: 88, m6: null },
  { cohort: "Q4 '25", m1: 100, m2: 93, m3: 90, m4: null, m5: null, m6: null },
];

export const leadsBySource = [
  { source: "Organic Search", leads: 1200, mqls: 480, sqls: 216 },
  { source: "Paid Search", leads: 800, mqls: 240, sqls: 72 },
  { source: "LinkedIn", leads: 620, mqls: 310, sqls: 140 },
  { source: "Referral", leads: 380, mqls: 228, sqls: 137 },
  { source: "Events", leads: 420, mqls: 168, sqls: 76 },
  { source: "Content", leads: 780, mqls: 254, sqls: 115 },
];

export const waterfallData = [
  { name: "Target", value: 4600 },
  { name: "New Biz", value: 2800 },
  { name: "Expansion", value: 1200 },
  { name: "Churn", value: -680 },
  { name: "Contraction", value: -320 },
  { name: "Actual", value: 3000 },
];
