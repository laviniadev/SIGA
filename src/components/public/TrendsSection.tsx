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

export default function TrendsSection({ items }: TrendsProps) {
  return (
    <section className="py-10 md:py-12 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col gap-4 mb-10 md:mb-16">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              <span className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-primary">Tendências</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase">O Que Está em Alta</h2>
            <div className="h-1 w-20 bg-primary"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl aspect-square cursor-pointer">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-6 group-hover:sm:p-8 transition-all duration-300">
                <div className="space-y-1 sm:space-y-2">
                  <span className="inline-block text-[8px] sm:text-[10px] font-black uppercase tracking-widest bg-primary text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full w-fit">
                    {item.tag}
                  </span>
                  <p className="text-[9px] sm:text-xs text-white/70 font-bold uppercase tracking-widest">
                    {item.category}
                  </p>
                  <h3 className="text-lg sm:text-2xl font-black text-white leading-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white font-black text-sm">Ver Coleção</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
