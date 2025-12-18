import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentError = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("order");

  const handleRetry = () => {
    navigate("/mapa-astral/pagamento");
  };

  const handleBackToChart = () => {
    navigate("/mapa-astral/resultado");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Erro no Pagamento | Horóscopo da Gabi</title>
      </Helmet>

      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground">
            Ops! Algo deu errado
          </h1>
          
          <p className="text-muted-foreground">
            Não foi possível processar seu pagamento. Isso pode acontecer por diversos 
            motivos, como cartão recusado ou problema na conexão.
          </p>

          <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
            <p className="text-sm font-medium text-foreground">
              O que você pode fazer:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Verificar os dados do cartão</li>
              <li>• Tentar outro método de pagamento (Pix)</li>
              <li>• Verificar se há saldo disponível</li>
              <li>• Entrar em contato com seu banco</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleRetry}
              size="lg"
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>

            <Button
              onClick={handleBackToChart}
              variant="outline"
              size="lg"
              className="w-full"
            >
              Voltar ao Mapa Astral
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentError;
