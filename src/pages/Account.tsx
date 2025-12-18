import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Star, Crown, LogOut, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Account() {
  const navigate = useNavigate();
  const { user, profile, loading, isPremium, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Minha Conta | Horóscopo da Gabi</title>
        <meta name="description" content="Gerencie sua conta e acesse seu mapa astral." />
      </Helmet>

      <div className="min-h-screen bg-gradient-cosmic flex flex-col">
        <Header />

        <main className="flex-1 py-12 px-4">
          <div className="container mx-auto max-w-2xl space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-primary animate-pulse-glow" />
                <span className="text-primary font-display text-lg">Minha Conta</span>
                <Star className="w-6 h-6 text-primary animate-pulse-glow" />
              </div>
              <h1 className="text-3xl font-display text-gradient-gold">
                Olá!
              </h1>
              <p className="text-muted-foreground mt-2">{user.email}</p>
            </div>

            {/* Premium Status */}
            <Card className={`border-2 ${isPremium ? 'border-primary bg-primary/10' : 'border-muted bg-card/50'}`}>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  <Crown className={`w-12 h-12 ${isPremium ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <CardTitle className="font-display text-xl">
                  {isPremium ? "Acesso Premium Ativo" : "Acesso Gratuito"}
                </CardTitle>
                <CardDescription>
                  {isPremium 
                    ? `Ativado em ${new Date(profile?.premium_activated_at || '').toLocaleDateString('pt-BR')}`
                    : "Desbloqueie o mapa astral completo"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                {isPremium ? (
                  <Button
                    size="lg"
                    onClick={() => navigate("/mapa-completo")}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-display"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Ver Meu Mapa Astral Completo
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      Você ainda não desbloqueou o mapa astral completo.
                    </p>
                    <Button
                      size="lg"
                      onClick={() => navigate("/mapa-astral")}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-display"
                    >
                      Calcular e Comprar Mapa Completo
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card/50 border-primary/20">
              <CardHeader>
                <CardTitle className="font-display text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/mapa-astral")}
                  className="w-full justify-start border-primary/20"
                >
                  <Star className="w-4 h-4 mr-2 text-primary" />
                  Calcular Novo Mapa Astral
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="w-full justify-start border-primary/20"
                >
                  <Star className="w-4 h-4 mr-2 text-primary" />
                  Ver Horóscopo do Dia
                </Button>
              </CardContent>
            </Card>

            {/* Sign Out */}
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair da Conta
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
