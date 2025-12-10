import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MapPin, Calendar, Clock } from 'lucide-react';
import { brazilianCities, BrazilianCity } from '@/data/brazilianCities';

export default function BirthChartForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    city: '',
  });
  const [filteredCities, setFilteredCities] = useState<BrazilianCity[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleCityChange = (value: string) => {
    setFormData({ ...formData, city: value });
    if (value.length >= 2) {
      const filtered = brazilianCities.filter(city =>
        city.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered.slice(0, 10)); // Limit to 10 suggestions
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectCity = (city: BrazilianCity) => {
    setFormData({ ...formData, city: city.name });
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedCity = brazilianCities.find(c => c.name === formData.city);
    if (!selectedCity) {
      alert('Por favor, selecione uma cidade válida da lista.');
      return;
    }

    // Store data in sessionStorage and navigate
    const chartData = {
      name: formData.name,
      date: formData.birthDate,
      time: formData.birthTime,
      city: selectedCity.name,
      latitude: selectedCity.lat,
      longitude: selectedCity.lng,
    };
    
    sessionStorage.setItem('birthChartData', JSON.stringify(chartData));
    navigate('/mapa-astral/resultado');
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="w-6 h-6 text-primary animate-pulse-glow" />
            <span className="text-primary font-display text-lg">Mapa Astral</span>
            <Star className="w-6 h-6 text-primary animate-pulse-glow" />
          </div>
          <h2 className="text-3xl md:text-4xl font-display text-gradient-gold mb-4">
            Descubra Seu Mapa Astral
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Insira seus dados de nascimento para calcular seu mapa astral completo 
            com todos os planetas, casas e aspectos.
          </p>
        </div>

        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm glow-mystical">
          <CardHeader>
            <CardTitle className="font-display text-foreground flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Dados de Nascimento
            </CardTitle>
            <CardDescription>
              Para um mapa astral preciso, informe a hora exata do nascimento.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Seu Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background/50 border-border focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Data de Nascimento
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    required
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthTime" className="text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Hora de Nascimento
                  </Label>
                  <Input
                    id="birthTime"
                    type="time"
                    value={formData.birthTime}
                    onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                    required
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="city" className="text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Cidade de Nascimento
                </Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Digite sua cidade"
                  value={formData.city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  onFocus={() => formData.city.length >= 2 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  required
                  autoComplete="off"
                  className="bg-background/50 border-border focus:border-primary"
                />
                {showSuggestions && filteredCities.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-md shadow-lg max-h-48 overflow-auto">
                    {filteredCities.map((city) => (
                      <button
                        key={city.name}
                        type="button"
                        className="w-full px-4 py-2 text-left text-foreground hover:bg-primary/20 transition-colors"
                        onClick={() => selectCity(city)}
                      >
                        {city.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display text-lg py-6 glow-gold"
              >
                <Star className="w-5 h-5 mr-2" />
                Calcular Mapa Astral
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
