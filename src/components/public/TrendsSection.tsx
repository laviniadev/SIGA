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
    <section className="py-12 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-primary">Tendências</span>
            </div>
            <h2 className="text-4xl font-black tracking-tighter uppercase">O Que Está em Alta</h2>
            <div className="h-1 w-20 bg-primary"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 group-hover:p-8 transition-all duration-300">
                <div className="space-y-2">
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-primary text-white px-3 py-1 rounded-full w-fit">
                    {item.tag}
                  </span>
                  <p className="text-xs text-white/70 font-bold uppercase tracking-widest">
                    {item.category}
                  </p>
                  <h3 className="text-2xl font-black text-white leading-tight group-hover:text-primary transition-colors">
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
