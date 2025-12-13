import { ChartData } from '@/utils/astroCalculations';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Star, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FreeChartInterpretationProps {
  chartData: ChartData;
  userName?: string;
}

export default function FreeChartInterpretation({ chartData, userName }: FreeChartInterpretationProps) {
  const navigate = useNavigate();
  
  const sunSign = chartData.planets.find(p => p.planet === 'Sol')?.sign;
  const moonSign = chartData.planets.find(p => p.planet === 'Lua')?.sign;

  const handleUnlock = () => {
    navigate('/mapa-astral/pagamento');
  };

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <Card className="bg-gradient-to-br from-primary/10 to-cosmic-purple/10 border-primary/30">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl md:text-3xl text-gradient-gold">
            {userName ? `${userName}, ` : ''}Amostra do seu Mapa Astral! ✨
          </CardTitle>
          <CardDescription className="text-base text-foreground/80 mt-2">
            Este é um momento especial de autoconhecimento. Veja abaixo os principais pontos do seu mapa astral.
            Para ter acesso ao mapa completo com todas as interpretações, desbloqueie agora!
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Free Summary Cards - Only Sun, Moon, Ascendant */}
      <div>
        <div className="text-center mb-4">
          <h3 className="font-display text-xl text-foreground mb-2">Sua Essência Astrológica</h3>
          <p className="text-sm text-muted-foreground">
            Estes são os três pilares fundamentais do seu mapa astral.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card/50 border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                ☀️ Sol
              </CardTitle>
              <CardDescription className="text-xs">Sua identidade e essência</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-display text-gradient-gold">{sunSign}</p>
              <p className="text-sm text-muted-foreground mt-2">
                O Sol representa quem você é em sua essência, sua vitalidade e propósito de vida.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                🌙 Lua
              </CardTitle>
              <CardDescription className="text-xs">Suas emoções e intuição</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-display text-gradient-gold">{moonSign}</p>
              <p className="text-sm text-muted-foreground mt-2">
                A Lua revela como você processa emoções, suas necessidades íntimas e memórias.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                ⬆️ Ascendente
              </CardTitle>
              <CardDescription className="text-xs">Como você se apresenta</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-display text-gradient-gold">{chartData.ascendant.sign}</p>
              <p className="text-sm text-muted-foreground mt-2">
                O Ascendente é sua máscara social, como os outros te veem à primeira vista.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Summary */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="font-display text-foreground">Resumo do Seu Mapa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            Com o <strong className="text-primary">Sol em {sunSign}</strong>, você traz a energia de{' '}
            {sunSign === 'Áries' && 'iniciativa, coragem e pioneirismo.'}
            {sunSign === 'Touro' && 'estabilidade, prazer e determinação.'}
            {sunSign === 'Gêmeos' && 'comunicação, curiosidade e versatilidade.'}
            {sunSign === 'Câncer' && 'nutrição, proteção e sensibilidade emocional.'}
            {sunSign === 'Leão' && 'criatividade, liderança e expressão pessoal.'}
            {sunSign === 'Virgem' && 'análise, serviço e atenção aos detalhes.'}
            {sunSign === 'Libra' && 'harmonia, relacionamentos e senso estético.'}
            {sunSign === 'Escorpião' && 'transformação, intensidade e profundidade.'}
            {sunSign === 'Sagitário' && 'expansão, filosofia e busca por significado.'}
            {sunSign === 'Capricórnio' && 'ambição, responsabilidade e estrutura.'}
            {sunSign === 'Aquário' && 'inovação, humanitarismo e originalidade.'}
            {sunSign === 'Peixes' && 'intuição, compaixão e espiritualidade.'}
          </p>
          <p className="text-foreground">
            Sua <strong className="text-primary">Lua em {moonSign}</strong> indica que emocionalmente você busca{' '}
            {moonSign === 'Áries' && 'ação e independência para se sentir seguro(a).'}
            {moonSign === 'Touro' && 'conforto material e estabilidade emocional.'}
            {moonSign === 'Gêmeos' && 'comunicação e estímulo mental constante.'}
            {moonSign === 'Câncer' && 'segurança familiar e conexões profundas.'}
            {moonSign === 'Leão' && 'reconhecimento e expressão criativa.'}
            {moonSign === 'Virgem' && 'ordem e utilidade prática no dia a dia.'}
            {moonSign === 'Libra' && 'equilíbrio e relacionamentos harmoniosos.'}
            {moonSign === 'Escorpião' && 'intensidade e verdade emocional.'}
            {moonSign === 'Sagitário' && 'liberdade e aventuras emocionais.'}
            {moonSign === 'Capricórnio' && 'estrutura e conquistas para se sentir seguro(a).'}
            {moonSign === 'Aquário' && 'liberdade emocional e conexões não convencionais.'}
            {moonSign === 'Peixes' && 'transcendência e conexão espiritual.'}
          </p>
          <p className="text-foreground">
            Seu <strong className="text-primary">Ascendente em {chartData.ascendant.sign}</strong> mostra que você 
            se apresenta ao mundo com a energia de {chartData.ascendant.sign}, influenciando 
            suas primeiras impressões e aparência física.
          </p>
        </CardContent>
      </Card>

      {/* Locked Content Teaser */}
      <Card className="bg-gradient-to-br from-cosmic-purple/20 to-primary/20 border-primary/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent z-10" />
        <CardContent className="relative z-20 py-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border border-primary/40">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-2xl text-foreground mb-2">
                Desbloqueie seu Mapa Astral Completo
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Tenha acesso a todas as posições planetárias, casas astrológicas, aspectos detalhados, 
                Mandala Artística personalizada e muito mais!
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto text-sm">
              <div className="bg-background/50 rounded-lg p-3 border border-primary/20">
                <Star className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-foreground font-medium">10 Planetas</p>
                <p className="text-xs text-muted-foreground">Com interpretações</p>
              </div>
              <div className="bg-background/50 rounded-lg p-3 border border-primary/20">
                <Sparkles className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-foreground font-medium">12 Casas</p>
                <p className="text-xs text-muted-foreground">Áreas da vida</p>
              </div>
              <div className="bg-background/50 rounded-lg p-3 border border-primary/20">
                <Star className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-foreground font-medium">Aspectos</p>
                <p className="text-xs text-muted-foreground">Relações planetárias</p>
              </div>
              <div className="bg-background/50 rounded-lg p-3 border border-primary/20">
                <Sparkles className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-foreground font-medium">Mandala</p>
                <p className="text-xs text-muted-foreground">Arte exclusiva</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-3xl font-display text-gradient-gold">R$ 49,90</p>
              <Button 
                size="lg" 
                onClick={handleUnlock}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-display text-lg px-8"
              >
                <Lock className="w-5 h-5 mr-2" />
                Desbloquear Mapa Completo
              </Button>
              <p className="text-xs text-muted-foreground">
                Pagamento único via PIX • Acesso imediato após confirmação
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
