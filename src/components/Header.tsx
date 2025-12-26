import { Link } from "react-router-dom";
import { Star, Youtube, User, LogIn, Shield, Sparkles, Briefcase } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminRole } from "@/hooks/useAdminRole";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const { user, loading } = useAuth();
  const { isAdmin } = useAdminRole();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Star className="w-8 h-8 text-primary animate-pulse-glow" fill="currentColor" />
            <div className="absolute inset-0 blur-sm bg-primary/30 rounded-full" />
          </div>
          <span className="font-display text-xl md:text-2xl text-gradient-gold tracking-wider">
            Horoscopo da Gabi
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="font-body text-lg text-foreground/80 hover:text-primary transition-colors duration-300"
          >
            Signos
          </Link>
          <Link
            to="/mapa-astral"
            className="font-body text-lg text-foreground/80 hover:text-primary transition-colors duration-300"
          >
            Mapa Astral
          </Link>
          <Link
            to="/previsao-2026"
            className="flex items-center gap-2 font-body text-lg text-foreground/80 hover:text-primary transition-colors duration-300"
          >
            <Sparkles className="w-4 h-4" />
            2026
          </Link>
          <Link
            to="/leitura-profissional"
            className="flex items-center gap-2 font-body text-lg text-foreground/80 hover:text-emerald-400 transition-colors duration-300"
          >
            <Briefcase className="w-4 h-4" />
            Carreira
          </Link>
          <a
            href="https://www.youtube.com/@HoroscopodaGabi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-300"
          >
            <Youtube className="w-5 h-5" />
            <span className="font-body text-lg">YouTube</span>
          </a>
          
          {!loading && (
            user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors duration-300"
                  >
                    <Shield className="w-5 h-5" />
                    <span className="font-body text-lg">Admin</span>
                  </Link>
                )}
                <Link
                  to="/conta"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300"
                >
                  <User className="w-5 h-5" />
                  <span className="font-body text-lg">Conta</span>
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                <LogIn className="w-5 h-5" />
                <span className="font-body text-lg">Entrar</span>
              </Link>
            )
          )}
          
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <a
            href="https://www.youtube.com/@HoroscopodaGabi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            <Youtube className="w-6 h-6" />
          </a>
          {!loading && (
            user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-amber-500 hover:text-amber-400 transition-colors"
                  >
                    <Shield className="w-6 h-6" />
                  </Link>
                )}
                <Link
                  to="/conta"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <User className="w-6 h-6" />
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                <LogIn className="w-6 h-6" />
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
