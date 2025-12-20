import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { ChartData } from '@/utils/astroCalculations';
import { toast } from 'sonner';

export interface SavedChart {
  id: string;
  user_id: string;
  name: string;
  birth_data: any;
  chart_data: ChartData;
  created_at: string;
  premium_purchase_id: string | null;
}

interface UseSavedChartsReturn {
  savedCharts: SavedChart[];
  loading: boolean;
  chartsCount: number;
  canCreateChart: boolean;
  remainingCharts: number;
  saveChart: (name: string, birthData: any, chartData: ChartData) => Promise<boolean>;
  deleteChart: (chartId: string) => Promise<boolean>;
  refreshCharts: () => Promise<void>;
}

const MAX_CHARTS_FREE = 1;
const MAX_CHARTS_PREMIUM = 2;

export function useSavedCharts(): UseSavedChartsReturn {
  const { user, profile, isPremium, refreshProfile } = useAuth();
  const [savedCharts, setSavedCharts] = useState<SavedChart[]>([]);
  const [loading, setLoading] = useState(true);

  const chartsCount = profile?.charts_created_count ?? 0;
  const maxCharts = isPremium ? MAX_CHARTS_PREMIUM : MAX_CHARTS_FREE;
  const canCreateChart = !!user && chartsCount < maxCharts;
  const remainingCharts = Math.max(0, maxCharts - chartsCount);

  const fetchCharts = useCallback(async () => {
    if (!user) {
      setSavedCharts([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('saved_charts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Cast the data to SavedChart[] since we know the structure
      const charts = (data || []).map(chart => ({
        ...chart,
        chart_data: chart.chart_data as unknown as ChartData,
      })) as SavedChart[];

      setSavedCharts(charts);
    } catch (error) {
      console.error('Error fetching saved charts:', error);
      toast.error('Erro ao carregar mapas salvos');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCharts();
  }, [fetchCharts]);

  const saveChart = async (
    name: string,
    birthData: any,
    chartData: ChartData
  ): Promise<boolean> => {
    if (!user) {
      toast.error('Você precisa estar logado para salvar mapas');
      return false;
    }

    if (!canCreateChart) {
      const message = isPremium
        ? `Você atingiu o limite de ${MAX_CHARTS_PREMIUM} mapas. Adquira um novo pacote premium para criar mais mapas.`
        : `Usuários gratuitos podem salvar apenas ${MAX_CHARTS_FREE} mapa. Adquira o plano premium para salvar mais!`;
      toast.error(message);
      return false;
    }

    try {
      // Insert the chart
      const { error: insertError } = await supabase
        .from('saved_charts')
        .insert({
          user_id: user.id,
          name,
          birth_data: birthData,
          chart_data: chartData as any,
          premium_purchase_id: profile?.current_premium_id || null,
        });

      if (insertError) throw insertError;

      // Update the charts count
      const newCount = chartsCount + 1;
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ charts_created_count: newCount })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      // Refresh data
      await refreshProfile();
      await fetchCharts();

      toast.success('Mapa salvo com sucesso!');
      return true;
    } catch (error) {
      console.error('Error saving chart:', error);
      toast.error('Erro ao salvar o mapa');
      return false;
    }
  };

  const deleteChart = async (chartId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('saved_charts')
        .delete()
        .eq('id', chartId)
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchCharts();
      toast.success('Mapa excluído com sucesso');
      return true;
    } catch (error) {
      console.error('Error deleting chart:', error);
      toast.error('Erro ao excluir o mapa');
      return false;
    }
  };

  return {
    savedCharts,
    loading,
    chartsCount,
    canCreateChart,
    remainingCharts,
    saveChart,
    deleteChart,
    refreshCharts: fetchCharts,
  };
}
