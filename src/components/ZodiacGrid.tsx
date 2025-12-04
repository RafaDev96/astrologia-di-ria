import { Link } from "react-router-dom";
import { zodiacSigns } from "@/data/zodiacSigns";
import { Sparkles } from "lucide-react";

const elementColors: Record<string, string> = {
  'Fogo': 'from-orange-500/20 to-red-600/20',
  'Terra': 'from-green-600/20 to-emerald-700/20',
  'Ar': 'from-sky-400/20 to-cyan-500/20',
  'Água': 'from-blue-500/20 to-indigo-600/20',
};

const ZodiacGrid = () => {
  return (
    <section id="signos" className="py-20 px-4 bg-gradient-cosmic">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-body text-lg text-primary tracking-widest uppercase">
              12 Signos do Zodíaco
            </span>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-gradient-gold mb-4">
            Escolha seu Signo
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
            Selecione seu signo para descobrir o que os astros têm a dizer sobre seu destino
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {zodiacSigns.map((sign, index) => (
            <Link
              key={sign.id}
              to={`/signo/${sign.id}`}
              className="group relative overflow-hidden rounded-2xl zodiac-card-hover animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${elementColors[sign.element]} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 group-hover:border-primary/50 transition-all duration-500">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl glow-mystical" />
                
                <div className="relative z-10">
                  <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform duration-500">
                    {sign.symbol}
                  </div>
                  
                  <h3 className="font-display text-xl md:text-2xl text-foreground group-hover:text-gradient-gold transition-all duration-300 mb-2">
                    {sign.name}
                  </h3>
                  
                  <p className="font-body text-sm text-muted-foreground mb-1">
                    {sign.dateRange}
                  </p>
                  
                  <span className="inline-block px-3 py-1 bg-muted/50 rounded-full text-xs font-body text-muted-foreground">
                    {sign.element}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ZodiacGrid;
