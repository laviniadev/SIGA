import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, User, Settings, CreditCard, ShoppingBag, MapPin, Heart, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function CustomerArea() {
  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      {/* Premium Header Banner */}
      <div className="bg-zinc-950 text-white pt-16 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-50 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-primary to-secondary p-1 shadow-2xl">
            <div className="h-full w-full rounded-full bg-zinc-900 border-4 border-zinc-950 flex items-center justify-center">
              <span className="text-4xl font-black tracking-widest text-white">JO</span>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">João Oliveira</h1>
            <p className="text-zinc-400 font-medium tracking-widest uppercase text-sm mt-3 flex items-center justify-center md:justify-start gap-2">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
              Siga VIP Member
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-12 -mt-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* THE SIDEBAR */}
          <aside className="w-full lg:w-[280px] flex-shrink-0">
            <nav className="flex flex-col space-y-3 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl z-30">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 px-2">Sua Conta</h3>
              
              <Link to="/customer" className="flex items-center justify-between bg-zinc-950 text-white p-4 rounded-xl font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all group">
                <div className="flex items-center gap-4">
                  <User className="h-5 w-5 text-primary" /> 
                  <span className="uppercase tracking-widest text-sm">Visão Geral</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
              </Link>
              
              <Link to="/customer/orders" className="flex items-center justify-between hover:bg-muted p-4 rounded-xl text-foreground font-semibold hover:scale-[1.02] active:scale-95 transition-all group">
                <div className="flex items-center gap-4">
                  <Package className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" /> 
                  <span className="uppercase tracking-widest text-sm">Meus Pedidos</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
              </Link>
              
              <Link to="/customer/cards" className="flex items-center justify-between hover:bg-muted p-4 rounded-xl text-foreground font-semibold hover:scale-[1.02] active:scale-95 transition-all group">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" /> 
                  <span className="uppercase tracking-widest text-sm">Pagamentos</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
              </Link>

              <Link to="/customer/settings" className="flex items-center justify-between hover:bg-muted p-4 rounded-xl text-foreground font-semibold hover:scale-[1.02] active:scale-95 transition-all group">
                <div className="flex items-center gap-4">
                  <Settings className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" /> 
                  <span className="uppercase tracking-widest text-sm">Configurar</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
              </Link>
            </nav>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="w-full flex-1 space-y-10">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden hover:-translate-y-2 transition-transform duration-500">
                <CardContent className="p-8 flex flex-col justify-between h-full relative">
                  <div className="absolute -right-4 -top-4 opacity-5">
                    <ShoppingBag className="h-48 w-48" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Pontos Siga</p>
                  <div>
                    <h4 className="text-5xl font-black tabular-nums tracking-tighter">1.250</h4>
                    <p className="text-sm font-bold text-success mt-2">Válidos até dez/2026</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden hover:-translate-y-2 transition-transform duration-500">
                <CardContent className="p-8 flex flex-col justify-between h-full relative">
                  <div className="absolute -right-4 -top-4 opacity-5">
                    <Package className="h-48 w-48" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Pedidos Ativos</p>
                  <div>
                    <h4 className="text-5xl font-black tabular-nums tracking-tighter">2</h4>
                    <p className="text-sm font-bold text-primary mt-2">1 em rota de entrega</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-zinc-950 text-white rounded-3xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 relative group cursor-pointer">
                <CardContent className="p-8 flex flex-col justify-between h-full">
                  <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <Heart className="h-48 w-48" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 z-10">Wishlist</p>
                  <div className="z-10">
                    <h4 className="text-5xl font-black tabular-nums tracking-tighter text-white">14</h4>
                    <p className="text-sm font-bold text-zinc-300 mt-2 flex items-center gap-2 group-hover:text-white transition-colors">
                      Ver favoritos <ChevronRight className="h-4 w-4" />
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Latest Order Hero */}
            <div>
              <h2 className="text-2xl font-black uppercase tracking-widest mb-6 px-2">Acompanhe Seu Último Pedido</h2>
              <Card className="border-border/50 shadow-2xl rounded-3xl overflow-hidden bg-background">
                <div className="flex flex-col lg:flex-row">
                  {/* Order Image/Graphic */}
                  <div className="bg-muted w-full lg:w-1/3 min-h-[300px] relative flex flex-col p-8 justify-between border-b lg:border-b-0 lg:border-r border-border">
                    <div className="flex justify-between items-start">
                      <span className="bg-zinc-950 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        Em Trânsito
                      </span>
                      <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                        #ORD-4492
                      </span>
                    </div>
                    <div className="py-8 flex justify-center items-center">
                       <div className="w-40 h-40 bg-background rounded-full shadow-2xl flex items-center justify-center relative -m-4 ring-8 ring-background/50">
                          <Package className="h-16 w-16 text-primary" />
                       </div>
                    </div>
                    <p className="text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      Previsão: 10 de Abril
                    </p>
                  </div>
                  
                  {/* Order Details */}
                  <div className="p-8 lg:p-12 flex-1 flex flex-col justify-center">
                    <h3 className="text-3xl font-black tracking-tighter uppercase mb-4">Tênis Urban Style Blue</h3>
                    
                    <div className="space-y-6 mt-4">
                      {/* Tracking Line */}
                      <div className="relative">
                        <div className="absolute left-3 top-0 h-full w-0.5 bg-muted"></div>
                        <div className="space-y-6 relative">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 h-6 w-6 rounded-full bg-success shadow-[0_0_15px_rgba(52,211,153,0.5)] z-10 border-4 border-background"></div>
                            <div>
                              <p className="font-bold text-foreground">Pedido Confirmado</p>
                              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">01 abr 2026, 14:32</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="mt-1 h-6 w-6 rounded-full bg-primary shadow-[0_0_15px_rgba(245,158,11,0.5)] z-10 border-4 border-background animate-pulse"></div>
                            <div>
                              <p className="font-bold text-foreground">Em trânsito para sua cidade</p>
                              <p className="text-xs mb-2 text-muted-foreground font-medium uppercase tracking-wider">03 abr 2026, 09:15</p>
                              <div className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 w-fit px-3 py-1.5 rounded-full">
                                <MapPin className="h-3 w-3" /> Centro de Distribuição - SP
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="mt-1 h-6 w-6 rounded-full bg-muted z-10 border-4 border-background"></div>
                            <div>
                              <p className="font-bold text-muted-foreground">Saiu para entrega</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full sm:w-auto mt-10 shadow-xl rounded-xl h-14 uppercase font-black tracking-widest active:scale-95 transition-all text-sm">
                      Detalhes do Pedido
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
