import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ShoppingCart, Filter } from "lucide-react"
import { mockProducts } from "@/data/mockProducts"
import { useCartStore } from "@/stores/useCartStore"
import { toast } from "sonner"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function ProductsList() {
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Todos os Produtos</h1>
        <Button variant="outline" className="flex items-center gap-2 border-2 px-6">
          <Filter className="w-4 h-4" /> Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-muted flex flex-col group relative">
            <div className="aspect-square bg-muted/20 flex items-center justify-center p-0 relative overflow-hidden">
              <img src={product.image} alt={product.name} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
              
              {/* Quick Add Overlay */}
              <div className={cn(
                "absolute inset-0 bg-black/70 backdrop-blur-[2px] transition-all duration-300 flex flex-col items-center justify-center p-4 space-y-3 z-20",
                quickAddId === product.id ? "opacity-100 visible" : "opacity-0 invisible"
              )}>
                <p className="text-white font-bold text-xs uppercase tracking-widest text-center">Selecionar Tamanho</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                   {getSizes(product.category).map(size => (
                     <button 
                       key={size}
                       onClick={() => handleAddToCart(product, size)}
                       className="h-9 w-9 bg-white hover:bg-primary hover:text-white text-black font-extrabold rounded-md transition-all text-[10px] shadow-sm hover:scale-110"
                     >
                       {size}
                     </button>
                   ))}
                </div>
                <button 
                  onClick={() => setQuickAddId(null)} 
                  className="text-white/60 text-[10px] hover:text-white hover:underline transition-colors mt-2 font-medium"
                >
                  Cancelar
                </button>
              </div>
            </div>
            
            <CardContent className="p-4 flex flex-col flex-grow">
              <div className="mb-2">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter bg-secondary/10 px-2 py-0.5 rounded-sm">
                  {product.category}
                </span>
              </div>
              <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors flex-grow">
                <h3 className="font-bold text-base mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-tight">{product.description}</p>
              </Link>
              <div className="flex items-center justify-between mt-4">
                <p className="font-extrabold text-foreground text-xl">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                </p>
                <Button 
                  size="icon" 
                  className="bg-success hover:bg-green-600 rounded-full h-10 w-10 flex-shrink-0 shadow-lg ring-offset-background transition-transform active:scale-95" 
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
  )
}
