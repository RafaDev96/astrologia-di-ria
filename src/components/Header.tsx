import { Link } from "react-router-dom";
import { Star, Youtube, Instagram } from "lucide-react";

const Header = () => {
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
          <a
            href="https://www.youtube.com/@HoroscopodaGabi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-300"
          >
            <Youtube className="w-5 h-5" />
            <span className="font-body text-lg">YouTube</span>
          </a>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <a
            href="https://www.youtube.com/@HoroscopodaGabi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            <Youtube className="w-6 h-6" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
