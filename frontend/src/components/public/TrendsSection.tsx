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
    <section className="pt-8 pb-6 md:pt-12 md:pb-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 md:gap-16">
          
          {/* Ofertas Section */}
          <div className="relative block group bg-card hover:bg-card/80 border border-foreground/10 shadow-sm hover:shadow-md md:bg-transparent md:border-transparent md:shadow-none md:hover:bg-transparent md:hover:shadow-none p-2 md:p-0 rounded-2xl md:rounded-none transition-all outline-none">
            
            {/* Link Invisível Mobile Overlay */}
            <Link to="/offers" className="absolute inset-0 z-10 md:hidden" aria-label="Ver todas as Ofertas" />
            
            {/* Header */}
            <div className="flex justify-between items-center md:items-end px-0.5 md:px-0 mb-1.5 md:mb-8 relative z-20 pointer-events-none md:pointer-events-auto">
              <div className="space-y-0 md:space-y-2">
                <h2 className="text-[10px] sm:text-sm md:text-2xl font-black tracking-tighter uppercase text-foreground md:flex md:items-center md:gap-2">
                  Ofertas
                </h2>
                <div className="hidden md:block h-1 w-16 bg-primary"></div>
              </div>
              <Link to="/offers" className="text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground transition-all flex items-center gap-0.5 md:gap-2 whitespace-nowrap group-hover:text-foreground">
                <span className="hidden sm:inline md:inline">Ver Tudo</span>
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 sm:gap-3 md:gap-4 lg:gap-6 aspect-[4/5] sm:aspect-square md:aspect-auto relative z-20 pointer-events-none md:pointer-events-auto">
              {/* Imagem Principal (Mobile Esq / Desktop Item 1) */}
              <Link to={`/product/${offers[0].id}`} className="block relative group/item overflow-hidden rounded-lg sm:rounded-xl md:rounded-xl bg-muted shadow-sm md:shadow-sm hover:shadow-xl transition-all duration-500 md:aspect-[4/5]">
                <img src={offers[0].image} alt="Oferta Principal" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 max-md:group-hover:scale-105 md:group-hover/item:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 md:from-black/90 via-transparent to-transparent opacity-60 md:opacity-60 max-md:group-hover:opacity-80 md:group-hover/item:opacity-80 transition-opacity" />
                <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-3 md:p-4">
                  <div className="bg-primary text-white py-1 px-1.5 sm:px-2 md:py-1 md:px-2 text-center transform -skew-x-12 shadow-sm md:shadow-md">
                    <span className="block skew-x-12 text-[7px] sm:text-xs md:text-xs font-black italic">{offers[0].tag}</span>
                  </div>
                </div>
              </Link>

              {/* Imagens Menores (Mobile Dir / Desktop Item 2, 3) */}
              <div className="grid grid-rows-2 md:contents gap-1.5 sm:gap-3 h-full">
                {offers.slice(1).map((item) => (
                  <Link to={`/product/${item.id}`} key={item.id} className="block relative group/item overflow-hidden rounded-lg sm:rounded-xl md:rounded-xl bg-muted shadow-sm md:shadow-sm md:hover:shadow-xl transition-all duration-500 md:aspect-[4/5]">
                    <img src={item.image} alt="Oferta" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 max-md:group-hover:scale-105 md:group-hover/item:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 md:from-black/90 via-transparent to-transparent opacity-60 md:opacity-60 max-md:group-hover:opacity-80 md:group-hover/item:opacity-80 transition-opacity" />
                    <div className="absolute inset-x-0 bottom-0 p-1 sm:p-2 md:p-4">
                      <div className="bg-primary text-white py-0.5 px-1 sm:py-1 sm:px-2 md:py-1 md:px-2 text-center transform -skew-x-12 shadow-sm md:shadow-md">
                        <span className="block skew-x-12 text-[5px] sm:text-[10px] md:text-xs font-black italic whitespace-nowrap overflow-hidden text-ellipsis">{item.tag}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Tendências Section */}
          <div className="relative block group bg-card md:bg-transparent hover:bg-card/80 md:hover:bg-transparent border border-foreground/10 md:border-transparent shadow-sm md:shadow-none hover:shadow-md md:hover:shadow-none p-2 md:p-0 rounded-2xl md:rounded-none transition-all outline-none">
            
            {/* Link Invisível Mobile Overlay */}
            <Link to="/trends" className="absolute inset-0 z-10 md:hidden" aria-label="Ver todas as Tendências" />

            {/* Header */}
            <div className="flex justify-between items-center md:items-end px-0.5 md:px-0 mb-1.5 md:mb-8 relative z-20 pointer-events-none md:pointer-events-auto">
              <div className="space-y-0 md:space-y-2">
                <h2 className="text-[10px] sm:text-sm md:text-2xl font-black tracking-tighter uppercase text-foreground md:flex md:items-center md:gap-2">
                   Tendências
                </h2>
                <div className="hidden md:block h-1 w-16 bg-secondary"></div>
              </div>
              <Link to="/trends" className="text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground transition-all flex items-center gap-0.5 md:gap-2 whitespace-nowrap group-hover:text-foreground">
                <span className="hidden sm:inline md:inline">Ver Tudo</span>
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-secondary transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 sm:gap-3 md:gap-4 lg:gap-6 aspect-[4/5] sm:aspect-square md:aspect-auto relative z-20 pointer-events-none md:pointer-events-auto">
              {/* Imagem Principal (Esquerda) */}
              <Link to={`/product/${trends[0].id}`} className="block relative group/item overflow-hidden rounded-lg sm:rounded-xl md:rounded-xl bg-muted shadow-sm md:shadow-sm hover:shadow-xl transition-all duration-500 md:aspect-[4/5]">
                <img src={trends[0].image} alt="Tendência Principal" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 max-md:group-hover:scale-105 md:group-hover/item:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 md:from-secondary/80 via-transparent to-transparent opacity-40 md:opacity-40 max-md:group-hover:opacity-70 md:group-hover/item:opacity-70 transition-opacity" />
                <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-3 md:p-4">
                  <div className="bg-white/90 backdrop-blur-sm text-secondary py-1 px-1.5 sm:px-2 md:py-1 md:px-2 text-center border-b-2 border-secondary shadow-sm md:shadow-sm">
                    <span className="block text-[7px] sm:text-xs md:text-xs font-black italic tracking-tight">{trends[0].tag}</span>
                  </div>
                </div>
              </Link>

              {/* Imagens Menores Empilhadas (Direita) */}
              <div className="grid grid-rows-2 md:contents gap-1.5 sm:gap-3 h-full">
                {trends.slice(1).map((item) => (
                  <Link to={`/product/${item.id}`} key={item.id} className="block relative group/item overflow-hidden rounded-lg sm:rounded-xl md:rounded-xl bg-muted shadow-sm md:shadow-sm md:hover:shadow-xl transition-all duration-500 md:aspect-[4/5]">
                    <img src={item.image} alt="Tendência" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 max-md:group-hover:scale-105 md:group-hover/item:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 md:from-secondary/80 via-transparent to-transparent opacity-40 md:opacity-40 max-md:group-hover:opacity-70 md:group-hover/item:opacity-70 transition-opacity" />
                    <div className="absolute inset-x-0 bottom-0 p-1 sm:p-2 md:p-4">
                      <div className="bg-white/90 backdrop-blur-sm text-secondary py-0.5 px-1 sm:py-1 sm:px-2 md:py-1 md:px-2 text-center border-b-[1px] md:border-b-2 border-secondary shadow-sm md:shadow-sm">
                        <span className="block text-[5px] sm:text-[10px] md:text-xs font-black italic tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">{item.tag}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
