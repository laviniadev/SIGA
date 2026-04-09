import { TrendingUp } from 'lucide-react'

interface TrendItem {
  id: string
  image: string
  category: string
  title: string
  tag: string
}

interface TrendsProps {
  items: TrendItem[]
}

export default function TrendsSection() {
  const offers = [
    { id: 1, tag: "OFERTA RELÂMPAGO", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" },
    { id: 2, tag: "80% OFF", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80" },
    { id: 3, tag: "50% OFF", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" },
  ];

  const trends = [
    { id: 1, tag: "#EstiloUrbano", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=400&q=80" },
    { id: 2, tag: "#Minimalista", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80" },
    { id: 3, tag: "#Premium", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=400&q=80" },
  ];

  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Ofertas Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-primary/20 pb-4">
              <h2 className="text-lg md:text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
                <span className="text-primary">●</span> Ofertas
              </h2>
              <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Ver Tudo</button>
            </div>
            
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {offers.map((item) => (
                <div key={item.id} className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-muted shadow-sm hover:shadow-xl transition-all duration-500">
                  <img src={item.image} alt="Oferta" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute inset-x-0 bottom-0 p-2 sm:p-4">
                    <div className="bg-primary text-white py-1 px-2 text-center transform -skew-x-12 shadow-md">
                      <span className="block skew-x-12 text-[8px] sm:text-[10px] md:text-xs font-black italic">{item.tag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tendências Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-secondary/20 pb-4">
              <h2 className="text-lg md:text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
                <span className="text-secondary">●</span> Tendências
              </h2>
              <button className="text-[10px] font-black uppercase tracking-widest text-secondary hover:underline">Explorar</button>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {trends.map((item) => (
                <div key={item.id} className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-muted shadow-sm hover:shadow-xl transition-all duration-500">
                  <img src={item.image} alt="Tendência" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity" />
                  <div className="absolute inset-x-0 bottom-0 p-2 sm:p-4">
                    <div className="bg-white/90 backdrop-blur-sm text-secondary py-1 px-2 text-center border-b-2 border-secondary shadow-sm">
                      <span className="block text-[8px] sm:text-[10px] md:text-xs font-black italic tracking-tight">{item.tag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
