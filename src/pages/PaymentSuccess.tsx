import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [birthData, setBirthData] = useState<any>(null);

  const orderId = searchParams.get("order");

  useEffect(() => {
    if (!orderId) {
      navigate("/mapa-astral");
      return;
    }

    const fetchOrderData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/order-status?order=${orderId}`
        );

        if (!response.ok) {
          console.error("Error fetching order");
          setIsLoading(false);
          return;
        }

        const result = await response.json();
        
        if (result.status === "approved" && result.token) {
          setToken(result.token);
          setBirthData(result.birthData);
          sessionStorage.setItem("orderToken", result.token);
          sessionStorage.setItem("orderBirthData", JSON.stringify(result.birthData));
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId, navigate]);

  const handleAccessChart = () => {
    if (token) {
      navigate(`/mapa-completo?token=${token}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Pagamento Confirmado | Horóscopo da Gabi</title>
      </Helmet>

      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          {isLoading ? (
            <>
              <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin" />
              <p className="text-muted-foreground">Carregando...</p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              
              <h1 className="text-2xl font-bold text-foreground">
                Pagamento Confirmado!
              </h1>
              
              <p className="text-muted-foreground">
                Seu mapa astral completo está pronto para ser acessado.
              </p>

              <div className="bg-primary/10 rounded-lg p-4 space-y-2">
                <p className="text-sm text-foreground">
                  ✨ Você agora tem acesso a:
                </p>
                <ul className="text-sm text-muted-foreground text-left space-y-1 pl-4">
                  <li>• Todos os planetas e suas posições</li>
                  <li>• Casas astrológicas completas</li>
                  <li>• Aspectos planetários detalhados</li>
                  <li>• Visualização artística do mapa</li>
                  <li>• Interpretações personalizadas</li>
                </ul>
              </div>

              <Button
                onClick={handleAccessChart}
                size="lg"
                className="w-full"
                disabled={!token}
              >
                Acessar Meu Mapa Astral Completo
              </Button>

              {!token && (
                <p className="text-sm text-amber-500">
                  Aguardando confirmação do pagamento...
                </p>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
