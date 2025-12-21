import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import SignDetail from "./pages/SignDetail";
import BirthChart from "./pages/BirthChart";
import BirthChartResult from "./pages/BirthChartResult";
import BirthChartPayment from "./pages/BirthChartPayment";
import PaymentPending from "./pages/PaymentPending";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentError from "./pages/PaymentError";
import PostPayment from "./pages/PostPayment";
import FullBirthChart from "./pages/FullBirthChart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/signo/:signId" element={<SignDetail />} />
                <Route path="/mapa-astral" element={<BirthChart />} />
                <Route path="/mapa-astral/resultado" element={<BirthChartResult />} />
                <Route path="/mapa-astral/pagamento" element={<BirthChartPayment />} />
                <Route path="/pagamento/aguardando" element={<PaymentPending />} />
                <Route path="/pagamento/sucesso" element={<PaymentSuccess />} />
                <Route path="/pagamento/erro" element={<PaymentError />} />
                <Route path="/pos-pagamento" element={<PostPayment />} />
                <Route path="/mapa-completo" element={<FullBirthChart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Signup />} />
                <Route path="/conta" element={<Account />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
