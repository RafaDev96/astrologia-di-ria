import { ChartData } from '@/utils/astroCalculations';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ZodiacWheel from '@/components/ZodiacWheel';
import ArtisticMandala from '@/components/ArtisticMandala';

interface VisualsTabProps {
  chartData: ChartData;
}

export default function VisualsTab({ chartData }: VisualsTabProps) {
  const getSignFromDegree = (degree: number): string => {
    const signs = ['Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 
                   'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'];
    const normalized = ((degree % 360) + 360) % 360;
    const signIndex = Math.floor(normalized / 30);
    return signs[signIndex];
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-primary/10 to-cosmic-purple/10 border-primary/30">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl text-gradient-gold">
            Visualizações do Mapa 🎨
          </CardTitle>
          <CardDescription className="text-base text-foreground/80 mt-2">
            Seu mapa astral representado de diferentes formas visuais. 
            Explore a roda tradicional e a mandala artística.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 border-primary/20">
          <CardHeader>
            <CardTitle className="font-display text-foreground text-center">Mapa Tradicional</CardTitle>
            <CardDescription className="text-center">
              A roda zodiacal clássica com todas as posições planetárias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ZodiacWheel chartData={chartData} />
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-primary/20">
          <CardHeader>
            <CardTitle className="font-display text-foreground text-center">Mandala Artística</CardTitle>
            <CardDescription className="text-center">
              Uma representação artística e única do seu mapa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ArtisticMandala chartData={chartData} />
          </CardContent>
        </Card>
      </div>

      {/* Planets Grid */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="font-display text-foreground">Todos os Planetas</CardTitle>
          <CardDescription>Visão geral de todas as posições planetárias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {chartData.planets.map((planet) => (
              <div key={planet.planet} className="text-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <p className="text-xs text-muted-foreground mb-1">
                  {planet.planet}
                  {planet.retrograde && <span className="text-orange-400 ml-1">℞</span>}
                </p>
                <p className="font-semibold text-primary">{planet.sign}</p>
                <p className="text-xs text-muted-foreground">{planet.degree.toFixed(1)}°</p>
                <p className="text-xs text-muted-foreground">Casa {planet.house}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Houses Grid */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="font-display text-foreground">Casas Astrológicas</CardTitle>
          <CardDescription>Os signos nas cúspides de cada casa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {chartData.houses.map((houseDegree, index) => {
              const sign = getSignFromDegree(houseDegree);
              const planetsInHouse = chartData.planets.filter(p => p.house === index + 1);
              return (
                <div key={index} className="text-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <p className="text-xs text-muted-foreground mb-1">Casa {index + 1}</p>
                  <p className="font-semibold text-primary">{sign}</p>
                  <p className="text-xs text-muted-foreground">{houseDegree.toFixed(1)}°</p>
                  {planetsInHouse.length > 0 && (
                    <p className="text-xs text-cosmic-purple mt-1">
                      {planetsInHouse.length} planeta(s)
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
