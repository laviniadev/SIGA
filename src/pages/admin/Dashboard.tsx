import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-primary uppercase">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Receita Total", value: "R$ 45.231,89", icon: DollarSign, color: "border-l-primary", detail: "+20.1% em relação ao mês anterior" },
          { title: "Novos Clientes", value: "+2350", icon: Users, color: "border-l-secondary", detail: "+180 novos nesta semana" },
          { title: "Vendas", value: "+12,234", icon: ShoppingCart, color: "border-l-success", detail: "+19% em relação ao mês anterior" },
          { title: "Produtos Ativos", value: "573", icon: Package, color: "border-l-destructive", detail: "12 produtos sem estoque" }
        ].map((stat, i) => (
          <Card key={i} className={cn("border-l-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default", stat.color)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground opacity-50" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-foreground tabular-nums">{stat.value}</div>
              <p className="text-[10px] font-bold uppercase text-secondary mt-1 tracking-tighter">{stat.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Visão Geral</CardTitle>
            <CardDescription className="text-xs">Resumo de vendas do ano atual.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg m-6 border border-dashed group">
            <p className="text-muted-foreground text-sm group-hover:scale-110 transition-transform cursor-default">Gráfico Placeholder (Chart)</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Vendas Recentes</CardTitle>
            <CardDescription className="text-xs">Você fez 265 vendas este mês.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {[ 
              { name: "João Oliveira", email: "joao.oliveira@email.com", amount: "+ R$ 1.999,00" },
              { name: "Maria Silva", email: "maria.silva@email.com", amount: "+ R$ 299,00" },
              { name: "Carlos Souza", email: "carlos.s@email.com", amount: "+ R$ 850,00" }
            ].map((sale, i) => (
              <div key={i} className="flex items-center p-3 rounded-lg hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all cursor-pointer group active:scale-[0.98]">
                 <div className="flex-1 space-y-1">
                   <p className="text-sm font-bold leading-none group-hover:text-primary transition-colors">{sale.name}</p>
                   <p className="text-xs text-muted-foreground">{sale.email}</p>
                 </div>
                 <div className="font-black text-sm text-success tabular-nums">{sale.amount}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
