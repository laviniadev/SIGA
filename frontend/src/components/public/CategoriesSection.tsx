import { Shirt, Footprints, Watch, Tag, Filter, ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

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
  const [isOpen, setIsOpen] = useState(false)

  const iconMap: { [key: string]: React.ReactNode } = {
    shirt: <Shirt className="h-full w-full" />,
    footprints: <Footprints className="h-full w-full" />,
    watch: <Watch className="h-full w-full" />,
    tag: <Tag className="h-full w-full" />,
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-center md:items-start">
        <Button 
          onClick={() => setIsOpen(!isOpen)}
          variant="outline" 
          className={`flex items-center gap-2 border-2 px-5 py-3 md:px-8 md:py-4 rounded-none text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
            isOpen 
              ? 'bg-foreground text-background border-foreground' 
              : 'hover:bg-foreground hover:text-background border-muted-foreground/30'
          }`}
        >
          <Filter className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} /> 
          Filtros
          {isOpen ? <ChevronUp className="w-3 h-3 md:w-4 md:h-4" /> : <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />}
        </Button>

        <div className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'
        }`}>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group relative overflow-hidden rounded-xl p-3 md:p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.03] border border-muted"
                style={{
                  background: `linear-gradient(135deg, ${category.color}15 0%, transparent 100%)`,
                  borderLeft: `4px solid ${category.color}`,
                }}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <div
                    className="h-8 w-8 md:h-10 md:w-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0 p-1.5 md:p-2"
                    style={{ backgroundColor: `${category.color}30`, color: category.color }}
                  >
                    {iconMap[category.icon]}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-xs md:text-sm group-hover:text-primary transition-colors truncate uppercase tracking-tight text-foreground">
                      {category.name}
                    </h3>
                    <p className="text-[8px] md:text-[9px] text-muted-foreground font-black uppercase tracking-widest mt-0.5">
                      {category.count} Itens
                    </p>
                  </div>
                </div>

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  style={{ backgroundColor: category.color }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
