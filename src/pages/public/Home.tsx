import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import { mockProducts } from "@/data/mockProducts"
import { useCartStore } from "@/stores/useCartStore"
import { toast } from "sonner"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function Home() {
  const addToCart = useCartStore((state) => state.addToCart);
  const [quickAddId, setQuickAddId] = useState<string | null>(null);

  const handleAddToCart = (product: typeof mockProducts[0], size: string) => {
    addToCart(product, size);
    toast.success(`${product.name} (${size}) adicionado!`);
    setQuickAddId(null);
  };

  const getSizes = (category: string) => {
    if (category === "Roupas") return ["P", "M", "G", "GG"];
    if (category === "Calçados") return ["38", "39", "40", "41", "42"];
    return ["Único"];
  };

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
            <Link to="/products">Explorar Coleção</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center text-foreground">Destaques da Semana</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockProducts.slice(0, 4).map((product, index) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow border-muted flex flex-col group relative">
                <div className="aspect-square bg-muted/30 flex items-center justify-center p-0 relative overflow-hidden">
                  {index === 0 && (
                    <span className="absolute z-10 top-2 left-2 bg-secondary text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                      Novo
                    </span>
                  )}
                  <img src={product.image} alt={product.name} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
                  
                  {/* Quick Add Overlay */}
                  <div className={cn(
                    "absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 flex flex-col items-center justify-center p-4 space-y-3",
                    quickAddId === product.id ? "opacity-100 visible" : "opacity-0 invisible"
                  )}>
                    <p className="text-white font-bold text-sm uppercase tracking-widest">Escolha o Tamanho</p>
                    <div className="flex flex-wrap justify-center gap-2">
                       {getSizes(product.category).map(size => (
                         <button 
                           key={size}
                           onClick={() => handleAddToCart(product, size)}
                           className="h-10 w-10 bg-white hover:bg-primary hover:text-white text-black font-bold rounded-full transition-colors text-xs"
                         >
                           {size}
                         </button>
                       ))}
                    </div>
                    <button onClick={() => setQuickAddId(null)} className="text-white/70 text-[10px] hover:text-white underline mt-2">Cancelar</button>
                  </div>
                </div>
                <CardContent className="p-4 flex flex-col flex-grow">
                  <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors flex-grow">
                    <h3 className="font-bold text-base mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-[10px] text-muted-foreground uppercase font-semibold tracking-tighter mb-2">{product.category}</p>
                  </Link>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <p className="font-extrabold text-foreground text-lg">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                    </p>
                    <Button 
                      size="icon" 
                      className="bg-success hover:bg-green-600 rounded-full h-10 w-10 shadow-md transition-transform hover:scale-110"
                      onClick={() => setQuickAddId(product.id)}
                    >
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
