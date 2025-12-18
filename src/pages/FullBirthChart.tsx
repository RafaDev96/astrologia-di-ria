import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ZodiacWheel from "@/components/ZodiacWheel";
import ArtisticMandala from "@/components/ArtisticMandala";
import ChartInterpretation from "@/components/ChartInterpretation";
import { calculateBirthChart, ChartData, BirthData } from "@/utils/astroCalculations";

const FullBirthChart = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [birthInfo, setBirthInfo] = useState<{ name: string; birthPlace: string } | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  const token = searchParams.get("token");

  useEffect(() => {
    const validateAccess = async () => {
      // Check sessionStorage first
      const storedToken = sessionStorage.getItem("orderToken");
      const storedBirthData = sessionStorage.getItem("orderBirthData");

      if (token && storedToken === token && storedBirthData) {
        try {
          const data = JSON.parse(storedBirthData);
          setBirthInfo({ name: data.name, birthPlace: data.birthPlace || data.city });
          
          // Build BirthData object
          const birthData: BirthData = {
            date: new Date(data.birthDate),
            time: data.birthTime,
            latitude: data.latitude,
            longitude: data.longitude,
            city: data.birthPlace || data.city || ''
          };
          
          // Calculate the chart
          const chart = await calculateBirthChart(birthData);
          setChartData(chart);
          setIsValid(true);
        } catch (err) {
          console.error("Error parsing birth data:", err);
        }
      } else if (token) {
        // Try to validate token via API by checking all orders
        // For security, we'll require the data to be in sessionStorage
        setIsValid(false);
      }

      setIsLoading(false);
    };

    validateAccess();
  }, [token]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!isValid || !chartData) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Helmet>
          <title>Acesso Restrito | Horóscopo da Gabi</title>
        </Helmet>

        <Header />

        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-amber-500/20 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-amber-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-foreground">
              Acesso Restrito
            </h1>
            
            <p className="text-muted-foreground">
              Para acessar o mapa astral completo, você precisa realizar o pagamento primeiro.
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => navigate("/mapa-astral/pagamento")}
                size="lg"
                className="w-full"
              >
                Comprar Mapa Astral Completo
              </Button>

              <Button
                onClick={() => navigate("/mapa-astral/resultado")}
                variant="outline"
                size="lg"
                className="w-full"
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

  // Get sun, moon, and ascendant from chart data
  const sunPlanet = chartData.planets.find(p => p.planet === 'Sol');
  const moonPlanet = chartData.planets.find(p => p.planet === 'Lua');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Mapa Astral Completo de {birthInfo?.name} | Horóscopo da Gabi</title>
        <meta name="description" content="Seu mapa astral completo com todos os planetas, casas e aspectos." />
      </Helmet>

      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Mapa Astral Completo
            </h1>
            <p className="text-xl text-primary">{birthInfo?.name}</p>
            <p className="text-muted-foreground">
              {chartData.birthData.date.toLocaleDateString('pt-BR')} às {chartData.birthData.time}
            </p>
            <p className="text-sm text-muted-foreground">{birthInfo?.birthPlace}</p>
          </div>

          {/* Big Three Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-6 text-center border border-border">
              <p className="text-sm text-muted-foreground mb-1">Sol</p>
              <p className="text-2xl font-bold text-primary">{sunPlanet?.sign}</p>
              <p className="text-xs text-muted-foreground">{sunPlanet?.degree.toFixed(1)}°</p>
            </div>
            <div className="bg-card rounded-lg p-6 text-center border border-border">
              <p className="text-sm text-muted-foreground mb-1">Lua</p>
              <p className="text-2xl font-bold text-primary">{moonPlanet?.sign}</p>
              <p className="text-xs text-muted-foreground">{moonPlanet?.degree.toFixed(1)}°</p>
            </div>
            <div className="bg-card rounded-lg p-6 text-center border border-border">
              <p className="text-sm text-muted-foreground mb-1">Ascendente</p>
              <p className="text-2xl font-bold text-primary">{chartData.ascendant.sign}</p>
              <p className="text-xs text-muted-foreground">{chartData.ascendant.degree.toFixed(1)}°</p>
            </div>
          </div>

          {/* Visualizations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground text-center">
                Mapa Tradicional
              </h2>
              <ZodiacWheel chartData={chartData} />
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground text-center">
                Mandala Artística
              </h2>
              <ArtisticMandala chartData={chartData} />
            </div>
          </div>

          {/* Complete Planets */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">
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
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">
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

          {/* Aspects */}
          {chartData.aspects && chartData.aspects.length > 0 && (
            <div className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Aspectos Planetários
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {chartData.aspects.slice(0, 15).map((aspect, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm">{aspect.planet1}</span>
                    <span className="text-xs text-primary font-medium">{aspect.type}</span>
                    <span className="text-sm">{aspect.planet2}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Interpretation */}
          <ChartInterpretation chartData={chartData} userName={birthInfo?.name} />
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
