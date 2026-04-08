import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, FileText, CheckCircle, Clock } from "lucide-react"

export default function AdminOrders() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-success uppercase">Pedidos</h2>
      </div>

      <Card className="shadow-lg border-muted/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Fluxo de Vendas</CardTitle>
          <CardDescription className="text-xs">
            Gerencie o processamento e envio de todos os pedidos realizados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative w-full md:w-1/3 group">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="search"
                placeholder="Buscar por ID, Cliente ou Status..."
                className="pl-8 h-10 border-muted-foreground/20 focus:border-primary transition-all duration-300"
              />
            </div>
          </div>
          
          <div className="rounded-md border border-muted/50 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/10">
                <TableRow>
                  <TableHead className="w-[120px] font-bold text-[10px] uppercase">Pedido</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Cliente</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Data</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Total</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Status</TableHead>
                  <TableHead className="text-right font-bold text-[10px] uppercase">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: "#ORD-001", client: "João Oliveira", date: "01/04/2026", total: "R$ 1.999,00", st: "done" },
                  { id: "#ORD-002", client: "Maria Silva", date: "01/04/2026", total: "R$ 299,00", st: "pending" }
                ].map((o, i) => (
                  <TableRow key={i} className="hover:bg-primary/5 transition-all duration-200 cursor-default group active:scale-[0.995]">
                    <TableCell className="font-bold text-xs text-muted-foreground">{o.id}</TableCell>
                    <TableCell className="font-semibold text-sm group-hover:text-primary transition-colors">{o.client}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{o.date}</TableCell>
                    <TableCell className="font-bold tabular-nums italic text-sm">{o.total}</TableCell>
                    <TableCell>
                      {o.st === "done" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-green-700 border border-success/20">
                          <CheckCircle className="h-3 w-3" /> CONCLUÍDO
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-700 border border-orange-200 animate-pulse">
                          <Clock className="h-3 w-3" /> PENDENTE
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-orange-700 hover:bg-primary/10 transition-all">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
