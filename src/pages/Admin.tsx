import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  Users, 
  Crown, 
  TrendingUp, 
  BarChart3, 
  Calendar,
  Loader2,
  ShieldAlert,
  RefreshCw
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAdminRole } from "@/hooks/useAdminRole";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AdminMetrics {
  total_users: number;
  premium_users: number;
  new_users_week: number;
  conversions_month: number;
  total_charts: number;
  recent_signups: Array<{
    id: string;
    user_id: string;
    is_premium: boolean;
    created_at: string;
  }>;
  recent_premium: Array<{
    id: string;
    user_id: string;
    is_premium: boolean;
    premium_activated_at: string;
    mp_last_payment_id: string;
  }>;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminRole();
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  const fetchMetrics = async () => {
    setLoadingMetrics(true);
    try {
      const { data, error } = await supabase.rpc('get_admin_metrics');
      
      if (error) {
        console.error('Error fetching metrics:', error);
        toast.error('Erro ao carregar métricas');
        return;
      }

      setMetrics(data as unknown as AdminMetrics);
    } catch (err) {
      console.error('Error fetching metrics:', err);
      toast.error('Erro ao carregar métricas');
    } finally {
      setLoadingMetrics(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (!adminLoading && user && !isAdmin) {
      toast.error('Acesso negado: você não tem permissão de administrador');
      navigate('/');
      return;
    }

    if (!adminLoading && isAdmin) {
      fetchMetrics();
    }
  }, [user, authLoading, isAdmin, adminLoading, navigate]);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <ShieldAlert className="w-16 h-16 text-destructive" />
        <h1 className="text-2xl font-display text-foreground">Acesso Negado</h1>
        <p className="text-muted-foreground">Você não tem permissão para acessar esta página.</p>
        <Button onClick={() => navigate('/')}>Voltar ao Início</Button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Helmet>
        <title>Painel Admin | Horóscopo da Gabi</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display text-gradient-gold mb-2">
                Painel Administrativo
              </h1>
              <p className="text-muted-foreground">
                Métricas e estatísticas do sistema
              </p>
            </div>
            <Button 
              onClick={fetchMetrics} 
              variant="outline" 
              disabled={loadingMetrics}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loadingMetrics ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>

          {loadingMetrics ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : metrics ? (
            <>
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total de Usuários
                    </CardTitle>
                    <Users className="w-4 h-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {metrics.total_users}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Usuários Premium
                    </CardTitle>
                    <Crown className="w-4 h-4 text-amber-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {metrics.premium_users}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {metrics.total_users > 0 
                        ? `${((metrics.premium_users / metrics.total_users) * 100).toFixed(1)}% do total`
                        : '0% do total'
                      }
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Novos (7 dias)
                    </CardTitle>
                    <Calendar className="w-4 h-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {metrics.new_users_week}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Conversões (30 dias)
                    </CardTitle>
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {metrics.conversions_month}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total de Mapas
                    </CardTitle>
                    <BarChart3 className="w-4 h-4 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {metrics.total_charts}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Signups */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg font-display text-foreground flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Cadastros Recentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {metrics.recent_signups && metrics.recent_signups.length > 0 ? (
                      <div className="space-y-3">
                        {metrics.recent_signups.map((signup) => (
                          <div 
                            key={signup.id} 
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <Users className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground truncate max-w-[150px]">
                                  {signup.user_id.slice(0, 8)}...
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {formatDate(signup.created_at)}
                                </p>
                              </div>
                            </div>
                            {signup.is_premium && (
                              <Crown className="w-4 h-4 text-amber-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">
                        Nenhum cadastro recente
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Premium Conversions */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg font-display text-foreground flex items-center gap-2">
                      <Crown className="w-5 h-5 text-amber-500" />
                      Conversões Premium Recentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {metrics.recent_premium && metrics.recent_premium.length > 0 ? (
                      <div className="space-y-3">
                        {metrics.recent_premium.map((premium) => (
                          <div 
                            key={premium.id} 
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                                <Crown className="w-4 h-4 text-amber-500" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground truncate max-w-[150px]">
                                  {premium.user_id.slice(0, 8)}...
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {premium.premium_activated_at 
                                    ? formatDate(premium.premium_activated_at)
                                    : 'Data não disponível'
                                  }
                                </p>
                              </div>
                            </div>
                            {premium.mp_last_payment_id && (
                              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                {premium.mp_last_payment_id.slice(0, 10)}...
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">
                        Nenhuma conversão recente
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Erro ao carregar métricas</p>
              <Button onClick={fetchMetrics} className="mt-4">
                Tentar novamente
              </Button>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Admin;
