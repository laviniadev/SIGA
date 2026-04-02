import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, User, Settings, CreditCard, ShoppingBag } from "lucide-react"
import { Link } from "react-router-dom"

export default function CustomerArea() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-8 uppercase tracking-widest">Minha Conta</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="space-y-4">
          <nav className="flex flex-col space-y-2 bg-card border rounded-xl p-4 shadow-sm sticky top-24">
            <Link to="/customer" className="flex items-center gap-3 bg-primary text-primary-foreground p-3 rounded-lg font-bold shadow-md active:scale-95 transition-all">
              <User className="h-5 w-5" /> Perfil & Início
            </Link>
            <Link to="/customer/orders" className="flex items-center gap-3 hover:bg-muted/50 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:translate-x-1 active:scale-95 transition-all font-medium">
              <Package className="h-5 w-5" /> Histórico de Pedidos
            </Link>
            <Link to="/customer/cards" className="flex items-center gap-3 hover:bg-muted/50 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:translate-x-1 active:scale-95 transition-all font-medium">
              <CreditCard className="h-5 w-5" /> Carteira de Cartões
            </Link>
            <Link to="/customer/settings" className="flex items-center gap-3 hover:bg-muted/50 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:translate-x-1 active:scale-95 transition-all font-medium">
              <Settings className="h-5 w-5" /> Configurações
            </Link>
          </nav>
        </aside>

        <div className="md:col-span-3 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-2 shadow-sm hover:shadow-md transition-all duration-300 border-muted/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Olá, João Oliveira!</CardTitle>
                <CardDescription className="text-xs">Estes são os detalhes da sua conta SIGA.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-6">
                  <div className="h-20 w-20 rounded-full bg-secondary text-primary-foreground flex items-center justify-center font-black text-2xl shadow-xl ring-4 ring-secondary/20">
                    JO
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground uppercase tracking-tight">João Oliveira</h3>
                    <p className="text-sm text-muted-foreground italic">Membro desde Abril 2026</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground border-none shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShoppingBag className="h-24 w-24" />
              </div>
              <CardHeader className="pb-2">
                 <CardTitle className="text-white text-xs font-black uppercase tracking-widest flex items-center">
                    Meus Pontos
                 </CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="text-5xl font-black tracking-tighter tabular-nums">1.250</div>
                 <p className="text-[10px] uppercase font-bold opacity-80 mt-2 tracking-widest">
                   Válidos até Dez 2026
                 </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg border-muted/20 overflow-hidden">
            <CardHeader className="flex flex-row flex-wrap items-center justify-between border-b pb-4 mb-0 bg-muted/5">
               <div>
                  <CardTitle className="text-lg font-bold">Último Pedido Realizado</CardTitle>
                  <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-secondary">Referência: #ORD-4492</CardDescription>
               </div>
               <Button variant="outline" asChild className="mt-2 text-[10px] font-black uppercase tracking-widest border-2 hover:bg-primary hover:text-white transition-all active:scale-95 md:mt-0">
                  <Link to="/customer/orders text-xs">Exibir Tudo</Link>
               </Button>
            </CardHeader>
            <CardContent className="pt-6">
               <div className="flex flex-col md:flex-row items-center gap-8">
                 <div className="w-full md:w-32 h-32 bg-muted rounded-xl flex items-center justify-center border-2 border-dashed group hover:border-primary transition-all">
                    <Package className="h-8 w-8 text-muted-foreground group-hover:scale-125 transition-transform" />
                 </div>
                 <div className="flex-1 space-y-3 text-center md:text-left">
                   <h4 className="font-bold text-2xl tracking-tighter hover:text-primary transition-colors cursor-default">Tênis Urban Style Blue</h4>
                   <div className="flex flex-wrap justify-center md:justify-start gap-2">
                     <span className="text-[10px] font-black text-white bg-success px-4 py-1 rounded-full uppercase tracking-widest shadow-sm">
                       Entregue
                     </span>
                     <span className="text-[10px] font-bold text-muted-foreground bg-muted px-4 py-1 rounded-full uppercase tracking-widest">
                       01/04/2026
                     </span>
                   </div>
                   <p className="text-sm font-bold text-foreground italic">Total da compra: R$ 299,90</p>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
