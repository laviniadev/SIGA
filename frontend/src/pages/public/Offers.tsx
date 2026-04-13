import { mockProducts } from "@/data/mockProducts"
import { useState, useEffect } from "react"
import { ProductCard } from "@/components/public/ProductCard"
import { 
  Timer, Flame, Zap, Gift, 
  BadgePercent,
  Package, ArrowRight
} from "lucide-react"
import { Link } from "react-router-dom"
import Carousel from "@/components/public/Carousel"
import NewsletterSection from "@/components/public/NewsletterSection"
import { toast } from "sonner"

/* ─────────── Countdown Timer Hook ─────────── */
function useCountdown(targetDate: Date) {
  const calcTimeLeft = () => {
    const diff = +targetDate - +new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

/* ─────────── Countdown Display Component ─────────── */
function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="bg-zinc-900 text-orange-400 font-extrabold text-base sm:text-xl md:text-2xl tabular-nums w-9 sm:w-12 md:w-14 h-9 sm:h-12 md:h-14 flex items-center justify-center rounded-lg shadow-lg shadow-orange-500/20 border border-orange-500/30">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[7px] sm:text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-orange-300/70 mt-1">{label}</span>
    </div>
  );
}

/* ─────────── Animated Urgency Bar ─────────── */
function UrgencyBar() {
  const messages = [
    "🔥 234 pessoas estão vendo essas ofertas agora",
    "⚡ 12 itens vendidos na última hora",
    "🏷️ Preços mais baixos do ano — só hoje!",
    "🚚 Frete grátis acima de R$ 199",
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent(p => (p + 1) % messages.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-orange-500 text-white overflow-hidden relative h-8 sm:h-9 flex items-center">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" />
      <p 
        key={current}
        className="text-center w-full text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2 duration-500"
      >
        {messages[current]}
      </p>
    </div>
  );
}

/* ─────────── Main Offers Page ─────────── */
export default function Offers() {
  // Set countdown to end of today
  const endOfPromo = new Date();
  endOfPromo.setHours(23, 59, 59, 999);
  const timeLeft = useCountdown(endOfPromo);

  // Products
  const offerIds = ["2", "3", "4", "6", "8", "10", "1", "5", "7", "9", "11", "12"];
  const allOffers = mockProducts.filter(p => offerIds.includes(p.id));
  const flashDeals = allOffers.slice(0, 3);
  const lastUnits = allOffers.slice(3, 6);

  // Discount simulator
  const getDiscount = (price: number) => {
    if (price > 500) return 40;
    if (price > 200) return 30;
    if (price > 100) return 20;
    return 15;
  };

  // Carousel hero items — orange themed
  const carouselItems = [
    {
      id: "offer-hero-1",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1920&q=80",
      title: "MEGA QUEIMA DE ESTOQUE",
      subtitle: "Até 70% OFF nos calçados mais desejados. Não perca esta chance única de renovar seu guarda-roupa.",
      cta: "Garantir Agora",
      ctaLink: `/product/${allOffers[0]?.id || "2"}`
    },
    {
      id: "offer-hero-2",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1920&q=80",
      title: "CÓDIGO: SIGA50",
      subtitle: "Use o cupom na finalização e ganhe 50% de desconto extra. Válido apenas hoje — corra!",
      cta: "Usar Cupom",
      ctaLink: `/product/${allOffers[1]?.id || "3"}`
    },
    {
      id: "offer-hero-3",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1920&q=80",
      title: "LIQUIDAÇÃO FINAL",
      subtitle: "Acessórios premium a preço de custo. Estoque limitadíssimo — quando acabar, acabou!",
      cta: "Comprar Agora",
      ctaLink: `/product/${allOffers[2]?.id || "4"}`
    }
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ═══════ Urgency Ticker Bar ═══════ */}
      <UrgencyBar />

      {/* ═══════ Hero Carousel ═══════ */}
      <section className="relative w-full overflow-hidden bg-zinc-950">
        <Carousel items={carouselItems} variant="hero" autoPlayInterval={4500} />
      </section>

      {/* ═══════ Main Countdown Timer Strip ═══════ */}
      <section className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-5 md:py-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-200 animate-pulse" />
                <span className="text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-orange-100">Oferta por tempo limitado</span>
              </div>
              <h2 className="text-white text-lg md:text-2xl font-extrabold uppercase tracking-tighter">
                A promoção acaba em:
              </h2>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
              <CountdownBlock value={timeLeft.days} label="Dias" />
              <span className="text-orange-200 font-extrabold text-lg sm:text-xl md:text-2xl animate-pulse mb-3">:</span>
              <CountdownBlock value={timeLeft.hours} label="Horas" />
              <span className="text-orange-200 font-extrabold text-lg sm:text-xl md:text-2xl animate-pulse mb-3">:</span>
              <CountdownBlock value={timeLeft.minutes} label="Min" />
              <span className="text-orange-200 font-extrabold text-lg sm:text-xl md:text-2xl animate-pulse mb-3">:</span>
              <CountdownBlock value={timeLeft.seconds} label="Seg" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Gradient wrapper from Últimas Unidades to Newsletter ═══════ */}
      <div className="bg-gradient-to-b from-orange-50/80 via-white to-white">

        {/* ═══════ Últimas Unidades — Urgency Section ═══════ */}
        <section className="py-6 md:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="flex items-center gap-3 mb-2 md:mb-8">
              <div className="bg-red-500 p-2 rounded-lg shadow-lg shadow-red-500/30 animate-pulse">
                <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg md:text-2xl font-extrabold tracking-tighter uppercase">Últimas Unidades</h2>
                <p className="text-red-500 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">Quando acabar, acabou!</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {lastUnits.map((product, i) => {
                const unitsLeft = 3 - i;
                const discount = getDiscount(product.price);
                const originalPrice = (product.price / (1 - discount / 100)).toFixed(2);

                return (
                  <Link 
                    to={`/product/${product.id}`} 
                    key={product.id}
                    className="group flex items-center gap-4 bg-card border border-orange-200/50 dark:border-orange-900/30 hover:border-orange-400 dark:hover:border-orange-500/50 p-3 sm:p-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5"
                  >
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-muted/30 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-1 left-1 bg-orange-500 text-white text-[7px] sm:text-[8px] font-black px-1.5 py-0.5 rounded shadow">
                        -{discount}%
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xs sm:text-sm uppercase tracking-tight text-foreground line-clamp-1 group-hover:text-orange-500 transition-colors">{product.name}</h3>
                      <div className="flex items-baseline gap-2 mt-1.5">
                        <span className="text-orange-500 font-extrabold text-sm sm:text-base tabular-nums">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                        </span>
                        <span className="text-muted-foreground text-[9px] sm:text-[10px] line-through tabular-nums">
                          R$ {originalPrice}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="bg-red-500/10 text-red-500 text-[7px] sm:text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-red-500/20 animate-pulse">
                          🔥 {unitsLeft === 1 ? "Última unidade!" : `Restam ${unitsLeft}!`}
                        </span>
                      </div>
                    </div>

                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-orange-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════ Coupon Banner ═══════ */}
        <section className="relative overflow-hidden">
          <div className="bg-white/70 dark:bg-card/70 backdrop-blur-sm border-y border-orange-200/50 dark:border-orange-800/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-5 md:py-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-orange-500 p-2 rounded-lg shadow-lg shadow-orange-500/20 flex-shrink-0">
                    <Gift className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-0.5">Cupom exclusivo</p>
                    <p className="text-xs sm:text-sm md:text-base font-bold text-foreground uppercase tracking-tight">
                      Use o código <span className="text-orange-500 bg-orange-100 dark:bg-orange-500/20 px-2 py-0.5 rounded mx-1 border border-orange-300 dark:border-orange-500/40 border-dashed">SIGA50</span> e ganhe 15% OFF
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText("SIGA50");
                    toast.success("Cupom copiado com sucesso!");
                  }}
                  className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[10px] md:text-xs uppercase tracking-widest px-5 sm:px-6 py-2 sm:py-2.5 rounded-none shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
                >
                  Copiar Cupom
                  <BadgePercent className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ Flash Deals — Ofertas Relâmpago ═══════ */}
        <section className="py-6 md:py-10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-6 mb-2 md:mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500 p-2 rounded-lg shadow-lg shadow-orange-500/30">
                  <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg md:text-2xl font-extrabold tracking-tighter uppercase">Ofertas Relâmpago</h2>
                  <div className="h-1 w-20 bg-orange-500"></div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-sm border border-orange-500/20">
                <Timer className="h-3 w-3 animate-pulse" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest tabular-nums">
                  Termina em {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {flashDeals.map((product, i) => {
                const discount = getDiscount(product.price);

                return (
                  <div key={product.id} className="relative">
                    {/* Discount Badge */}
                    <div className="absolute top-2 left-2 z-20">
                      <div className="bg-orange-500 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-lg shadow-orange-500/40 transform -skew-x-6">
                        <span className="block skew-x-6 text-[8px] sm:text-[10px] md:text-xs font-bold">-{discount}%</span>
                      </div>
                    </div>
                    
                    {/* Flash icon */}
                    <div className="absolute top-2 right-2 z-20">
                      <div className="bg-yellow-400 text-zinc-900 p-1 sm:p-1.5 rounded-full shadow-lg animate-pulse">
                        <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      </div>
                    </div>

                    <ProductCard
                      product={{ ...product, price: product.price * (1 - discount / 100) }}
                      originalPrice={product.price}
                      animationDelay={`${i * 50}ms`}
                      compact={true}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════ Newsletter ═══════ */}
        <NewsletterSection />

      </div>
    </div>
  )
}
