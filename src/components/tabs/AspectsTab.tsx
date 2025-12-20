import { ChartData } from '@/utils/astroCalculations';
import { aspects as aspectData } from '@/data/astrologyData';
import { aspectDeepInterpretations, getAspectDeepInterpretation } from '@/data/aspectDeepInterpretations';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import PlanetaryAspects from '@/components/PlanetaryAspects';

interface AspectsTabProps {
  chartData: ChartData;
}

export default function AspectsTab({ chartData }: AspectsTabProps) {
  const getAspectInfo = (aspectType: string) => {
    return aspectData.find(a => a.name === aspectType);
  };

  // Group aspects by nature
  const harmoniousAspects = chartData.aspects.filter(a => {
    const info = getAspectInfo(a.type);
    return info?.nature === 'harmonious';
  });
  
  const challengingAspects = chartData.aspects.filter(a => {
    const info = getAspectInfo(a.type);
    return info?.nature === 'challenging';
  });
  
  const neutralAspects = chartData.aspects.filter(a => {
    const info = getAspectInfo(a.type);
    return info?.nature !== 'harmonious' && info?.nature !== 'challenging';
  });

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-primary/10 to-cosmic-purple/10 border-primary/30">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl text-gradient-gold">
            Aspectos Planetários ✨
          </CardTitle>
          <CardDescription className="text-base text-foreground/80 mt-2 max-w-2xl mx-auto">
            Os aspectos são as "conversas" entre os planetas do seu mapa — ângulos específicos que revelam 
            como diferentes partes de você interagem, criando talentos únicos, tensões criativas e padrões de vida.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Educational Section about Aspects */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="font-display text-lg text-foreground">📚 Entendendo os Aspectos</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {aspectDeepInterpretations.map((aspect, index) => (
              <AccordionItem key={index} value={`aspect-${index}`} className="border-primary/10">
                <AccordionTrigger className="hover:no-underline hover:bg-primary/5 px-4 rounded-lg">
                  <div className="flex items-center gap-3 text-left">
                    <span className="text-2xl">{aspect.symbol}</span>
                    <div>
                      <p className="font-display text-foreground">{aspect.name}</p>
                      <p className="text-xs text-muted-foreground">{aspect.angle}° • {aspect.archetype}</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`ml-auto ${
                        aspect.nature === 'harmonious' ? 'border-green-500 text-green-400' :
                        aspect.nature === 'challenging' ? 'border-orange-500 text-orange-400' :
                        'border-blue-500 text-blue-400'
                      }`}
                    >
                      {aspect.nature === 'harmonious' ? 'Harmônico' : 
                       aspect.nature === 'challenging' ? 'Desafiador' : 'Intensificador'}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-background/30 rounded-lg mx-2 mb-2 p-4">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {aspect.keywords.map((kw, i) => (
                        <Badge key={i} variant="secondary" className="bg-primary/10 text-primary text-xs">
                          {kw}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">
                      {aspect.deepMeaning}
                    </p>
                    <div className="bg-cosmic-gold/10 p-3 rounded-lg border border-cosmic-gold/20">
                      <p className="text-xs font-medium text-cosmic-gold mb-1">💡 Como Trabalhar Este Aspecto</p>
                      <p className="text-sm text-foreground">{aspect.howToWork}</p>
                    </div>
                    <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                      <p className="text-xs font-medium text-green-400 mb-1">🌱 Oportunidade de Crescimento</p>
                      <p className="text-sm text-foreground">{aspect.growthOpportunity}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-green-500/10 border-green-500/30">
          <CardContent className="pt-4 text-center">
            <p className="text-3xl font-display text-green-500">{harmoniousAspects.length}</p>
            <p className="text-sm text-green-600 dark:text-green-400">Harmônicos</p>
            <p className="text-xs text-muted-foreground mt-1">Talentos naturais</p>
          </CardContent>
        </Card>
        <Card className="bg-orange-500/10 border-orange-500/30">
          <CardContent className="pt-4 text-center">
            <p className="text-3xl font-display text-orange-500">{challengingAspects.length}</p>
            <p className="text-sm text-orange-600 dark:text-orange-400">Desafiadores</p>
            <p className="text-xs text-muted-foreground mt-1">Oportunidades de crescimento</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardContent className="pt-4 text-center">
            <p className="text-3xl font-display text-blue-500">{neutralAspects.length}</p>
            <p className="text-sm text-blue-600 dark:text-blue-400">Neutros</p>
            <p className="text-xs text-muted-foreground mt-1">Energia versátil</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Aspects */}
      {chartData.aspects && chartData.aspects.length > 0 ? (
        <PlanetaryAspects aspects={chartData.aspects} />
      ) : (
        <Card className="bg-card/50 border-primary/20">
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">Nenhum aspecto encontrado no seu mapa.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
