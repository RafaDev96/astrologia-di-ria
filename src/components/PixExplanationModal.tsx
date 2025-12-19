import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, CheckCircle, Lock } from "lucide-react";

interface PixExplanationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function PixExplanationModal({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: PixExplanationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-card border-primary/30">
        <DialogHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-display text-gradient-gold text-center">
            Último passo para liberar seu Mapa Astral Completo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Main explanation */}
          <p className="text-center text-foreground text-lg">
            Você será redirecionado para o pagamento via Pix.
          </p>

          {/* Warning box */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-foreground font-medium">
                  Atenção: após pagar o Pix, a tela do QR Code pode não mudar automaticamente.
                </p>
                <p className="text-muted-foreground">
                  Isso é normal.
                </p>
              </div>
            </div>
          </div>

          {/* Instructions box */}
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <ArrowLeft className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-foreground font-medium">
                  Depois de pagar, basta voltar para esta página
                </p>
                <p className="text-muted-foreground text-sm">
                  Clique em "voltar" no navegador ou retorne para esta aba.
                </p>
              </div>
            </div>
          </div>

          {/* Success info */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-foreground">
                Assim que você voltar, seu Mapa Astral Completo será liberado automaticamente.
              </p>
            </div>
          </div>

          {/* Reassurance */}
          <p className="text-center text-sm text-muted-foreground">
            Não se preocupe: o sistema reconhece o pagamento em poucos segundos.
          </p>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto order-2 sm:order-1"
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto order-1 sm:order-2 bg-primary hover:bg-primary/90 text-primary-foreground font-display text-base"
          >
            {isLoading ? (
              "Processando..."
            ) : (
              "Entendi, ir para o pagamento"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
