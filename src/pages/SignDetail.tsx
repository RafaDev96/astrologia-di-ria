import { useParams, Link } from "react-router-dom";
import { zodiacSigns, horoscopeContent } from "@/data/zodiacSigns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, CalendarDays, CalendarRange, Star, Sparkles } from "lucide-react";

const elementColors: Record<string, string> = {
  'Fogo': 'from-orange-500/30 to-red-600/30',
  'Terra': 'from-green-600/30 to-emerald-700/30',
  'Ar': 'from-sky-400/30 to-cyan-500/30',
  'Água': 'from-blue-500/30 to-indigo-600/30',
};

const SignDetail = () => {
  const { signId } = useParams<{ signId: string }>();
  const sign = zodiacSigns.find((s) => s.id === signId);
  const content = signId ? horoscopeContent[signId] : null;

  if (!sign || !content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-gradient-gold mb-4">
            Signo não encontrado
          </h1>
          <Link to="/" className="text-primary hover:underline font-body">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12">
        {/* Hero Section */}
        <section className={`relative py-16 bg-gradient-to-br ${elementColors[sign.element]}`}>
          <div className="absolute inset-0 bg-gradient-cosmic opacity-80" />
          
          {/* Floating Stars */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <Star
                key={i}
                className="absolute text-primary/30 animate-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  width: `${6 + Math.random() * 10}px`,
                  height: `${6 + Math.random() * 10}px`,
                }}
                fill="currentColor"
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar para todos os signos
            </Link>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="text-8xl md:text-9xl animate-float">
                {sign.symbol}
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="font-body text-primary tracking-widest uppercase">
                    {sign.element} • Regente: {sign.ruling}
                  </span>
                </div>
                <h1 className="font-display text-5xl md:text-7xl text-gradient-gold mb-4">
                  {sign.name}
                </h1>
                <p className="font-body text-xl text-muted-foreground">
                  {sign.dateRange}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Horoscope Content */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <Tabs defaultValue="daily" className="w-full">
              <TabsList className="w-full grid grid-cols-3 bg-card border border-border rounded-xl p-1 mb-8">
                <TabsTrigger
                  value="daily"
                  className="flex items-center gap-2 font-display text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg py-3 transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  Diário
                </TabsTrigger>
                <TabsTrigger
                  value="weekly"
                  className="flex items-center gap-2 font-display text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg py-3 transition-all"
                >
                  <CalendarDays className="w-5 h-5" />
                  Semanal
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  className="flex items-center gap-2 font-display text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg py-3 transition-all"
                >
                  <CalendarRange className="w-5 h-5" />
                  Mensal
                </TabsTrigger>
              </TabsList>

              <TabsContent value="daily" className="animate-fade-in">
                <HoroscopeCard
                  title="Horóscopo de Hoje"
                  date={new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  content={content.daily}
                  sign={sign}
                />
              </TabsContent>

              <TabsContent value="weekly" className="animate-fade-in">
                <HoroscopeCard
                  title="Horóscopo da Semana"
                  date={`Semana de ${new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}`}
                  content={content.weekly}
                  sign={sign}
                />
              </TabsContent>

              <TabsContent value="monthly" className="animate-fade-in">
                <HoroscopeCard
                  title="Horóscopo do Mês"
                  date={new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                  content={content.monthly}
                  sign={sign}
                />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Other Signs */}
        <section className="py-12 px-4 bg-card/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-display text-2xl text-center text-gradient-gold mb-8">
              Outros Signos
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {zodiacSigns
                .filter((s) => s.id !== sign.id)
                .map((s) => (
                  <Link
                    key={s.id}
                    to={`/signo/${s.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full hover:border-primary/50 hover:bg-muted transition-all font-body"
                  >
                    <span className="text-xl">{s.symbol}</span>
                    <span>{s.name}</span>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

interface HoroscopeCardProps {
  title: string;
  date: string;
  content: string;
  sign: typeof zodiacSigns[0];
}

const HoroscopeCard = ({ title, date, content, sign }: HoroscopeCardProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-8 md:p-12 glow-mystical">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
            {title}
          </h2>
          <p className="font-body text-muted-foreground capitalize">{date}</p>
        </div>
        <div className="text-4xl opacity-50">{sign.symbol}</div>
      </div>
      
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-8" />
      
      <p className="font-body text-xl leading-relaxed text-foreground/90">
        {content}
      </p>

      <div className="mt-8 pt-6 border-t border-border/50">
        <p className="font-body text-sm text-muted-foreground text-center">
          ✨ Confira mais previsões no canal do YouTube da Gabi ✨
        </p>
      </div>
    </div>
  );
};

export default SignDetail;
