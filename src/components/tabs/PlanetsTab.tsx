import { ChartData } from '@/utils/astroCalculations';
import { planets as planetData, houses } from '@/data/astrologyData';
import { planetDeepInterpretations, getPlanetDeepInterpretation, getPlanetData } from '@/data/planetInterpretations';
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
  
  const getDeepInterpretation = (planetId: string, sign: string) => {
    return getPlanetDeepInterpretation(planetId, sign);
  };

  const getDeepPlanetData = (planetId: string) => {
    return getPlanetData(planetId);
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
              const deepInterpretation = getDeepInterpretation(planetId, planet.sign);
              const deepPlanetData = getDeepPlanetData(planetId);
              
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
                      {/* Keywords */}
                      {deepPlanetData && (
                        <div className="flex flex-wrap gap-2">
                          {deepPlanetData.keywords.map((keyword, i) => (
                            <Badge key={i} variant="secondary" className="bg-primary/10 text-primary">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Deep Meaning */}
                      {deepPlanetData && (
                        <div className="bg-primary/5 p-4 rounded-lg">
                          <p className="text-sm text-primary font-medium mb-2">📖 O que {planet.planet} representa na sua vida:</p>
                          <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">{deepPlanetData.deepMeaning}</p>
                        </div>
                      )}

                      {/* Personal Interpretation */}
                      {deepInterpretation && (
                        <div className="bg-gradient-to-r from-cosmic-purple/10 to-primary/10 p-4 rounded-lg border border-primary/20">
                          <p className="text-sm font-medium text-primary mb-2">✨ {planet.planet} em {planet.sign} — Sua Expressão Pessoal</p>
                          <p className="text-foreground mb-3">{deepInterpretation.essence}</p>
                          
                          <div className="grid md:grid-cols-2 gap-3 mt-3">
                            <div className="bg-green-500/10 p-3 rounded border border-green-500/20">
                              <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">💪 Seus Pontos Fortes</p>
                              <ul className="space-y-1">
                                {deepInterpretation.strengths.map((s, i) => (
                                  <li key={i} className="text-xs text-foreground">• {s}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-orange-500/10 p-3 rounded border border-orange-500/20">
                              <p className="text-xs font-medium text-orange-600 dark:text-orange-400 mb-1">🎯 Desafios para Crescer</p>
                              <ul className="space-y-1">
                                {deepInterpretation.challenges.map((c, i) => (
                                  <li key={i} className="text-xs text-foreground">• {c}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Deep Insight */}
                      {deepInterpretation && (
                        <div className="bg-cosmic-gold/10 p-4 rounded-lg border border-cosmic-gold/20">
                          <p className="text-sm font-medium text-cosmic-gold mb-2">💫 Insight Profundo</p>
                          <p className="text-foreground text-sm italic">{deepInterpretation.deepInsight}</p>
                        </div>
                      )}

                      {/* Life Lesson */}
                      {deepInterpretation && (
                        <div className="bg-cosmic-purple/10 p-4 rounded-lg">
                          <p className="text-sm text-cosmic-purple font-medium mb-2">🌱 Lição de Vida</p>
                          <p className="text-foreground text-sm">{deepInterpretation.lifeLesson}</p>
                        </div>
                      )}

                      {/* House Influence */}
                      <div className="bg-background/50 p-3 rounded-lg">
                        <p className="text-sm text-primary font-medium mb-1">🏠 Casa {planet.house} — {houseInfo?.name}</p>
                        <p className="text-muted-foreground text-sm">{houseInfo?.meaning}</p>
                      </div>

                      {planet.retrograde && (
                        <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs border-orange-500 text-orange-400">Retrógrado ℞</Badge>
                          </div>
                          <p className="text-foreground text-sm mb-2">
                            {planet.planet} retrógrado convida você a uma jornada interior nas áreas que ele governa.
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Não é algo negativo — é uma oportunidade de revisar, refletir e reavaliar. A energia se volta para dentro, 
                            oferecendo profundidade onde outros podem ter superficialidade.
                          </p>
                        </div>
                      )}

                      {/* Questions for Reflection */}
                      {deepPlanetData && (
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground mb-2">💭 Perguntas para Reflexão</p>
                          <ul className="space-y-2">
                            {deepPlanetData.questions.map((q, i) => (
                              <li key={i} className="text-sm text-foreground italic">"{q}"</li>
                            ))}
                          </ul>
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
