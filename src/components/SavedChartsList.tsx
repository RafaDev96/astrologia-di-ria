import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Star, Trash2, Eye, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useSavedCharts, SavedChart } from '@/hooks/useSavedCharts';

interface SavedChartsListProps {
  onSelectChart?: (chart: SavedChart) => void;
}

export default function SavedChartsList({ onSelectChart }: SavedChartsListProps) {
  const navigate = useNavigate();
  const { savedCharts, loading, deleteChart, remainingCharts, canCreateChart } = useSavedCharts();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (chartId: string) => {
    setDeletingId(chartId);
    await deleteChart(chartId);
    setDeletingId(null);
  };

  const handleViewChart = (chart: SavedChart) => {
    if (onSelectChart) {
      onSelectChart(chart);
    } else {
      // Store chart data in sessionStorage and navigate
      sessionStorage.setItem('viewingSavedChart', JSON.stringify(chart));
      navigate('/mapa-completo');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status info */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {savedCharts.length === 0 
            ? 'Você ainda não tem mapas salvos.'
            : `${savedCharts.length} mapa${savedCharts.length > 1 ? 's' : ''} salvo${savedCharts.length > 1 ? 's' : ''}`
          }
        </p>
        <span className={`text-sm px-3 py-1 rounded-full ${
          canCreateChart 
            ? 'bg-primary/20 text-primary' 
            : 'bg-destructive/20 text-destructive'
        }`}>
          {remainingCharts} mapa{remainingCharts !== 1 ? 's' : ''} restante{remainingCharts !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Charts grid */}
      {savedCharts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedCharts.map((chart) => (
            <Card key={chart.id} className="bg-card/50 border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    <span className="font-display text-lg">{chart.name}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Birth info */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {chart.birth_data?.birthDate || chart.birth_data?.date}
                      {(chart.birth_data?.birthTime || chart.birth_data?.time) && 
                        ` às ${chart.birth_data?.birthTime || chart.birth_data?.time}`
                      }
                    </span>
                  </div>
                  {(chart.birth_data?.birthPlace || chart.birth_data?.city) && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{chart.birth_data?.birthPlace || chart.birth_data?.city}</span>
                    </div>
                  )}
                </div>

                {/* Created date */}
                <p className="text-xs text-muted-foreground">
                  Criado em {formatDate(chart.created_at)}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-primary/20"
                    onClick={() => handleViewChart(chart)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-destructive/20 text-destructive hover:bg-destructive/10"
                        disabled={deletingId === chart.id}
                      >
                        {deletingId === chart.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir mapa astral?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita. O mapa astral de "{chart.name}" será 
                          permanentemente excluído. Isso não restaurará seu limite de mapas.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(chart.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Star className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">
            Calcule seu mapa astral para salvar e analisar quando quiser.
          </p>
          <Button
            onClick={() => navigate('/mapa-astral')}
            className="mt-4 bg-primary hover:bg-primary/90"
          >
            Calcular Mapa Astral
          </Button>
        </div>
      )}

      {/* Info about limit */}
      {!canCreateChart && savedCharts.length > 0 && (
        <div className="text-center p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <p className="text-amber-200 text-sm">
            Você atingiu o limite de mapas para este pacote premium. 
            Para criar mais mapas, adquira um novo pacote.
          </p>
          <Button
            variant="outline"
            className="mt-3 border-amber-500/30 text-amber-200 hover:bg-amber-500/10"
            onClick={() => navigate('/mapa-astral')}
          >
            Adquirir Novo Pacote
          </Button>
        </div>
      )}
    </div>
  );
}
