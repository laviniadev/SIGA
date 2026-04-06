import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { mockProducts } from "@/data/mockProducts"
import { useState, useRef, useCallback } from "react"
import { ProductCard } from "@/components/public/ProductCard"

export default function ProductsList() {
  const [displayProducts, setDisplayProducts] = useState<typeof mockProducts>(mockProducts.slice(0, 5));
  const [hasMore, setHasMore] = useState(mockProducts.length > 5);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

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
    // Delay suave para feedback visual
    setTimeout(() => {
      const currentLength = displayProducts.length;
      const nextBatch = mockProducts.slice(currentLength, currentLength + 5);
      
      if (nextBatch.length > 0) {
        setDisplayProducts(prev => [...prev, ...nextBatch]);
        setHasMore(currentLength + nextBatch.length < mockProducts.length);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground mb-2 text-left">Coleção Completa</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold text-left">Explorar {mockProducts.length} itens exclusivos</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2 border-2 px-8 py-6 rounded-none font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all">
          <Filter className="w-4 h-4" /> Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {displayProducts.map((product, index) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            innerRef={index === displayProducts.length - 1 ? lastProductElementRef : undefined}
            animationDelay={`${(index % 5) * 100}ms`}
          />
        ))}
      </div>

      {(isLoading || hasMore) && (
        <div className="flex justify-center py-24">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground animate-pulse mt-2">Explorando o Catálogo...</p>
          </div>
        </div>
      )}

      {!hasMore && !isLoading && (
        <div className="py-24 text-center">
          <div className="inline-block px-12 py-4 border-2 border-muted">
            <p className="text-muted-foreground text-[10px] uppercase tracking-[0.6em] font-black opacity-60">Você chegou ao fim do catálogo premium</p>
          </div>
        </div>
      )}
    </div>
  )
}
