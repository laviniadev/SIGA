import { Link } from "react-router-dom"
import { mockProducts } from "@/data/mockProducts"
import { ProductCard } from "@/components/public/ProductCard"
import { ChevronLeft, SearchX, Shirt, Footprints, Watch, Tag, ArrowUpDown, ArrowUp, ArrowDown, ChevronDown, Star } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { cn } from "@/lib/utils"

export default function Favorites() {
  const [favoritedProducts, setFavoritedProducts] = useState(
    mockProducts.filter(p => localStorage.getItem(`fav_${p.id}`) === 'true')
  );

  useEffect(() => {
    setFavoritedProducts(mockProducts.filter(p => localStorage.getItem(`fav_${p.id}`) === 'true'));
  }, []);

  const [activeFilter, setActiveFilter] = useState("Tudo");
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc" | "bestSales">("none");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const displayProducts = useMemo(() => {
    const offerIds = ["13", "16", "29", "2", "3", "4", "22", "8", "10", "28", "21", "20", "23", "27"];
    let filtered = favoritedProducts.filter(p => {
      if (activeFilter === "Promoções") return offerIds.includes(p.id);
      if (activeFilter !== "Tudo") return p.category === activeFilter;
      return true;
    });

    if (sortOrder === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortOrder === "bestSales") {
      filtered = [...filtered].sort((a, b) => {
        const salesA = a.salesCount ?? ((Number(a.id) * 73) % 1500);
        const salesB = b.salesCount ?? ((Number(b.id) * 73) % 1500);
        return salesB - salesA;
      });
    }

    return filtered;
  }, [favoritedProducts, activeFilter, sortOrder]);

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden bg-gradient-to-b from-red-50/60 to-muted/20">
      <div className="pt-6 pb-12 md:pt-8 md:pb-16">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-20">
          <Link to="/customer" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-3 md:mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Voltar ao Perfil
          </Link>

          <div className="flex flex-col gap-2 md:gap-6 mb-2 md:mb-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">

              <div className="space-y-2">
                <h1 className="text-lg md:text-2xl font-black tracking-tighter uppercase text-foreground">
                  Sua Lista de Desejos
                </h1>
                <div className="h-1 w-20 bg-red-500"></div>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border transition-all duration-200 active:scale-95 w-[160px] justify-between whitespace-nowrap rounded-sm",
                    sortOrder !== "none"
                      ? "border-foreground bg-foreground text-background"
                      : "border-muted-foreground/20 text-muted-foreground hover:border-foreground/40"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <ArrowUpDown className="h-3 w-3" />
                    {sortOrder === "asc" ? "Menor preço" : sortOrder === "desc" ? "Maior preço" : sortOrder === "bestSales" ? "Mais vendidos" : "Ordenar"}
                  </span>
                  <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", isSortOpen ? "rotate-180" : "")} />
                </button>

                {isSortOpen && (
                  <div className="absolute right-0 top-full mt-1 z-30 border border-border bg-background shadow-lg w-[160px] rounded-sm overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                    <button
                      onClick={() => { setSortOrder("asc"); setIsSortOpen(false); }}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-muted/40 transition-colors text-left whitespace-nowrap",
                        sortOrder === "asc" ? "text-primary font-black" : ""
                      )}
                    >
                      <ArrowUp className="h-3 w-3" />
                      Menor preço
                    </button>
                    <button
                      onClick={() => { setSortOrder("desc"); setIsSortOpen(false); }}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-muted/40 transition-colors text-left whitespace-nowrap",
                        sortOrder === "desc" ? "text-primary font-black" : ""
                      )}
                    >
                      <ArrowDown className="h-3 w-3" />
                      Maior preço
                    </button>
                    <button
                      onClick={() => { setSortOrder("bestSales"); setIsSortOpen(false); }}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-muted/40 transition-colors text-left whitespace-nowrap",
                        sortOrder === "bestSales" ? "text-primary font-black" : ""
                      )}
                    >
                      <Star className="h-3 w-3" />
                      Mais vendidos
                    </button>
                    {sortOrder !== "none" && (
                      <button
                        onClick={() => { setSortOrder("none"); setIsSortOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-red-50 text-red-500 transition-colors text-left border-t border-dashed"
                      >
                        Limpar filtro
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* New Filter Pills System */}
            <div className="flex items-center gap-3 md:gap-4 overflow-x-auto px-2 py-2 pb-4 no-scrollbar touch-pan-x -mx-2 md:mx-0">
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

          {favoritedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 md:py-16 text-center space-y-6">
              <div className="w-24 h-24 mb-2 rounded-full bg-red-50 flex items-center justify-center">
                <SearchX className="h-10 w-10 text-red-300" />
              </div>
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-2">Sua lista está vazia</h2>
              <p className="text-muted-foreground text-xs md:text-sm max-w-md font-medium tracking-wide">
                Você ainda não favoritou nenhum produto. Explore nossas coleções e salve seus itens favoritos para não perdê-los de vista!
              </p>
              <Link to="/products" className="mt-8 bg-foreground text-background px-8 py-3 rounded-sm font-black uppercase tracking-widest text-xs transition-colors hover:bg-primary active:scale-95">
                Explorar Produtos
              </Link>
            </div>
          ) : displayProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8 min-h-[300px]">
              {displayProducts.map((product, idx) => {
                const offerIds = ["13", "16", "29", "2", "3", "4", "22", "8", "10", "28", "21", "20", "23", "27"];
                const isOffer = offerIds.includes(product.id);
                let discount = 0;
                if (isOffer) {
                  if (product.price > 500) discount = 40;
                  else if (product.price > 200) discount = 30;
                  else if (product.price > 100) discount = 20;
                  else discount = 15;
                }

                return (
                  <div key={`${product.id}-${activeFilter}`} className="relative group">
                    {isOffer && (
                      <div className="absolute top-2 left-2 z-20">
                        <div className="bg-orange-500 text-white px-2 py-0.5 rounded-md shadow-lg shadow-orange-500/40 transform -skew-x-6">
                          <span className="block skew-x-6 text-[8px] sm:text-[10px] font-bold">-{discount}%</span>
                        </div>
                      </div>
                    )}
                    <ProductCard compact={true} product={isOffer ? { ...product, price: product.price * (1 - discount / 100) } : product} originalPrice={isOffer ? product.price : undefined} animationDelay={`${(idx % 10) * 50}ms`} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 md:py-10 text-center space-y-6 border border-dashed border-muted/60 bg-muted/5 rounded-2xl mx-1 md:mx-0 px-8 mt-4">
              <h2 className="text-xl md:text-2xl font-black uppercase text-foreground tracking-tighter">
                Nenhum favorito encontrado
              </h2>
              <p className="text-sm text-muted-foreground max-w-md">
                Tente alterar o filtro. Os itens salvos podem não coincidir com essa categoria.
              </p>
              <button
                onClick={() => {
                  setActiveFilter("Tudo");
                  setSortOrder("none");
                }}
                className="mt-4 px-8 py-3 bg-foreground text-background font-black uppercase text-xs tracking-widest hover:bg-primary transition-colors active:scale-95 rounded-sm"
              >
                Limpar Filtros
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
