import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">R$ 45.231,89</div>
            <p className="text-xs text-secondary mt-1">+20.1% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">+2350</div>
            <p className="text-xs text-secondary mt-1">+180 novos nesta semana</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">+12,234</div>
            <p className="text-xs text-secondary mt-1">+19% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-destructive">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">573</div>
            <p className="text-xs text-destructive mt-1">12 produtos sem estoque</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
            <CardDescription>Resumo de vendas do ano atual.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg m-6 border border-dashed">
            <p className="text-muted-foreground text-sm">Gráfico Placeholder (Chart)</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Vendas Recentes</CardTitle>
            <CardDescription>Você fez 265 vendas este mês.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center p-3 rounded-lg hover:bg-muted/50 border bg-card">
               <div className="flex-1 space-y-1">
                 <p className="text-sm font-medium leading-none">João Oliveira</p>
                 <p className="text-sm text-muted-foreground">joao.oliveira@email.com</p>
               </div>
               <div className="font-medium text-success">+ R$ 1.999,00</div>
            </div>
            <div className="flex items-center p-3 rounded-lg hover:bg-muted/50 border bg-card">
               <div className="flex-1 space-y-1">
                 <p className="text-sm font-medium leading-none">Maria Silva</p>
                 <p className="text-sm text-muted-foreground">maria.silva@email.com</p>
               </div>
               <div className="font-medium text-success">+ R$ 299,00</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
