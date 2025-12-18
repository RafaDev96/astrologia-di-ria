import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Star, ArrowLeft, CreditCard, Loader2, LogIn } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export default function BirthChartPayment() {
  const navigate = useNavigate();
  const { user, isPremium, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // If user is already premium, redirect to full chart
  useEffect(() => {
    if (!authLoading && isPremium) {
      navigate('/mapa-completo');
    }
  }, [authLoading, isPremium, navigate]);

  const handleMercadoPagoCheckout = async () => {
    // Must be logged in
    if (!user) {
      toast.error('Você precisa estar logado para comprar');
      navigate('/login');
      return;
    }

    setIsLoading(true);

    try {
      const birthData = sessionStorage.getItem('birthChartData');
      if (!birthData) {
        toast.error('Dados do mapa não encontrados. Por favor, calcule novamente.');
        navigate('/mapa-astral');
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          email: user.email,
          birthData: JSON.parse(birthData),
          userId: user.id
        }
      });

      if (error) {
        console.error('Checkout error:', error);
        toast.error('Erro ao criar checkout. Tente novamente.');
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error('Erro ao processar pagamento');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao processar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Pagamento - Mapa Astral Completo | Horoscopo da Gabi</title>
        <meta name="description" content="Finalize o pagamento do seu mapa astral completo." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-cosmic">
        <Header />
        <main className="py-12 px-4">
          <div className="container mx-auto max-w-2xl">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              onClick={() => navigate('/mapa-astral/resultado')}
              className="mb-6 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para o mapa
            </Button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-primary animate-pulse-glow" />
                <span className="text-primary font-display text-lg">Pagamento Seguro</span>
                <Star className="w-6 h-6 text-primary animate-pulse-glow" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display text-gradient-gold mb-2">
                Mapa Astral Completo
              </h1>
              <p className="text-muted-foreground">
                Desbloqueie todas as interpretações e visualizações
              </p>
            </div>

            {/* Price Card */}
            <Card className="bg-gradient-to-br from-primary/10 to-cosmic-purple/10 border-primary/30 mb-6">
              <CardContent className="text-center py-6">
                <p className="text-sm text-muted-foreground mb-1">Valor único</p>
                <p className="text-4xl font-display text-gradient-gold">R$ 49,90</p>
              </CardContent>
            </Card>

            {/* Auth Check */}
            {!user ? (
              <Card className="bg-card/50 border-primary/20 mb-6">
                <CardHeader>
                  <CardTitle className="font-display text-foreground flex items-center gap-2">
                    <LogIn className="w-5 h-5 text-primary" />
                    Faça Login para Continuar
                  </CardTitle>
                  <CardDescription>
                    Você precisa estar logado para efetuar a compra
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/login')}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display text-lg"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Entrar
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Não tem conta?{' '}
                    <button 
                      onClick={() => navigate('/cadastro')}
                      className="text-primary hover:underline"
                    >
                      Criar conta
                    </button>
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card/50 border-primary/20 mb-6">
                <CardHeader>
                  <CardTitle className="font-display text-foreground flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Finalizar Pagamento
                  </CardTitle>
                  <CardDescription>
                    Logado como: {user.email}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Você será redirecionado para o checkout seguro do Mercado Pago.
                    Após o pagamento, seu acesso premium será liberado automaticamente.
                  </p>
                  
                  <Button 
                    size="lg" 
                    onClick={handleMercadoPagoCheckout}
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display text-lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Pagar com PIX ou Cartão
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <span>🔒</span>
                    <span>Pagamento seguro processado pelo Mercado Pago</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* What's Included */}
            <Card className="bg-gradient-to-br from-cosmic-purple/10 to-primary/10 border-primary/30">
              <CardHeader>
                <CardTitle className="font-display text-foreground text-center">O que você vai receber</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    <span>10 planetas detalhados</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    <span>12 casas astrológicas</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Aspectos planetários</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Elementos e qualidades</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Roda Zodiacal</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Mandala Artística</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Download em imagem</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Interpretações completas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
