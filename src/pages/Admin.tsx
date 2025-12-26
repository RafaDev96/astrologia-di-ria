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
  RefreshCw,
  Search,
  CreditCard,
  CheckCircle,
  Clock,
  ToggleLeft,
  ToggleRight,
  Mail
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

interface UserProfile {
  id: string;
  user_id: string;
  email: string | null;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
  premium_activated_at: string | null;
  mp_last_payment_id: string | null;
  charts_created_count: number;
  birth_data: Record<string, unknown> | null;
}

interface UsersData {
  users: UserProfile[] | null;
  total: number;
}

interface PaymentOrder {
  id: string;
  order_id: string;
  email: string;
  status: string;
  created_at: string;
  paid_at: string | null;
  birth_data: Record<string, unknown> | null;
}

interface PaymentsData {
  payments: PaymentOrder[] | null;
  total: number;
  paid_count: number;
  pending_count: number;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminRole();
  
  // Metrics state
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  
  // Users state
  const [usersData, setUsersData] = useState<UsersData | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [togglingPremium, setTogglingPremium] = useState<string | null>(null);
  
  // Payments state
  const [paymentsData, setPaymentsData] = useState<PaymentsData | null>(null);
  const [loadingPayments, setLoadingPayments] = useState(false);

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

  const fetchUsers = async (search?: string, filter?: string) => {
    setLoadingUsers(true);
    try {
      const { data, error } = await supabase.rpc('get_admin_users', {
        p_limit: 50,
        p_offset: 0,
        p_search: search || null,
        p_filter: filter || 'all'
      });
      
      if (error) {
        console.error('Error fetching users:', error);
        toast.error('Erro ao carregar usuários');
        return;
      }

      setUsersData(data as unknown as UsersData);
    } catch (err) {
      console.error('Error fetching users:', err);
      toast.error('Erro ao carregar usuários');
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchPayments = async () => {
    setLoadingPayments(true);
    try {
      const { data, error } = await supabase.rpc('get_admin_payments', {
        p_limit: 50,
        p_offset: 0
      });
      
      if (error) {
        console.error('Error fetching payments:', error);
        toast.error('Erro ao carregar pagamentos');
        return;
      }

      setPaymentsData(data as unknown as PaymentsData);
    } catch (err) {
      console.error('Error fetching payments:', err);
      toast.error('Erro ao carregar pagamentos');
    } finally {
      setLoadingPayments(false);
    }
  };

  const togglePremium = async (userId: string, currentStatus: boolean) => {
    setTogglingPremium(userId);
    try {
      const { data, error } = await supabase.rpc('admin_toggle_premium', {
        p_user_id: userId,
        p_is_premium: !currentStatus
      });
      
      if (error) {
        console.error('Error toggling premium:', error);
        toast.error('Erro ao alterar status premium');
        return;
      }

      toast.success(`Status premium ${!currentStatus ? 'ativado' : 'desativado'} com sucesso`);
      fetchUsers(userSearch, userFilter);
      fetchMetrics();
    } catch (err) {
      console.error('Error toggling premium:', err);
      toast.error('Erro ao alterar status premium');
    } finally {
      setTogglingPremium(null);
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

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (isAdmin) {
        fetchUsers(userSearch, userFilter);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [userSearch, userFilter, isAdmin]);

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

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
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
                Métricas, usuários e pagamentos
              </p>
            </div>
          </div>

          <Tabs defaultValue="metrics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="metrics" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Métricas
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2" onClick={() => !usersData && fetchUsers()}>
                <Users className="w-4 h-4" />
                Usuários
              </TabsTrigger>
              <TabsTrigger value="payments" className="gap-2" onClick={() => !paymentsData && fetchPayments()}>
                <CreditCard className="w-4 h-4" />
                Pagamentos
              </TabsTrigger>
            </TabsList>

            {/* Metrics Tab */}
            <TabsContent value="metrics" className="space-y-6">
              <div className="flex justify-end">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <CardTitle className="text-lg font-display text-foreground flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Gerenciamento de Usuários
                      {usersData && (
                        <Badge variant="secondary" className="ml-2">
                          {usersData.total} total
                        </Badge>
                      )}
                    </CardTitle>
                    <Button 
                      onClick={() => fetchUsers(userSearch, userFilter)} 
                      variant="outline" 
                      size="sm"
                      disabled={loadingUsers}
                      className="gap-2"
                    >
                      <RefreshCw className={`w-4 h-4 ${loadingUsers ? 'animate-spin' : ''}`} />
                      Atualizar
                    </Button>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar por email..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={userFilter} onValueChange={setUserFilter}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filtrar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="free">Gratuito</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  {loadingUsers ? (
                    <div className="flex items-center justify-center py-10">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : usersData?.users && usersData.users.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Mapas</TableHead>
                            <TableHead>Cadastro</TableHead>
                            <TableHead>Premium em</TableHead>
                            <TableHead>Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {usersData.users.map((userProfile) => (
                            <TableRow key={userProfile.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <Mail className="w-4 h-4 text-muted-foreground" />
                                  <span className="truncate max-w-[200px]">
                                    {userProfile.email || userProfile.user_id.slice(0, 12) + '...'}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                {userProfile.is_premium ? (
                                  <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">
                                    <Crown className="w-3 h-3 mr-1" />
                                    Premium
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary">
                                    Gratuito
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>{userProfile.charts_created_count}</TableCell>
                              <TableCell className="text-muted-foreground">
                                {formatShortDate(userProfile.created_at)}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {userProfile.premium_activated_at 
                                  ? formatShortDate(userProfile.premium_activated_at)
                                  : '-'
                                }
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => togglePremium(userProfile.user_id, userProfile.is_premium)}
                                  disabled={togglingPremium === userProfile.user_id}
                                  className="gap-2"
                                >
                                  {togglingPremium === userProfile.user_id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : userProfile.is_premium ? (
                                    <ToggleRight className="w-4 h-4 text-amber-500" />
                                  ) : (
                                    <ToggleLeft className="w-4 h-4 text-muted-foreground" />
                                  )}
                                  {userProfile.is_premium ? 'Remover' : 'Ativar'}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-10">
                      Nenhum usuário encontrado
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total de Pedidos
                    </CardTitle>
                    <CreditCard className="w-4 h-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {paymentsData?.total || 0}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Pagos
                    </CardTitle>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {paymentsData?.paid_count || 0}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Pendentes
                    </CardTitle>
                    <Clock className="w-4 h-4 text-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {paymentsData?.pending_count || 0}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-display text-foreground flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Histórico de Pagamentos
                    </CardTitle>
                    <Button 
                      onClick={fetchPayments} 
                      variant="outline" 
                      size="sm"
                      disabled={loadingPayments}
                      className="gap-2"
                    >
                      <RefreshCw className={`w-4 h-4 ${loadingPayments ? 'animate-spin' : ''}`} />
                      Atualizar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {loadingPayments ? (
                    <div className="flex items-center justify-center py-10">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : paymentsData?.payments && paymentsData.payments.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID do Pedido</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Criado em</TableHead>
                            <TableHead>Pago em</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paymentsData.payments.map((payment) => (
                            <TableRow key={payment.id}>
                              <TableCell className="font-mono text-sm">
                                {payment.order_id.slice(0, 8)}...
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Mail className="w-4 h-4 text-muted-foreground" />
                                  <span className="truncate max-w-[200px]">
                                    {payment.email}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                {payment.status === 'paid' ? (
                                  <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Pago
                                  </Badge>
                                ) : (
                                  <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Pendente
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {formatShortDate(payment.created_at)}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {payment.paid_at 
                                  ? formatShortDate(payment.paid_at)
                                  : '-'
                                }
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-10">
                      Nenhum pagamento encontrado
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Admin;
