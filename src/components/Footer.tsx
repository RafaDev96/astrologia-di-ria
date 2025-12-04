import { Star, Youtube, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-3">
            <Star className="w-6 h-6 text-primary" fill="currentColor" />
            <span className="font-display text-xl text-gradient-gold">
              Horoscopo da Gabi
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <a
              href="https://www.youtube.com/@HoroscopodaGabi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Youtube className="w-5 h-5" />
              <span className="font-body">YouTube</span>
            </a>
          </div>

          <p className="font-body text-sm text-muted-foreground flex items-center gap-2">
            Feito com <Heart className="w-4 h-4 text-primary" fill="currentColor" /> pela Gabi
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="font-body text-sm text-muted-foreground">
            © {new Date().getFullYear()} Horoscopo da Gabi. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
