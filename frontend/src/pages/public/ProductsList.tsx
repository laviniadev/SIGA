import { Button } from "@/components/ui/button"
import { Filter, Shirt, Footprints, Watch, Tag, ChevronRight } from "lucide-react"
import { mockProducts } from "@/data/mockProducts"
import { useState, useRef, useCallback, useEffect } from "react"
import { ProductCard } from "@/components/public/ProductCard"
import { cn } from "@/lib/utils"

export default function ProductsList() {
  const [activeFilter, setActiveFilter] = useState("Tudo");
  const [displayProducts, setDisplayProducts] = useState<typeof mockProducts>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  // Filtragem base
  const getFilteredProducts = useCallback(() => {
    return mockProducts.filter(p => {
      if (activeFilter === "Tudo") return true;
      if (activeFilter === "Promoções") return p.price < 150;
      return p.category === activeFilter;
    });
  }, [activeFilter]);

  // Reset ao mudar filtro
  useEffect(() => {
    const filtered = getFilteredProducts();
    setDisplayProducts(filtered.slice(0, 10));
    setHasMore(filtered.length > 10);
  }, [activeFilter, getFilteredProducts]);

  const lastProductElementRef = useCallback((node: HTMLElement | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });

    if (node) observer.current.observe(node);
  }, [hasMore, isLoading, displayProducts.length]);

  const loadMore = () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const filtered = getFilteredProducts();
      const currentLength = displayProducts.length;
      const nextBatch = filtered.slice(currentLength, currentLength + 5);
      
      if (nextBatch.length > 0) {
        setDisplayProducts(prev => [...prev, ...nextBatch]);
        setHasMore(currentLength + nextBatch.length < filtered.length);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex flex-col gap-2 md:gap-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-lg md:text-2xl font-black tracking-tighter uppercase text-foreground">Coleção Completa</h1>
              <div className="h-1 w-20 bg-primary"></div>
            </div>
            
            <p className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-[0.2em] font-black">
              Explorando <span className="text-primary">{getFilteredProducts().length}</span> itens exclusivos
            </p>
          </div>

          {/* New Filter Pills System */}
          <div className="flex items-center gap-3 md:gap-4 overflow-x-auto px-2 py-2 pb-4 no-scrollbar touch-pan-x">
             <button 
               onClick={() => setActiveFilter("Tudo")}
               className={cn(
                 "flex-shrink-0 px-6 py-2.5 rounded-full border-2 transition-all duration-300 text-[10px] md:text-xs font-black uppercase tracking-widest active:scale-95 shadow-sm",
                 activeFilter === "Tudo" 
                   ? "border-foreground bg-foreground text-background shadow-lg scale-105" 
                   : "border-muted-foreground/20 text-muted-foreground hover:border-foreground/40 hover:bg-muted/30"
               )}
             >
                Tudo
             </button>
             {[
               { name: "Roupas", icon: <Shirt className="w-3.5 h-3.5" />, color: "#F59E0B" },
               { name: "Calçados", icon: <Footprints className="w-3.5 h-3.5" />, color: "#8B5CF6" },
               { name: "Acessórios", icon: <Watch className="w-3.5 h-3.5" />, color: "#10B981" },
               { name: "Promoções", icon: <Tag className="w-3.5 h-3.5" />, color: "#EF4444" }
             ].map((cat) => (
               <button 
                 key={cat.name}
                 onClick={() => setActiveFilter(cat.name)}
                 className={cn(
                   "flex-shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-full border-2 transition-all duration-300 text-[10px] md:text-xs font-black uppercase tracking-widest group active:scale-95 shadow-sm",
                   activeFilter === cat.name 
                     ? "border-foreground bg-foreground text-background shadow-lg scale-105" 
                     : "border-muted-foreground/20 text-muted-foreground hover:border-foreground/40 hover:bg-muted/30"
                 )}
               >
                 <span className="transition-colors" style={{ color: cat.color }}>{cat.icon}</span>
                 {cat.name}
               </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8 min-h-[600px]">
          {displayProducts.map((product, index) => (
            <ProductCard 
              key={`${product.id}-${activeFilter}`} 
              product={product} 
              innerRef={index === displayProducts.length - 1 ? lastProductElementRef : undefined}
              animationDelay={`${(index % 5) * 50}ms`}
              compact={true}
            />
          ))}
        </div>

        {(isLoading || hasMore) && (
          <div className="flex justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground animate-pulse mt-2">Explorando Seletiva...</p>
            </div>
          </div>
        )}

        {!hasMore && !isLoading && (
          <div className="py-20 text-center">
            <div className="inline-block px-12 py-6 border-2 border-muted bg-muted/10">
              <p className="text-muted-foreground text-[10px] uppercase tracking-[0.6em] font-black opacity-60">Fim do catálogo {activeFilter !== "Tudo" ? activeFilter : "premium"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
