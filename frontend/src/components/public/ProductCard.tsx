import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/useCartStore"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import type { Product } from "@/data/mockProducts"

interface ProductCardProps {
  product: Product
  className?: string
  innerRef?: (node: HTMLElement | null) => void
  animationDelay?: string
  compact?: boolean
  originalPrice?: number
}

export const ProductCard = ({ product, className, innerRef, animationDelay, compact, originalPrice }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const handleAddToCart = (product: Product, size: string) => {
    addToCart(product, size);
    toast.success(`${product.name} (${size}) adicionado!`);
    setShowQuickAdd(false);
  };

  const getSizes = (category: string) => {
    if (category === "Roupas") return ["P", "M", "G", "GG"];
    if (category === "Calçados") return ["38", "39", "40", "41", "42"];
    return ["Único"];
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Roupas": return "bg-primary";
      case "Calçados": return "bg-secondary";
      case "Acessórios": return "bg-success";
      default: return "bg-muted-foreground";
    }
  };

  return (
    <Card
      className={cn(
        "overflow-hidden hover:shadow-2xl transition-all duration-500 border-muted flex flex-col group relative rounded-sm animate-in fade-in slide-in-from-bottom-4",
        className
      )}
      style={{ animationDelay }}
    >
      <div className="flex flex-col h-full group/card transition-all" ref={innerRef}>
        <div className={cn(
          "relative overflow-hidden bg-muted/20",
          compact ? "aspect-square" : "aspect-[4/5]"
        )}>
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img 
              src={product.image} 
              alt={product.name} 
              className={cn(
                "object-contain w-full h-full transition-transform duration-700 group-hover:scale-110",
                compact ? "p-3" : "p-4"
              )}
            />
          </Link>
          
          {/* Quick Add Overlay - Now a sibling of the Link, not a child! */}
          <div className={cn(
            "absolute inset-0 bg-black/85 backdrop-blur-[4px] transition-all duration-500 flex flex-col items-center justify-center space-y-4 z-30",
            showQuickAdd ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none",
            compact ? "p-4" : "p-6"
          )}>
            <p className="text-white font-black text-[10px] uppercase tracking-[0.2em] text-center mb-1">Tamanhos</p>
            <div className="flex flex-wrap justify-center gap-2">
              {getSizes(product.category).map(size => (
                <button 
                  key={size}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(product, size);
                  }}
                  className={cn(
                    "bg-white hover:bg-primary hover:text-white text-black font-black rounded-sm transition-all text-[10px] shadow-xl hover:scale-110 active:scale-90",
                    compact ? "h-8 w-8" : "h-10 w-10"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
            {/* Close button for overlay */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowQuickAdd(false);
              }}
              className="mt-4 text-white/50 hover:text-white text-[10px] font-bold uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full"
            >
              Cancelar
            </button>
          </div>
        </div>
        
        <CardContent className={cn(
          "flex flex-col flex-grow bg-white",
          compact ? "p-3" : "p-4"
        )}>
          <div className={compact ? "mb-2" : "mb-3"}>
            <span className={cn(
              "font-black text-white uppercase tracking-[0.2em] rounded-sm",
              compact ? "text-[9px] px-2 py-0.5" : "text-[10px] px-2.5 py-1",
              getCategoryColor(product.category)
            )}>
              {product.category}
            </span>
          </div>

          <div className="flex-grow flex flex-col justify-between">
            <Link to={`/product/${product.id}`} className="block mb-2">
              <h3 className="font-extrabold text-sm line-clamp-1 hover:text-primary transition-colors tracking-tight text-foreground uppercase">
                {product.name}
              </h3>
            </Link>

            <div className="flex items-center justify-between gap-2 border-t pt-3 min-h-[52px]">
              <div className="flex flex-col justify-center">
                {originalPrice && (
                  <span className="text-muted-foreground text-[9px] line-through tabular-nums mb-0.5">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(originalPrice)}
                  </span>
                )}
                <p className={cn(
                  "font-black tabular-nums",
                  originalPrice ? "text-orange-500 text-sm" : "text-foreground text-sm"
                )}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                </p>
              </div>

              <Button
                className="bg-success hover:bg-green-700 text-white rounded-sm h-10 w-10 p-0 flex items-center justify-center ring-offset-background transition-all active:scale-95 shadow-md"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowQuickAdd(true);
                }}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
