import { Sparkles, Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Forecast2026Promo = () => {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-purple/10 via-background to-background" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-primary/20 animate-twinkle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 2}s`,
              width: `${10 + Math.random() * 8}px`,
              height: `${10 + Math.random() * 8}px`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cosmic-purple/20 rounded-full mb-4">
            <Calendar className="w-4 h-4 text-cosmic-purple" />
            <span className="text-sm font-body text-cosmic-purple">Novo</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-gradient-gold mb-4">
            Previsão Anual 2026
          </h2>
          
          <p className="font-body text-lg text-foreground/70 max-w-2xl mx-auto mb-6">
            Descubra o que os astros reservam para você em 2026. 
            Uma leitura personalizada baseada no seu mapa astral com insights sobre 
            amor, carreira, saúde e os momentos mais importantes do ano.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-5 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-2">Personalizada</h3>
            <p className="font-body text-sm text-foreground/60">
              Baseada nos seus dados de nascimento e trânsitos de 2026
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-cosmic-purple/20 rounded-xl p-5 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cosmic-purple/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-cosmic-purple" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-2">Completa</h3>
            <p className="font-body text-sm text-foreground/60">
              Amor, carreira, saúde e períodos importantes do ano
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-5 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-2">Acessível</h3>
            <p className="font-body text-sm text-foreground/60">
              Preview gratuito e versão completa para usuários premium
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/previsao-2026"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cosmic-purple to-cosmic-purple/80 text-white font-display text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cosmic-purple/30"
          >
            <Sparkles className="w-5 h-5" />
            Gerar Minha Previsão 2026
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Forecast2026Promo;
