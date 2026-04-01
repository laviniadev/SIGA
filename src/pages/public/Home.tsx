import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted py-20 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
            Sua jornada começa na <span className="text-primary">SIGA Store</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Descubra os melhores produtos com qualidade impecável e design moderno. 
            Aproveite as ofertas exclusivas da nossa coleção de verão.
          </p>
          <Button size="lg" className="bg-primary hover:bg-orange-600 text-lg px-8 py-6 rounded-full shadow-lg" asChild>
            <Link to="/product/1">Explorar Coleção</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center text-foreground">Destaques da Semana</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Produto 1 */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow border-muted">
              <div className="aspect-square bg-muted/30 flex items-center justify-center p-6 relative">
                <span className="absolute top-2 left-2 bg-secondary text-white text-xs px-2 py-1 rounded-full font-bold">
                  Novo
                </span>
                <div className="w-full h-full bg-muted rounded-md flex items-center justify-center border border-dashed text-muted-foreground">
                  Imagem Produto
                </div>
              </div>
              <CardContent className="p-4">
                <Link to="/product/1" className="hover:text-primary transition-colors">
                  <h3 className="font-semibold text-lg mb-2">Tênis Urban Style</h3>
                </Link>
                <div className="flex items-center justify-between mt-4">
                  <p className="font-bold text-foreground text-xl">R$ 299,90</p>
                  <Button size="icon" className="bg-success hover:bg-green-500 rounded-full h-10 w-10">
                    <ShoppingCart className="h-5 w-5 text-white" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Produto 2 */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow border-muted">
              <div className="aspect-square bg-muted/30 flex items-center justify-center p-6 relative">
                 <span className="absolute top-2 right-2 bg-destructive text-white text-xs px-2 py-1 rounded-full font-bold">
                  -20%
                </span>
                <div className="w-full h-full bg-muted rounded-md flex items-center justify-center border border-dashed text-muted-foreground">
                  Imagem Produto
                </div>
              </div>
              <CardContent className="p-4">
                <Link to="/product/2" className="hover:text-primary transition-colors">
                  <h3 className="font-semibold text-lg mb-2">Camiseta Básica Premium</h3>
                </Link>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-xs line-through text-muted-foreground">R$ 99,90</p>
                    <p className="font-bold text-foreground text-xl">R$ 79,90</p>
                  </div>
                  <Button size="icon" className="bg-success hover:bg-green-500 rounded-full h-10 w-10">
                    <ShoppingCart className="h-5 w-5 text-white" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Outros Placeholders */}
             {[3, 4].map((id) => (
               <Card key={id} className="overflow-hidden hover:shadow-xl transition-shadow border-muted">
                 <div className="aspect-square bg-muted/30 flex items-center justify-center p-6">
                   <div className="w-full h-full bg-muted rounded-md flex items-center justify-center border border-dashed text-muted-foreground">
                     Imagem Produto
                   </div>
                 </div>
                 <CardContent className="p-4">
                   <Link to={`/product/${id}`} className="hover:text-primary transition-colors">
                     <h3 className="font-semibold text-lg mb-2">Produto Exemplo {id}</h3>
                   </Link>
                   <div className="flex items-center justify-between mt-4">
                     <p className="font-bold text-foreground text-xl">R$ 149,90</p>
                     <Button size="icon" className="bg-success hover:bg-green-500 rounded-full h-10 w-10">
                       <ShoppingCart className="h-5 w-5 text-white" />
                     </Button>
                   </div>
                 </CardContent>
               </Card>
             ))}
          </div>
        </div>
      </section>
    </div>
  )
}
