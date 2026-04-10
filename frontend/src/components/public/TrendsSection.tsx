import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface TrendItem {
  id: string
  image: string
  category: string
  title: string
  tag: string
}

export default function TrendsSection() {
  const offers = [
    { id: 4, tag: "OFERTA RELÂMPAGO", image: "/products/watch-1.jpg" },
    { id: 3, tag: "80% OFF", image: "/products/backpack-1.jpg" },
    { id: 2, tag: "50% OFF", image: "/products/sneaker-1.jpg" },
  ];

  const trends = [
    { id: 2, tag: "#EstiloUrbano", image: "/products/sneaker-2.jpg" },
    { id: 9, tag: "#Minimalista", image: "/products/hightop-1.jpg" },
    { id: 7, tag: "#Premium", image: "/products/leather-1.jpg" },
  ];

  return (
    <section className="py-4 md:py-6 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          
          {/* Ofertas Section */}
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <h2 className="text-lg md:text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
                  Ofertas
                </h2>
                <div className="h-1 w-16 bg-primary"></div>
              </div>
              <Link to="/offers" className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all flex items-center gap-2 whitespace-nowrap group">
                Ver Tudo <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {offers.map((item) => (
                <Link 
                  key={item.id} 
                  to={`/product/${item.id}`}
                  className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-muted shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                >
                  <img src={item.image} alt="Oferta" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute inset-x-0 bottom-0 p-2 sm:p-4">
                    <div className="bg-primary text-white py-1 px-2 text-center transform -skew-x-12 shadow-md">
                      <span className="block skew-x-12 text-[8px] sm:text-[10px] md:text-xs font-black italic">{item.tag}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Tendências Section */}
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <h2 className="text-lg md:text-2xl font-black tracking-tighter uppercase flex items-center gap-2 text-foreground">
                   Tendências
                </h2>
                <div className="h-1 w-16 bg-secondary"></div>
              </div>
              <Link to="/trends" className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all flex items-center gap-2 whitespace-nowrap group">
                Ver Tudo <ChevronRight className="h-4 w-4 text-secondary transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {trends.map((item) => (
                <Link 
                  key={item.id} 
                  to={`/product/${item.id}`}
                  className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-muted shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                >
                  <img src={item.image} alt="Tendência" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity" />
                  <div className="absolute inset-x-0 bottom-0 p-2 sm:p-4">
                    <div className="bg-white/90 backdrop-blur-sm text-secondary py-1 px-2 text-center border-b-2 border-secondary shadow-sm">
                      <span className="block text-[8px] sm:text-[10px] md:text-xs font-black italic tracking-tight">{item.tag}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
