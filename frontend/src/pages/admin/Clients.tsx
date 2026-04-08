import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, UserPlus, Eye, Mail } from "lucide-react"

export default function AdminClients() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-secondary uppercase">Clientes</h2>
        <Button className="bg-secondary hover:bg-purple-600 text-white shadow-md font-bold uppercase tracking-widest active:scale-95">
          <UserPlus className="mr-2 h-4 w-4" /> Novo Cliente
        </Button>
      </div>

      <Card className="shadow-lg border-muted/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Base de Consumidores</CardTitle>
          <CardDescription className="text-xs">
            Gerencie o relacionamento e visualize perfis detalhados de seus clientes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative w-full md:w-1/3 group">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
              <Input
                type="search"
                placeholder="Buscar por nome, e-mail ou CPF..."
                className="pl-8 h-10 border-muted-foreground/20 focus:border-secondary transition-all duration-300 shadow-sm"
              />
            </div>
          </div>
          
          <div className="rounded-md border border-muted/50 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/10">
                <TableRow>
                  <TableHead className="font-bold text-[10px] uppercase">Nome</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Email</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Telefone</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Status</TableHead>
                  <TableHead className="text-right font-bold text-[10px] uppercase">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: "João Oliveira", email: "joao.oliveira@email.com", tel: "(11) 98765-4321", st: "active" },
                  { name: "Maria Silva", email: "maria.silva@email.com", tel: "(21) 99888-7777", st: "active" },
                  { name: "Pedro Santos", email: "pedro.santos@email.com", tel: "(31) 97777-6666", st: "inactive" }
                ].map((c, i) => (
                  <TableRow key={i} className="hover:bg-secondary/5 transition-all duration-200 cursor-default group active:scale-[0.995]">
                    <TableCell className="font-bold text-sm group-hover:text-secondary transition-colors">{c.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{c.email}</TableCell>
                    <TableCell className="text-xs font-medium">{c.tel}</TableCell>
                    <TableCell>
                      {c.st === "active" ? (
                        <span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-0.5 text-[10px] font-bold text-green-700 border border-success/20">ATIVO</span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-destructive/10 px-2.5 py-0.5 text-[10px] font-bold text-red-700 border border-destructive/20">INATIVO</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-orange-700 hover:bg-primary/10 transition-all">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-all">
                          <Mail className="h-4 w-4" />
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
