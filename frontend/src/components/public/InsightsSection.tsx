import { ChevronRight, Calendar, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  category: string
}

interface InsightsSectionProps {
  posts: BlogPost[]
}

export default function InsightsSection({ posts }: InsightsSectionProps) {
  return (
    <section className="py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0 mb-10 md:mb-16">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase">Insights e Dicas</h2>
            <div className="h-1 w-20 bg-secondary"></div>
          </div>
          <Button variant="ghost" className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-secondary p-0 h-auto">
            Ver Todos <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group rounded-lg sm:rounded-2xl overflow-hidden border border-muted hover:border-secondary transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10"
            >
              <div className="relative overflow-hidden aspect-video bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span className="inline-block text-[8px] sm:text-[10px] font-black uppercase tracking-widest bg-secondary text-white px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-3 md:space-y-4">
                <h3 className="text-base sm:text-xl font-black group-hover:text-secondary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[12px] sm:text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex gap-2 sm:gap-4 text-[8px] sm:text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="w-full text-secondary font-bold uppercase tracking-widest text-[10px] sm:text-xs group/btn p-2 h-auto"
                >
                  Ler Artigo
                  <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
