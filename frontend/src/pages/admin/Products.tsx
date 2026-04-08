import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

export default function AdminProducts() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-primary uppercase text-shadow-sm">Produtos</h2>
        <Button className="bg-primary hover:bg-orange-600 shadow-md font-bold uppercase tracking-widest active:scale-95" asChild>
          <Link to="/admin/products/new"><PlusCircle className="mr-2 h-4 w-4" /> Novo Produto</Link>
        </Button>
      </div>

      <Card className="shadow-lg border-muted/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Listagem de Catálogo</CardTitle>
          <CardDescription className="text-xs">
            Visualize e gerencie seu portfólio de produtos e estoque.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative w-full md:w-1/3 group">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="search"
                placeholder="Buscar por nome, ID ou tag..."
                className="pl-8 h-10 border-muted-foreground/20 focus:border-primary transition-all duration-300"
              />
            </div>
          </div>
          
          <div className="rounded-md border border-muted/50 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/20">
                <TableRow>
                  <TableHead className="w-[80px] font-bold text-[10px] uppercase">ID</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Nome</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Categoria</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Estoque</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Preço</TableHead>
                  <TableHead className="text-right font-bold text-[10px] uppercase">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: "#001", name: "Tênis Esportivo Nike", cat: "Calçados", q: 45, p: "R$ 499,90", st: "normal" },
                  { id: "#002", name: "Camiseta Básica", cat: "Roupas", q: 120, p: "R$ 59,90", st: "normal" },
                  { id: "#003", name: "Boné Aba Reta", cat: "Acessórios", q: 0, p: "R$ 89,90", st: "out" }
                ].map((p, i) => (
                  <TableRow key={i} className="hover:bg-primary/5 transition-all duration-200 cursor-default group active:scale-[0.995]">
                    <TableCell className="font-bold text-xs text-muted-foreground">{p.id}</TableCell>
                    <TableCell className="font-semibold text-sm group-hover:text-primary transition-colors">{p.name}</TableCell>
                    <TableCell>
                      <span className="text-[10px] font-bold bg-muted/60 px-2 py-0.5 rounded uppercase tracking-tighter">{p.cat}</span>
                    </TableCell>
                    <TableCell>
                      {p.st === "out" ? (
                        <span className="text-[10px] font-black text-destructive uppercase tracking-widest animate-pulse">Esgotado</span>
                      ) : (
                        <span className="text-sm font-medium">{p.q} unid.</span>
                      )}
                    </TableCell>
                    <TableCell className="font-bold tabular-nums">{p.p}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-secondary hover:text-purple-700 hover:bg-secondary/10 transition-all">
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-red-700 hover:bg-destructive/10 transition-all">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
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
