import { ChartData } from '@/utils/astroCalculations';
import { aspects as aspectData } from '@/data/astrologyData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
          <CardDescription className="text-base text-foreground/80 mt-2">
            Os aspectos são as conversas entre os planetas do seu mapa. Eles revelam talentos naturais 
            e áreas que pedem mais atenção e crescimento.
          </CardDescription>
        </CardHeader>
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
