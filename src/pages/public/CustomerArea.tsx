import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, User, Settings, CreditCard, ShoppingBag } from "lucide-react"
import { Link } from "react-router-dom"

export default function CustomerArea() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Minha Conta</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="space-y-4">
          <nav className="flex flex-col space-y-2 bg-card border rounded-lg p-4 shadow-sm">
            <Link to="/customer" className="flex items-center gap-3 bg-muted/50 p-3 rounded-md text-primary font-medium">
              <User className="h-5 w-5" /> Início
            </Link>
            <Link to="/customer/orders" className="flex items-center gap-3 hover:bg-muted/50 p-3 rounded-md text-muted-foreground hover:text-foreground transition-colors">
              <Package className="h-5 w-5" /> Meus Pedidos
            </Link>
            <Link to="/customer/cards" className="flex items-center gap-3 hover:bg-muted/50 p-3 rounded-md text-muted-foreground hover:text-foreground transition-colors">
              <CreditCard className="h-5 w-5" /> Cartões Salvos
            </Link>
            <Link to="/customer/settings" className="flex items-center gap-3 hover:bg-muted/50 p-3 rounded-md text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="h-5 w-5" /> Configurações
            </Link>
          </nav>
        </aside>

        <div className="md:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Bem-vindo(a), João!</CardTitle>
                <CardDescription>Visualização geral das suas compras e atividades.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-secondary text-primary-foreground flex items-center justify-center font-bold text-2xl shadow-md">
                    JO
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">João Oliveira</h3>
                    <p className="text-muted-foreground">joao.oliveira@email.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground border-none">
              <CardHeader className="pb-2">
                 <CardTitle className="text-white text-lg font-medium flex items-center">
                    <ShoppingBag className="mr-2 h-5 w-5" /> Pontos SIGA
                 </CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="text-4xl font-extrabold tracking-tight">1.250</div>
                 <p className="text-sm opacity-80 mt-1">
                   Desbloqueie benefícios e ganhe descontos nas próximas compras!
                 </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row flex-wrap items-center justify-between border-b pb-4 mb-4">
               <div>
                  <CardTitle>Último Pedido</CardTitle>
                  <CardDescription>Resumo do pedido mais recente.</CardDescription>
               </div>
               <Button variant="outline" asChild className="mt-2 text-primary border-primary md:mt-0">
                  <Link to="/customer/orders">Ver histórico completo</Link>
               </Button>
            </CardHeader>
            <CardContent>
               <div className="flex flex-col md:flex-row items-center gap-6">
                 <div className="w-full md:w-32 h-32 bg-muted rounded flex items-center justify-center border-dashed border">
                    IMG
                 </div>
                 <div className="flex-1 space-y-2 text-center md:text-left">
                   <h4 className="font-semibold text-xl">#ORD-001 - Tênis Urban Style</h4>
                   <p className="text-sm text-secondary font-bold font-mono inline-flex items-center bg-secondary/10 px-3 py-1 rounded-full">
                     Status: Entregue
                   </p>
                   <p className="text-muted-foreground">Pedido realizado em 01/04/2026. Total: R$ 299,90</p>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
