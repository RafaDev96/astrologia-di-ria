import { ChartAspect } from "@/utils/astroCalculations";
import { 
  getAspectInterpretation, 
  getNatureBgColor, 
  getNatureColor,
  getAspectNature 
} from "@/data/aspectInterpretations";
import { Sparkles, Heart, Zap, User, Brain, Target } from "lucide-react";

interface PlanetaryAspectsProps {
  aspects: ChartAspect[];
}

export default function PlanetaryAspects({ aspects }: PlanetaryAspectsProps) {
  // Filter main aspects only (conjunction, sextile, square, trine, opposition)
  const mainAspects = aspects.filter(aspect => 
    ['Conjunção', 'Sextil', 'Quadratura', 'Trígono', 'Oposição'].includes(aspect.type)
  );

  if (mainAspects.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Nenhum aspecto principal encontrado no seu mapa.</p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          <h2 className="text-2xl font-display text-gradient-gold">
            Aspectos Planetários do Seu Mapa
          </h2>
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Os aspectos são as conversas entre os planetas do seu mapa. Eles revelam 
          como diferentes partes de você interagem, criando seus talentos únicos, 
          desafios de crescimento e padrões emocionais.
        </p>
      </div>

      <div className="space-y-4">
        {mainAspects.map((aspect, index) => {
          const interpretation = getAspectInterpretation(
            aspect.planet1,
            aspect.planet2,
            aspect.type
          );

          if (!interpretation) return null;

          const nature = getAspectNature(aspect.type);
          const bgColorClass = getNatureBgColor(nature);
          const textColorClass = getNatureColor(nature);

          return (
            <div
              key={index}
              className={`rounded-xl border p-6 ${bgColorClass} transition-all hover:scale-[1.01]`}
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h3 className="text-lg font-display text-foreground">
                  {interpretation.title}
                </h3>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  nature === 'harmonious' ? 'bg-green-500/20 text-green-300' :
                  nature === 'challenging' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-blue-500/20 text-blue-300'
                }`}>
                  {nature === 'harmonious' ? '✨ Harmonioso' :
                   nature === 'challenging' ? '⚡ Desafiador' :
                   '🔮 Intensificador'}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {interpretation.description}
              </p>

              {/* Interpretation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-background/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <User className={`w-4 h-4 ${textColorClass}`} />
                    <span className="font-medium text-sm text-foreground">Personalidade</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{interpretation.personality}</p>
                </div>

                <div className="bg-background/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className={`w-4 h-4 ${textColorClass}`} />
                    <span className="font-medium text-sm text-foreground">Emoções</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{interpretation.emotions}</p>
                </div>

                <div className="bg-background/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className={`w-4 h-4 ${textColorClass}`} />
                    <span className="font-medium text-sm text-foreground">Comportamento</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{interpretation.behavior}</p>
                </div>

                <div className="bg-background/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className={`w-4 h-4 ${textColorClass}`} />
                    <span className="font-medium text-sm text-foreground">Conflitos Internos</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{interpretation.challenges}</p>
                </div>

                <div className="bg-background/30 rounded-lg p-4 md:col-span-2 lg:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className={`w-4 h-4 ${textColorClass}`} />
                    <span className="font-medium text-sm text-foreground">Talentos Naturais</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{interpretation.talents}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Closing message */}
      <div className="text-center py-6 border-t border-primary/20 mt-8">
        <p className="text-muted-foreground italic">
          Lembre-se: os aspectos mostram tendências e potenciais, não destinos fixos. 
          Você tem o poder de trabalhar conscientemente com essas energias para seu 
          crescimento pessoal e desenvolvimento espiritual.
        </p>
      </div>
    </section>
  );
}
