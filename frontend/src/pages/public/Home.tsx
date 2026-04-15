import { useState } from "react"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronDown, Shirt, Footprints, Watch, Tag, Star } from "lucide-react"
import { mockProducts } from "@/data/mockProducts"
import { ProductCard } from "@/components/public/ProductCard"
import Carousel from "@/components/public/Carousel"
import TrendsSection from "@/components/public/TrendsSection"
import NewsletterSection from "@/components/public/NewsletterSection"
import { TrustBar } from "@/components/public/TrustBar"
export default function Home() {
  const [activeFilter, setActiveFilter] = useState("Tudo");
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc" | "bestSales">("none");
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      <TrustBar />
      {/* Hero Carousel Section */}
      <section className="relative w-full overflow-hidden bg-zinc-950">
        <Carousel
          variant="hero"
          items={[
            {
              id: "hero-1",
              image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1920&q=80",
              title: "SUA JORNADA COMEÇA AQUI",
              subtitle: "Descubra os melhores produtos.\nAproveite as ofertas exclusivas da nossa coleção premium.",
              cta: "Explorar Coleção",
              ctaLink: "/products"
            },
            {
              id: "hero-2",
              image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=80",
              title: "COLEÇÃO OUTONO-INVERNO 2024",
              subtitle: "Estilo sofisticado e conforto extremo para os dias mais frios do ano. Conheça as peças que definem a estação.",
              cta: "Conferir Novidades",
              ctaLink: "/products"
            },
            {
              id: "hero-3",
              image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1920&q=80",
              title: "ACESSÓRIOS DE LUXO",
              subtitle: "Detalhes que fazem a diferença no seu dia a dia.\nRelógios, joias e muito mais com design exclusivo.",
              cta: "Ver Detalhes",
              ctaLink: "/products?category=Acessórios"
            }
          ]}
          autoPlay={true}
          autoPlayInterval={6000}
        />
      </section>

      <TrendsSection />

      {/* Featured Products */}
      <section className="py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-6 mb-2 md:mb-8">
            <div className="space-y-2">
              <h2 className="text-lg md:text-2xl font-black tracking-tighter uppercase">Destaques da Temporada</h2>
              <div className="h-1 w-20 bg-primary"></div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border transition-all duration-200 active:scale-95 w-[160px] justify-between whitespace-nowrap",
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
                <div className="absolute right-0 top-full mt-1 z-30 border border-border bg-background shadow-lg w-[160px] animate-in fade-in slide-in-from-top-2 duration-150">
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

          {/* Minimalist Filter Pills */}
          <div className="flex items-center gap-3 md:gap-4 overflow-x-auto px-2 py-2 pb-4 mb-6 no-scrollbar touch-pan-x">
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

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8 min-h-[400px]">
            {mockProducts
              .filter(p => {
                const isOffer = ["13", "16", "29", "2", "3", "4", "22", "8", "10", "28", "21", "20", "23", "27"].includes(p.id);
                if (activeFilter === "Tudo") return true;
                if (activeFilter === "Promoções") return isOffer;
                return p.category === activeFilter;
              })
              .sort((a, b) => {
                if (sortOrder === "asc") return a.price - b.price;
                if (sortOrder === "desc") return b.price - a.price;
                if (sortOrder === "bestSales") {
                  const salesA = a.salesCount ?? ((Number(a.id) * 73) % 1500); 
                  const salesB = b.salesCount ?? ((Number(b.id) * 73) % 1500);
                  return salesB - salesA;
                }
                return 0;
              })
              .map((product, index) => {
                const isOffer = ["13", "16", "29", "2", "3", "4", "22", "8", "10", "28", "21", "20", "23", "27"].includes(product.id);
                let discount = 0;
                if (isOffer) {
                  if (product.price > 500) discount = 40;
                  else if (product.price > 200) discount = 30;
                  else if (product.price > 100) discount = 20;
                  else discount = 15;
                }

                return (
                  <div key={product.id} className="relative group">
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
                      animationDelay={`${index * 50}ms`}
                      compact={true}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  )
}
