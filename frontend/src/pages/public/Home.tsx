import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { mockProducts } from "@/data/mockProducts"
import { ProductCard } from "@/components/public/ProductCard"
import Carousel from "@/components/public/Carousel"
import TrendsSection from "@/components/public/TrendsSection"
import CategoriesSection from "@/components/public/CategoriesSection"
import NewsletterSection from "@/components/public/NewsletterSection"
import { TrustBar } from "@/components/public/TrustBar"

export default function Home() {
  const navigate = useNavigate();

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
              title: "SUA JORNADA COMEÇA NA SIGASTORE",
              subtitle: "Descubra os melhores produtos com qualidade impecável e design moderno. Aproveite as ofertas exclusivas da nossa coleção premium.",
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
      <section className="py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0 mb-10 md:mb-16">
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tighter uppercase">Destaques da Temporada</h2>
              <div className="h-1 w-20 bg-primary"></div>
            </div>
            <Link to="/products" className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              Ver Todos <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {mockProducts.map((product, index) => (
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

      {/* Categories Section */}
      <CategoriesSection
        categories={[
          {
            id: "roupas",
            name: "Roupas",
            count: 245,
            icon: "zap",
            color: "#FF6B35"
          },
          {
            id: "calcados",
            name: "Calçados",
            count: 128,
            icon: "zap",
            color: "#004E89"
          },
          {
            id: "acessorios",
            name: "Acessórios",
            count: 312,
            icon: "zap",
            color: "#F77F00"
          },
          {
            id: "promocoes",
            name: "Promoções",
            count: 89,
            icon: "zap",
            color: "#D62828"
          }
        ]}
      />

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  )
}
