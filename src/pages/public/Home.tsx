import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { mockProducts } from "@/data/mockProducts"
import { ProductCard } from "@/components/public/ProductCard"
import Carousel from "@/components/public/Carousel"
import TrendsSection from "@/components/public/TrendsSection"
import InsightsSection from "@/components/public/InsightsSection"
import CategoriesSection from "@/components/public/CategoriesSection"
import NewsletterSection from "@/components/public/NewsletterSection"

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1920&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-4xl mx-auto drop-shadow-2xl">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6 drop-shadow-lg">
              SUA JORNADA COMEÇA NA <span className="text-primary">SIGA</span><span className="text-secondary uppercase tracking-tight">STORE</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-medium tracking-tight mb-10 drop-shadow-md">
              Descubra os melhores produtos com qualidade impecável e design moderno. 
              Aproveite as ofertas exclusivas da nossa coleção premium.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-16 px-12 text-sm font-black uppercase tracking-widest rounded-none shadow-2xl active:scale-95 transition-all" onClick={() => navigate("/products")}>
                Explorar Coleção
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-8 bg-muted/20">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <Carousel
            items={[
              {
                id: "1",
                image: "/images/carousel/carousel-1.jpg",
                title: "Coleção Exclusiva de Moda",
                subtitle: "Descubra os últimos lançamentos em roupas e acessórios premium",
                cta: "Explorar Coleção",
                ctaLink: "/products?category=Roupas"
              },
              {
                id: "2",
                image: "/images/carousel/carousel-2.jpg",
                title: "Calçados Premium",
                subtitle: "Conforto e estilo em cada passo com nossa seleção exclusiva",
                cta: "Comprar Agora",
                ctaLink: "/products?category=Calçados"
              },
              {
                id: "3",
                image: "/images/carousel/carousel-3.jpg",
                title: "Acessórios de Tendência",
                subtitle: "Complete seu look com acessórios que fazem diferença",
                cta: "Descubrir",
                ctaLink: "/products?category=Acessórios"
              },
              {
                id: "4",
                image: "/images/carousel/carousel-4.jpg",
                title: "Oferta Especial",
                subtitle: "Até 50% de desconto em itens selecionados",
                cta: "Aproveitar Oferta",
                ctaLink: "/products"
              }
            ]}
            autoPlay={true}
            autoPlayInterval={5000}
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tighter uppercase">Destaques da Temporada</h2>
              <div className="h-1 w-20 bg-primary"></div>
            </div>
            <Link to="/products" className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 mb-1">
               Ver Todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
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

      {/* Trends Section */}
      <TrendsSection
        items={[
          {
            id: "1",
            image: "/images/trends/trend-1.jpg",
            category: "Moda",
            title: "Minimalismo Chic",
            tag: "Top Trend"
          },
          {
            id: "2",
            image: "/images/trends/trend-2.jpg",
            category: "Casual",
            title: "Conforto Urbano",
            tag: "Trending"
          },
          {
            id: "3",
            image: "/images/trends/trend-3.jpg",
            category: "Elegant",
            title: "Elegância Atemporal",
            tag: "Popular"
          }
        ]}
      />

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

      {/* Insights Section */}
      <InsightsSection
        posts={[
          {
            id: "1",
            title: "Guia Completo: Como Escolher a Roupa Perfeita",
            excerpt: "Descubra dicas essenciais para montar um guarda-roupa versátil e cheio de estilo",
            image: "/images/banners/banner-1.jpg",
            author: "Maria Silva",
            date: "15 Mar 2024",
            category: "Moda"
          },
          {
            id: "2",
            title: "Tendências de Calçados para 2024",
            excerpt: "Conheça os modelos de sapatos que vão dominar as ruas este ano",
            image: "/images/banners/banner-2.jpg",
            author: "João Santos",
            date: "12 Mar 2024",
            category: "Calçados"
          },
          {
            id: "3",
            title: "Acessórios que Transformam Qualquer Outfit",
            excerpt: "Aprenda a usar acessórios para elevar seu look do básico ao extraordinário",
            image: "/images/carousel/carousel-1.jpg",
            author: "Ana Costa",
            date: "10 Mar 2024",
            category: "Acessórios"
          }
        ]}
      />

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  )
}
