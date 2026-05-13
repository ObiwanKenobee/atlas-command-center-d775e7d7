# Atlas RevOps - End-to-End Test Checklist

This checklist verifies that the drill-down drawers, page transitions, anomaly thresholds, and command palette correctly preserve state and function seamlessly across the Atlas dashboard.

## 1. Global Navigation & Command Palette (Cmd+K)
- [ ] **Hotkey triggers correctly:** Pressing `Cmd+K` (or `Ctrl+K`) opens the global search.
- [ ] **Dashboard navigation:** Searching for "Demand Engine" and selecting it navigates to `/demand`.
- [ ] **Direct Drill-down - Account:** Search for an account name (e.g., from `healthScores`). Selecting it navigates to `/health` and immediately opens the Drilldown Drawer with the account's details.
- [ ] **Direct Drill-down - Deal/Rep:** Search for a sales rep. Selecting them navigates to `/pipeline` and opens the rep performance Drilldown Drawer.
- [ ] **Direct Drill-down - Campaign:** Search for a campaign. Selecting it navigates to `/demand` and opens the campaign performance Drilldown Drawer.

## 2. Drilldown Drawer Interactivity & Reset
- [ ] **Open on click:** Clicking a row in any `DataTable` (e.g., Executive Command, Pipeline Intelligence, Segment Economics) smoothly opens the right-side Drilldown Drawer.
- [ ] **State preservation during animation:** Closing the drawer does not clear the content immediately; the content remains visible during the slide-out animation to prevent jarring visual jumps.
- [ ] **"Reset View" Button:** Clicking the "Reset View" button inside the Drilldown Drawer header closes the drawer and clears any active filters in the `FilterBar`, reverting to the default global view.

## 3. Anomaly Settings & Thresholds
- [ ] **Context Menu:** Hovering over any KPI card reveals a "Settings/Sliders" icon in the top right.
- [ ] **Threshold Modification:** Clicking the settings icon opens a popover to adjust the `anomalyThreshold` sensitivity via a range slider.
- [ ] **Real-time Alerting:** Modifying the threshold instantly updates the KPI card state. If the delta is beyond the new threshold, the card adopts a pulsing red border (`atlas-anomaly-pulse`) and an Alert warning icon appears.
- [ ] **State Persistence:** Navigating to another dashboard screen and back preserves the custom threshold for that KPI via the `SettingsContext`.

## 4. Page Transitions & Filter Persistence
- [ ] **Smooth Transitions:** Navigating via the AppSidebar triggers a smooth `framer-motion` crossfade/slide. No flashes of unstyled content or hard layout shifts occur.
- [ ] **Filter State Persistence:** Modifying the `FilterBar` (e.g., setting a Date Range or filtering by Segment) on one dashboard (e.g., Executive Command) persists when navigating to another (e.g., Demand Engine).
- [ ] **Role Preservation:** Switching roles from the TopNav (e.g., from CEO to AE) updates the available sidebar items, but preserves the current active filters.

## 5. Visual Rendering & Theming Check
- [ ] **Dark Mode Integrity:** All components strictly use semantic HSL tokens (`--background`, `--secondary`, etc.). No hardcoded `#FFFFFF` or `#000000` anomalies.
- [ ] **Responsive Downscaling:** On a standard laptop viewport (~1366x768), charts do not overlap bounds and tables enable horizontal scrolling gracefully.
