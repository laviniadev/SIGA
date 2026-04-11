import { mockProducts } from "@/data/mockProducts"
import { useState, useRef, useCallback } from "react"
import { ProductCard } from "@/components/public/ProductCard"
import { Tag, Timer } from "lucide-react"
import Carousel from "@/components/public/Carousel"

export default function Offers() {
  // Simulação de curadoria de ofertas (IDs específicos)
  const offerIds = ["2", "3", "4", "6", "8", "10"];
  const allOffers = mockProducts.filter(p => offerIds.includes(p.id));
  
  const [displayProducts, setDisplayProducts] = useState<typeof mockProducts>(allOffers.slice(0, 5));
  const [hasMore, setHasMore] = useState(allOffers.length > 5);
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
      const nextBatch = allOffers.slice(currentLength, currentLength + 5);
      
      if (nextBatch.length > 0) {
        setDisplayProducts(prev => [...prev, ...nextBatch]);
        setHasMore(currentLength + nextBatch.length < allOffers.length);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 600);
  };

  // Carrossel items
  const carouselItems = [
    {
      id: "flash-1",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80",
      title: "OFERTA RELÂMPAGO",
      subtitle: "Os calçados mais desejados com até 40% de desconto limitadíssimo.",
      cta: "Garantir o Meu",
      ctaLink: `/product/${allOffers[0]?.id || "2"}`
    },
    {
      id: "flash-2",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=80",
      title: "CÓDIGO: BLACK50",
      subtitle: "Use o código na finalização e ganhe desconto extra nos moletons.",
      cta: "Comprar Moletom",
      ctaLink: `/product/${allOffers[1]?.id || "3"}`
    },
    {
      id: "flash-3",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
      title: "LIQUIDAÇÃO APENAS HOJE",
      subtitle: "Acessórios premium saindo a preço de custo. Não perca a chance.",
      cta: "Ver Relógio",
      ctaLink: `/product/${allOffers[2]?.id || "4"}`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Carousel Full Width */}
      <section className="relative w-full overflow-hidden bg-zinc-950">
         <Carousel items={carouselItems} variant="hero" autoPlayInterval={5000} />
      </section>

      <div className="py-8 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
          <div className="space-y-1 sm:space-y-2">
            <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[8px] sm:text-[10px]">
              <Tag className="h-3 w-3" />
              Ofertas Imperdíveis
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter uppercase text-foreground leading-tight flex items-center gap-3">
              Melhores Oportunidades
            </h1>
            <div className="h-1 w-16 sm:w-20 bg-primary"></div>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-1.5">
             <div className="flex items-center gap-1.5 px-2 py-1 bg-destructive/10 text-destructive rounded-sm border border-destructive/20 animate-pulse">
                <Timer className="h-3 w-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">Termina hoje em 04:12:59</span>
             </div>
             <p className="text-muted-foreground text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] font-black text-left md:text-right">
               Acesso a <span className="text-primary">{allOffers.length}</span> itens com desconto
             </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8 min-h-[600px]">
          {displayProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
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
              <p className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground animate-pulse mt-2">Explorando Ofertas...</p>
            </div>
          </div>
        )}

        {!hasMore && !isLoading && (
          <div className="py-20 text-center">
            <div className="inline-block px-12 py-6 border-2 border-muted bg-muted/10">
              <p className="text-muted-foreground text-[10px] uppercase tracking-[0.6em] font-black opacity-60">Fim das ofertas exclusivas</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
