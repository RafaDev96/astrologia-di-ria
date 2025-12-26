import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Briefcase, Star, Lock, Loader2, ArrowLeft, Building, DollarSign, Target, AlertTriangle, Lightbulb } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { calculateBirthChart, BirthData } from '@/utils/astroCalculations';
import { brazilianCities } from '@/data/brazilianCities';

export default function CareerReading() {
  const navigate = useNavigate();
  const { user, isPremium, profile } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthCity: '',
  });
  const [citySearch, setCitySearch] = useState('');
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [selectedCity, setSelectedCity] = useState<typeof brazilianCities[0] | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [fullContent, setFullContent] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Pre-fill form if user has birth data in profile
  useEffect(() => {
    if (profile?.birth_data) {
      const bd = profile.birth_data as any;
      setFormData({
        name: bd.name || '',
        birthDate: bd.birthDate || '',
        birthTime: bd.birthTime || '',
        birthCity: bd.birthPlace || bd.city || '',
      });
      if (bd.birthPlace || bd.city) {
        setCitySearch(bd.birthPlace || bd.city);
        if (bd.latitude && bd.longitude) {
          setSelectedCity({
            name: bd.birthPlace || bd.city,
            lat: bd.latitude,
            lng: bd.longitude,
          });
        }
      }
    }
  }, [profile]);

  const filteredCities = citySearch.length >= 2
    ? brazilianCities.filter(city =>
        city.name.toLowerCase().includes(citySearch.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleCitySelect = (city: typeof brazilianCities[0]) => {
    setSelectedCity(city);
    setCitySearch(city.name);
    setFormData(prev => ({ ...prev, birthCity: city.name }));
    setShowCitySuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.birthDate || !selectedCity) {
      toast.error('Por favor, preencha a data e local de nascimento');
      return;
    }

    setIsLoading(true);
    setHasSubmitted(true);

    try {
      // Calculate birth chart for more accurate reading
      const [year, month, day] = formData.birthDate.split('-').map(Number);
      const birthDate = new Date(year, month - 1, day);
      
      const birthData: BirthData = {
        date: birthDate,
        time: formData.birthTime || '12:00',
        latitude: selectedCity.lat,
        longitude: selectedCity.lng,
        city: formData.birthCity,
      };

      const chartData = await calculateBirthChart(birthData);

      const requestData = {
        name: formData.name,
        birthDate: formData.birthDate,
        birthTime: formData.birthTime || null,
        birthCity: formData.birthCity,
        birthCountry: 'Brasil',
        chartData: chartData,
      };

      // Generate preview first
      const { data: previewData, error: previewError } = await supabase.functions.invoke('generate-career-reading', {
        body: { birthData: requestData, type: 'preview' }
      });

      if (previewError) throw previewError;
      if (previewData?.error) throw new Error(previewData.error);
      
      setPreviewContent(previewData.reading);

      // If premium, also generate full reading
      if (isPremium) {
        const { data: fullData, error: fullError } = await supabase.functions.invoke('generate-career-reading', {
          body: { birthData: requestData, type: 'full' }
        });

        if (fullError) throw fullError;
        if (fullData?.error) throw new Error(fullData.error);
        
        setFullContent(fullData.reading);
      }

      toast.success('Leitura gerada com sucesso!');
    } catch (error: any) {
      console.error('Error generating career reading:', error);
      toast.error(error.message || 'Erro ao gerar leitura. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = () => {
    navigate('/mapa-astral/pagamento');
  };

  const features = [
    { icon: Building, title: 'Casa 6', desc: 'Rotina e emprego diário' },
    { icon: Target, title: 'Casa 10', desc: 'Carreira e reconhecimento' },
    { icon: DollarSign, title: 'Casa 2', desc: 'Dinheiro e autovalor' },
    { icon: Star, title: 'Meio do Céu', desc: 'Vocação e realização' },
    { icon: AlertTriangle, title: 'Padrões', desc: 'Sabotagens profissionais' },
    { icon: Lightbulb, title: 'Sugestões', desc: 'Orientações práticas' },
  ];

  return (
    <>
      <Helmet>
        <title>Leitura Profissional | Emprego e Vocação | Horoscopo da Gabi</title>
        <meta name="description" content="Descubra sua vocação profissional, como você lida com trabalho e dinheiro através do seu mapa astral. Análise completa de carreira baseada em casas astrológicas." />
      </Helmet>

      <div className="min-h-screen bg-gradient-cosmic">
        <Header />
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full mb-4">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-body text-emerald-400">Leitura Profissional</span>
              </div>
              
              <h1 className="font-display text-3xl md:text-5xl text-gradient-gold mb-4">
                Emprego, Trabalho e Vocação
              </h1>
              
              <p className="font-body text-lg text-foreground/70 max-w-2xl mx-auto">
                Uma análise profunda do seu mapa astral focada em carreira, trabalho diário, 
                dinheiro e seu caminho de realização profissional.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
              {features.map((feature, i) => (
                <div 
                  key={i}
                  className="bg-card/30 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-4 text-center"
                >
                  <feature.icon className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                  <h3 className="font-display text-sm text-foreground">{feature.title}</h3>
                  <p className="text-xs text-foreground/60">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Form or Results */}
            {!hasSubmitted ? (
              <Card className="bg-card/50 border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="font-display text-xl text-foreground flex items-center gap-2">
                    <Star className="w-5 h-5 text-emerald-400" />
                    Seus Dados de Nascimento
                  </CardTitle>
                  <CardDescription>
                    Preencha seus dados para gerar sua leitura profissional personalizada
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome (opcional)</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Seu nome"
                          className="bg-background/50"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="birthDate">Data de Nascimento *</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          required
                          value={formData.birthDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                          className="bg-background/50"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="birthTime">Hora de Nascimento</Label>
                        <Input
                          id="birthTime"
                          type="time"
                          value={formData.birthTime}
                          onChange={(e) => setFormData(prev => ({ ...prev, birthTime: e.target.value }))}
                          className="bg-background/50"
                        />
                        <p className="text-xs text-muted-foreground">
                          Opcional, mas recomendado para maior precisão das casas
                        </p>
                      </div>
                      
                      <div className="space-y-2 relative">
                        <Label htmlFor="birthCity">Cidade de Nascimento *</Label>
                        <Input
                          id="birthCity"
                          required
                          value={citySearch}
                          onChange={(e) => {
                            setCitySearch(e.target.value);
                            setShowCitySuggestions(true);
                            setSelectedCity(null);
                          }}
                          onFocus={() => setShowCitySuggestions(true)}
                          placeholder="Digite sua cidade"
                          className="bg-background/50"
                        />
                        
                        {showCitySuggestions && filteredCities.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
                            {filteredCities.map((city, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleCitySelect(city)}
                                className="w-full px-4 py-2 text-left hover:bg-primary/10 text-sm"
                              >
                                {city.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isLoading || !selectedCity}
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Gerando sua leitura...
                        </>
                      ) : (
                        <>
                          <Briefcase className="w-4 h-4 mr-2" />
                          Gerar Minha Leitura Profissional
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                {/* Back button */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setHasSubmitted(false);
                    setPreviewContent(null);
                    setFullContent(null);
                  }}
                  className="border-primary/30"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Nova Leitura
                </Button>

                {isLoading ? (
                  <Card className="bg-card/50 border-emerald-500/20">
                    <CardContent className="py-16 text-center">
                      <Loader2 className="w-12 h-12 mx-auto mb-4 text-emerald-400 animate-spin" />
                      <p className="text-foreground/70">
                        Analisando seu mapa astral e gerando sua leitura profissional...
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {/* Preview Content */}
                    {previewContent && !fullContent && (
                      <>
                        <Card className="bg-card/50 border-emerald-500/20">
                          <CardHeader>
                            <CardTitle className="font-display text-xl text-foreground flex items-center gap-2">
                              <Briefcase className="w-5 h-5 text-emerald-400" />
                              Prévia da Sua Leitura Profissional
                              {formData.name && <span className="text-emerald-400">• {formData.name}</span>}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div 
                              className="prose prose-invert max-w-none font-body
                                prose-h2:font-display prose-h2:text-xl prose-h2:text-emerald-400 prose-h2:mt-8 prose-h2:mb-4
                                prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-4
                                prose-em:text-foreground/60"
                              dangerouslySetInnerHTML={{ __html: previewContent }}
                            />
                          </CardContent>
                        </Card>

                        {/* Upgrade CTA */}
                        <Card className="bg-gradient-to-r from-emerald-900/30 to-emerald-800/20 border-emerald-500/30">
                          <CardContent className="py-8 text-center">
                            <Lock className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
                            <h3 className="font-display text-2xl text-foreground mb-2">
                              Desbloqueie a Leitura Completa
                            </h3>
                            <p className="text-foreground/70 mb-6 max-w-lg mx-auto">
                              Acesse a análise completa com todas as casas astrológicas, planetas, 
                              padrões de sabotagem e sugestões práticas para sua carreira.
                            </p>
                            <ul className="text-left max-w-md mx-auto mb-6 space-y-2">
                              <li className="flex items-center gap-2 text-foreground/80">
                                <Star className="w-4 h-4 text-emerald-400" />
                                Casa 6: Trabalho diário e rotina
                              </li>
                              <li className="flex items-center gap-2 text-foreground/80">
                                <Star className="w-4 h-4 text-emerald-400" />
                                Casa 10: Carreira e reconhecimento
                              </li>
                              <li className="flex items-center gap-2 text-foreground/80">
                                <Star className="w-4 h-4 text-emerald-400" />
                                Casa 2: Dinheiro e autovalor
                              </li>
                              <li className="flex items-center gap-2 text-foreground/80">
                                <Star className="w-4 h-4 text-emerald-400" />
                                Análise de planetas profissionais
                              </li>
                              <li className="flex items-center gap-2 text-foreground/80">
                                <Star className="w-4 h-4 text-emerald-400" />
                                Padrões de sabotagem e como superar
                              </li>
                              <li className="flex items-center gap-2 text-foreground/80">
                                <Star className="w-4 h-4 text-emerald-400" />
                                Sugestões práticas de carreira
                              </li>
                            </ul>
                            <Button 
                              onClick={handleUpgrade}
                              size="lg"
                              className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400"
                            >
                              <Lock className="w-4 h-4 mr-2" />
                              Desbloquear Acesso Premium
                            </Button>
                          </CardContent>
                        </Card>
                      </>
                    )}

                    {/* Full Content (Premium) */}
                    {fullContent && (
                      <Card className="bg-card/50 border-emerald-500/20">
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-body">
                              Premium
                            </span>
                          </div>
                          <CardTitle className="font-display text-xl text-foreground flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-emerald-400" />
                            Leitura Profissional Completa
                            {formData.name && <span className="text-emerald-400">• {formData.name}</span>}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div 
                            className="prose prose-invert max-w-none font-body
                              prose-h2:font-display prose-h2:text-xl prose-h2:text-emerald-400 prose-h2:mt-8 prose-h2:mb-4 prose-h2:first:mt-0
                              prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-4
                              prose-ul:my-4 prose-li:text-foreground/80
                              prose-em:text-foreground/60"
                            dangerouslySetInnerHTML={{ __html: fullContent }}
                          />
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
