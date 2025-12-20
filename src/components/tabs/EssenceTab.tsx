import { ChartData } from '@/utils/astroCalculations';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { signElements } from '@/data/astrologyData';

interface EssenceTabProps {
  chartData: ChartData;
  userName?: string;
}

const elementDescriptions = {
  Fogo: "Energia, paixão, iniciativa e entusiasmo. Você tem uma natureza dinâmica e inspiradora.",
  Terra: "Praticidade, estabilidade, persistência e conexão com o mundo material.",
  Ar: "Comunicação, intelecto, sociabilidade e troca de ideias.",
  Água: "Emoção, intuição, empatia e profundidade emocional."
};

export default function EssenceTab({ chartData, userName }: EssenceTabProps) {
  const sunSign = chartData.planets.find(p => p.planet === 'Sol')?.sign;
  const moonSign = chartData.planets.find(p => p.planet === 'Lua')?.sign;

  // Calculate element distribution
  const elementCounts: Record<string, number> = { Fogo: 0, Terra: 0, Ar: 0, Água: 0 };
  chartData.planets.forEach(planet => {
    const element = signElements[planet.sign];
    if (element) elementCounts[element]++;
  });

  const dominantElement = Object.entries(elementCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <Card className="bg-gradient-to-br from-primary/10 to-cosmic-purple/10 border-primary/30">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl md:text-3xl text-gradient-gold">
            {userName ? `${userName}, ` : ''}Sua Essência Astrológica ✨
          </CardTitle>
          <CardDescription className="text-base text-foreground/80 mt-2">
            Estes são os pilares fundamentais do seu mapa astral. Eles revelam a essência de quem você é, 
            como sente e como se apresenta ao mundo.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Big Six Summary */}
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

      {/* Element Distribution */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="font-display text-foreground">Distribuição dos Elementos</CardTitle>
          <CardDescription>
            Os elementos mostram qual energia predomina na sua vida. Cada elemento traz qualidades únicas.
          </CardDescription>
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
    </div>
  );
}
