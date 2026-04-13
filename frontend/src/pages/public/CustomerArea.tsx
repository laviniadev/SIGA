import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Package, User, Settings, CreditCard, ShoppingBag, MapPin, Heart, ChevronRight, Clock, CheckCircle2, Trash2, Plus, Bell, Lock, LogOut } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

type Section = 'overview' | 'orders' | 'cards' | 'settings'

export default function CustomerArea() {
  const handleLogout = () => {
    // Simulação de logout
    window.location.href = '/'
  }

  const [activeSection, setActiveSection] = useState<Section>('overview')

  const sections = [
    { id: 'overview' as Section, label: 'Visão Geral', icon: User },
    { id: 'orders' as Section, label: 'Meus Pedidos', icon: Package },
    { id: 'cards' as Section, label: 'Pagamentos', icon: CreditCard },
    { id: 'settings' as Section, label: 'Configurar', icon: Settings },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-6 mb-8 md:mb-12">
              <Card className="border-none shadow-xl bg-background rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-500 aspect-square md:aspect-auto flex flex-col items-center justify-center md:items-start md:justify-between h-full relative">
                <CardContent className="p-1 md:p-6 flex flex-col items-center md:items-start justify-center text-center md:text-left h-full w-full">
                  <div className="hidden md:block absolute -right-4 -top-4 opacity-5">
                    <ShoppingBag className="h-48 w-48" />
                  </div>
                  <div className="h-7 w-7 md:hidden rounded-full bg-primary/10 flex items-center justify-center mb-1 text-primary">
                    <ShoppingBag className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 leading-none mb-1 md:mb-4">Pontos Siga</p>
                  <div>
                    <h4 className="text-sm md:text-3xl font-black tabular-nums tracking-tighter">1.250</h4>
                    <p className="hidden md:block text-[10px] font-bold text-success mt-1">Válidos até dez/2026</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-background rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-500 aspect-square md:aspect-auto flex flex-col items-center justify-center md:items-start md:justify-between h-full relative">
                <CardContent className="p-1 md:p-6 flex flex-col items-center md:items-start justify-center text-center md:text-left h-full w-full">
                  <div className="hidden md:block absolute -right-4 -top-4 opacity-5">
                    <Package className="h-48 w-48" />
                  </div>
                  <div className="h-7 w-7 md:hidden rounded-full bg-primary/10 flex items-center justify-center mb-1 text-primary">
                    <Package className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 leading-none mb-1 md:mb-4">Pedidos Ativos</p>
                  <div>
                    <h4 className="text-sm md:text-3xl font-black tabular-nums tracking-tighter">2</h4>
                    <p className="hidden md:block text-[10px] font-bold text-primary mt-1">1 em rota de entrega</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-zinc-950 text-white rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-500 aspect-square md:aspect-auto flex flex-col items-center justify-center md:items-start md:justify-between h-full relative group cursor-pointer">
                <CardContent className="p-1 md:p-6 flex flex-col items-center md:items-start justify-center text-center md:text-left h-full w-full">
                  <div className="hidden md:block absolute -right-4 -top-4 opacity-5 group-hover:opacity-70 group-hover:text-red-500 group-hover:scale-110 transition-all duration-700">
                    <Heart className="h-32 w-32 md:h-48 md:w-48" />
                  </div>
                  <div className="h-7 w-7 md:hidden rounded-full bg-primary/20 flex items-center justify-center mb-1 text-primary">
                    <Heart className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-500 md:text-zinc-500/60 leading-none mb-1 md:mb-4 z-10">Wishlist</p>
                  <div className="z-10">
                    <h4 className="text-sm md:text-3xl font-black tabular-nums tracking-tighter text-white">14</h4>
                    <p className="hidden md:flex text-[10px] font-bold text-zinc-400 mt-1 items-center gap-2 group-hover:text-white transition-colors">
                      Ver favoritos <ChevronRight className="h-3 w-3" />
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Latest Orders Section */}
            <div className="mt-4">
              <h2 className="text-base md:text-xl font-black tracking-tighter uppercase mb-4 px-2">Pedidos Recentes</h2>
              <div className="space-y-6">
                {/* Order 1 - Em Trânsito */}
                <Card className="border-border/50 shadow-2xl rounded-2xl overflow-hidden bg-background">
                  <div className="flex flex-col lg:flex-row">
                    {/* Standard Icon Area for Desktop */}
                    <div className="bg-muted w-full lg:w-1/3 min-h-[140px] md:min-h-[180px] relative flex flex-col p-4 md:p-6 justify-between border-b lg:border-b-0 lg:border-r border-border">
                      <div className="flex justify-between items-start">
                        <span className="bg-zinc-950 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          Em Trânsito
                        </span>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          #ORD-4492
                        </span>
                      </div>
                      <div className="py-4 flex justify-center items-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-background rounded-full shadow-2xl flex items-center justify-center relative ring-6 ring-background/50">
                          <Package className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                        </div>
                      </div>
                      <p className="text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        Previsão: 10 Abr
                      </p>
                    </div>

                    {/* Order Details */}
                    <div className="p-4 md:p-6 flex-1 flex flex-col justify-center">
                      <h3 className="text-base md:text-xl font-black tracking-tighter uppercase mb-4">Tênis Urban Style Blue</h3>

                      <div className="space-y-4">
                        {/* Tracking Line */}
                        <div className="relative">
                          <div className="absolute left-3 top-0 h-full w-0.5 bg-muted"></div>
                          <div className="space-y-4 relative">
                            <div className="flex items-start gap-4">
                              <div className="mt-1 h-5 w-5 rounded-full bg-success shadow-[0_0_15px_rgba(34,197,94,0.4)] z-10 border-3 border-background"></div>
                              <div className="flex-1">
                                <p className="font-semibold text-foreground text-sm uppercase">Em trânsito para sua cidade</p>
                                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">03 abr 2026, 09:15</p>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-primary mt-1">
                                  <MapPin className="h-3 w-3" /> Centro de Distribuição - SP
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start gap-4">
                              <div className="mt-1 h-5 w-5 rounded-full bg-muted z-10 border-3 border-background"></div>
                              <div>
                                <p className="font-semibold text-muted-foreground text-sm uppercase">Saiu para entrega</p>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Previsto</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Order 2 - Confirmado */}
                <Card className="border-border/50 shadow-2xl rounded-2xl overflow-hidden bg-background">
                  <div className="flex flex-col lg:flex-row">
                    {/* Order Image/Graphic */}
                    <div className="bg-muted w-full lg:w-1/3 min-h-[140px] md:min-h-[180px] relative flex flex-col p-4 md:p-6 justify-between border-b lg:border-b-0 lg:border-r border-border">
                      <div className="flex justify-between items-start">
                        <span className="bg-success text-white px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest">
                          Confirmado
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          #ORD-4491
                        </span>
                      </div>
                      <div className="py-2 flex justify-center items-center">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-background rounded-full shadow-lg flex items-center justify-center relative ring-4 ring-background/50">
                          <Package className="h-6 w-6 md:h-10 md:w-10 text-success" />
                        </div>
                      </div>
                      <p className="text-center text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                        Processando
                      </p>
                    </div>

                    {/* Order Details */}
                    <div className="p-4 md:p-6 flex-1 flex flex-col justify-center">
                      <h3 className="text-base md:text-lg font-black tracking-tighter uppercase mb-2">Moletom Premium Preto</h3>

                      <div className="space-y-4 mt-2">
                        {/* Tracking Line */}
                        <div className="relative">
                          <div className="absolute left-3 top-0 h-full w-0.5 bg-muted"></div>
                          <div className="space-y-4 relative">
                            <div className="flex items-start gap-4">
                              <div className="mt-1 h-5 w-5 rounded-full bg-success shadow-[0_0_15px_rgba(52,211,153,0.5)] z-10 border-3 border-background animate-pulse"></div>
                              <div>
                                <p className="font-semibold text-foreground text-sm">Pedido Confirmado</p>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">05 abr 2026, 16:45</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-4">
                              <div className="mt-1 h-5 w-5 rounded-full bg-muted z-10 border-3 border-background"></div>
                              <div>
                                <p className="font-semibold text-muted-foreground text-sm">Preparando para envio</p>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Em breve</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Order 3 - Entregue */}
                <Card className="border-border/50 shadow-2xl rounded-2xl overflow-hidden bg-background">
                  <div className="flex flex-col lg:flex-row">
                    {/* Standard Icon Area for Desktop */}
                    <div className="bg-muted w-full lg:w-1/3 min-h-[140px] md:min-h-[180px] relative flex flex-col p-4 md:p-6 justify-between border-b lg:border-b-0 lg:border-r border-border">
                      <div className="flex justify-between items-start">
                        <span className="bg-success text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          Entregue
                        </span>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          #ORD-4490
                        </span>
                      </div>
                      <div className="py-4 flex justify-center items-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-background rounded-full shadow-2xl flex items-center justify-center relative ring-6 ring-background/50">
                          <CheckCircle2 className="h-8 w-8 md:h-10 md:w-10 text-success" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest mb-1">Entrega</p>
                        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">02 abr 2026</p>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="p-4 md:p-6 flex-1 flex flex-col justify-center">
                      <h3 className="text-base md:text-xl font-black tracking-tighter uppercase mb-4">Camiseta Básica Branca</h3>

                      <div className="space-y-4">
                        <div className="relative">
                          <div className="absolute left-3 top-0 h-full w-0.5 bg-muted"></div>
                          <div className="space-y-6 relative">
                            <div className="flex items-start gap-4">
                              <div className="mt-1 h-5 w-5 rounded-full bg-success/20 z-10 border-3 border-background"></div>
                              <div className="flex-1">
                                <p className="font-semibold text-muted-foreground text-sm uppercase">Confirmado</p>
                                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">30 mar 2026, 11:20</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-4">
                              <div className="mt-1 h-5 w-5 rounded-full bg-success z-10 border-3 border-background shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                              <div>
                                <p className="font-semibold text-foreground text-sm uppercase">Entregue</p>
                                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">02 abr 2026, 14:15</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )

      case 'orders':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <h2 className="text-xl md:text-3xl font-black tracking-tighter uppercase mb-2">Meus Pedidos</h2>
              <p className="text-secondary text-[10px] md:text-sm font-bold uppercase tracking-widest">Acompanhe todos os seus pedidos</p>
            </div>

            <div className="space-y-6">
              {/* Reuse the standardized cards here */}
              {/* Order 1 - Em Trânsito */}
              <Card className="border-border/50 shadow-2xl rounded-2xl overflow-hidden bg-background">
                  <div className="flex flex-col lg:flex-row">
                    <div className="bg-muted w-full lg:w-1/3 min-h-[140px] md:min-h-[180px] relative flex flex-col p-4 md:p-6 justify-between border-b lg:border-b-0 lg:border-r border-border">
                      <div className="flex justify-between items-start">
                        <span className="bg-zinc-950 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          Em Trânsito
                        </span>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          #ORD-4492
                        </span>
                      </div>
                      <div className="py-4 flex justify-center items-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-background rounded-full shadow-2xl flex items-center justify-center relative ring-6 ring-background/50">
                          <Package className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                        </div>
                      </div>
                      <p className="text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        Previsão: 10 Abr
                      </p>
                    </div>

                    <div className="p-4 md:p-6 flex-1 flex flex-col justify-center">
                      <h3 className="text-base md:text-xl font-black tracking-tighter uppercase mb-4">Tênis Urban Style Blue</h3>
                      <div className="space-y-4">
                        <div className="relative">
                          <div className="absolute left-3 top-0 h-full w-0.5 bg-muted"></div>
                          <div className="space-y-4 relative">
                            <div className="flex items-start gap-4">
                              <div className="mt-1 h-5 w-5 rounded-full bg-success shadow-[0_0_15px_rgba(34,197,94,0.4)] z-10 border-3 border-background"></div>
                              <div className="flex-1">
                                <p className="font-semibold text-foreground text-sm uppercase">Em trânsito para sua cidade</p>
                                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">03 abr 2026, 09:15</p>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-primary mt-1">
                                  <MapPin className="h-3 w-3" /> Centro de Distribuição - SP
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start gap-4">
                              <div className="mt-1 h-5 w-5 rounded-full bg-muted z-10 border-3 border-background"></div>
                              <div>
                                <p className="font-semibold text-muted-foreground text-sm uppercase">Saiu para entrega</p>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Previsto</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Order 2 - Confirmado */}
                <Card className="border-border/50 shadow-2xl rounded-2xl overflow-hidden bg-background">
                  <div className="flex flex-col lg:flex-row">
                    <div className="bg-muted w-full lg:w-1/3 min-h-[140px] md:min-h-[180px] relative flex flex-col p-4 md:p-6 justify-between border-b lg:border-b-0 lg:border-r border-border">
                      <div className="flex justify-between items-start">
                        <span className="bg-success text-white px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest">
                          Confirmado
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          #ORD-4491
                        </span>
                      </div>
                      <div className="py-2 flex justify-center items-center">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-background rounded-full shadow-lg flex items-center justify-center relative ring-4 ring-background/50">
                          <Package className="h-6 w-6 md:h-10 md:w-10 text-success" />
                        </div>
                      </div>
                      <p className="text-center text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                        Processando
                      </p>
                    </div>

                    <div className="p-4 md:p-6 flex-1 flex flex-col justify-center">
                      <h3 className="text-base md:text-lg font-black tracking-tighter uppercase mb-2">Moletom Premium Preto</h3>
                      <div className="space-y-4 mt-2">
                        <div className="relative">
                          <div className="absolute left-3 top-0 h-full w-0.5 bg-muted"></div>
                          <div className="space-y-4 relative">
                            <div className="flex items-start gap-4">
                              <div className="mt-1 h-5 w-5 rounded-full bg-success shadow-[0_0_15px_rgba(52,211,153,0.5)] z-10 border-3 border-background animate-pulse"></div>
                              <div>
                                <p className="font-semibold text-foreground text-sm">Pedido Confirmado</p>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">05 abr 2026, 16:45</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-4">
                              <div className="mt-1 h-5 w-5 rounded-full bg-muted z-10 border-3 border-background"></div>
                              <div>
                                <p className="font-semibold text-muted-foreground text-sm">Preparando para envio</p>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Em breve</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Order 3 - Entregue */}
                <Card className="border-border/50 shadow-2xl rounded-2xl overflow-hidden bg-background">
                  <div className="flex flex-col lg:flex-row">
                    <div className="bg-muted w-full lg:w-1/3 min-h-[140px] md:min-h-[180px] relative flex flex-col p-4 md:p-6 justify-between border-b lg:border-b-0 lg:border-r border-border">
                      <div className="flex justify-between items-start">
                        <span className="bg-success text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          Entregue
                        </span>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          #ORD-4490
                        </span>
                      </div>
                      <div className="py-4 flex justify-center items-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-background rounded-full shadow-2xl flex items-center justify-center relative ring-6 ring-background/50">
                          <CheckCircle2 className="h-8 w-8 md:h-10 md:w-10 text-success" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest mb-1">Entrega</p>
                        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">02 abr 2026</p>
                      </div>
                    </div>

                    <div className="p-4 md:p-6 flex-1 flex flex-col justify-center">
                      <h3 className="text-base md:text-xl font-black tracking-tighter uppercase mb-4">Camiseta Básica Branca</h3>
                      <div className="space-y-4">
                        <div className="relative">
                          <div className="absolute left-3 top-0 h-full w-0.5 bg-muted"></div>
                          <div className="space-y-6 relative">
                            <div className="flex items-start gap-4">
                              <div className="mt-1 h-5 w-5 rounded-full bg-success/20 z-10 border-3 border-background"></div>
                              <div className="flex-1">
                                <p className="font-semibold text-muted-foreground text-sm uppercase">Confirmado</p>
                                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">30 mar 2026, 11:20</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-4">
                              <div className="mt-1 h-5 w-5 rounded-full bg-success z-10 border-3 border-background shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                              <div>
                                <p className="font-semibold text-foreground text-sm uppercase">Entregue</p>
                                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">02 abr 2026, 14:15</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
            </div>
          </div>
        )

      case 'cards':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tighter uppercase mb-2">Formas de Pagamento</h2>
                <p className="text-secondary text-sm font-medium uppercase tracking-widest">Gerencie seus cartões de crédito</p>
              </div>
              <Button className="flex items-center gap-2 bg-primary hover:bg-orange-600 h-10 px-4 text-xs font-semibold uppercase tracking-widest rounded-lg">
                <Plus className="h-3.5 w-3.5" /> Adicionar Cartão
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-primary shadow-lg bg-gradient-to-br from-primary to-orange-600 rounded-xl overflow-hidden">
                <CardContent className="p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <CreditCard className="h-6 w-6 opacity-80" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">Padrão</span>
                  </div>
                  <div className="mb-6">
                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-80 mb-1">Número do Cartão</p>
                    <p className="text-lg font-bold tracking-wider">•••• •••• •••• 4829</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest opacity-80 mb-1">Nome</p>
                      <p className="text-[13px] font-semibold uppercase tracking-tight">João Oliveira</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest opacity-80 mb-1">Validade</p>
                      <p className="text-[13px] font-semibold uppercase tracking-tight">12/26</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-muted shadow-lg bg-background rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div className="mb-6">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">Número do Cartão</p>
                    <p className="text-lg font-bold tracking-wider text-foreground">•••• •••• •••• 1234</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Nome</p>
                      <p className="text-[13px] font-semibold uppercase tracking-tight text-foreground">João Oliveira</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Validade</p>
                      <p className="text-[13px] font-semibold uppercase tracking-tight text-foreground">08/25</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-destructive hover:text-red-600 font-semibold text-sm uppercase tracking-widest">
                    <Trash2 className="h-4 w-4" /> Remover
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'settings':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <h2 className="text-lg md:text-2xl font-black tracking-tighter uppercase mb-1">Configurações</h2>
              <p className="text-secondary text-[10px] md:text-sm font-bold uppercase tracking-widest">Gerencie suas preferências e segurança</p>
            </div>

            {/* Informações Pessoais */}
            <Card className="border-none shadow-xl bg-background rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-foreground">
                  <User className="h-5 w-5 text-muted-foreground" />
                  Informações Pessoais
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[9px] md:text-[10px] font-bold md:font-semibold uppercase tracking-widest text-muted-foreground">Nome Completo</Label>
                      <Input id="name" defaultValue="João Oliveira" className="h-9 md:h-12 border-muted-foreground/20 focus:border-primary text-xs md:text-sm" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[9px] md:text-[10px] font-bold md:font-semibold uppercase tracking-widest text-muted-foreground">E-mail</Label>
                      <Input id="email" type="email" defaultValue="joao@exemplo.com" className="h-9 md:h-12 border-muted-foreground/20 focus:border-primary text-xs md:text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[9px] md:text-[10px] font-bold md:font-semibold uppercase tracking-widest text-muted-foreground">Telefone</Label>
                      <Input id="phone" defaultValue="(11) 98765-4321" className="h-9 md:h-12 border-muted-foreground/20 focus:border-primary text-xs md:text-sm" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birth" className="text-[9px] md:text-[10px] font-bold md:font-semibold uppercase tracking-widest text-muted-foreground">Data de Nascimento</Label>
                      <Input id="birth" type="date" defaultValue="1995-05-15" className="h-9 md:h-12 border-muted-foreground/20 focus:border-primary text-xs md:text-sm" />
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-orange-600 h-9 md:h-10 px-6 text-[10px] font-bold uppercase tracking-widest rounded-lg">Salvar Alterações</Button>
                </div>
              </CardContent>
            </Card>

            {/* Segurança */}
            <Card className="border-none shadow-xl bg-background rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-foreground">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  Segurança
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" className="w-full h-9 md:h-12 text-[9px] md:text-[10px] font-bold uppercase tracking-widest border-2 border-muted-foreground/20 hover:bg-primary hover:text-white hover:border-primary transition-all">
                      Alterar Senha
                    </Button>
                    <Button variant="outline" className="w-full h-9 md:h-12 text-[9px] md:text-[10px] font-bold uppercase tracking-widest border-2 border-muted-foreground/20 hover:bg-primary hover:text-white hover:border-primary transition-all">
                      Segurança 2FA
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notificações */}
            <Card className="border-none shadow-xl bg-background rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-foreground">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  Preferências de Notificações
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-xs font-semibold text-foreground uppercase tracking-tight">Notificações por E-mail</span>
                    <input type="checkbox" defaultChecked className="h-4 w-4 cursor-pointer accent-primary" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-xs font-semibold text-foreground uppercase tracking-tight">Notificações de Pedidos</span>
                    <input type="checkbox" defaultChecked className="h-4 w-4 cursor-pointer accent-primary" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-xs font-semibold text-foreground uppercase tracking-tight">Ofertas Exclusivas</span>
                    <input type="checkbox" className="h-4 w-4 cursor-pointer accent-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-20 overflow-x-hidden">
      {/* Hero Section - Super Compact on mobile */}
      <div className="bg-gradient-to-b from-orange-50/80 via-white to-white text-foreground pt-6 pb-6 md:pt-10 md:pb-20 relative overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-12 relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="h-14 w-14 md:h-20 md:w-20 rounded-full bg-gradient-to-tr from-primary to-secondary p-1 shadow-lg">
            <div className="h-full w-full rounded-full bg-background border-[3px] border-white flex items-center justify-center">
              <span className="text-lg md:text-2xl font-bold tracking-widest text-foreground">JO</span>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-3xl font-bold tracking-tighter uppercase text-foreground">João Oliveira</h1>
            <p className="text-muted-foreground font-semibold tracking-widest uppercase text-[9px] md:text-[10px] mt-1 md:mt-2 flex items-center justify-center md:justify-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse"></span>
              Siga VIP Member
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Navigation Pills - Only visible on small screens */}
      <div className="lg:hidden sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-border/50 py-2 mb-4 no-scrollbar overflow-x-auto touch-pan-x">
        <div className="flex items-center gap-3 px-4 min-w-max">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all active:scale-90",
                  isActive 
                    ? "bg-zinc-950 text-white shadow-lg" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                <Icon className={cn("h-3.5 w-3.5", isActive ? "text-primary" : "")} />
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 lg:-mt-10 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

          {/* DESKTOP SIDEBAR - Hidden on smaller screens */}
          <aside className="hidden lg:block w-[280px] flex-shrink-0">
            <nav className="flex flex-col space-y-3 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl sticky top-24">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-4 px-2">Sua Conta</h3>

              {sections.map((section) => {
                const Icon = section.icon
                const isActive = activeSection === section.id

                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center justify-between w-full p-4 rounded-xl font-semibold hover:scale-[1.02] active:scale-95 transition-all group ${isActive
                        ? 'bg-neutral-950 text-white shadow-lg'
                        : 'hover:bg-muted text-foreground font-semibold'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'opacity-50 group-hover:opacity-100'}`} />
                      <span className="uppercase tracking-widest text-[11px] md:text-xs font-semibold">{section.label}</span>
                    </div>
                    <ChevronRight className={`h-4 w-4 ${isActive
                        ? 'opacity-50 group-hover:translate-x-1 group-hover:opacity-100'
                        : 'opacity-0 group-hover:translate-x-1 group-hover:opacity-100'
                      } transition-all`} />
                  </button>
                )
              })}
              
            </nav>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="w-full flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
