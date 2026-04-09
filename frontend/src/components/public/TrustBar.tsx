import { useState, useEffect } from 'react'
import { Heart, ShieldCheck, Truck } from 'lucide-react'

export const TrustBar = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const items = [
    {
      icon: <Heart className="h-3.5 w-3.5 text-primary" />,
      title: "100% Autenticidade",
      description: "Produtos genuínos e verificados",
      bgColor: "bg-primary/5"
    },
    {
      icon: <ShieldCheck className="h-3.5 w-3.5 text-secondary" />,
      title: "Compra Segura",
      description: "Gateways de alta proteção",
      bgColor: "bg-secondary/5"
    },
    {
      icon: <Truck className="h-3.5 w-3.5 text-primary" />,
      title: "Entrega Rápida",
      description: "Envio em até 2 dias úteis",
      bgColor: "bg-primary/5"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [items.length])

  return (
    <div className="w-full bg-zinc-100/80 backdrop-blur-md border-b border-zinc-200 relative z-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Desktop View: Static Row of 3 */}
        <div className="hidden md:flex flex-row items-center justify-between">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="group flex-1 flex items-center justify-center gap-4 py-2.5 px-6 relative"
            >
              {idx !== items.length - 1 && (
                <div className="hidden md:block absolute right-0 h-4 w-[1px] bg-zinc-300/60" />
              )}
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${item.bgColor} transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110 shadow-sm`}>
                {item.icon}
              </div>
              <div className="flex flex-col">
                <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/90 transition-colors group-hover:text-primary leading-tight">
                  {item.title}
                </h4>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-60 mt-0.5 leading-tight">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View: Automatic Carousel */}
        <div className="flex md:hidden h-12 items-center justify-center">
          {items.map((item, idx) => {
            const isActive = idx === activeIndex
            const isPrevious = idx === (activeIndex - 1 + items.length) % items.length
            
            return (
              <div 
                key={idx} 
                className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-1000 px-4 ${
                  isActive 
                    ? "opacity-100 translate-y-0 scale-100 visible" 
                    : isPrevious 
                      ? "opacity-0 -translate-y-4 scale-95 invisible" 
                      : "opacity-0 translate-y-4 scale-95 invisible"
                }`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <div className={`flex items-center justify-center h-7 w-7 rounded-full ${item.bgColor} shadow-sm transition-transform duration-1000 ${isActive ? 'scale-100' : 'scale-50'}`}>
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.12em] text-foreground/90 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-60 mt-0.5 leading-tight">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
