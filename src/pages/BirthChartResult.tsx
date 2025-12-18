import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZodiacWheel from '@/components/ZodiacWheel';
import ArtisticMandala from '@/components/ArtisticMandala';
import ChartInterpretation from '@/components/ChartInterpretation';
import FreeChartInterpretation from '@/components/FreeChartInterpretation';
import { calculateBirthChart, ChartData, BirthData } from '@/utils/astroCalculations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Share2, Star, RotateCcw, Lock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export default function BirthChartResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [birthInfo, setBirthInfo] = useState<{ name: string; city: string } | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const mandalaRef = useRef<HTMLDivElement>(null);

  // Check payment status via external_reference or localStorage
  useEffect(() => {
    const verifyPayment = async () => {
      // Check localStorage first
      const storedAccess = localStorage.getItem('birthChartAccess');
      if (storedAccess) {
        setIsPaid(true);
        return;
      }

      // Get session_id from URL params (Mercado Pago uses external_reference)
      const externalReference = searchParams.get('external_reference');
      const pendingSessionId = sessionStorage.getItem('pendingSessionId');
      const sessionId = externalReference || pendingSessionId;
      
      if (sessionId) {
        setIsVerifying(true);
        try {
          const { data, error } = await supabase.functions.invoke('verify-payment', {
            body: { sessionId }
          });

          if (error) {
            console.error('Verification error:', error);
            return;
          }

          if (data?.paid) {
            setIsPaid(true);
            localStorage.setItem('birthChartAccess', sessionId);
            sessionStorage.removeItem('pendingSessionId');
            toast.success('Pagamento confirmado! Aproveite seu mapa completo.');
          }
        } catch (err) {
          console.error('Error verifying payment:', err);
        } finally {
          setIsVerifying(false);
        }
      }
    };

    verifyPayment();
  }, [searchParams]);

  useEffect(() => {
    const storedData = sessionStorage.getItem('birthChartData');
    if (!storedData) {
      navigate('/mapa-astral');
      return;
    }

    const calculateChart = async () => {
      try {
        const parsed = JSON.parse(storedData);
        
        // Parse date correctly without timezone issues
        const [year, month, day] = parsed.date.split('-').map(Number);
        const birthDate = new Date(year, month - 1, day);
        
        const birthData: BirthData = {
          date: birthDate,
          time: parsed.time,
          latitude: parsed.latitude,
          longitude: parsed.longitude,
          city: parsed.city,
        };
        
        const calculated = await calculateBirthChart(birthData);
        setChartData(calculated);
        setBirthInfo({ name: parsed.name, city: parsed.city });
      } catch (error) {
        console.error('Error calculating chart:', error);
        navigate('/mapa-astral');
      }
    };
    
    calculateChart();
  }, [navigate]);

  const handleDownload = async (type: 'wheel' | 'mandala') => {
    if (!isPaid) {
      toast.error('Desbloqueie o mapa completo para baixar as imagens');
      navigate('/mapa-astral/pagamento');
      return;
    }
    
    const ref = type === 'wheel' ? wheelRef : mandalaRef;
    if (!ref.current) return;
    
    const svg = ref.current.querySelector('svg');
    if (!svg) return;
    
    try {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      canvas.width = 1000;
      canvas.height = 1000;
      
      img.onload = () => {
        if (ctx) {
          ctx.fillStyle = '#0d0d14';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, 1000, 1000);
          
          const link = document.createElement('a');
          link.download = `mapa-astral-${type}-${birthInfo?.name || 'chart'}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
          
          toast.success('Imagem baixada com sucesso!');
        }
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    } catch (error) {
      toast.error('Erro ao baixar imagem');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Mapa Astral de ${birthInfo?.name}`,
          text: `Confira meu mapa astral completo no Horoscopo da Gabi!`,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado!');
    }
  };

  if (!chartData || !birthInfo || isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
        <div className="text-center">
          <Star className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-foreground">
            {isVerifying ? 'Verificando pagamento...' : 'Calculando seu mapa astral...'}
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <>
      <Helmet>
        <title>Mapa Astral de {birthInfo.name} | Horoscopo da Gabi</title>
        <meta name="description" content={`Mapa astral completo com todas as posições planetárias, casas astrológicas e aspectos.`} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-cosmic">
        <Header />
        <main className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-primary animate-pulse-glow" />
                <span className="text-primary font-display text-lg">
                  {isPaid ? 'Mapa Astral Completo' : 'Amostra do Mapa Astral'}
                </span>
                <Star className="w-6 h-6 text-primary animate-pulse-glow" />
              </div>
              <h1 className="text-3xl md:text-5xl font-display text-gradient-gold mb-4">
                {birthInfo.name}
              </h1>
              <p className="text-muted-foreground">
                {formatDate(chartData.birthData.date)} às {chartData.birthData.time} • {birthInfo.city}
              </p>
              
              {/* Action buttons */}
              <div className="flex justify-center gap-4 mt-6 flex-wrap">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/mapa-astral')}
                  className="border-primary/30 hover:bg-primary/10"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Novo Mapa
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleShare}
                  className="border-primary/30 hover:bg-primary/10"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
                {!isPaid && (
                  <Button 
                    onClick={() => navigate('/mapa-astral/pagamento')}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Desbloquear Completo
                  </Button>
                )}
              </div>
            </div>

            {/* Charts */}
            <Tabs defaultValue="interpretation" className="space-y-8">
              <TabsList className={`grid w-full max-w-lg mx-auto ${isPaid ? 'grid-cols-3' : 'grid-cols-2'} bg-card/50`}>
                <TabsTrigger value="interpretation" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Interpretação
                </TabsTrigger>
                <TabsTrigger value="wheel" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Roda Zodiacal
                </TabsTrigger>
                {isPaid && (
                  <TabsTrigger value="mandala" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Mandala
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="interpretation">
                {isPaid ? (
                  <ChartInterpretation chartData={chartData} userName={birthInfo.name} />
                ) : (
                  <FreeChartInterpretation chartData={chartData} userName={birthInfo.name} />
                )}
              </TabsContent>

              <TabsContent value="wheel">
                <Card className="bg-card/50 border-primary/20">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-display text-foreground">Roda Zodiacal</CardTitle>
                    {isPaid && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownload('wheel')}
                        className="border-primary/30 hover:bg-primary/10"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Baixar
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <div ref={wheelRef}>
                      <ZodiacWheel chartData={chartData} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {isPaid && (
                <TabsContent value="mandala">
                  <Card className="bg-card/50 border-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="font-display text-foreground">Mandala Artística</CardTitle>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownload('mandala')}
                        className="border-primary/30 hover:bg-primary/10"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Baixar
                      </Button>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <div ref={mandalaRef}>
                        <ArtisticMandala chartData={chartData} />
                      </div>
                    </CardContent>
                  </Card>
                  <p className="text-center text-muted-foreground text-sm mt-4">
                    Esta mandala é única e foi gerada com base nas posições do seu mapa astral.
                    Os símbolos iluminados representam os signos onde você possui planetas.
                  </p>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
