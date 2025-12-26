import { Briefcase, Building, DollarSign, Target, Star, AlertTriangle, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const CareerReadingPromo = () => {
  const features = [
    { icon: Building, title: 'Rotina de Trabalho', desc: 'Casa 6' },
    { icon: Target, title: 'Vocação', desc: 'Casa 10' },
    { icon: DollarSign, title: 'Dinheiro', desc: 'Casa 2' },
    { icon: Star, title: 'Meio do Céu', desc: 'Realização' },
    { icon: AlertTriangle, title: 'Padrões', desc: 'Sabotagens' },
    { icon: Lightbulb, title: 'Orientações', desc: 'Práticas' },
  ];

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 via-background to-background" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Briefcase
            key={i}
            className="absolute text-emerald-500/10"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              transform: `rotate(${Math.random() * 30 - 15}deg)`,
              width: `${20 + Math.random() * 20}px`,
              height: `${20 + Math.random() * 20}px`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full mb-4">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-body text-emerald-400">Novo</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-gradient-gold mb-4">
            🔮 Mapa Profissional e Vocacional
          </h2>
          
          <p className="font-body text-lg text-foreground/70 max-w-2xl mx-auto mb-6">
            Descubra sua vocação, como você lida com trabalho e dinheiro, 
            padrões de sabotagem e orientações práticas para sua carreira 
            baseadas no seu mapa astral.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
          {features.map((feature, i) => (
            <div 
              key={i}
              className="bg-card/30 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-3 text-center"
            >
              <feature.icon className="w-5 h-5 mx-auto mb-1.5 text-emerald-400" />
              <h3 className="font-display text-xs text-foreground">{feature.title}</h3>
              <p className="text-[10px] text-foreground/60">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/leitura-profissional"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-display text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30"
          >
            <Briefcase className="w-5 h-5" />
            Descobrir Minha Vocação
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CareerReadingPromo;
