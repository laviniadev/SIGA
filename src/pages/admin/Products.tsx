import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

export default function AdminProducts() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Produtos</h2>
        <Button className="bg-primary hover:bg-orange-600" asChild>
          <Link to="/admin/products/new"><PlusCircle className="mr-2 h-4 w-4" /> Cadastrar Produto</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Produtos</CardTitle>
          <CardDescription>
            Gerencie os produtos, cadastre novos e atualize o estoque.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-8"
              />
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">#001</TableCell>
                <TableCell>Tênis Esportivo Nike</TableCell>
                <TableCell>Calçados</TableCell>
                <TableCell>45</TableCell>
                <TableCell>R$ 499,90</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-secondary hover:text-purple-700">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#002</TableCell>
                <TableCell>Camiseta Básica</TableCell>
                <TableCell>Roupas</TableCell>
                <TableCell>120</TableCell>
                <TableCell>R$ 59,90</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-secondary hover:text-purple-700">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#003</TableCell>
                <TableCell>Boné Aba Reta</TableCell>
                <TableCell>Acessórios</TableCell>
                <TableCell className="text-destructive font-bold">0 (Esgotado)</TableCell>
                <TableCell>R$ 89,90</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-secondary hover:text-purple-700">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
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
