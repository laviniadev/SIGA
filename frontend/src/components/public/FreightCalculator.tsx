import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, Calculator, Loader2, AlertCircle, CheckCircle2, MapPin } from "lucide-react";
import { calculateFreight, getAddressByCep } from '../../lib/freight';
import type { FreightResponse, Address } from '../../lib/freight';
import { cn } from "@/lib/utils";

interface FreightCalculatorProps {
  weight?: number;
  className?: string;
  onCalculate?: (value: number) => void;
}

export function FreightCalculator({ weight = 1, className, onCalculate }: FreightCalculatorProps) {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FreightResponse | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Busca automática ao digitar 8 dígitos
  useEffect(() => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      handleCalculate();
    } else {
      setAddress(null);
      setResult(null);
    }
  }, [cep]);

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);

    try {
      // Primeiro busca o endereço (ViaCEP)
      const addrData = await getAddressByCep(cep);
      setAddress(addrData);

      // Depois calcula o frete no backend
      const freightData = await calculateFreight(cep, weight);
      setResult(freightData);
      
      if (onCalculate) {
        onCalculate(freightData.valor);
      }
    } catch (err: any) {
      setError(err.message || "Erro ao localizar CEP.");
      setAddress(null);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("space-y-4 p-5 rounded-2xl border bg-card/40 backdrop-blur-md shadow-lg", className)}>
      <div className="flex items-center gap-2 mb-1">
        <Truck className="w-4 h-4 text-primary" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/70">Simulador de Entrega</span>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="00000-000"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="h-11 text-sm font-bold border-muted-foreground/20 focus:border-primary pr-10 rounded-xl"
            maxLength={9}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            ) : (
              <Calculator className="w-4 h-4 text-muted-foreground/40" />
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 text-destructive text-[10px] font-black uppercase tracking-tight animate-in fade-in slide-in-from-top-1 px-1">
          <AlertCircle className="w-3 h-3 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {address && (
        <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-xl border border-muted/50 animate-in fade-in slide-in-from-left-2">
          <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-primary/80 tracking-tighter">Endereço de Destino</span>
            <span className="text-xs font-bold text-foreground">
              {address.logradouro || "Endereço Genérico"}
            </span>
            <span className="text-[10px] font-medium text-muted-foreground">
              {address.bairro ? `${address.bairro}, ` : ""}{address.localidade} - {address.uf}
            </span>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-3 animate-in fade-in zoom-in-95 duration-500">
          <div className="flex justify-between items-center p-4 bg-primary/[0.03] rounded-xl border border-primary/10">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Prazo</span>
              <span className="text-sm font-black text-foreground">{result.prazo_dias} {result.prazo_dias === 1 ? 'dia útil' : 'dias úteis'}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Valor Fixo</span>
              <span className="text-lg font-black text-primary">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result.valor)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] text-success font-black uppercase tracking-[0.1em] px-1">
            <CheckCircle2 className="w-3 h-3" />
            Tarifa Flat ativa para sua região
          </div>
        </div>
      )}
    </div>
  );
}
