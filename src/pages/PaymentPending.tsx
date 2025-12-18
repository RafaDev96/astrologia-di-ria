import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Loader2, Clock, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentPending = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("pending");
  const [isChecking, setIsChecking] = useState(true);

  const orderId = searchParams.get("order");

  useEffect(() => {
    if (!orderId) {
      navigate("/mapa-astral");
      return;
    }

    let pollInterval: NodeJS.Timeout | null = null;
    let pollCount = 0;
    const maxPolls = 60; // Poll for up to 3 minutes (60 * 3s)

    const checkStatus = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("order-status", {
          body: null,
          method: "GET",
        });

        // Use fetch directly for GET with query params
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/order-status?order=${orderId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error("Error checking status");
          return;
        }

        const result = await response.json();
        setStatus(result.status);

        if (result.status === "approved" && result.token) {
          // Store token and birth data in sessionStorage
          sessionStorage.setItem("orderToken", result.token);
          sessionStorage.setItem("orderBirthData", JSON.stringify(result.birthData));
          
          // Redirect to complete chart
          setTimeout(() => {
            navigate(`/mapa-completo?token=${result.token}`);
          }, 1500);
        }
      } catch (err) {
        console.error("Error checking order status:", err);
      }
    };

    // Initial check
    checkStatus();

    // Start polling
    pollInterval = setInterval(() => {
      pollCount++;
      if (pollCount >= maxPolls) {
        if (pollInterval) clearInterval(pollInterval);
        setIsChecking(false);
        return;
      }
      checkStatus();
    }, 3000);

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [orderId, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Aguardando Pagamento | Horóscopo da Gabi</title>
      </Helmet>

      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          {status === "approved" ? (
            <>
              <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Pagamento Confirmado!
              </h1>
              <p className="text-muted-foreground">
                Redirecionando para o seu mapa astral completo...
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
              <h1 className="text-2xl font-bold text-foreground">
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
                  Se você já realizou o pagamento, aguarde alguns segundos e mantenha esta 
                  tela aberta. Assim que confirmarmos, liberaremos automaticamente seu 
                  mapa astral completo.
                </p>
              </div>

              {!isChecking && (
                <button
                  onClick={() => navigate("/mapa-astral/pagamento")}
                  className="text-primary hover:underline text-sm"
                >
                  Tentar novamente
                </button>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentPending;
