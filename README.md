# Atlas RevOps

## Revenue Intelligence & Operations Command Platform

Atlas RevOps is a revenue command system designed to give leadership, RevOps, marketing, sales, customer success, finance, and strategy teams a shared view of the revenue engine from different altitudes.

The product is designed as a **real operating system for revenue intelligence**, not a decorative collection of dashboards.

Its core purpose is to connect:

```text
DATA
  ↓
UNDERSTANDING
  ↓
INSIGHT
  ↓
DECISION
  ↓
ACTION
  ↓
OUTCOME
```

The frontend architecture is built around modular command surfaces, reusable intelligence widgets, role-based navigation, global filters, alerts, drilldowns, forecasting, and operational integrity.

---

## Product Philosophy

Atlas RevOps should feel like a **revenue command system** where every page answers four questions:

1. **What happened?**
2. **Why did it happen?**
3. **What matters now?**
4. **What should we do?**

This creates an information hierarchy that moves from observation to execution instead of stopping at reporting.

> **This is the difference between a dashboard and a wallpaper collection.**

---

# Product Architecture

## Primary Application Shell

The Atlas application is organized around a shared shell.

### Global Layout

```text
┌────────────────────────────────────────────────────────────┐
│ ATLAS LOGO   WORKSPACE   DATE RANGE   SEARCH   🔔   USER │
├───────────────────┬────────────────────────────────────────┤
│                   │                                        │
│ Executive Command │ Page Header                            │
│ Demand Engine     │ KPI Ribbon                             │
│ Pipeline Intel.   │ Filter Bar                             │
│ Customer Health   │                                        │
│ Forecast Lab      │ Primary Visual Grid                    │
│ Segment Economics │                                        │
│ Operational        │                                        │
│ Integrity          │ Insight / Action Rail                  │
│ Expansion Signals │                                        │
│ Reports            │ Right Utility Rail                     │
│ Admin / Settings   │                                        │
└───────────────────┴────────────────────────────────────────┘
```

### Global Navigation

- Workspace / business unit selector
- Global date range picker
- Search
- Notifications
- Saved views
- User profile / role menu

### Sidebar Navigation

- Executive Command
- Demand Engine
- Pipeline Intelligence
- Customer Health
- Forecast Lab
- Segment Economics
- Operational Integrity
- Strategic Expansion Signals
- Reports
- Admin / Settings

---

# Core Modules

## 1. Executive Command

The executive view for founders, CEOs, CROs, and senior leadership.

### Tabs

- Overview
- Revenue Funnel
- Forecast
- Risks
- Strategic Accounts

### Panels

- Revenue summary
- Quarterly target
- Forecast accuracy
- Churn / expansion
- At-risk pipeline
- Top growth opportunities

### Widgets

- KPI cards
- ARR / MRR trend
- Lifecycle conversion funnel
- Pipeline coverage gauge
- Target vs actual waterfall
- Risk-by-segment heatmap
- Strategic account attention table

### Primary questions

- Are we on target?
- How healthy is the forecast?
- Where is revenue at risk?
- Where are the largest growth opportunities?
- Which strategic accounts require executive attention?

---

# 2. Demand Engine

Marketing and growth operations.

### Tabs

- Overview
- Campaign Performance
- Lead Quality
- Channel Attribution
- Conversion Flow

### Panels

- Demand creation
- Campaign ROI
- Source performance
- Lead scoring
- Speed-to-lead

### Widgets

- Total leads
- MQL
- SQL
- Lead velocity
- Leads by source
- Source-to-opportunity Sankey flow
- Spend vs qualified pipeline scatter
- Visitor → Lead → MQL → SQL funnel
- Campaign contribution table
- Lead-score distribution

---

# 3. Pipeline Intelligence

Sales command central.

### Tabs

- Overview
- Pipeline Health
- Deal Flow
- Rep Performance
- Win/Loss Analysis

### Panels

- Stage distribution
- Deal aging
- Pipeline movement
- Sales productivity
- Opportunity risk

### Widgets

- Open pipeline
- Weighted pipeline
- Win rate
- Average sales cycle
- Stage-aging bubble chart
- SQL → Closed Won funnel
- Created vs closed opportunity trend
- Rep performance leaderboard
- Win/loss reason matrix
- Opportunities by stage Kanban
- Stale deal alerts
- No-next-step alerts
- Procurement risk alerts

---

# 4. Customer Health

Customer success, onboarding, retention, and expansion.

### Tabs

- Overview
- Onboarding
- Adoption
- Renewals
- Expansion

### Panels

- Account health
- Time-to-value
- Product usage
- Renewal risk
- Expansion pipeline

### Widgets

- Average health score
- Renewal rate
- Churn rate
- NRR
- Cohort retention
- Account health matrix
- Onboarding milestone timeline
- Usage trend
- Renewal calendar
- At-risk accounts
- Cross-sell / upsell opportunities

---

# 5. Forecast Lab

Revenue scenario planning and simulation.

### Tabs

- Overview
- Quarterly Forecast
- Scenario Modeling
- Sensitivity Analysis
- Planning Assumptions

### Panels

- Forecast snapshot
- Scenario comparison
- Quota attainment
- Assumption controls
- Confidence bands

### Widgets

- Commit KPI
- Best-case KPI
- Upside KPI
- Forecast cone
- Scenario table
- Win-rate slider
- ACV slider
- Churn slider
- Conversion-rate slider
- Sales-cycle slider
- Gap-to-target waterfall
- Cohort forecast
- Assumption change log

> Forecast Lab should feel **half BI dashboard, half mission control simulator**.

---

# 6. Segment Economics

This is where Atlas learns which customers, markets, and segments actually create economic value.

### Tabs

- Overview
- Industry Segments
- Geography
- Customer Type
- Profitability

### Panels

- Segment comparison
- CAC / LTV
- Retention by segment
- Support burden
- Strategic fit

### Widgets

- LTV / CAC
- ACV by segment
- Retention rate
- Gross margin
- ACV vs sales-cycle scatter
- Profitability heatmap
- Churn by customer type
- Segment performance table
- Regional revenue concentration map

---

# 7. Operational Integrity

RevOps hygiene, system discipline, process health, and operational reliability.

### Tabs

- Overview
- CRM Quality
- SLA Monitoring
- Handoffs
- Workflow Health

### Panels

- Data quality
- Routing and response
- Handoff discipline
- Process bottlenecks
- Automation health

### Widgets

- CRM completeness score
- Duplicate record count
- SLA compliance
- Response time
- Workflow status timeline
- Broken process rules
- Stale-record alerts
- Missing-field alerts
- Funnel drop-off by handoff stage
- Process map
- Audit log

This page is intentionally operational rather than glamorous.

> **Systems plumbing determines whether the building functions.**

---

# 8. Strategic Expansion Signals

The Atlas-specific intelligence layer.

### Tabs

- Overview
- Product Adoption
- Multi-Module Usage
- Impact Correlation
- Expansion Readiness

### Panels

- Product depth
- Institutional engagement
- Impact-to-retention
- Expansion probability
- Strategic account map

### Widgets

- Modules adopted per account
- Expansion readiness score
- Stakeholder engagement
- Adoption-depth curve
- Usage vs renewal correlation
- Expansion propensity matrix
- Account journey timeline
- Accounts most likely to expand
- Executive engagement tracker

This module is designed to identify relationships between product adoption, institutional engagement, retention, and expansion.

Example analytical question:

> Do accounts using simulations, coordination tools, and risk alerts show different expansion behavior than accounts using only basic workflows?

That relationship is strategically valuable when supported by reliable evidence.

---

# Standard Page Anatomy

Every major page follows a consistent internal structure.

## 1. Page Header

- Page title
- Short descriptor
- Current saved view
- Export
- Share
- Compare-period toggle

## 2. KPI Ribbon

The first row contains approximately **4–8 KPI cards**.

Each card should include:

- Main metric
- Delta vs prior period
- Sparkline
- Confidence or data-quality indicator where appropriate

## 3. Filter Bar

A sticky horizontal filter layer should support:

- Date range
- Segment
- Region
- Product / module
- Deal type
- Owner / team
- Account tier
- Lead source
- Lifecycle stage
- Status
- Saved filter presets

## 4. Main Insight Grid

Use a responsive **12-column grid**.

Typical hierarchy:

```text
TOP
2–3 major charts

MIDDLE
Drilldown tables
Secondary visuals

BOTTOM
Trends
Cohorts
Root-cause diagnostics
```

## 5. Right Utility Rail

The right rail contains:

- Alerts
- Anomalies
- AI insights
- Recommended actions
- Workflow reminders
- Notes / comments

---

# Panel Architecture

Every panel should behave like a reusable modular component.

## Universal Panel Structure

```text
┌────────────────────────────────┐
│ TITLE                     ⋯ ⛶ │
│ Subtitle / context             │
│                                │
│            VISUAL              │
│                                │
│ Last updated • Data quality    │
└────────────────────────────────┘
```

Each panel should expose:

- Title
- Subtitle / context
- Last-updated timestamp
- Information tooltip
- Expand / fullscreen
- Filter inheritance state
- Export / inspect menu

## Panel States

- Loading
- Empty
- Error
- Insufficient permissions
- Stale data
- Anomaly detected

## Panel Actions

- Drill down
- Pin to executive dashboard
- Add note
- Subscribe to alerts
- Compare cohorts
- Open detailed report

---

# Widget Library

Atlas should maintain a consistent reusable widget system.

## Metric Widgets

- KPI card
- Delta KPI card
- Benchmark card
- Progress-to-goal card
- Health-score badge

## Chart Widgets

- Line chart
- Area chart
- Bar chart
- Stacked bar
- Funnel
- Sankey
- Waterfall
- Cohort retention
- Heatmap
- Scatter plot
- Bubble chart
- Gauge

Use radar charts only when genuinely necessary; avoid visual theater.

## Data Widgets

- Sortable table
- Grouped table
- Expandable account list
- Leaderboard
- Kanban
- Timeline
- Activity feed
- Audit log

## Diagnostic Widgets

- Anomaly alert list
- Forecast confidence band
- Root-cause breakdown
- Funnel leakage detector
- Account risk matrix
- Workflow bottleneck map

## Atlas-Specific Intelligence Widgets

- Expansion readiness scorecard
- Impact-to-revenue correlation
- Institutional complexity score
- Stakeholder engagement tracker
- Module adoption fingerprint
- Revenue risk signal feed

---

# Global Filters

These filters should be available throughout the product wherever applicable.

## Universal Filters

- Date range
- Compare to previous period
- Geography
- Market / region
- Customer segment
- Industry
- Deal-size band
- Account tier
- Account owner
- Team
- Sales rep
- CSM
- Product / module
- Lifecycle stage
- Lead source
- Channel
- Campaign
- Renewal window
- Contract type
- Forecast category

## Advanced Filters

- Health-score threshold
- Expansion propensity
- Risk score
- Churn probability
- Onboarding status
- Usage frequency
- Executive sponsor presence
- Partner-influenced deal
- Pilot vs full deployment

## Filter UX

- Sticky on scroll
- Multi-select
- Search within dropdowns
- Save filter sets
- Share filter state
- Clear all
- Active filter chips

---

# Role-Based Experience

Atlas changes the interface based on role so users see the information appropriate to their responsibilities.

> **Not everyone needs the nuclear launch console.**

## Founder / CEO

### Needs

- Top-line revenue
- Forecast
- Strategic risk
- Top accounts
- Market performance

### Default Landing

**Executive Command**

### Permissions

- Read all dashboards
- Executive notes
- Scenario forecasting
- Strategic account visibility
- Export summaries

---

## CRO / Head of Revenue

### Needs

- Full funnel
- Sales performance
- Forecast quality
- Revenue leakage
- Team effectiveness

### Default Landing

**Pipeline Intelligence** or **Executive Command**

### Permissions

- Forecast assumptions
- Rep / team performance
- Pipeline views
- Revenue planning views

---

## RevOps Lead

### Needs

- Systems health
- Funnel consistency
- Attribution logic
- SLA tracking
- Data quality
- Reporting governance

### Default Landing

**Operational Integrity**

### Permissions

- Dashboard administration
- KPI definitions
- Saved views
- Data-sync monitoring
- Workflow configuration
- Reporting-space access

---

## Marketing Lead

### Needs

- Campaign performance
- Source attribution
- Lead conversion
- CAC efficiency
- Audience quality

### Default Landing

**Demand Engine**

### Permissions

- Campaign dashboards
- Attribution reports
- Lead-source drilldowns
- Lead / campaign exports

---

## Sales Manager

### Needs

- Team pipeline
- Rep productivity
- Deal risk
- Forecasting by rep
- Stage conversion

### Default Landing

**Pipeline Intelligence**

### Permissions

- Team pipeline
- Deal coaching
- Manager notes
- Rep drilldowns

---

## Account Executive

### Needs

- Owned opportunities
- Deal progression
- Next steps
- Quota attainment
- Risk flags

### Default Landing

**My Pipeline**

### Permissions

- Own opportunities
- Notes
- Deal recommendations
- Limited forecast view

---

## Customer Success Lead

### Needs

- Renewals
- Health
- Onboarding bottlenecks
- Expansion potential
- Churn drivers

### Default Landing

**Customer Health**

### Permissions

- Health views
- Renewal tracking
- At-risk reviews
- Expansion watchlists

---

## Customer Success Manager

### Needs

- Assigned accounts
- Onboarding
- Adoption
- Risks
- Renewal tasks

### Default Landing

**My Accounts**

### Permissions

- Assigned customers
- Notes
- Tasks
- Limited expansion insights

---

## Finance Lead

### Needs

- Forecast consistency
- Booked revenue
- Cash-visibility inputs
- Contract value trends
- Retention economics

### Default Landing

**Forecast Lab**

### Permissions

- Revenue reporting
- Booked vs forecast
- Financial exports
- Segment economics

---

## Product / Strategy Lead

### Needs

- Product adoption
- Module usage
- Retention correlation
- Expansion triggers
- Customer behavior trends

### Default Landing

**Strategic Expansion Signals**

### Permissions

- Usage-to-revenue correlation
- Segment behavior
- Product-adoption drilldowns

---

# Role-Based Navigation Examples

## Founder

- Executive Command
- Forecast Lab
- Segment Economics
- Strategic Expansion Signals

## RevOps Lead

- Executive Command
- Demand Engine
- Pipeline Intelligence
- Customer Health
- Operational Integrity
- Reports
- Admin

## Account Executive

- My Pipeline
- My Forecast
- My Accounts
- Alerts
- Activity Feed

## CSM

- My Accounts
- Renewals
- Health Alerts
- Expansion Candidates

---

# Detailed Screen Concepts

## Executive Command / Overview

### KPI Row

- ARR
- New Revenue
- Expansion Revenue
- Churned Revenue
- NRR
- Pipeline Coverage
- Forecast Confidence

### Main Grid

**Row 1**

- Revenue trend
- Full lifecycle funnel
- Forecast vs target waterfall

**Row 2**

- Segment performance heatmap
- At-risk revenue
- Strategic accounts

### Right Rail

- Anomalies
- Urgent renewals
- Slipped deals
- AI summary

---

## Pipeline Intelligence / Pipeline Health

### KPI Row

- Open pipeline
- Weighted pipeline
- Average deal age
- Win rate
- Average sales cycle
- Slipped pipeline amount

### Main Grid

**Row 1**

- Pipeline by stage
- Stage-aging bubble chart
- Opportunity creation vs close trend

**Row 2**

- Stale opportunities
- Rep conversion leaderboard
- Deal-risk reason matrix

### Right Rail

- Deals with no next step
- Procurement risk
- Executive help needed

---

## Customer Health / Renewals

### KPI Row

- Renewals due in 90 days
- Revenue at renewal
- Renewal rate
- At-risk renewals
- Expansion candidates

### Main Grid

**Row 1**

- Renewal calendar
- Health-score distribution
- Cohort retention

**Row 2**

- At-risk accounts
- Onboarding blockers
- Expansion readiness matrix

### Right Rail

- Critical support issues
- Sponsor disengagement
- Playbooks not triggered

---

# My Views

Every individual contributor should have personalized views.

## My Pipeline

- Owned deals
- Quota progress
- Deal tasks
- Meeting outcomes
- Risk alerts

## My Accounts

- Assigned accounts
- Health scores
- Upcoming renewals
- Product usage alerts
- Stakeholder activity

## My Campaigns

- Campaign results
- Spend efficiency
- Sourced opportunities
- Conversion rates

The intent is to keep individual contributors focused on the work that directly concerns their responsibilities.

---

# Reports

Dashboards and reports are separate product surfaces.

## Report Categories

- Executive summary
- Weekly revenue review
- Board reporting
- Marketing performance
- Sales forecast pack
- Customer retention report
- Expansion readiness report
- Segment profitability report

## Report Features

- Scheduled exports
- PDF / CSV download
- Snapshot comparison
- Annotation support
- Shareable links
- Version history

---

# Alerts & Intelligence

Atlas should feel alive through a structured alert and intelligence system.

## Alert Categories

- Forecast risk
- Pipeline stagnation
- Lead response SLA breach
- Campaign underperformance
- Churn risk spike
- Expansion opportunity detected
- CRM hygiene issue
- Unusual conversion drop
- Executive sponsor disengagement

## Alert Card

Each alert should show:

```text
Severity
Entity affected
Why it triggered
Revenue impact estimate
Recommended next action
Owner
```

### Example

```text
HIGH CHURN RISK

County Gov Pilot A

Health score ↓ 18%
Usage ↓ 42%
Sponsor inactive: 21 days
Renewal: 38 days

Revenue impact:
[ contextual estimate ]

Recommended action:
Review account
```

The objective is actionable intelligence rather than decorative status labels.

---

# Design System

## Layout Rules

- 12-column responsive grid
- Consistent card padding
- Fixed heights for comparable chart panels
- Sticky KPI and filter bars where useful
- No more than 6–8 primary KPIs per page
- Progressive disclosure for deeper detail

## Interaction Principles

- Click chart → drill into segment / account / deal list
- Hover → reveal exact numbers, deltas, and notes
- Compare mode → current vs previous period
- Inspect mode → explain metric definition and formula
- Anomaly badges → visually distinct without overwhelming the interface

## Data Clarity Rules

Always:

- Show metric definition on hover
- Show time basis
- Distinguish count vs revenue vs rate
- Display confidence / quality where data may be incomplete
- Label per-user metrics clearly

Never mix top-line and per-user metrics without explicit labeling.

---

# Information Hierarchy

Every page should be interpretable in this order.

## Layer 1 — What happened?

- KPI cards
- Trend lines
- Funnel statistics

## Layer 2 — Why did it happen?

- Segment cuts
- Stage leaks
- Adoption drops
- Conversion bottlenecks

## Layer 3 — What matters now?

- Alerts
- Anomalies
- Revenue at risk
- Expansion opportunities

## Layer 4 — What should we do?

- Recommendations
- Assigned owners
- Workflow links
- Next-best actions

---

# Frontend Component Inventory

## Core UI Components

- `AppShell`
- `SidebarNav`
- `TopNav`
- `PageHeader`
- `KPIBar`
- `FilterBar`
- `WidgetCard`
- `InsightRail`
- `DrilldownDrawer`
- `AlertCard`
- `SavedViewMenu`

## Data Display Components

- `MetricCard`
- `TrendCard`
- `ComparisonCard`
- `ChartContainer`
- `DataTable`
- `CohortTable`
- `LeaderboardTable`
- `AccountHealthMatrix`
- `FunnelFlowChart`
- `ForecastScenarioPanel`

## Workflow Components

- `NoteComposer`
- `ActionChecklist`
- `AssignOwnerDropdown`
- `AlertSubscriptionMenu`
- `ReportExportModal`
- `AnnotationLayer`

## State Components

- `EmptyState`
- `ErrorState`
- `NoPermissionState`
- `LoadingSkeleton`
- `StaleDataBanner`

---

# Recommended Frontend Stack

The architecture is suitable for a modern TypeScript application.

Possible implementation stack:

- React
- TypeScript
- Vite or Next.js
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Zustand
- Recharts / ECharts
- Data-table primitives
- Role-based access control
- API / event-driven backend

The component architecture should keep business logic separate from visualization components so modules can evolve without rebuilding the interface foundation.

---

# MVP

A realistic V1 should begin with six primary screens:

1. **Executive Command**
2. **Demand Engine**
3. **Pipeline Intelligence**
4. **Customer Health**
5. **Forecast Lab**
6. **Operational Integrity**

### Shared Infrastructure

- Global filters
- Saved views
- Alerts rail
- Drilldown tables
- Role-based access
- Export / reporting

This provides a serious RevOps product foundation without requiring every future capability on day one.

---

# Future State

Atlas RevOps can evolve toward:

- Predictive deal scoring
- Churn forecasting
- Expansion propensity
- AI-generated weekly revenue briefings
- Revenue simulation sandbox
- Cross-functional Marketing / Sales / CS workspaces
- Board-mode reporting
- Strategy maps linking product adoption to expansion outcomes

The long-term direction is:

> **Revenue reporting → Revenue intelligence infrastructure**

---

# Suggested Repository Structure

```text
atlas-revops/
│
├── apps/
│   └── web/
│
├── components/
│   ├── core/
│   ├── data-display/
│   ├── charts/
│   ├── workflow/
│   └── states/
│
├── modules/
│   ├── executive-command/
│   ├── demand-engine/
│   ├── pipeline-intelligence/
│   ├── customer-health/
│   ├── forecast-lab/
│   ├── segment-economics/
│   ├── operational-integrity/
│   └── strategic-expansion-signals/
│
├── features/
│   ├── alerts/
│   ├── filters/
│   ├── saved-views/
│   ├── drilldowns/
│   ├── reports/
│   └── permissions/
│
├── lib/
│   ├── api/
│   ├── auth/
│   ├── analytics/
│   └── utils/
│
├── data/
│   ├── fixtures/
│   └── schemas/
│
├── docs/
│   ├── architecture/
│   ├── product/
│   └── ux/
│
├── tests/
│
├── public/
│
├── package.json
└── README.md
```

---

# Product Development Sequence

```text
FOUNDATION
   ↓
App Shell
   ↓
Navigation
   ↓
Global Filters
   ↓
KPI System
   ↓
Reusable Widgets
   ↓
Role-Based Access
   ↓
Module Screens
   ↓
Alerts & Intelligence
   ↓
Drilldowns
   ↓
Forecasting
   ↓
Scenario Modeling
   ↓
Expansion Intelligence
```

---

# Key Product Principle

Atlas RevOps should not stop at reporting.

The system should connect:

```text
OBSERVE
   ↓
DIAGNOSE
   ↓
PRIORITIZE
   ↓
RECOMMEND
   ↓
ASSIGN
   ↓
EXECUTE
   ↓
MEASURE
   ↓
LEARN
```

This is what turns RevOps from a reporting function into **revenue intelligence infrastructure**.

---

# Status

**Project:** Atlas RevOps  
**Type:** Revenue Intelligence & Operations Platform  
**Stage:** Frontend architecture / MVP specification  
**Primary users:** Leadership, RevOps, Marketing, Sales, Customer Success, Finance, Product / Strategy

---

# License

License strategy to be determined.

Potential future approaches:

- Proprietary
- Open core
- Internal enterprise platform
- Open standards + controlled commercial components
