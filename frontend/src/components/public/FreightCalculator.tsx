import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, Calculator, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { calculateFreight, FreightResponse } from "@/lib/freight";
import { cn } from "@/lib/utils";

interface FreightCalculatorProps {
  weight: number;
  className?: string;
  onCalculate?: (value: number) => void;
}

export function FreightCalculator({ weight, className, onCalculate }: FreightCalculatorProps) {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FreightResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    if (cep.replace(/\D/g, "").length < 8) {
      setError("Digite um CEP válido com 8 dígitos.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await calculateFreight(cep, weight);
      setResult(data);
      if (onCalculate) {
        onCalculate(data.valor);
      }
    } catch (err: any) {
      setError(err.message || "Erro ao calcular frete. Verifique o CEP e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("space-y-4 p-4 rounded-xl border bg-card/50 backdrop-blur-sm", className)}>
      <div className="flex items-center gap-2 mb-2">
        <Truck className="w-4 h-4 text-primary" />
        <span className="text-xs font-bold uppercase tracking-widest">Calcular Frete</span>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="00000-000"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="h-10 text-xs font-medium border-muted-foreground/20 focus:border-primary pr-8"
            maxLength={9}
          />
          {cep.length > 0 && !loading && !result && (
            <Calculator 
              className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
              onClick={handleCalculate}
            />
          )}
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={handleCalculate} 
          disabled={loading || !cep}
          className="h-10 px-4 text-[10px] font-bold uppercase tracking-wider"
        >
          {loading ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : null}
          Calcular
        </Button>
      </div>

      {error && (
        <div className="flex items-start gap-2 text-destructive text-[10px] font-bold uppercase animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="w-3 h-3 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="space-y-3 pt-2 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg border border-primary/10">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Entrega Estimada</span>
              <span className="text-xs font-black text-foreground">{result.prazo_dias} {result.prazo_dias === 1 ? 'dia útil' : 'dias úteis'}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Valor do Frete</span>
              <span className="text-sm font-black text-primary">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result.valor)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] text-success font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3 h-3" />
            Opções de envio atualizadas para seu CEP
          </div>
        </div>
      )}
    </div>
  );
}
