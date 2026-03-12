import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardLayout } from "@/components/atlas/DashboardLayout";
import { RoleProvider } from "@/lib/roles";
import { FilterProvider } from "@/lib/filters";
import ExecutiveCommand from "./pages/ExecutiveCommand";
import DemandEngine from "./pages/DemandEngine";
import PipelineIntelligence from "./pages/PipelineIntelligence";
import CustomerHealth from "./pages/CustomerHealth";
import ForecastLab from "./pages/ForecastLab";
import OperationalIntegrity from "./pages/OperationalIntegrity";
import SegmentEconomics from "./pages/SegmentEconomics";
import ExpansionSignals from "./pages/ExpansionSignals";
import Reports from "./pages/Reports";
import MyPipeline from "./pages/MyPipeline";
import MyAccounts from "./pages/MyAccounts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RoleProvider>
        <FilterProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<ExecutiveCommand />} />
                <Route path="/demand" element={<DemandEngine />} />
                <Route path="/pipeline" element={<PipelineIntelligence />} />
                <Route path="/health" element={<CustomerHealth />} />
                <Route path="/forecast" element={<ForecastLab />} />
                <Route path="/operations" element={<OperationalIntegrity />} />
                <Route path="/segments" element={<SegmentEconomics />} />
                <Route path="/expansion" element={<ExpansionSignals />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/my-pipeline" element={<MyPipeline />} />
                <Route path="/my-accounts" element={<MyAccounts />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </FilterProvider>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
