import { mockProducts } from "@/data/mockProducts"
import { useState, useRef, useCallback } from "react"
import { ProductCard } from "@/components/public/ProductCard"
import { TrendingUp } from "lucide-react"

export default function Trends() {
  // Simulação de curadoria de tendências (IDs específicos)
  const trendIds = ["1", "5", "7", "9", "11", "12"];
  const allTrends = mockProducts.filter(p => trendIds.includes(p.id));
  
  const [displayProducts, setDisplayProducts] = useState<typeof mockProducts>(allTrends.slice(0, 5));
  const [hasMore, setHasMore] = useState(allTrends.length > 5);
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
    setTimeout(() => {
      const currentLength = displayProducts.length;
      const nextBatch = allTrends.slice(currentLength, currentLength + 5);
      
      if (nextBatch.length > 0) {
        setDisplayProducts(prev => [...prev, ...nextBatch]);
        setHasMore(currentLength + nextBatch.length < allTrends.length);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-secondary font-black uppercase tracking-widest text-[10px]">
              <TrendingUp className="h-3 w-3" />
              Especial Curadoria
            </div>
            <h1 className="text-lg md:text-2xl font-black tracking-tighter uppercase text-foreground text-left leading-tight">Tendências Urbanas</h1>
            <div className="h-1 w-20 bg-secondary"></div>
          </div>
          <p className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
            {allTrends.length} itens em alta na temporada
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
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
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  )
}
