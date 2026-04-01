import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ShoppingCart, Filter } from "lucide-react"

export default function ProductsList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Todos os Produtos</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
          <Card key={id} className="overflow-hidden hover:shadow-xl transition-shadow border-muted">
            <div className="aspect-square bg-muted/30 flex items-center justify-center p-6 relative">
              <div className="w-full h-full bg-muted rounded-md flex items-center justify-center border border-dashed text-muted-foreground">
                Imagem Produto {id}
              </div>
            </div>
            <CardContent className="p-4">
              <Link to={`/product/${id}`} className="hover:text-primary transition-colors">
                <h3 className="font-semibold text-lg mb-2">Produto {id}</h3>
              </Link>
              <div className="flex items-center justify-between mt-4">
                <p className="font-bold text-foreground text-xl">R$ {(89.9 * id).toFixed(2).replace('.', ',')}</p>
                <Button size="icon" className="bg-success hover:bg-green-500 rounded-full h-10 w-10">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
