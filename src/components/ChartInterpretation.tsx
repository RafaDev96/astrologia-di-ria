import { ChartData } from '@/utils/astroCalculations';
import { 
  planets as planetData, 
  houses, 
  planetInSignInterpretations,
  signElements,
  aspects as aspectData
} from '@/data/astrologyData';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartInterpretationProps {
  chartData: ChartData;
}

export default function ChartInterpretation({ chartData }: ChartInterpretationProps) {
  const getPlanetInfo = (planetName: string) => {
    return planetData.find(p => p.name === planetName);
  };
  
  const getHouseInfo = (houseNum: number) => {
    return houses.find(h => h.number === houseNum);
  };
  
  const getAspectInfo = (aspectType: string) => {
    return aspectData.find(a => a.name === aspectType);
  };
  
  const getInterpretation = (planetId: string, sign: string) => {
    return planetInSignInterpretations[planetId]?.[sign] || 
      `${sign} influencia esta área da sua vida de forma única.`;
  };

  // Calculate element distribution
  const elementCounts = { Fogo: 0, Terra: 0, Ar: 0, Água: 0 };
  chartData.planets.forEach(planet => {
    const element = signElements[planet.sign];
    if (element) elementCounts[element]++;
  });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Sol</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-display text-gradient-gold">
              {chartData.planets.find(p => p.planet === 'Sol')?.sign}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Lua</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-display text-gradient-gold">
              {chartData.planets.find(p => p.planet === 'Lua')?.sign}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Ascendente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-display text-gradient-gold">
              {chartData.ascendant.sign}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Meio do Céu</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-display text-gradient-gold">
              {chartData.midheaven.sign}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Element Distribution */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="font-display text-foreground">Distribuição dos Elementos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(elementCounts).map(([element, count]) => (
              <div key={element} className="text-center">
                <div className="text-2xl mb-1">
                  {element === 'Fogo' && '🔥'}
                  {element === 'Terra' && '🌍'}
                  {element === 'Ar' && '💨'}
                  {element === 'Água' && '💧'}
                </div>
                <p className="text-sm text-muted-foreground">{element}</p>
                <p className="text-xl font-display text-primary">{count}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Planets Accordion */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="font-display text-foreground">Posições Planetárias</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {chartData.planets.map((planet, index) => {
              const planetInfo = getPlanetInfo(planet.planet);
              const houseInfo = getHouseInfo(planet.house);
              const planetId = planetInfo?.id || planet.planet.toLowerCase().replace(' ', '');
              const interpretation = getInterpretation(planetId, planet.sign);
              
              return (
                <AccordionItem key={index} value={`planet-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-2xl text-primary">{planetInfo?.symbol || '★'}</span>
                      <div>
                        <p className="font-display text-foreground">
                          {planet.planet} em {planet.sign}
                          {planet.retrograde && <span className="text-destructive ml-2">(R)</span>}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Casa {planet.house} • {Math.round(planet.degree % 30)}°
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pl-10">
                      <div>
                        <p className="text-sm text-primary font-medium mb-1">Significado do Planeta:</p>
                        <p className="text-muted-foreground text-sm">{planetInfo?.meaning}</p>
                      </div>
                      <div>
                        <p className="text-sm text-primary font-medium mb-1">Interpretação:</p>
                        <p className="text-foreground">{interpretation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-primary font-medium mb-1">Área de Vida ({houseInfo?.name}):</p>
                        <p className="text-muted-foreground text-sm">{houseInfo?.meaning}</p>
                      </div>
                      {planet.retrograde && (
                        <div>
                          <Badge variant="destructive" className="text-xs">Retrógrado</Badge>
                          <p className="text-muted-foreground text-sm mt-1">
                            Este planeta pede revisão e introspecção nas áreas que governa.
                          </p>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>

      {/* Aspects */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="font-display text-foreground">Aspectos Principais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {chartData.aspects.slice(0, 12).map((aspect, index) => {
              const aspectInfo = getAspectInfo(aspect.type);
              return (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl text-primary">{aspectInfo?.symbol}</span>
                    <div>
                      <p className="text-foreground">
                        {aspect.planet1} {aspectInfo?.symbol} {aspect.planet2}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {aspect.type} • Orbe: {aspect.orb}°
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={aspectInfo?.nature === 'harmonious' ? 'default' : 
                             aspectInfo?.nature === 'challenging' ? 'destructive' : 'secondary'}
                  >
                    {aspectInfo?.nature === 'harmonious' ? 'Harmônico' : 
                     aspectInfo?.nature === 'challenging' ? 'Desafiador' : 'Neutro'}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Houses */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="font-display text-foreground">Casas Astrológicas</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {houses.map((house, index) => {
              const cuspDegree = chartData.houses[index];
              const cuspSign = chartData.planets.length > 0 
                ? (() => {
                    const deg = cuspDegree % 360;
                    if (deg >= 0 && deg < 30) return 'Áries';
                    if (deg >= 30 && deg < 60) return 'Touro';
                    if (deg >= 60 && deg < 90) return 'Gêmeos';
                    if (deg >= 90 && deg < 120) return 'Câncer';
                    if (deg >= 120 && deg < 150) return 'Leão';
                    if (deg >= 150 && deg < 180) return 'Virgem';
                    if (deg >= 180 && deg < 210) return 'Libra';
                    if (deg >= 210 && deg < 240) return 'Escorpião';
                    if (deg >= 240 && deg < 270) return 'Sagitário';
                    if (deg >= 270 && deg < 300) return 'Capricórnio';
                    if (deg >= 300 && deg < 330) return 'Aquário';
                    return 'Peixes';
                  })()
                : '';
              const planetsInHouse = chartData.planets.filter(p => p.house === house.number);
              
              return (
                <AccordionItem key={house.number} value={`house-${house.number}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-xl text-primary font-display">{house.number}</span>
                      <div>
                        <p className="font-display text-foreground">{house.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Cúspide em {cuspSign}
                          {planetsInHouse.length > 0 && ` • ${planetsInHouse.length} planeta(s)`}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pl-10">
                      <p className="text-foreground">{house.meaning}</p>
                      {planetsInHouse.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {planetsInHouse.map(p => (
                            <Badge key={p.planet} variant="outline">
                              {p.planet} em {p.sign}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
