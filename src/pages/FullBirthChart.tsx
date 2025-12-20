import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Loader2, Lock, Star, Save, ChevronLeft, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ZodiacWheel from "@/components/ZodiacWheel";
import ArtisticMandala from "@/components/ArtisticMandala";
import ChartInterpretation from "@/components/ChartInterpretation";
import PlanetaryAspects from "@/components/PlanetaryAspects";
import { calculateBirthChart, ChartData, BirthData } from "@/utils/astroCalculations";
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

  // Get sun, moon from chart data
  const sunPlanet = chartData.planets.find(p => p.planet === 'Sol');
  const moonPlanet = chartData.planets.find(p => p.planet === 'Lua');

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
          </div>

          {/* Big Three Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card/50 rounded-lg p-6 text-center border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Sol</p>
              <p className="text-2xl font-display text-gradient-gold">{sunPlanet?.sign}</p>
              <p className="text-xs text-muted-foreground">{sunPlanet?.degree.toFixed(1)}°</p>
            </div>
            <div className="bg-card/50 rounded-lg p-6 text-center border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Lua</p>
              <p className="text-2xl font-display text-gradient-gold">{moonPlanet?.sign}</p>
              <p className="text-xs text-muted-foreground">{moonPlanet?.degree.toFixed(1)}°</p>
            </div>
            <div className="bg-card/50 rounded-lg p-6 text-center border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Ascendente</p>
              <p className="text-2xl font-display text-gradient-gold">{chartData.ascendant.sign}</p>
              <p className="text-xs text-muted-foreground">{chartData.ascendant.degree.toFixed(1)}°</p>
            </div>
          </div>

          {/* Visualizations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-xl font-display text-foreground text-center">
                Mapa Tradicional
              </h2>
              <ZodiacWheel chartData={chartData} />
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-display text-foreground text-center">
                Mandala Artística
              </h2>
              <ArtisticMandala chartData={chartData} />
            </div>
          </div>

          {/* Complete Planets */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/20">
            <h2 className="text-xl font-display text-foreground mb-4">
              Todos os Planetas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {chartData.planets.map((planet) => (
                <div key={planet.planet} className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">
                    {planet.planet}
                  </p>
                  <p className="font-semibold text-primary">{planet.sign}</p>
                  <p className="text-xs text-muted-foreground">{planet.degree.toFixed(1)}°</p>
                </div>
              ))}
            </div>
          </div>

          {/* Houses */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/20">
            <h2 className="text-xl font-display text-foreground mb-4">
              Casas Astrológicas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {chartData.houses.map((houseDegree, index) => {
                const sign = getSignFromDegree(houseDegree);
                return (
                  <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Casa {index + 1}</p>
                    <p className="font-semibold text-primary">{sign}</p>
                    <p className="text-xs text-muted-foreground">{houseDegree.toFixed(1)}°</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tabs for Interpretation and Planetary Aspects */}
          <Tabs defaultValue="interpretation" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="interpretation" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Interpretação
              </TabsTrigger>
              <TabsTrigger value="aspects" className="gap-2">
                <Sparkles className="w-4 h-4" />
                Aspectos Planetários
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="interpretation">
              <ChartInterpretation chartData={chartData} userName={birthInfo?.name} />
            </TabsContent>
            
            <TabsContent value="aspects">
              {chartData.aspects && chartData.aspects.length > 0 ? (
                <PlanetaryAspects aspects={chartData.aspects} />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Nenhum aspecto encontrado no seu mapa.</p>
                </div>
              )}
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
