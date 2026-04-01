import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, UserPlus, Eye, Mail } from "lucide-react"

export default function AdminClients() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-secondary">Clientes</h2>
        <Button className="bg-secondary hover:bg-purple-600 text-white">
          <UserPlus className="mr-2 h-4 w-4" /> Novo Cliente
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listagem de Clientes</CardTitle>
          <CardDescription>
            Visualize os clientes cadastrados e gerencie seus perfis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por nome ou email..."
                className="pl-8"
              />
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">João Oliveira</TableCell>
                <TableCell>joao.oliveira@email.com</TableCell>
                <TableCell>(11) 98765-4321</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-success/20 px-2.5 py-0.5 text-xs font-semibold text-green-700">Ativo</span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-primary hover:text-orange-700">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Mail className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Maria Silva</TableCell>
                <TableCell>maria.silva@email.com</TableCell>
                <TableCell>(21) 99888-7777</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-success/20 px-2.5 py-0.5 text-xs font-semibold text-green-700">Ativo</span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-primary hover:text-orange-700">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Mail className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Pedro Santos</TableCell>
                <TableCell>pedro.santos@email.com</TableCell>
                <TableCell>(31) 97777-6666</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-destructive/20 px-2.5 py-0.5 text-xs font-semibold text-red-700">Inativo</span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-primary hover:text-orange-700">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Mail className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
