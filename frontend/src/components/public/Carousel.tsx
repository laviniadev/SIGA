import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
  variant?: 'default' | 'hero'
}

export default function Carousel({ 
  items, 
  autoPlay = true, 
  autoPlayInterval = 5000,
  variant = 'default'
}: CarouselProps) {
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

  const isHero = variant === 'hero'

  return (
    <div className={`relative overflow-hidden w-full max-w-full group ${
      isHero ? 'h-[45vh] md:h-[60vh]' : 'h-[200px] sm:h-[250px] md:h-[300px] lg:h-[380px] rounded-xl sm:rounded-2xl'
    }`}>
      {/* Slides */}
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 overflow-hidden w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={item.image}
            alt={item.title}
            className={`w-full h-full object-cover transition-transform duration-[5000ms] ${
              index === currentIndex ? 'scale-110' : 'scale-100'
            }`}
          />
          <div className={`absolute inset-0 ${
            isHero 
              ? 'bg-gradient-to-t from-black/80 via-black/40 to-transparent' 
              : 'bg-gradient-to-t from-black/70 via-black/30 to-transparent'
          }`} />

          {index === currentIndex && (
            <div className={`absolute inset-0 flex items-center justify-center p-6 md:p-8 text-center text-white ${
              !isHero && 'items-end'
            }`}>
              <div className={`animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-4xl px-4 ${
                isHero ? 'pt-16 sm:pt-20 md:pt-24 pb-20' : 'text-left w-full translate-y-0'
              }`}>
                {isHero ? (
                  <>
                    <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-[1.1] mb-3 md:mb-5 drop-shadow-2xl uppercase">
                      {item.title}
                    </h1>
                    <p className="text-white/90 text-[10px] sm:text-xs md:text-sm lg:text-base max-w-lg mx-auto font-medium tracking-tight mb-5 md:mb-8 drop-shadow-md whitespace-pre-line">
                      {item.subtitle}
                    </p>
                    <button 
                      className="h-9 md:h-12 px-6 md:px-10 text-[9px] md:text-[11px] font-black uppercase tracking-widest rounded-none shadow-2xl active:scale-95 transition-all bg-primary hover:bg-primary/90 text-white"
                      onClick={() => window.location.href = item.ctaLink}
                    >
                      {item.cta}
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-black tracking-tight mb-1 md:mb-2 text-white">
                      {item.title}
                    </h3>
                    <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-white/90 mb-2 md:mb-4 max-w-xs sm:max-w-lg lg:max-w-xl line-clamp-2 sm:line-clamp-none">
                      {item.subtitle}
                    </p>
                    <button
                      className="bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-full px-4 md:px-6 text-[8px] md:text-[10px] h-7 md:h-9 lg:h-10"
                      onClick={() => window.location.href = item.ctaLink}
                    >
                      {item.cta}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 ${
          isHero ? 'sm:p-4' : ''
        }`}
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={goToNext}
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 ${
          isHero ? 'sm:p-4' : ''
        }`}
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>

      {/* Dots */}
      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2 ${
        isHero ? 'md:bottom-10' : ''
      }`}>
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary w-8 md:w-12'
                : 'bg-white/30 w-1.5 md:w-2 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
