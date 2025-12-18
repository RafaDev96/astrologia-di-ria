import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Loader2, Mail, Lock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Email ou senha incorretos");
        } else {
          toast.error(error.message);
        }
        return;
      }

      toast.success("Login realizado com sucesso!");
      navigate("/conta");
    } catch (err) {
      toast.error("Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Entrar | Horóscopo da Gabi</title>
        <meta name="description" content="Faça login para acessar seu mapa astral completo." />
      </Helmet>

      <div className="min-h-screen bg-gradient-cosmic flex flex-col">
        <Header />

        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md bg-card/50 border-primary/20">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Star className="w-10 h-10 text-primary animate-pulse-glow" />
              </div>
              <CardTitle className="text-2xl font-display text-gradient-gold">
                Entrar
              </CardTitle>
              <CardDescription>
                Acesse sua conta para ver seu mapa astral
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="pl-10 bg-background/50 border-primary/20"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 bg-background/50 border-primary/20"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  Não tem uma conta?{" "}
                  <Link
                    to="/cadastro"
                    className="text-primary hover:underline font-medium"
                  >
                    Criar conta
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </>
  );
}
