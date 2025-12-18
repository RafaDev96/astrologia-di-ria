import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import SignDetail from "./pages/SignDetail";
import BirthChart from "./pages/BirthChart";
import BirthChartResult from "./pages/BirthChartResult";
import BirthChartPayment from "./pages/BirthChartPayment";
import PaymentPending from "./pages/PaymentPending";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentError from "./pages/PaymentError";
import FullBirthChart from "./pages/FullBirthChart";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signo/:signId" element={<SignDetail />} />
            <Route path="/mapa-astral" element={<BirthChart />} />
            <Route path="/mapa-astral/resultado" element={<BirthChartResult />} />
            <Route path="/mapa-astral/pagamento" element={<BirthChartPayment />} />
            <Route path="/pagamento/aguardando" element={<PaymentPending />} />
            <Route path="/pagamento/sucesso" element={<PaymentSuccess />} />
            <Route path="/pagamento/erro" element={<PaymentError />} />
            <Route path="/mapa-completo" element={<FullBirthChart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
