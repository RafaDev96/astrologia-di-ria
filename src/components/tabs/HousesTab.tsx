import { ChartData } from '@/utils/astroCalculations';
import { houseInterpretations, getSignInfluenceForHouse } from '@/data/houseInterpretations';
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
            As casas representam diferentes áreas da sua vida. Descubra quais energias atuam em cada setor, 
            desde relacionamentos até carreira.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-card/50 border-primary/20">
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            {houseInterpretations.map((houseInterp) => {
              const cuspDegree = chartData.houses[houseInterp.number - 1];
              const cuspSign = getSignFromDegree(cuspDegree);
              const planetsInHouse = chartData.planets.filter(p => p.house === houseInterp.number);
              const signInfluence = getSignInfluenceForHouse(houseInterp.number, cuspSign);
              
              return (
                <AccordionItem key={houseInterp.number} value={`house-${houseInterp.number}`} className="border-primary/10">
                  <AccordionTrigger className="hover:no-underline hover:bg-primary/5 px-4 rounded-lg">
                    <div className="flex items-center gap-3 text-left">
                      <span className="w-10 h-10 flex items-center justify-center bg-primary/20 rounded-full text-primary font-display text-lg">
                        {houseInterp.number}
                      </span>
                      <div>
                        <p className="font-display text-foreground">{houseInterp.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Cúspide em {cuspSign}
                          {planetsInHouse.length > 0 && ` • ${planetsInHouse.length} planeta(s)`}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-background/30 rounded-lg mx-2 mb-2">
                    <div className="space-y-4 p-4">
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

                      {/* Sign Influence - Personalized */}
                      <div className="bg-gradient-to-r from-cosmic-purple/10 to-primary/10 p-4 rounded-lg border border-primary/20">
                        <p className="text-sm font-medium text-primary mb-2">
                          ✨ Sua Casa {houseInterp.number} em {cuspSign}
                        </p>
                        <p className="text-foreground text-sm leading-relaxed">
                          {signInfluence}
                        </p>
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

                      {/* Questions for Reflection */}
                      <div className="bg-cosmic-gold/10 p-4 rounded-lg border border-cosmic-gold/20">
                        <p className="text-sm font-medium text-cosmic-gold mb-2">💭 Perguntas para Reflexão</p>
                        <ul className="space-y-2">
                          {houseInterp.questions.map((question, i) => (
                            <li key={i} className="text-sm text-foreground italic">"{question}"</li>
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
                            Ter planetas em uma casa ativa fortemente seus temas. Estes planetas trazem energia 
                            adicional e foco para os assuntos desta área da sua vida.
                          </p>
                        </div>
                      )}

                      {planetsInHouse.length === 0 && (
                        <p className="text-xs text-muted-foreground bg-background/50 p-3 rounded">
                          💡 Não ter planetas nesta casa não diminui sua importância. O signo {cuspSign} 
                          na cúspide define como você naturalmente aborda esses temas.
                        </p>
                      )}

                      {/* Growth Path */}
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">🌱 Caminho de Crescimento</p>
                        <p className="text-sm text-foreground">{houseInterp.growthPath}</p>
                      </div>

                      {/* Shadow Side */}
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground mb-2">🌑 Lado Sombra (para consciência)</p>
                        <p className="text-xs text-muted-foreground">{houseInterp.shadowSide}</p>
                      </div>
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
