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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface ChartInterpretationProps {
  chartData: ChartData;
  userName?: string;
}

// Mensagens acolhedoras para cada seção
const welcomeMessages = {
  summary: "Estes são os pilares fundamentais do seu mapa astral. Eles revelam a essência de quem você é, como sente e como se apresenta ao mundo.",
  elements: "Os elementos mostram qual energia predomina na sua vida. Cada elemento traz qualidades únicas que influenciam sua forma de ser e agir.",
  planets: "Cada planeta representa uma parte diferente da sua personalidade e vida. Explore cada um para entender melhor suas tendências naturais.",
  aspects: "Os aspectos são as conversas entre os planetas do seu mapa. Eles revelam talentos naturais e áreas que pedem mais atenção e crescimento.",
  houses: "As casas representam diferentes áreas da sua vida. Descubra quais energias atuam em cada setor, desde relacionamentos até carreira."
};

const elementDescriptions = {
  Fogo: "Energia, paixão, iniciativa e entusiasmo. Você tem uma natureza dinâmica e inspiradora.",
  Terra: "Praticidade, estabilidade, persistência e conexão com o mundo material.",
  Ar: "Comunicação, intelecto, sociabilidade e troca de ideias.",
  Água: "Emoção, intuição, empatia e profundidade emocional."
};

export default function ChartInterpretation({ chartData, userName }: ChartInterpretationProps) {
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
      `${sign} influencia esta área da sua vida de forma única e especial.`;
  };

  // Calculate element distribution
  const elementCounts: Record<string, number> = { Fogo: 0, Terra: 0, Ar: 0, Água: 0 };
  chartData.planets.forEach(planet => {
    const element = signElements[planet.sign];
    if (element) elementCounts[element]++;
  });

  // Find dominant element
  const dominantElement = Object.entries(elementCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];

  const sunSign = chartData.planets.find(p => p.planet === 'Sol')?.sign;
  const moonSign = chartData.planets.find(p => p.planet === 'Lua')?.sign;

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <Card className="bg-gradient-to-br from-primary/10 to-cosmic-purple/10 border-primary/30">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl md:text-3xl text-gradient-gold">
            {userName ? `${userName}, ` : ''}Bem-vindo ao seu Mapa Astral! ✨
          </CardTitle>
          <CardDescription className="text-base text-foreground/80 mt-2">
            Este é um momento especial de autoconhecimento. Seu mapa astral é único como você 
            e revela padrões, talentos e possibilidades que estão escritos nas estrelas desde o 
            momento do seu nascimento. Explore cada seção com curiosidade e carinho.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Summary Cards */}
      <div>
        <div className="text-center mb-4">
          <h3 className="font-display text-xl text-foreground mb-2">Sua Essência Astrológica</h3>
          <p className="text-sm text-muted-foreground">{welcomeMessages.summary}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-card/50 border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                ☀️ Sol
              </CardTitle>
              <CardDescription className="text-xs">Identidade</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-display text-gradient-gold">{sunSign}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                🌙 Lua
              </CardTitle>
              <CardDescription className="text-xs">Emoções</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-display text-gradient-gold">{moonSign}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                ⬆️ Ascendente
              </CardTitle>
              <CardDescription className="text-xs">Personalidade</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-display text-gradient-gold">{chartData.ascendant.sign}</p>
              <p className="text-xs text-muted-foreground">
                {Math.floor(chartData.ascendant.degreeInSign || 0)}°{Math.floor(((chartData.ascendant.degreeInSign || 0) % 1) * 60)}'
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                ⭐ Meio do Céu
              </CardTitle>
              <CardDescription className="text-xs">Carreira</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-display text-gradient-gold">{chartData.midheaven.sign}</p>
              <p className="text-xs text-muted-foreground">
                {Math.floor(chartData.midheaven.degreeInSign || 0)}°{Math.floor(((chartData.midheaven.degreeInSign || 0) % 1) * 60)}'
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                ⬇️ Descendente
              </CardTitle>
              <CardDescription className="text-xs">Parcerias</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-display text-gradient-gold">{chartData.descendant?.sign || '-'}</p>
              <p className="text-xs text-muted-foreground">
                {Math.floor(chartData.descendant?.degreeInSign || 0)}°{Math.floor(((chartData.descendant?.degreeInSign || 0) % 1) * 60)}'
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                🌑 Fundo do Céu
              </CardTitle>
              <CardDescription className="text-xs">Raízes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-display text-gradient-gold">{chartData.imumCoeli?.sign || '-'}</p>
              <p className="text-xs text-muted-foreground">
                {Math.floor(chartData.imumCoeli?.degreeInSign || 0)}°{Math.floor(((chartData.imumCoeli?.degreeInSign || 0) % 1) * 60)}'
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Element Distribution */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="font-display text-foreground">Distribuição dos Elementos</CardTitle>
          <CardDescription>{welcomeMessages.elements}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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
                  {element === 'Fogo' && '🔥'}
                  {element === 'Terra' && '🌍'}
                  {element === 'Ar' && '💨'}
                  {element === 'Água' && '💧'}
                </div>
                <p className="text-sm font-medium text-foreground">{element}</p>
                <p className="text-2xl font-display text-primary">{count}</p>
                {element === dominantElement && (
                  <Badge variant="default" className="mt-2 text-xs">Dominante</Badge>
                )}
              </div>
            ))}
          </div>
          <div className="bg-background/50 p-4 rounded-lg mt-4">
            <p className="text-sm text-foreground">
              <strong className="text-primary">Seu elemento dominante é {dominantElement}:</strong>{' '}
              {elementDescriptions[dominantElement as keyof typeof elementDescriptions]}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Planets Accordion */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="font-display text-foreground">Posições Planetárias</CardTitle>
          <CardDescription>{welcomeMessages.planets}</CardDescription>
        </CardHeader>
        <CardContent>
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

      {/* Aspects */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="font-display text-foreground">Aspectos Principais</CardTitle>
          <CardDescription>{welcomeMessages.aspects}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {chartData.aspects.slice(0, 12).map((aspect, index) => {
              const aspectInfo = getAspectInfo(aspect.type);
              const isHarmonious = aspectInfo?.nature === 'harmonious';
              const isChallenging = aspectInfo?.nature === 'challenging';
              
              return (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg transition-all hover:scale-[1.01] ${
                    isHarmonious ? 'bg-green-500/10 border border-green-500/20' :
                    isChallenging ? 'bg-orange-500/10 border border-orange-500/20' :
                    'bg-background/50 border border-border/50'
                  }`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xl text-primary">{aspectInfo?.symbol}</span>
                      <div>
                        <p className="text-foreground font-medium">
                          {aspect.planet1} {aspectInfo?.symbol} {aspect.planet2}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {aspect.type} • Orbe: {aspect.orb}°
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={isHarmonious ? 'default' : isChallenging ? 'destructive' : 'secondary'}
                      className={isHarmonious ? 'bg-green-600' : ''}
                    >
                      {isHarmonious ? '✨ Harmônico' : isChallenging ? '🔥 Desafiador' : '⚖️ Neutro'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {isHarmonious 
                      ? `Este aspecto traz facilidade e talentos naturais na conexão entre ${aspect.planet1} e ${aspect.planet2}.`
                      : isChallenging
                      ? `Este aspecto pede atenção e trabalho consciente. É através desses desafios que você mais cresce.`
                      : `Este aspecto traz uma energia neutra que pode ser usada de diversas formas.`
                    }
                  </p>
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
          <CardDescription>{welcomeMessages.houses}</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {houseInterpretations.map((houseInterp) => {
              const cuspDegree = chartData.houses[houseInterp.number - 1];
              const cuspSign = (() => {
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
              })();
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

      {/* Closing Message */}
      <Card className="bg-gradient-to-br from-cosmic-purple/10 to-primary/10 border-primary/30">
        <CardContent className="text-center py-6">
          <p className="text-foreground/80">
            ✨ Lembre-se: seu mapa astral mostra potenciais e tendências, não destinos fixos. 
            Você sempre tem o livre arbítrio para fazer escolhas e crescer. Use estas informações 
            como um guia amoroso para se conhecer melhor e florescer em sua jornada única.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}