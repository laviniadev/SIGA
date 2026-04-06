import { ArrowRight, Calendar, User } from 'lucide-react'
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
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tighter uppercase">Insights e Dicas</h2>
            <div className="h-1 w-20 bg-secondary"></div>
          </div>
          <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-secondary">
            Ver Todos <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group rounded-2xl overflow-hidden border border-muted hover:border-secondary transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10"
            >
              <div className="relative overflow-hidden aspect-video bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-secondary text-white px-3 py-1.5 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-black group-hover:text-secondary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex gap-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
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
                  className="w-full text-secondary font-bold uppercase tracking-widest text-xs group/btn"
                >
                  Ler Artigo
                  <ArrowRight className="h-3 w-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
