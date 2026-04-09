import { Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Category {
  id: string
  name: string
  count: number
  icon: string
  color: string
}

interface CategoriesSectionProps {
  categories: Category[]
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  const iconMap: { [key: string]: JSX.Element } = {
    zap: <Zap className="h-8 w-8" />,
  }

  return (
    <section className="py-10 md:py-12 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="space-y-2 mb-10 md:mb-16">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-primary">Navegue por Categoria</span>
          </div>
          <h2 className="text-lg md:text-2xl font-black tracking-tighter uppercase">Categorias em Destaque</h2>
          <div className="h-1 w-20 bg-primary"></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative overflow-hidden rounded-lg md:rounded-2xl p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${category.color}20 0%, transparent 100%)`,
                border: `2px solid ${category.color}30`,
              }}
            >
              <div className="space-y-2 md:space-y-3 relative z-10">
                <div
                  className="h-10 w-10 md:h-12 md:w-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${category.color}40`, color: category.color }}
                >
                  {iconMap.zap}
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-lg group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-[9px] md:text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">
                    {category.count} Produtos
                  </p>
                </div>
              </div>

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ backgroundColor: category.color }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
