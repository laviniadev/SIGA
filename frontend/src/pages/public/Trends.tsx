import { mockProducts } from "@/data/mockProducts"
import { useState, useRef, useCallback, useMemo } from "react"
import { ProductCard } from "@/components/public/ProductCard"
import { TrendingUp, Sparkles, ArrowUpDown, ChevronDown, ArrowUp, ArrowDown, Zap, Heart, Clock } from "lucide-react"
import Carousel from "@/components/public/Carousel"
import { cn } from "@/lib/utils"
import NewsletterSection from "@/components/public/NewsletterSection"

export default function Trends() {
  const [activeFilter, setActiveFilter] = useState("Tudo");
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  // Mapeamento de Estilos (Baseado no Banner)
  const styles = {
    "Urbano": ["2", "5", "9", "13", "14", "15", "20", "22", "26"],
    "Minimalista": ["1", "4", "6", "18", "19", "24", "25", "28", "29"],
    "Atemporal": ["3", "7", "8", "10", "11", "12", "17", "21", "23", "27"],
    "Promoções": ["13", "16", "29", "2", "3", "4", "22", "8", "10", "28", "21", "20", "23", "27"]
  };

  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];
    
    // Aplicar Filtro de Estilo
    if (activeFilter !== "Tudo") {
      const allowedIds = styles[activeFilter as keyof typeof styles] || [];
      result = result.filter(p => allowedIds.includes(p.id));
    } else {
      // No modo "Tudo", priorizamos os que estão em qualquer uma das tendências
      const allTrendIds = [...styles.Urbano, ...styles.Minimalista, ...styles.Atemporal];
      result = result.filter(p => allTrendIds.includes(p.id));
    }

    // Aplicar Ordenação
    if (sortOrder === "asc") result.sort((a, b) => a.price - b.price);
    else if (sortOrder === "desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [activeFilter, sortOrder]);

  const displayProducts = filteredProducts.slice(0, page * itemsPerPage);
  const hasMore = displayProducts.length < filteredProducts.length;

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductElementRef = useCallback((node: HTMLElement | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setIsLoading(true);
        setTimeout(() => {
          setPage(prev => prev + 1);
          setIsLoading(false);
        }, 600);
      }
    });

    if (node) observer.current.observe(node);
  }, [hasMore, isLoading]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Carousel Section with Purple Overlay */}
      <section className="relative w-full overflow-hidden bg-zinc-950">
        <Carousel
          variant="hero"
          isTrends={true}
          align="left"
          onCtaClick={(filter) => {
            setActiveFilter(filter);
            setPage(1);
            document.getElementById('tendencias')?.scrollIntoView({ behavior: 'smooth' });
          }}
          overlayClassName="bg-secondary/20 mix-blend-overlay"
          items={[
            {
              id: "trend-hero-1",
              image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1920&q=80",
              title: "TENDÊNCIAS URBANAS 2024",
              subtitle: "O lifestyle das grandes metrópoles traduzido em peças exclusivas.\nConforto, estilo e atitude para o seu cotidiano.",
              cta: "Explorar Urbano",
              ctaLink: "Urbano",
              product: mockProducts.find(p => p.id === "2")
            },
            {
              id: "trend-hero-2",
              image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80",
              title: "ESTILO MINIMALISTA",
              subtitle: "A beleza da simplicidade em cada detalhe.\nCores neutras e cortes precisos para um visual atemporal.",
              cta: "Explorar Minimalismo",
              ctaLink: "Minimalista",
              product: mockProducts.find(p => p.id === "1")
            },
            {
              id: "trend-hero-3",
              image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1920&q=80",
              title: "PEÇAS ATEMPORAIS",
              subtitle: "Investimentos inteligentes para o seu guarda-roupa.\nQualidade superior que atravessa gerações.",
              cta: "Explorar Atemporal",
              ctaLink: "Atemporal",
              product: mockProducts.find(p => p.id === "7")
            }
          ]}
          autoPlay={true}
          autoPlayInterval={8000}
        />
      </section>

      {/* ═══════ Gradient wrapper with Purple theme ═══════ */}
      <div className="bg-gradient-to-b from-secondary/15 via-white to-white">
        
        <div id="tendencias" className="py-10 md:py-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-6 mb-2 md:mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-secondary font-black uppercase tracking-widest text-[8px] md:text-[10px]">
              <Sparkles className="h-3 w-3" />
              Drop de Tendências
            </div>
            <h1 className="text-lg md:text-2xl font-black tracking-tighter uppercase text-foreground leading-tight">Curadoria Exclusiva</h1>
            <div className="h-1 w-20 bg-secondary"></div>
          </div>

          <div className="flex flex-col sm:flex-row items-end gap-4 w-full md:w-auto">
             {/* Sort Dropdown */}
             <div className="relative w-full sm:w-[160px]">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border transition-all duration-200 active:scale-95 w-full justify-between whitespace-nowrap",
                  sortOrder !== "none"
                    ? "border-secondary bg-secondary text-white"
                    : "border-muted-foreground/20 text-muted-foreground hover:border-secondary/40"
                )}
              >
                <span className="flex items-center gap-1.5">
                  <ArrowUpDown className="h-3 w-3" />
                  {sortOrder === "asc" ? "Menor preço" : sortOrder === "desc" ? "Maior preço" : "Ordenar"}
                </span>
                <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", isSortOpen ? "rotate-180" : "")} />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 top-full mt-1 z-30 border border-border bg-background shadow-xl w-full animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => { setSortOrder("asc"); setIsSortOpen(false); setPage(1); }}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-muted/40 transition-colors text-left",
                      sortOrder === "asc" ? "text-secondary" : ""
                    )}
                  >
                    <ArrowUp className="h-3 w-3" />
                    Menor preço
                  </button>
                  <button
                    onClick={() => { setSortOrder("desc"); setIsSortOpen(false); setPage(1); }}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-muted/40 transition-colors text-left",
                      sortOrder === "desc" ? "text-secondary" : ""
                    )}
                  >
                    <ArrowDown className="h-3 w-3" />
                    Maior preço
                  </button>
                  {sortOrder !== "none" && (
                    <button
                      onClick={() => { setSortOrder("none"); setIsSortOpen(false); setPage(1); }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-red-50 text-red-500 transition-colors text-left border-t border-dashed"
                    >
                      Limpar filtros
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Style Filters */}
        <div className="flex items-center gap-3 overflow-x-auto px-4 pt-4 pb-8 mb-6 no-scrollbar touch-pan-x -mx-4 relative z-20">
          <button 
            onClick={() => { setActiveFilter("Tudo"); setPage(1); }}
            className={cn(
              "flex-shrink-0 px-8 py-3 rounded-full border-2 transition-all duration-300 text-[10px] md:text-xs font-black uppercase tracking-[0.1em] active:scale-95 shadow-sm",
              activeFilter === "Tudo" 
                ? "border-secondary bg-secondary text-white shadow-lg shadow-secondary/20 scale-105 z-10" 
                : "border-muted-foreground/10 text-muted-foreground hover:border-secondary/40 hover:bg-muted/30"
            )}
          >
            Tudo
          </button>
          {[
            { name: "Urbano", icon: <Zap className="w-3.5 h-3.5" />, color: "#8B5CF6" },
            { name: "Minimalista", icon: <Heart className="w-3.5 h-3.5" />, color: "#3B82F6" },
            { name: "Atemporal", icon: <Clock className="w-3.5 h-3.5" />, color: "#10B981" },
            { name: "Promoções", icon: <TrendingUp className="w-3.5 h-3.5" />, color: "#EF4444" }
          ].map((style) => (
            <button 
              key={style.name}
              onClick={() => { setActiveFilter(style.name); setPage(1); }}
              className={cn(
                "flex-shrink-0 flex items-center gap-3 px-8 py-3 rounded-full border-2 transition-all duration-300 text-[10px] md:text-xs font-black uppercase tracking-[0.1em] active:scale-95 group shadow-sm",
                activeFilter === style.name 
                  ? "border-secondary bg-secondary text-white shadow-lg shadow-secondary/20 scale-105 z-10" 
                  : "border-muted-foreground/10 text-muted-foreground hover:border-secondary/40 hover:bg-muted/30"
              )}
            >
              <span className={cn("transition-colors", activeFilter === style.name ? "text-white" : "")} style={{ color: activeFilter === style.name ? undefined : style.color }}>
                {style.icon}
              </span>
              {style.name}
            </button>
          ))}
        </div>

        {/* Grid Results */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8 min-h-[600px]">
          {displayProducts.map((product, index) => {
             const isOffer = styles.Promoções.includes(product.id);
             let discount = 0;
             if (isOffer) {
               if (product.price > 500) discount = 40;
               else if (product.price > 200) discount = 30;
               else if (product.price > 100) discount = 20;
               else discount = 15;
             }

             return (
               <div key={product.id + activeFilter} className="relative group">
                 {isOffer && (
                   <div className="absolute top-2 left-2 z-20">
                     <div className="bg-orange-500 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-lg shadow-orange-500/40 transform -skew-x-6">
                       <span className="block skew-x-6 text-[8px] sm:text-[10px] md:text-xs font-bold">-{discount}%</span>
                     </div>
                   </div>
                 )}
                 <ProductCard 
                    product={isOffer ? { ...product, price: product.price * (1 - discount / 100) } : product} 
                    originalPrice={isOffer ? product.price : undefined}
                    innerRef={index === displayProducts.length - 1 ? lastProductElementRef : undefined}
                    animationDelay={`${(index % 10) * 50}ms`}
                    compact={true}
                 />
               </div>
             );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="h-10 w-10 text-muted-foreground/30" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-widest text-foreground mb-2">Nenhum hit encontrado</h3>
            <p className="text-muted-foreground text-xs max-w-xs uppercase tracking-wider font-medium opacity-70">
              Esta tendência está sendo preparada. Tente explorar outro estilo por enquanto.
            </p>
          </div>
        )}

        {(isLoading || hasMore) && filteredProducts.length > 0 && (
          <div className="flex justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground animate-pulse mt-2">Sincronizando Tendências...</p>
            </div>
          </div>
        )}

        {!hasMore && !isLoading && filteredProducts.length > 0 && (
          <div className="py-20 text-center">
            <div className="inline-block px-12 py-6 border-2 border-secondary/10 bg-secondary/5">
              <p className="text-muted-foreground text-[10px] uppercase tracking-[0.6em] font-black opacity-60">Você está atualizado com o mundo</p>
            </div>
          </div>
        )}
        
        {/* ═══════ Newsletter ═══════ */}
        <NewsletterSection />
      </div>
    </div>
  </div>
  )
}
