import { Button } from "@/components/ui/button"
import { ShoppingCart, Star, StarHalf } from "lucide-react"
import { Link } from "react-router-dom"

export default function Product() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Imagem do Produto */}
        <div className="bg-muted rounded-2xl flex items-center justify-center p-8 aspect-square border border-dashed text-xl text-muted-foreground font-medium shadow-sm">
          Imagem Principal do Produto
        </div>

        {/* Detalhes */}
        <div className="flex flex-col space-y-6">
          <div>
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Categoria</span>
            <h1 className="text-4xl font-extrabold text-foreground mt-2">Tênis Urban Style</h1>
            
            <div className="flex items-center gap-2 mt-4">
              <div className="flex text-primary">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <StarHalf className="fill-current w-5 h-5" />
              </div>
              <span className="text-muted-foreground text-sm">(128 avaliações)</span>
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed font-roboto">
            O tênis Urban Style oferece o equilíbrio perfeito entre conforto e design. Produzido com materiais sustentáveis, é a escolha ideal para o dia a dia na cidade ou para compor aquele look incrível.
          </p>

          <div className="text-4xl font-bold text-foreground">
            R$ 299,90 <span className="text-lg text-muted-foreground font-normal block mt-1">ou 3x de R$ 99,96 sem juros</span>
          </div>

          <div className="pt-6 border-t space-y-4">
            <Button size="lg" className="w-full h-14 text-lg font-bold bg-success hover:bg-green-600 shadow-md" asChild>
              <Link to="/cart">
                <ShoppingCart className="mr-2 h-6 w-6" /> Adicionar ao Carrinho
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full h-14 text-lg border-2 text-primary border-primary hover:bg-primary/10" asChild>
              <Link to="/checkout">Comprar Agora</Link>
            </Button>
          </div>
          
          <div className="mt-8 bg-muted/40 p-4 rounded-lg flex items-start gap-4">
            <div className="bg-white p-2 rounded-full shadow-sm text-secondary">
               📦
            </div>
            <div>
              <p className="font-semibold text-foreground">Frete Grátis</p>
              <p className="text-sm text-muted-foreground">Para compras acima de R$ 200,00.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
