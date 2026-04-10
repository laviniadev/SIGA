import { useState } from "react"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { ChevronRight, Shirt, Footprints, Watch, Tag } from "lucide-react"
import { mockProducts } from "@/data/mockProducts"
import { ProductCard } from "@/components/public/ProductCard"
import Carousel from "@/components/public/Carousel"
import TrendsSection from "@/components/public/TrendsSection"
import NewsletterSection from "@/components/public/NewsletterSection"
import { TrustBar } from "@/components/public/TrustBar"

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("Tudo");

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
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-6 mb-2 md:mb-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-lg md:text-2xl font-black tracking-tighter uppercase">Destaques da Temporada</h2>
                <div className="h-1 w-20 bg-primary"></div>
              </div>
            </div>
            
            <Link to="/products" className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all flex items-center gap-2 whitespace-nowrap group">
              Ver Coleção Completa <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
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
                if (activeFilter === "Tudo") return true;
                if (activeFilter === "Promoções") return p.price < 150;
                return p.category === activeFilter;
              })
              .map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  animationDelay={`${index * 50}ms`}
                  compact={true}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  )
}
