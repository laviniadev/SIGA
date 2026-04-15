import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ShoppingBag, ArrowRight, Package, Star, ChevronLeft } from "lucide-react"
import { useCartStore } from "@/stores/useCartStore"

export default function Success() {
  const navigate = useNavigate()
  const { clearCart } = useCartStore()

  useEffect(() => {
    // Limpa o carrinho ao chegar na tela de sucesso
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10 pt-8 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative text-left">
        
        {/* Voltar no topo - IDENTICO AO FAVORITES/PIX */}
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-4 md:mb-6 group"
        >
          <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-0.5 transition-transform" /> 
          Ir para a Home
        </button>

        <div className="flex flex-col items-center justify-center w-full mt-4 md:mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Card className="border-none shadow-2xl rounded-[28px] overflow-hidden bg-background/90 backdrop-blur-xl border border-white/10 max-w-[400px] w-full">
            <CardContent className="p-6 space-y-6 text-center">
              
              {/* Header Ultra Compacto */}
              <div className="flex items-center justify-between border-b border-muted/30 pb-4">
                <div className="text-left">
                  <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none text-foreground">Pedido <br /> Confirmado!</h1>
                  <p className="text-muted-foreground text-[8px] font-black uppercase tracking-widest opacity-60 mt-1">Sua compra foi um sucesso</p>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-success/20 blur-xl rounded-full animate-pulse" />
                  <div className="relative bg-success text-white p-2.5 rounded-xl shadow-lg shadow-success/20">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Ilustração/Icone Central Compacto */}
              <div className="py-2">
                <div className="relative inline-block">
                  <div className="p-6 rounded-[32px] bg-muted/20 border border-muted/30">
                    <ShoppingBag className="w-12 h-12 text-primary/80" />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-yellow-400 text-white p-1 rounded-full shadow-lg border-2 border-background animate-bounce">
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                </div>
              </div>

              {/* Info do Pedido em Linha Única (Modelo PIX) */}
              <div className="flex items-center justify-between px-3 py-3 bg-muted/20 rounded-xl border border-muted/10">
                <div className="flex items-center gap-2">
                  <Package className="w-3.5 h-3.5 text-primary" />
                  <div className="text-left">
                    <p className="text-[7px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-0.5">Entrega em</p>
                    <span className="text-[10px] font-black italic">3-5 dias úteis</span>
                  </div>
                </div>
                <div className="h-5 w-px bg-muted/40" />
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-success rounded-full animate-pulse" />
                  <div className="text-left">
                    <p className="text-[7px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-0.5">Status</p>
                    <span className="text-[10px] font-black uppercase italic text-success">Preparando</span>
                  </div>
                </div>
              </div>

              {/* Ações Compactas */}
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate('/customer')}
                  className="w-full h-11 bg-foreground hover:bg-zinc-800 text-background rounded-xl font-black uppercase tracking-widest text-[11px] shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 group"
                >
                  Ver Meus Pedidos
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Segurança/Rodapé Compacto */}
              <div className="flex items-center justify-center gap-1.5 text-[7px] font-bold text-muted-foreground uppercase tracking-widest opacity-30 italic">
                <Star className="w-2.5 h-2.5 fill-current" /> SIGA PREMIUM EXPERIENCE • 2026
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
