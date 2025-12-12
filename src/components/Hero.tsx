import { Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      {/* Floating Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-primary/40 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              width: `${8 + Math.random() * 12}px`,
              height: `${8 + Math.random() * 12}px`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="font-body text-lg text-primary tracking-widest uppercase">
            Astrologia & Previsões
          </span>
          <Sparkles className="w-6 h-6 text-primary" />
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-gradient-gold mb-6 animate-fade-in leading-tight"
            style={{ animationDelay: '0.2s' }}>
          Horoscopo da Gabi
        </h1>

        <p className="font-body text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto mb-8 animate-fade-in leading-relaxed"
           style={{ animationDelay: '0.4s' }}>
          Descubra o que os astros reservam para você. Previsões diárias, semanais e mensais para todos os signos.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in"
             style={{ animationDelay: '0.6s' }}>
          <a
            href="#signos"
            className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground font-display text-base rounded-full glow-gold transition-all duration-300 hover:scale-105 hover:shadow-lg text-center"
          >
            Escolha seu Signo
          </a>
          <Link
            to="/mapa-astral"
            className="w-full sm:w-auto px-6 py-3 bg-cosmic-purple text-white font-display text-base rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-cosmic-purple/90 text-center"
          >
            ✨ Mapa Astral
          </Link>
          <a
            href="https://www.youtube.com/@HoroscopodaGabi"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-display text-base rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-red-700 text-center"
          >
            📺 YouTube
          </a>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
