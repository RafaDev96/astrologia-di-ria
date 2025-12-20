import { ChartData } from '@/utils/astroCalculations';
import { planets as planetData, houses, planetInSignInterpretations } from '@/data/astrologyData';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface PlanetsTabProps {
  chartData: ChartData;
}

export default function PlanetsTab({ chartData }: PlanetsTabProps) {
  const getPlanetInfo = (planetName: string) => {
    return planetData.find(p => p.name === planetName);
  };
  
  const getHouseInfo = (houseNum: number) => {
    return houses.find(h => h.number === houseNum);
  };
  
  const getInterpretation = (planetId: string, sign: string) => {
    return planetInSignInterpretations[planetId]?.[sign] || 
      `${sign} influencia esta área da sua vida de forma única e especial.`;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-primary/10 to-cosmic-purple/10 border-primary/30">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl text-gradient-gold">
            Posições Planetárias 🪐
          </CardTitle>
          <CardDescription className="text-base text-foreground/80 mt-2">
            Cada planeta representa uma parte diferente da sua personalidade e vida. 
            Explore cada um para entender melhor suas tendências naturais.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-card/50 border-primary/20">
        <CardContent className="pt-6">
          <Accordion type="multiple" className="w-full">
            {chartData.planets.map((planet, index) => {
              const planetInfo = getPlanetInfo(planet.planet);
              const houseInfo = getHouseInfo(planet.house);
              const planetId = planetInfo?.id || planet.planet.toLowerCase().replace(' ', '');
              const interpretation = getInterpretation(planetId, planet.sign);
              
              return (
                <AccordionItem key={index} value={`planet-${index}`} className="border-primary/10">
                  <AccordionTrigger className="hover:no-underline hover:bg-primary/5 px-4 rounded-lg">
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-2xl text-primary">{planetInfo?.symbol || '★'}</span>
                      <div>
                        <p className="font-display text-foreground">
                          {planet.planet} em {planet.sign}
                          {planet.retrograde && <span className="text-orange-400 ml-2">℞</span>}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Casa {planet.house} • {Math.floor(planet.degreeInSign || planet.degree % 30)}°{Math.floor(((planet.degreeInSign || planet.degree % 30) % 1) * 60)}'
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-background/30 rounded-lg mx-2 mb-2">
                    <div className="space-y-4 p-4">
                      <div className="bg-primary/5 p-3 rounded-lg">
                        <p className="text-sm text-primary font-medium mb-1">💫 O que este planeta representa:</p>
                        <p className="text-muted-foreground text-sm">{planetInfo?.meaning}</p>
                      </div>
                      <div className="bg-cosmic-purple/10 p-3 rounded-lg">
                        <p className="text-sm text-cosmic-purple font-medium mb-1">🌟 Sua interpretação pessoal:</p>
                        <p className="text-foreground">{interpretation}</p>
                      </div>
                      <div className="bg-background/50 p-3 rounded-lg">
                        <p className="text-sm text-primary font-medium mb-1">🏠 Área de vida influenciada ({houseInfo?.name}):</p>
                        <p className="text-muted-foreground text-sm">{houseInfo?.meaning}</p>
                      </div>
                      {planet.retrograde && (
                        <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs border-orange-500 text-orange-400">Retrógrado</Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            Quando um planeta está retrógrado, sua energia se volta para dentro. 
                            É um convite para revisar, refletir e reavaliar as áreas que ele governa. 
                            Não é algo negativo, mas sim uma oportunidade de crescimento interior.
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
    </div>
  );
}
