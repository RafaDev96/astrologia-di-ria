import { ChartData } from '@/utils/astroCalculations';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { signElements } from '@/data/astrologyData';
import { bigSixInterpretations, deepElementInterpretations } from '@/data/bigSixInterpretations';

interface EssenceTabProps {
  chartData: ChartData;
  userName?: string;
}

export default function EssenceTab({ chartData, userName }: EssenceTabProps) {
  const sunSign = chartData.planets.find(p => p.planet === 'Sol')?.sign || '';
  const moonSign = chartData.planets.find(p => p.planet === 'Lua')?.sign || '';

  // Calculate element distribution
  const elementCounts: Record<string, number> = { Fogo: 0, Terra: 0, Ar: 0, Água: 0 };
  chartData.planets.forEach(planet => {
    const element = signElements[planet.sign];
    if (element) elementCounts[element]++;
  });

  const dominantElement = Object.entries(elementCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];

  const bigSixData = [
    { key: 'sun', sign: sunSign, interp: bigSixInterpretations.sun },
    { key: 'moon', sign: moonSign, interp: bigSixInterpretations.moon },
    { key: 'ascendant', sign: chartData.ascendant.sign, degree: chartData.ascendant.degreeInSign, interp: bigSixInterpretations.ascendant },
    { key: 'midheaven', sign: chartData.midheaven.sign, degree: chartData.midheaven.degreeInSign, interp: bigSixInterpretations.midheaven },
    { key: 'descendant', sign: chartData.descendant?.sign || '', degree: chartData.descendant?.degreeInSign, interp: bigSixInterpretations.descendant },
    { key: 'imumCoeli', sign: chartData.imumCoeli?.sign || '', degree: chartData.imumCoeli?.degreeInSign, interp: bigSixInterpretations.imumCoeli },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <Card className="bg-gradient-to-br from-primary/10 to-cosmic-purple/10 border-primary/30">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl md:text-3xl text-gradient-gold">
            {userName ? `${userName}, ` : ''}Sua Essência Astrológica ✨
          </CardTitle>
          <CardDescription className="text-base text-foreground/80 mt-2">
            O Big Six revela os pilares fundamentais de quem você é. Explore cada ponto para descobrir 
            camadas profundas do seu mapa astral.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Big Six Deep Interpretations */}
      <div className="space-y-4">
        <h3 className="font-display text-xl text-foreground flex items-center gap-2">
          🌟 O Big Six — Seus Pilares Astrológicos
        </h3>
        
        <Accordion type="single" collapsible className="space-y-3">
          {bigSixData.map(({ key, sign, degree, interp }) => {
            const signInterp = interp.signInterpretations[sign as keyof typeof interp.signInterpretations];
            
            return (
              <AccordionItem key={key} value={key} className="border border-primary/20 rounded-lg bg-card/50 px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-4 text-left">
                    <span className="text-2xl">{interp.symbol}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-lg text-foreground">{interp.name}</span>
                        <Badge variant="outline" className="text-primary border-primary/50">{sign}</Badge>
                        {degree !== undefined && (
                          <span className="text-xs text-muted-foreground">
                            {Math.floor(degree)}°{Math.floor((degree % 1) * 60)}'
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{interp.archetype}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 space-y-4">
                  {/* Deep Meaning */}
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h4 className="font-medium text-primary mb-2">O que significa?</h4>
                    <p className="text-sm text-foreground/90 leading-relaxed">{interp.deepMeaning}</p>
                  </div>

                  {/* Sign-specific interpretation */}
                  {signInterp && (
                    <div className="bg-gradient-to-r from-primary/5 to-cosmic-purple/5 p-4 rounded-lg border border-primary/20">
                      <h4 className="font-medium text-gradient-gold mb-3">{interp.name} em {sign}</h4>
                      <p className="text-sm text-foreground/90 mb-4 leading-relaxed">{signInterp.essence}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h5 className="text-xs font-medium text-green-400 mb-2">✨ Forças</h5>
                          <p className="text-xs text-foreground/80">{signInterp.strengths}</p>
                        </div>
                        <div>
                          <h5 className="text-xs font-medium text-amber-400 mb-2">⚡ Desafios</h5>
                          <p className="text-xs text-foreground/80">{signInterp.challenges}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-primary/20">
                        <h5 className="text-xs font-medium text-primary mb-2">🎯 Lição de Vida</h5>
                        <p className="text-sm text-foreground/90 italic">{signInterp.lifeLesson}</p>
                      </div>
                    </div>
                  )}

                  {/* Questions for reflection */}
                  <div className="bg-background/30 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-3">🔮 Perguntas para reflexão</h4>
                    <ul className="space-y-2">
                      {interp.questions.map((q, i) => (
                        <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                          <span className="text-primary">•</span> {q}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How to work with it */}
                  <div className="bg-primary/5 p-4 rounded-lg border-l-2 border-primary">
                    <h4 className="font-medium text-foreground mb-2">💡 Como trabalhar</h4>
                    <p className="text-sm text-foreground/90">{interp.howToWork}</p>
                  </div>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-2">
                    {interp.keywords.map((kw, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{kw}</Badge>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {/* Element Distribution with Deep Interpretations */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="font-display text-foreground">🔥🌍💨💧 Distribuição dos Elementos</CardTitle>
          <CardDescription>
            Os elementos revelam a energia fundamental que move sua vida.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(elementCounts).map(([element, count]) => (
              <div 
                key={element} 
                className={`text-center p-4 rounded-lg transition-all ${
                  element === dominantElement 
                    ? 'bg-primary/20 border border-primary/50 scale-105' 
                    : 'bg-background/50'
                }`}
              >
                <div className="text-3xl mb-2">
                  {deepElementInterpretations[element as keyof typeof deepElementInterpretations]?.symbol}
                </div>
                <p className="text-sm font-medium text-foreground">{element}</p>
                <p className="text-2xl font-display text-primary">{count}</p>
                {element === dominantElement && (
                  <Badge variant="default" className="mt-2 text-xs">Dominante</Badge>
                )}
              </div>
            ))}
          </div>

          {/* Deep element interpretation */}
          {deepElementInterpretations[dominantElement as keyof typeof deepElementInterpretations] && (
            <div className="space-y-4 mt-6">
              <div className="bg-gradient-to-r from-primary/10 to-cosmic-purple/10 p-5 rounded-lg border border-primary/20">
                <h4 className="font-display text-lg text-gradient-gold mb-2">
                  {deepElementInterpretations[dominantElement as keyof typeof deepElementInterpretations].symbol}{' '}
                  {dominantElement} — {deepElementInterpretations[dominantElement as keyof typeof deepElementInterpretations].archetype}
                </h4>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {deepElementInterpretations[dominantElement as keyof typeof deepElementInterpretations].essence}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <h5 className="font-medium text-green-400 mb-3">✨ Dons do {dominantElement}</h5>
                  <ul className="space-y-2">
                    {deepElementInterpretations[dominantElement as keyof typeof deepElementInterpretations].gifts.map((gift, i) => (
                      <li key={i} className="text-xs text-foreground/80 flex items-start gap-2">
                        <span className="text-green-400">•</span> {gift}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                  <h5 className="font-medium text-amber-400 mb-3">⚡ Sombras do {dominantElement}</h5>
                  <ul className="space-y-2">
                    {deepElementInterpretations[dominantElement as keyof typeof deepElementInterpretations].shadows.map((shadow, i) => (
                      <li key={i} className="text-xs text-foreground/80 flex items-start gap-2">
                        <span className="text-amber-400">•</span> {shadow}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-primary/5 p-4 rounded-lg border-l-2 border-primary">
                <h5 className="font-medium text-foreground mb-2">⚖️ Como equilibrar</h5>
                <p className="text-sm text-foreground/90">
                  {deepElementInterpretations[dominantElement as keyof typeof deepElementInterpretations].howToBalance}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
