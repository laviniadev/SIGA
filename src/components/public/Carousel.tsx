import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CarouselItem {
  id: string
  image: string
  title: string
  subtitle: string
  cta: string
  ctaLink: string
}

interface CarouselProps {
  items: CarouselItem[]
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function Carousel({ items, autoPlay = true, autoPlayInterval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, items.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index % items.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }


  return (
    <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[380px] overflow-hidden rounded-xl sm:rounded-2xl group">
      {/* Slides */}
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {index === currentIndex && (
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 md:p-8 lg:p-12 text-white animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-black tracking-tight mb-2 md:mb-3">
                {item.title}
              </h3>
              <p className="text-[10px] sm:text-xs md:text-lg text-white/90 mb-3 md:mb-6 max-w-xs sm:max-w-xl lg:max-w-2xl line-clamp-2 sm:line-clamp-none">
                {item.subtitle}
              </p>
              <Button
                size="sm"
                className="bg-primary hover:bg-orange-600 text-white font-black uppercase tracking-widest rounded-full px-4 md:px-8 text-[10px] md:text-sm h-8 md:h-10 lg:h-12"
                onClick={() => window.location.href = item.ctaLink}
              >
                {item.cta}
              </Button>
            </div>
          )}
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1 sm:gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary w-8'
                : 'bg-white/40 w-2 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
