import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ShoppingBag, ArrowRight, Package, Star } from "lucide-react"
import { useCartStore } from "@/stores/useCartStore"

export default function Success() {
  const navigate = useNavigate()
  const { clearCart } = useCartStore()

  useEffect(() => {
    // Limpa o carrinho ao chegar na tela de sucesso
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-success/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-[450px] w-full relative z-10 animate-in fade-in zoom-in duration-700">
        <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[40px] overflow-hidden bg-background/80 backdrop-blur-2xl border border-white/20">
          <CardContent className="p-8 md:p-10 text-center space-y-8">
            
            {/* Ícone de Sucesso Animado */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-success/20 blur-2xl rounded-full animate-ping" />
              <div className="relative bg-success text-white p-6 rounded-full shadow-lg shadow-success/40 scale-110">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-1.5 rounded-full shadow-lg border-2 border-background animate-bounce">
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>

            {/* Mensagem Principal */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic leading-none text-foreground">
                Pagamento <br /> Confirmado!
              </h1>
              <p className="text-muted-foreground text-sm font-medium max-w-[280px] mx-auto text-balance">
                Seu pedido foi recebido com sucesso e já está sendo preparado por nossa equipe.
              </p>
            </div>

            {/* Info do Pedido Estilo Intersticial */}
            <div className="grid grid-cols-2 gap-4 py-6 border-y border-muted/50">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Previsão de Entrega</p>
                <div className="flex items-center justify-center gap-2 font-black text-foreground">
                  <Package className="w-3.5 h-3.5 text-primary" />
                  <span className="text-sm italic">3-5 dias úteis</span>
                </div>
              </div>
              <div className="space-y-1 border-l border-muted/50">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status do Pedido</p>
                <div className="flex items-center justify-center gap-2 font-black text-success">
                  <span className="h-1.5 w-1.5 bg-success rounded-full animate-pulse" />
                  <span className="text-sm italic uppercase">Preparando</span>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => navigate('/customer')}
                className="w-full h-14 bg-foreground hover:bg-zinc-800 text-background rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 group"
              >
                Ver Meus Pedidos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="ghost"
                onClick={() => navigate('/')}
                className="w-full h-12 rounded-2xl font-black uppercase tracking-widest text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Continuar Comprando
              </Button>
            </div>

            {/* Nota de Segurança */}
            <div className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em] pt-2">
              SIGA PREMIUM EXPERIENCE • 2026
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
