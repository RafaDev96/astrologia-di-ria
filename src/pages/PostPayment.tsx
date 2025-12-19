import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Loader2, CheckCircle, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

export default function PostPayment() {
  const navigate = useNavigate();
  const { user, isPremium, loading, refreshProfile } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [checkCount, setCheckCount] = useState(0);
  const hasShownToast = useRef(false);

  useEffect(() => {
    // If not logged in, redirect to login
    if (!loading && !user) {
      navigate("/login");
      return;
    }

    // If already premium, show toast and redirect to full chart
    if (isPremium) {
      if (!hasShownToast.current) {
        hasShownToast.current = true;
        toast.success("Pagamento confirmado! Seu Mapa Astral Completo foi liberado.", {
          duration: 5000,
          icon: "✅",
        });
      }
      setTimeout(() => {
        navigate("/mapa-completo");
      }, 1500);
      return;
    }

    // Poll for premium status
    const maxChecks = 60; // 3 minutes (60 * 3s)
    let pollInterval: NodeJS.Timeout | null = null;

    const checkPremiumStatus = async () => {
      await refreshProfile();
      setCheckCount((prev) => prev + 1);
    };

    // Initial check
    checkPremiumStatus();

    // Start polling
    pollInterval = setInterval(() => {
      setCheckCount((prev) => {
        if (prev >= maxChecks) {
          if (pollInterval) clearInterval(pollInterval);
          setIsChecking(false);
          return prev;
        }
        checkPremiumStatus();
        return prev;
      });
    }, 3000);

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [loading, user, isPremium, navigate, refreshProfile]);

  // Handle redirect when premium is activated
  useEffect(() => {
    if (isPremium) {
      if (!hasShownToast.current) {
        hasShownToast.current = true;
        toast.success("Pagamento confirmado! Seu Mapa Astral Completo foi liberado.", {
          duration: 5000,
          icon: "✅",
        });
      }
      setTimeout(() => {
        navigate("/mapa-completo");
      }, 1500);
    }
  }, [isPremium, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Confirmando Pagamento | Horóscopo da Gabi</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-cosmic flex flex-col">
        <Header />

        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full text-center space-y-6">
            {isPremium ? (
              <>
                <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h1 className="text-2xl font-display text-foreground">
                  Pagamento Confirmado!
                </h1>
                <p className="text-muted-foreground">
                  Redirecionando para seu mapa astral completo...
                </p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  {isChecking ? (
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  ) : (
                    <Clock className="w-10 h-10 text-primary" />
                  )}
                </div>
                <h1 className="text-2xl font-display text-foreground">
                  Estamos confirmando seu pagamento...
                </h1>
                <p className="text-muted-foreground">
                  {isChecking
                    ? "Aguarde enquanto processamos seu pagamento. Isso pode levar alguns segundos."
                    : "O pagamento está demorando mais que o esperado."}
                </p>

                <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    💡 Pagou via Pix?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Se você já realizou o pagamento, aguarde alguns segundos e 
                    mantenha esta tela aberta. Assim que confirmarmos, liberaremos 
                    automaticamente seu mapa astral completo.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => refreshProfile()}
                    variant="outline"
                    className="w-full border-primary/30"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Atualizar Status
                  </Button>

                  <Button
                    onClick={() => navigate("/conta")}
                    variant="ghost"
                    className="w-full text-muted-foreground"
                  >
                    Ir para Minha Conta
                  </Button>
                </div>
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
