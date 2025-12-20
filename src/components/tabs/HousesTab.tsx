import { ChartData } from '@/utils/astroCalculations';
import { houseInterpretations, getSignInfluenceForHouse, houseAxes } from '@/data/houseInterpretations';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface HousesTabProps {
  chartData: ChartData;
}

export default function HousesTab({ chartData }: HousesTabProps) {
  const getSignFromDegree = (degree: number): string => {
    const deg = degree % 360;
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
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-primary/10 to-cosmic-purple/10 border-primary/30">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl text-gradient-gold">
            Casas Astrológicas 🏠
          </CardTitle>
          <CardDescription className="text-base text-foreground/80 mt-2">
            As 12 casas representam diferentes áreas da sua vida. Cada casa é um "palco" onde os planetas atuam, 
            trazendo suas energias para temas específicos como relacionamentos, carreira, espiritualidade e mais.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-card/50 border-primary/20">
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {houseInterpretations.map((houseInterp) => {
              const cuspDegree = chartData.houses[houseInterp.number - 1];
              const cuspSign = getSignFromDegree(cuspDegree);
              const planetsInHouse = chartData.planets.filter(p => p.house === houseInterp.number);
              const signInfluence = getSignInfluenceForHouse(houseInterp.number, cuspSign);
              const axisInfo = houseAxes[houseInterp.axis as keyof typeof houseAxes];
              
              return (
                <AccordionItem key={houseInterp.number} value={`house-${houseInterp.number}`} className="border border-primary/20 rounded-lg bg-background/30 px-2">
                  <AccordionTrigger className="hover:no-underline hover:bg-primary/5 px-4 rounded-lg py-4">
                    <div className="flex items-center gap-3 text-left">
                      <span className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full text-xl">
                        {houseInterp.symbol}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-display text-foreground">{houseInterp.title}</p>
                          <Badge variant="outline" className="text-xs border-primary/50">{houseInterp.modality}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Cúspide em <span className="text-primary font-medium">{cuspSign}</span>
                          {planetsInHouse.length > 0 && ` • ${planetsInHouse.length} planeta(s)`}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-6 space-y-4">
                    {/* Archetype & Natural Ruler */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="bg-primary/10 px-3 py-2 rounded-lg">
                        <span className="text-muted-foreground">Arquétipo:</span>{' '}
                        <span className="text-foreground font-medium">{houseInterp.archetype}</span>
                      </div>
                      <div className="bg-cosmic-purple/10 px-3 py-2 rounded-lg">
                        <span className="text-muted-foreground">Regente:</span>{' '}
                        <span className="text-foreground font-medium">{houseInterp.naturalRuler}</span>
                      </div>
                      <div className="bg-cosmic-gold/10 px-3 py-2 rounded-lg">
                        <span className="text-muted-foreground">Elemento:</span>{' '}
                        <span className="text-foreground font-medium">{houseInterp.element}</span>
                      </div>
                    </div>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-2">
                      {houseInterp.keywords.map((keyword, i) => (
                        <Badge key={i} variant="secondary" className="bg-primary/10 text-primary">
                          {keyword}
                        </Badge>
                      ))}
                    </div>

                    {/* Deep Meaning */}
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <p className="text-sm text-primary font-medium mb-2">📖 Significado Profundo</p>
                      <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">
                        {houseInterp.deepMeaning}
                      </p>
                    </div>

                    {/* Axis Info */}
                    {axisInfo && (
                      <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                        <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-2">
                          ⚖️ {axisInfo.name}
                        </p>
                        <p className="text-sm text-foreground/90 mb-2">{axisInfo.description}</p>
                        <p className="text-xs text-muted-foreground italic">Lição: {axisInfo.lesson}</p>
                      </div>
                    )}

                    {/* Sign Influence - Personalized */}
                    <div className="bg-gradient-to-r from-cosmic-purple/10 to-primary/10 p-4 rounded-lg border border-primary/20">
                      <p className="text-sm font-medium text-primary mb-2">
                        ✨ Sua Casa {houseInterp.number} em {cuspSign}
                      </p>
                      <p className="text-foreground text-sm leading-relaxed">{signInfluence}</p>
                    </div>

                    {/* Life Areas */}
                    <div className="bg-background/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground font-medium mb-2">🎯 Áreas da Vida</p>
                      <ul className="space-y-1">
                        {houseInterp.lifeAreas.map((area, i) => (
                          <li key={i} className="text-sm text-foreground flex items-start gap-2">
                            <span className="text-primary">•</span> {area}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Planets in House */}
                    {planetsInHouse.length > 0 && (
                      <div className="bg-cosmic-purple/10 p-4 rounded-lg">
                        <p className="text-sm text-cosmic-purple font-medium mb-2">🌟 Planetas nesta casa:</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {planetsInHouse.map(p => (
                            <Badge key={p.planet} variant="outline" className="border-cosmic-purple/50">
                              {p.planet} em {p.sign}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Planetas ativam fortemente os temas desta casa, trazendo energia e foco para estas áreas.
                        </p>
                      </div>
                    )}

                    {/* Questions for Reflection */}
                    <div className="bg-cosmic-gold/10 p-4 rounded-lg border border-cosmic-gold/20">
                      <p className="text-sm font-medium text-cosmic-gold mb-2">💭 Perguntas para Reflexão</p>
                      <ul className="space-y-2">
                        {houseInterp.questions.map((question, i) => (
                          <li key={i} className="text-sm text-foreground italic">"{question}"</li>
                        ))}
                      </ul>
                    </div>

                    {/* Growth Path */}
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">🌱 Caminho de Crescimento</p>
                      <p className="text-sm text-foreground">{houseInterp.growthPath}</p>
                    </div>

                    {/* Shadow Side */}
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-muted-foreground mb-2">🌑 Lado Sombra</p>
                      <p className="text-xs text-muted-foreground">{houseInterp.shadowSide}</p>
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
