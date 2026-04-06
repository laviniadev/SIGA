import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { mockProducts } from "@/data/mockProducts"
import { ProductCard } from "@/components/public/ProductCard"

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

      {/* Featured Products */}
      <section className="py-24">
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
    </div>
  )
}
