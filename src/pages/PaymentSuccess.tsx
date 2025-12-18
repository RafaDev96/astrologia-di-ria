import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { user, isPremium, loading } = useAuth();

  useEffect(() => {
    // If logged in and premium, redirect to full chart
    if (!loading && user && isPremium) {
      setTimeout(() => navigate("/mapa-completo"), 2000);
    }
  }, [loading, user, isPremium, navigate]);

  return (
    <div className="min-h-screen bg-gradient-cosmic flex flex-col">
      <Helmet>
        <title>Pagamento Confirmado | Horóscopo da Gabi</title>
      </Helmet>

      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          {loading ? (
            <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin" />
          ) : (
            <>
              <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              
              <h1 className="text-2xl font-display text-foreground">
                Pagamento Confirmado!
              </h1>
              
              <p className="text-muted-foreground">
                {isPremium 
                  ? "Redirecionando para seu mapa astral completo..."
                  : "Seu acesso premium será liberado em instantes."}
              </p>

              <Button
                onClick={() => navigate(isPremium ? "/mapa-completo" : "/pos-pagamento")}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display"
              >
                {isPremium ? "Ver Meu Mapa Completo" : "Verificar Status"}
              </Button>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
