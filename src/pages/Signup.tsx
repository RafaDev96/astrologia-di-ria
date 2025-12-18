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

export default function Signup() {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp(email, password);

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("Este email já está cadastrado");
        } else {
          toast.error(error.message);
        }
        return;
      }

      // Auto login after signup (since auto-confirm is enabled)
      const { error: loginError } = await signIn(email, password);
      
      if (loginError) {
        toast.success("Conta criada! Faça login para continuar.");
        navigate("/login");
      } else {
        toast.success("Conta criada com sucesso!");
        navigate("/conta");
      }
    } catch (err) {
      toast.error("Erro ao criar conta");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Criar Conta | Horóscopo da Gabi</title>
        <meta name="description" content="Crie sua conta para acessar o mapa astral completo." />
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
                Criar Conta
              </CardTitle>
              <CardDescription>
                Cadastre-se para desbloquear seu mapa astral completo
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
                  <p className="text-xs text-muted-foreground">Mínimo 6 caracteres</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground">
                    Confirmar Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                      Criando conta...
                    </>
                  ) : (
                    "Criar Conta"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  Já tem uma conta?{" "}
                  <Link
                    to="/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Entrar
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
