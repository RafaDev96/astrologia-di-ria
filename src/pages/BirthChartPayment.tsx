import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Check, ExternalLink, Star, ArrowLeft, MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';

const PIX_KEY = 'suachavepix@email.com'; // Substituir pela chave PIX real
const WHATSAPP_NUMBER = '5511999999999'; // Substituir pelo número real

export default function BirthChartPayment() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      toast.success('Chave PIX copiada!');
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error('Erro ao copiar');
    }
  };

  const handleWhatsAppConfirmation = () => {
    const birthData = sessionStorage.getItem('birthChartData');
    const parsed = birthData ? JSON.parse(birthData) : {};
    
    const message = encodeURIComponent(
      `Olá! Acabei de fazer o pagamento do Mapa Astral Completo.\n\n` +
      `Nome: ${customerName || parsed.name || 'Não informado'}\n` +
      `Email: ${customerEmail || 'Não informado'}\n` +
      `Dados do mapa: ${parsed.name || ''} - ${parsed.date || ''}\n\n` +
      `Por favor, confirme meu pagamento para liberação do mapa completo. 🌟`
    );
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Pagamento - Mapa Astral Completo | Horoscopo da Gabi</title>
        <meta name="description" content="Finalize o pagamento do seu mapa astral completo via PIX." />
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
                <span className="text-primary font-display text-lg">Pagamento via PIX</span>
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

            {/* Payment Instructions */}
            <Card className="bg-card/50 border-primary/20 mb-6">
              <CardHeader>
                <CardTitle className="font-display text-foreground flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">1</span>
                  Copie a chave PIX
                </CardTitle>
                <CardDescription>Use a chave abaixo para fazer o pagamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-background/50 rounded-lg px-4 py-3 border border-primary/20 font-mono text-sm text-foreground break-all">
                    {PIX_KEY}
                  </div>
                  <Button 
                    onClick={handleCopyPix}
                    variant="outline"
                    className="border-primary/30 hover:bg-primary/10 shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-primary/20 mb-6">
              <CardHeader>
                <CardTitle className="font-display text-foreground flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">2</span>
                  Faça o PIX no seu banco
                </CardTitle>
                <CardDescription>Abra o app do seu banco e realize o pagamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-background/50 rounded-lg p-4 border border-primary/10">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Abra o aplicativo do seu banco
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Vá em PIX e escolha "Pagar com chave"
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Cole a chave PIX copiada acima
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Digite o valor: <strong className="text-foreground">R$ 49,90</strong>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Confirme o pagamento
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-primary/20 mb-6">
              <CardHeader>
                <CardTitle className="font-display text-foreground flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">3</span>
                  Confirme seu pagamento
                </CardTitle>
                <CardDescription>Envie o comprovante pelo WhatsApp para liberação imediata</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Seu nome</Label>
                    <Input
                      id="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Digite seu nome"
                      className="bg-background/50 border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Seu email (opcional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="email@exemplo.com"
                      className="bg-background/50 border-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  onClick={handleWhatsAppConfirmation}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-display text-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Enviar Comprovante no WhatsApp
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  Após a confirmação do pagamento, você receberá um link para acessar seu mapa completo.
                </p>
              </CardContent>
            </Card>

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
