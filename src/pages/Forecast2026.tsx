import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  Sparkles, 
  Calendar,
  Loader2,
  ArrowLeft,
  Crown,
  Lock
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BirthData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthCity: string;
  birthCountry: string;
  chartData?: any;
}

const Forecast2026 = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  
  const [birthData, setBirthData] = useState<BirthData>({
    name: "",
    birthDate: "",
    birthTime: "",
    birthCity: "",
    birthCountry: "Brasil",
  });
  
  const [previewForecast, setPreviewForecast] = useState<string | null>(null);
  const [fullForecast, setFullForecast] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [loadingFull, setLoadingFull] = useState(false);

  const isPremium = profile?.is_premium === true;

  // Pre-fill form with user's birth data if available
  useState(() => {
    if (profile?.birth_data) {
      const bd = profile.birth_data as any;
      setBirthData({
        name: bd.name || "",
        birthDate: bd.birthDate || "",
        birthTime: bd.birthTime || "",
        birthCity: bd.birthCity || "",
        birthCountry: bd.birthCountry || "Brasil",
        chartData: bd.chartData,
      });
    }
  });

  const handleInputChange = (field: keyof BirthData, value: string) => {
    setBirthData(prev => ({ ...prev, [field]: value }));
  };

  const generateForecast = async (type: "preview" | "full") => {
    if (!birthData.birthDate || !birthData.birthCity) {
      toast.error("Preencha pelo menos a data e cidade de nascimento");
      return;
    }

    const setLoading = type === "full" ? setLoadingFull : setLoadingPreview;
    const setForecast = type === "full" ? setFullForecast : setPreviewForecast;

    setLoading(true);
    setForecast(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-2026-forecast", {
        body: { birthData, type },
      });

      if (error) {
        console.error("Error generating forecast:", error);
        toast.error("Erro ao gerar previsão. Tente novamente.");
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      setForecast(data.forecast);
      toast.success(type === "full" ? "Previsão completa gerada!" : "Prévia gerada!");
    } catch (err) {
      console.error("Error:", err);
      toast.error("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Previsão 2026 | Horóscopo da Gabi</title>
        <meta name="description" content="Descubra o que 2026 reserva para você. Previsão anual personalizada baseada no seu mapa astral." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 pt-24 pb-12">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              <h1 className="text-3xl md:text-4xl font-display text-gradient-gold">
                Previsão Anual 2026
              </h1>
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubra o que o ano de 2026 reserva para você. Uma leitura personalizada 
              baseada no seu mapa astral e nos trânsitos planetários do ano.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Form Card */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl font-display text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Seus Dados de Nascimento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome (opcional)</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    value={birthData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="birthDate">Data de Nascimento *</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={birthData.birthDate}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="birthTime">Hora de Nascimento (opcional)</Label>
                  <Input
                    id="birthTime"
                    type="time"
                    value={birthData.birthTime}
                    onChange={(e) => handleInputChange("birthTime", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Se não souber, deixe em branco. A leitura será mais genérica.
                  </p>
                </div>

                <div>
                  <Label htmlFor="birthCity">Cidade de Nascimento *</Label>
                  <Input
                    id="birthCity"
                    placeholder="Ex: São Paulo"
                    value={birthData.birthCity}
                    onChange={(e) => handleInputChange("birthCity", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="birthCountry">País de Nascimento</Label>
                  <Input
                    id="birthCountry"
                    placeholder="Brasil"
                    value={birthData.birthCountry}
                    onChange={(e) => handleInputChange("birthCountry", e.target.value)}
                  />
                </div>

                <div className="pt-4 space-y-3">
                  <Button
                    onClick={() => generateForecast("preview")}
                    disabled={loadingPreview || loadingFull}
                    className="w-full gap-2"
                    variant="outline"
                  >
                    {loadingPreview ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Gerando prévia...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Gerar Prévia Gratuita
                      </>
                    )}
                  </Button>

                  {isPremium ? (
                    <Button
                      onClick={() => generateForecast("full")}
                      disabled={loadingPreview || loadingFull}
                      className="w-full gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                    >
                      {loadingFull ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Gerando previsão completa...
                        </>
                      ) : (
                        <>
                          <Crown className="w-4 h-4" />
                          Gerar Previsão Completa
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => navigate("/mapa-astral/pagamento")}
                      className="w-full gap-2"
                      variant="secondary"
                    >
                      <Lock className="w-4 h-4" />
                      Desbloqueie a Previsão Completa
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Results Card */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl font-display text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Sua Previsão para 2026
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingPreview || loadingFull ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    <p className="text-muted-foreground">
                      {loadingFull 
                        ? "Consultando os astros para sua previsão completa..." 
                        : "Gerando sua prévia..."
                      }
                    </p>
                  </div>
                ) : fullForecast || previewForecast ? (
                  <div 
                    className="prose prose-invert max-w-none forecast-content"
                    dangerouslySetInnerHTML={{ 
                      __html: fullForecast || previewForecast || "" 
                    }}
                  />
                ) : (
                  <div className="text-center py-20">
                    <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Preencha seus dados e clique em gerar para ver sua previsão.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>

      <style>{`
        .forecast-content h2 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          color: hsl(var(--primary));
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          border-bottom: 1px solid hsl(var(--border));
          padding-bottom: 0.5rem;
        }
        .forecast-content h2:first-child {
          margin-top: 0;
        }
        .forecast-content p {
          color: hsl(var(--foreground));
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        .forecast-content .cta {
          background: hsl(var(--muted));
          padding: 1rem;
          border-radius: 0.5rem;
          border-left: 3px solid hsl(var(--primary));
          margin-top: 1.5rem;
        }
      `}</style>
    </>
  );
};

export default Forecast2026;
