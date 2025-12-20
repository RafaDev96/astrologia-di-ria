import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Loader2, Lock, Star, Save, ChevronLeft, Sparkles, Globe, Home, Users, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EssenceTab from "@/components/tabs/EssenceTab";
import PlanetsTab from "@/components/tabs/PlanetsTab";
import HousesTab from "@/components/tabs/HousesTab";
import AspectsTab from "@/components/tabs/AspectsTab";
import VisualsTab from "@/components/tabs/VisualsTab";
import { calculateBirthChart, ChartData, BirthData } from "@/utils/astroCalculations";
import { generateChartPDF } from "@/utils/generateChartPDF";
import { useAuth } from "@/hooks/useAuth";
import { useSavedCharts, SavedChart } from "@/hooks/useSavedCharts";
import { toast } from "sonner";

const FullBirthChart = () => {
  const navigate = useNavigate();
  const { user, profile, isPremium, loading: authLoading, refreshProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [birthInfo, setBirthInfo] = useState<{ name: string; birthPlace: string } | null>(null);
  const [birthData, setBirthData] = useState<any>(null);
  const [viewingSavedChart, setViewingSavedChart] = useState<SavedChart | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { savedCharts, saveChart, canCreateChart, remainingCharts } = useSavedCharts();

  useEffect(() => {
    // Redirect if not logged in
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }

    // Refresh profile to get latest premium status
    if (user) {
      refreshProfile();
    }
  }, [authLoading, user, navigate, refreshProfile]);

  useEffect(() => {
    const loadChart = async () => {
      // Check if viewing a saved chart first
      const savedChartData = sessionStorage.getItem('viewingSavedChart');
      if (savedChartData) {
        try {
          const saved = JSON.parse(savedChartData) as SavedChart;
          setViewingSavedChart(saved);
          setChartData(saved.chart_data);
          setBirthInfo({
            name: saved.name,
            birthPlace: saved.birth_data?.birthPlace || saved.birth_data?.city || ""
          });
          setBirthData(saved.birth_data);
          sessionStorage.removeItem('viewingSavedChart');
          setIsLoading(false);
          return;
        } catch (err) {
          console.error("Error loading saved chart:", err);
          sessionStorage.removeItem('viewingSavedChart');
        }
      }

      if (!isPremium || !profile?.birth_data) {
        setIsLoading(false);
        return;
      }

      try {
        const data = profile.birth_data;
        setBirthInfo({ 
          name: data.name || "Seu Mapa", 
          birthPlace: data.birthPlace || data.city || ""
        });
        setBirthData(data);

        // Build BirthData object
        const birthDataObj: BirthData = {
          date: new Date(data.birthDate),
          time: data.birthTime,
          latitude: data.latitude,
          longitude: data.longitude,
          city: data.birthPlace || data.city || ""
        };

        // Calculate the chart
        const chart = await calculateBirthChart(birthDataObj);
        setChartData(chart);
      } catch (err) {
        console.error("Error calculating chart:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading && isPremium) {
      loadChart();
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [authLoading, isPremium, profile]);

  // Check if this chart is already saved
  const isChartSaved = savedCharts.some(saved => 
    saved.birth_data?.birthDate === birthData?.birthDate &&
    saved.birth_data?.birthTime === birthData?.birthTime &&
    saved.name === birthInfo?.name
  );

  const handleSaveChart = async () => {
    if (!chartData || !birthData || !birthInfo) return;
    
    setIsSaving(true);
    const success = await saveChart(birthInfo.name, birthData, chartData);
    setIsSaving(false);
    
    if (!success && !canCreateChart) {
      toast.error(`Você atingiu o limite de 2 mapas. Adquira um novo pacote para criar mais.`);
    }
  };

  const handleDownloadPDF = async (premium: boolean = true) => {
    if (!chartData || !birthInfo) return;
    
    setIsGeneratingPDF(true);
    try {
      await generateChartPDF({
        chartData,
        userName: birthInfo.name,
        birthPlace: birthInfo.birthPlace,
        isPremium: premium
      });
      toast.success(premium ? 'PDF completo gerado!' : 'PDF resumido gerado!');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error('Erro ao gerar PDF. Tente novamente.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  // Not premium - show restricted view
  if (!isPremium) {
    return (
      <div className="min-h-screen bg-gradient-cosmic flex flex-col">
        <Helmet>
          <title>Acesso Restrito | Horóscopo da Gabi</title>
        </Helmet>

        <Header />

        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-amber-500/20 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-amber-500" />
            </div>
            
            <h1 className="text-2xl font-display text-gradient-gold">
              Acesso Premium Necessário
            </h1>
            
            <p className="text-muted-foreground">
              Para acessar o mapa astral completo, você precisa desbloquear o acesso premium.
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => navigate("/mapa-astral")}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display"
              >
                <Star className="w-4 h-4 mr-2" />
                Calcular e Comprar Mapa Completo
              </Button>

              <Button
                onClick={() => navigate("/mapa-astral/resultado")}
                variant="outline"
                size="lg"
                className="w-full border-primary/30"
              >
                Ver Versão Gratuita
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // No birth data saved
  if (!chartData) {
    return (
      <div className="min-h-screen bg-gradient-cosmic flex flex-col">
        <Helmet>
          <title>Mapa Astral | Horóscopo da Gabi</title>
        </Helmet>

        <Header />

        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
              <Star className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="text-2xl font-display text-gradient-gold">
              Você tem Acesso Premium!
            </h1>
            
            <p className="text-muted-foreground">
              Mas ainda não temos seus dados de nascimento. Calcule seu mapa astral para visualizá-lo.
            </p>

            <Button
              onClick={() => navigate("/mapa-astral")}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display"
            >
              <Star className="w-4 h-4 mr-2" />
              Calcular Meu Mapa Astral
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-cosmic flex flex-col">
      <Helmet>
        <title>Mapa Astral Completo de {birthInfo?.name} | Horóscopo da Gabi</title>
        <meta name="description" content="Seu mapa astral completo com todos os planetas, casas e aspectos." />
      </Helmet>

      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Back button if viewing saved chart */}
          {viewingSavedChart && (
            <Button
              variant="ghost"
              onClick={() => navigate("/conta")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Voltar para Mapas Salvos
            </Button>
          )}

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-primary animate-pulse-glow" />
              <span className="text-primary text-sm font-display">PREMIUM</span>
              <Star className="w-5 h-5 text-primary animate-pulse-glow" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display text-gradient-gold">
              Mapa Astral Completo
            </h1>
            <p className="text-xl text-primary">{birthInfo?.name}</p>
            <p className="text-muted-foreground">
              {new Date(chartData.birthData.date).toLocaleDateString('pt-BR')} às {chartData.birthData.time}
            </p>
            <p className="text-sm text-muted-foreground">{birthInfo?.birthPlace}</p>

            {/* Save button */}
            {!viewingSavedChart && !isChartSaved && (
              <div className="pt-4">
                {canCreateChart ? (
                  <Button
                    onClick={handleSaveChart}
                    disabled={isSaving}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Salvando...' : 'Salvar Mapa na Minha Conta'}
                  </Button>
                ) : (
                  <p className="text-amber-400 text-sm">
                    Limite de 2 mapas atingido. Adquira novo pacote para salvar mais.
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  {remainingCharts} mapa{remainingCharts !== 1 ? 's' : ''} restante{remainingCharts !== 1 ? 's' : ''}
                </p>
              </div>
            )}
            {!viewingSavedChart && isChartSaved && (
              <p className="text-green-400 text-sm pt-4">✓ Mapa já salvo na sua conta</p>
            )}

            {/* Download PDF Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => handleDownloadPDF(true)}
                disabled={isGeneratingPDF}
                className="bg-primary hover:bg-primary/90"
              >
                <Download className="w-4 h-4 mr-2" />
                {isGeneratingPDF ? 'Gerando...' : 'PDF Completo (Premium)'}
              </Button>
              <Button
                onClick={() => handleDownloadPDF(false)}
                disabled={isGeneratingPDF}
                variant="outline"
                className="border-primary/50 hover:bg-primary/10"
              >
                <Download className="w-4 h-4 mr-2" />
                {isGeneratingPDF ? 'Gerando...' : 'PDF Resumido (Grátis)'}
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <Tabs defaultValue="essence" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6 h-auto">
              <TabsTrigger value="essence" className="flex flex-col gap-1 py-3">
                <Star className="w-4 h-4" />
                <span className="text-xs">Essência</span>
              </TabsTrigger>
              <TabsTrigger value="planets" className="flex flex-col gap-1 py-3">
                <Globe className="w-4 h-4" />
                <span className="text-xs">Planetas</span>
              </TabsTrigger>
              <TabsTrigger value="houses" className="flex flex-col gap-1 py-3">
                <Home className="w-4 h-4" />
                <span className="text-xs">Casas</span>
              </TabsTrigger>
              <TabsTrigger value="aspects" className="flex flex-col gap-1 py-3">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs">Aspectos</span>
              </TabsTrigger>
              <TabsTrigger value="visuals" className="flex flex-col gap-1 py-3">
                <Eye className="w-4 h-4" />
                <span className="text-xs">Visuais</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="essence">
              <EssenceTab chartData={chartData} userName={birthInfo?.name} />
            </TabsContent>
            
            <TabsContent value="planets">
              <PlanetsTab chartData={chartData} />
            </TabsContent>
            
            <TabsContent value="houses">
              <HousesTab chartData={chartData} />
            </TabsContent>
            
            <TabsContent value="aspects">
              <AspectsTab chartData={chartData} />
            </TabsContent>
            
            <TabsContent value="visuals">
              <VisualsTab chartData={chartData} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Helper function to get sign from degree
function getSignFromDegree(degree: number): string {
  const signs = ['Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 
                 'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'];
  const normalized = ((degree % 360) + 360) % 360;
  const signIndex = Math.floor(normalized / 30);
  return signs[signIndex];
}

export default FullBirthChart;
