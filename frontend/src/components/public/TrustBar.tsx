import { Heart, ShieldCheck, Truck } from 'lucide-react'

export const TrustBar = () => {
  const items = [
    {
      icon: <Heart className="h-4 w-4 md:h-5 md:w-5 text-primary" />,
      title: "100% Autenticidade",
      description: "Produtos genuínos e verificados",
      bgColor: "bg-primary/5"
    },
    {
      icon: <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-secondary" />,
      title: "Compra Segura",
      description: "Gateways de alta proteção",
      bgColor: "bg-secondary/5"
    },
    {
      icon: <Truck className="h-4 w-4 md:h-5 md:w-5 text-primary" />,
      title: "Entrega Rápida",
      description: "Envio em até 2 dias úteis",
      bgColor: "bg-primary/5"
    }
  ]

  return (
    <div className="w-full bg-zinc-100/80 backdrop-blur-md border-b border-zinc-200 relative z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="group flex-1 flex items-center justify-center gap-4 py-2.5 px-6 relative"
            >
              {/* Subtle Vertical Divider for Desktop */}
              {idx !== items.length - 1 && (
                <div className="hidden md:block absolute right-0 h-4 w-[1px] bg-zinc-300/60" />
              )}
              
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${item.bgColor} transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110 shadow-sm`}>
                {item.icon}
              </div>
              
              <div className="flex flex-col">
                <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/90 transition-colors group-hover:text-primary">
                  {item.title}
                </h4>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-60 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
