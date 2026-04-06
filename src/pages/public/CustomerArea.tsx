import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Package, User, Settings, CreditCard, ShoppingBag, MapPin, Heart, ChevronRight, Clock, CheckCircle2, Trash2, Plus, Bell, Lock } from "lucide-react"
import { useState } from "react"

type Section = 'overview' | 'orders' | 'cards' | 'settings'

export default function CustomerArea() {
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
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-none shadow-xl bg-background rounded-3xl overflow-hidden hover:-translate-y-2 transition-transform duration-500">
                <CardContent className="p-8 flex flex-col justify-between h-full relative">
                  <div className="absolute -right-4 -top-4 opacity-5">
                    <ShoppingBag className="h-48 w-48" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-secondary mb-4">Pontos Siga</p>
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
                  <p className="text-xs font-black uppercase tracking-widest text-secondary mb-4">Pedidos Ativos</p>
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
                  <p className="text-xs font-black uppercase tracking-widest text-primary mb-4 z-10">Wishlist</p>
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
              <h2 className="text-2xl font-black uppercase tracking-widest mb-6 px-2 text-primary">Acompanhe Seu Último Pedido</h2>
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
                              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Previsto</p>
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

      case 'orders':
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 text-primary">Meus Pedidos</h2>
              <p className="text-secondary text-sm font-medium uppercase tracking-widest">Acompanhe todos os seus pedidos</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Card className="border-none shadow-xl bg-background rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Tênis Urban Style Blue</h3>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">#ORD-4492</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-xs font-bold text-success uppercase tracking-widest">Entregue</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Entregue em 15 de abril de 2026</p>
                  <div className="text-2xl font-bold text-foreground">R$ 189,90</div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-background rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Moletom Premium Preto</h3>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">#ORD-4491</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">Em Trânsito</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Previsão: 18 de abril de 2026</p>
                  <div className="text-2xl font-bold text-foreground">R$ 249,90</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'cards':
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 text-primary">Pagamentos</h2>
                <p className="text-secondary text-sm font-medium uppercase tracking-widest">Gerencie seus cartões de crédito</p>
              </div>
              <Button className="flex items-center gap-2 bg-primary hover:bg-orange-600 h-12 px-6 font-bold uppercase tracking-widest rounded-lg">
                <Plus className="h-4 w-4" /> Adicionar Cartão
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-primary shadow-lg bg-gradient-to-br from-primary to-orange-600 rounded-2xl overflow-hidden">
                <CardContent className="p-8 text-white">
                  <div className="flex justify-between items-start mb-12">
                    <CreditCard className="h-8 w-8 opacity-80" />
                    <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">Padrão</span>
                  </div>
                  <div className="mb-8">
                    <p className="text-sm font-medium opacity-80 mb-2">Número do Cartão</p>
                    <p className="text-2xl font-black tracking-wider">•••• •••• •••• 4829</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium opacity-80 mb-1">Nome</p>
                      <p className="font-bold">João Oliveira</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium opacity-80 mb-1">Validade</p>
                      <p className="font-bold">12/26</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-muted shadow-lg bg-background rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-12">
                    <CreditCard className="h-8 w-8 text-primary" />
                  </div>
                  <div className="mb-8">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Número do Cartão</p>
                    <p className="text-2xl font-black tracking-wider text-foreground">•••• •••• •••• 1234</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Nome</p>
                      <p className="font-bold text-foreground">João Oliveira</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Validade</p>
                      <p className="font-bold text-foreground">08/25</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-destructive hover:text-red-600 font-bold text-sm uppercase tracking-widest">
                    <Trash2 className="h-4 w-4" /> Remover
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'settings':
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 text-primary">Configurações</h2>
              <p className="text-secondary text-sm font-medium uppercase tracking-widest">Gerencie suas preferências e segurança</p>
            </div>

            {/* Informações Pessoais */}
            <Card className="border-none shadow-xl bg-background rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                  <User className="h-6 w-6 text-primary" />
                  Informações Pessoais
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold">Nome Completo</Label>
                      <Input id="name" value="João Oliveira" className="h-12 border-muted-foreground/30 focus:border-primary" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold">E-mail</Label>
                      <Input id="email" type="email" value="joao@exemplo.com" className="h-12 border-muted-foreground/30 focus:border-primary" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold">Telefone</Label>
                      <Input id="phone" value="(11) 98765-4321" className="h-12 border-muted-foreground/30 focus:border-primary" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birth" className="text-sm font-semibold">Data de Nascimento</Label>
                      <Input id="birth" type="date" value="1995-05-15" className="h-12 border-muted-foreground/30 focus:border-primary" />
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-orange-600 font-bold uppercase tracking-widest">Salvar Alterações</Button>
                </div>
              </CardContent>
            </Card>

            {/* Segurança */}
            <Card className="border-none shadow-xl bg-background rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                  <Lock className="h-6 w-6 text-primary" />
                  Segurança
                </h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full h-12 font-bold uppercase tracking-widest border-2 border-muted-foreground/30">
                    Alterar Senha
                  </Button>
                  <Button variant="outline" className="w-full h-12 font-bold uppercase tracking-widest border-2 border-muted-foreground/30">
                    Autenticação em Duas Etapas
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notificações */}
            <Card className="border-none shadow-xl bg-background rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                  <Bell className="h-6 w-6 text-primary" />
                  Preferências de Notificações
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <span className="font-semibold text-foreground">Notificações por E-mail</span>
                    <input type="checkbox" defaultChecked className="h-5 w-5 cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <span className="font-semibold text-foreground">Notificações de Pedidos</span>
                    <input type="checkbox" defaultChecked className="h-5 w-5 cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <span className="font-semibold text-foreground">Ofertas Exclusivas</span>
                    <input type="checkbox" className="h-5 w-5 cursor-pointer" />
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
    <div className="min-h-screen bg-muted/20">
      {/* Hero Section - Full Width */}
      <div className="bg-zinc-950 text-white pt-16 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-50 blur-3xl"></div>
        <div className="w-full max-w-7xl mx-auto px-8 lg:px-12 relative z-10 flex flex-col md:flex-row items-center gap-8">
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

      {/* Main Content with Overlapping Cards */}
      <div className="max-w-7xl mx-auto px-8 lg:px-12 -mt-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* THE SIDEBAR */}
          <aside className="w-full lg:w-[280px] flex-shrink-0">
            <nav className="flex flex-col space-y-3 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl z-30">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 px-2">Sua Conta</h3>
              
              {sections.map((section) => {
                const Icon = section.icon
                const isActive = activeSection === section.id
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center justify-between w-full p-4 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all group ${
                      isActive 
                        ? 'bg-zinc-950 text-white shadow-lg' 
                        : 'hover:bg-muted text-foreground font-semibold'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'opacity-50 group-hover:opacity-100'}`} /> 
                      <span className="uppercase tracking-widest text-sm">{section.label}</span>
                    </div>
                    <ChevronRight className={`h-4 w-4 ${
                      isActive 
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
