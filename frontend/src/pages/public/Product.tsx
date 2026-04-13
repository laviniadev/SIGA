import { Button } from "@/components/ui/button"
import { Star, StarHalf, ChevronLeft, ChevronDown, ChevronUp, Truck, ShieldCheck, RefreshCw, ChevronRight } from "lucide-react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { mockProducts } from "@/data/mockProducts"
import { useCartStore } from "@/stores/useCartStore"
import { useState, useEffect, useRef, useCallback, type MouseEvent as ReactMouseEvent } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

import { ProductCard } from "@/components/public/ProductCard"
import { FreightCalculator } from "@/components/public/FreightCalculator"

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  
  const product = mockProducts.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [openSection, setOpenSection] = useState<string | null>("description");
  const [activeImage, setActiveImage] = useState<string>(product?.image || "");

  // Zoom lens state
  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 }); // percentage 0-100
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const ZOOM_SIZE = 300; // popup size in px
  const ZOOM_FACTOR = 3; // magnification
  
  // [x] Fase 1: Atualização do `mockProducts.ts` (12 itens)
  // [x] Fase 2: Refatoração do Infinite Scroll em `Product.tsx`
  // [x] Fase 3: Implementação do Infinite Scroll em `ProductsList.tsx`
  // [x] Fase 4: Validação final e polimento visual
  
  // Infinite Scroll State
  const [displayProducts, setDisplayProducts] = useState<typeof mockProducts>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (product) {
      // Começar com produtos da mesma categoria (excluindo o atual)
      const recommendations = mockProducts.filter(p => p.category === product.category && p.id !== product.id);
      
      // Se não houver da mesma categoria, pegar outros aleatórios
      if (recommendations.length === 0) {
        const others = mockProducts.filter(p => p.id !== product.id);
        setDisplayProducts(others.slice(0, 5));
        setHasMore(others.length > 5);
      } else {
        setDisplayProducts(recommendations.slice(0, 5));
        // Se houver menos de 5 da mesma categoria, ainda podemos ter mais do catálogo global
        setHasMore(recommendations.length > 5 || mockProducts.length > (recommendations.length + 1));
      }

      window.scrollTo(0, 0);
      setSelectedSize("");
      setActiveImage(product.image);
    }
  }, [product, id]);

  const lastProductElementRef = useCallback((node: HTMLElement | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [hasMore, displayProducts.length, isLoading]);

  const loadMore = () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const currentIds = displayProducts.map(p => p.id);
      const available = mockProducts.filter(p => !currentIds.includes(p.id) && p.id !== product?.id);
      
      if (available.length > 0) {
        const nextBatch = available.slice(0, 5);
        setDisplayProducts(prev => [...prev, ...nextBatch]);
        setHasMore(available.length > 5);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 600);
  };

  if (!product) {
    return (
      <div className="py-32 text-center">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
          <Button onClick={() => navigate("/products")}>Voltar para a Loja</Button>
        </div>
      </div>
    );
  }

  // Promo and urgency logic to sync with Offers
  const offerIds = ["13", "16", "29", "2", "3", "4", "22", "8", "10", "28", "21", "20", "23", "27"];
  const isOffer = offerIds.includes(product.id);
  const getDiscount = (price: number) => {
    if (price > 500) return 40;
    if (price > 200) return 30;
    if (price > 100) return 20;
    return 15;
  };
  const discount = isOffer ? getDiscount(product.price) : 0;
  const originalPrice = product.price;
  const currentPrice = isOffer ? originalPrice * (1 - discount / 100) : originalPrice;

  const allOffers = mockProducts.filter(p => offerIds.includes(p.id));
  const isLastUnits = allOffers.slice(0, 5).some(p => p.id === product.id);
  const unitsLeftIndex = allOffers.slice(0, 5).findIndex(p => p.id === product.id);
  const unitsLeft = isLastUnits ? 5 - unitsLeftIndex : null;

  const sizes = product.category === "Roupas" 
    ? ["P", "M", "G", "GG"] 
    : product.category === "Calçados" 
      ? ["38", "39", "40", "41", "42"] 
      : ["Único"];

  const handleAddToCart = () => {
    if (!selectedSize && sizes.length > 1) {
      toast.error("Por favor, selecione um tamanho.");
      return;
    }
    
    const sizeToApply = sizes.length === 1 ? sizes[0] : selectedSize;
    // apply currentPrice correctly so the cart has the discounted price
    addToCart({ ...product, price: currentPrice }, sizeToApply);
    toast.success(`${product.name} (${sizeToApply}) adicionado ao carrinho!`);
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleNextImage = () => {
    if (!product.images) return;
    const currentIndex = product.images.indexOf(activeImage);
    const nextIndex = (currentIndex + 1) % product.images.length;
    setActiveImage(product.images[nextIndex]);
  };

  const handlePrevImage = () => {
    if (!product.images) return;
    const currentIndex = product.images.indexOf(activeImage);
    const prevIndex = (currentIndex - 1 + product.images.length) % product.images.length;
    setActiveImage(product.images[prevIndex]);
  };

  return (
    <div className="bg-background min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-6">
        <Link to="/products" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
        </Link>

        {/* Main Product Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
          
          {/* Photos Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center space-y-4">
            <div className="w-full max-w-[400px] space-y-4 relative">
              <div className="bg-muted/5 rounded-lg overflow-hidden border border-muted w-full aspect-square flex items-center justify-center relative group"
              ref={imageContainerRef}
              onMouseEnter={() => setZoomVisible(true)}
              onMouseMove={(e: ReactMouseEvent<HTMLDivElement>) => {
                const rect = imageContainerRef.current?.getBoundingClientRect();
                if (!rect) return;
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setZoomPos({ x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) });
              }}
              onMouseLeave={() => {
                setZoomVisible(false);
              }}
            >
                <img 
                  key={activeImage}
                  src={activeImage} 
                  alt={product.name} 
                  className="object-contain w-full h-full p-4 transition-all duration-500 animate-in fade-in" 
                />

                {/* Zoom Lens Crosshair Indicator */}
                {zoomVisible && (
                  <div
                    className="absolute pointer-events-none border-2 border-primary/60 rounded-sm shadow-lg"
                    style={{
                      width: 80,
                      height: 80,
                      left: `calc(${zoomPos.x}% - 40px)`,
                      top: `calc(${zoomPos.y}% - 40px)`,
                    }}
                  />
                )}
                
                {/* Navigation Arrows */}
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md text-foreground transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 active:scale-90"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md text-foreground transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 active:scale-90"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Zoom Popup Panel — appears to the right of the image on lg screens */}
              {zoomVisible && (
                <div
                  className="hidden lg:block absolute left-[calc(100%+12px)] top-0 z-50 border border-border shadow-2xl rounded-lg overflow-hidden bg-background"
                  style={{
                    width: ZOOM_SIZE,
                    height: ZOOM_SIZE,
                    backgroundImage: `url(${activeImage})`,
                    backgroundSize: `${ZOOM_FACTOR * 100}%`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              )}
              
              {/* Thumbnails */}
              <div className="flex justify-center lg:justify-start gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted-foreground/20">
                {product.images?.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={cn(
                      "w-16 h-16 lg:w-20 lg:h-20 rounded-sm overflow-hidden border-2 transition-all flex-shrink-0 hover:scale-105 active:scale-95",
                      activeImage === img ? "border-primary opacity-100 shadow-sm" : "border-transparent opacity-50 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Details Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="mb-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary mb-1">{product.category}</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight tracking-tight mb-3 text-left">{product.name}</h1>
              
              <div className="flex items-center gap-3">
                {isOffer ? (
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm font-medium line-through tabular-nums mb-1 text-left">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(originalPrice)}
                    </span>
                    <p className="text-3xl font-black text-orange-600 flex items-center gap-3">
                       {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentPrice)}
                       <span className="bg-orange-500 text-white px-2 py-0.5 rounded-md shadow transform -skew-x-6 text-xs inline-block ml-1">-{discount}% OFF</span>
                    </p>
                  </div>
                ) : (
                  <p className="text-3xl font-light text-foreground">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentPrice)}
                  </p>
                )}
                
                <div className="h-4 w-[1px] bg-muted-foreground/30 mx-2 self-end mb-2"></div>
                <div className="flex text-primary self-end mb-2.5">
                  <Star className="fill-current w-3.5 h-3.5" />
                  <Star className="fill-current w-3.5 h-3.5" />
                  <Star className="fill-current w-3.5 h-3.5" />
                  <Star className="fill-current w-3.5 h-3.5" />
                  <StarHalf className="fill-current w-3.5 h-3.5" />
                </div>
              </div>
              
              {isOffer && isLastUnits && (
                 <div className="mt-4">
                   <div className="inline-block bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded border border-red-500/20">
                     🔥 CORRA! Restam apenas {unitsLeft} estoque!
                   </div>
                 </div>
              )}
            </div>

            {/* Size Selection */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-xs uppercase tracking-widest font-bold">
                 <span>Tamanho</span>
                 <button className="text-primary underline hover:text-orange-600">Guia de Medidas</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "h-12 flex-1 min-w-[50px] border font-bold text-sm transition-all focus:outline-none",
                      selectedSize === size
                        ? "bg-foreground text-background border-foreground shadow-[4px_4px_0px_rgba(0,0,0,0.1)]"
                        : "border-muted-foreground/30 hover:border-foreground text-foreground"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 mb-12">
              <Button size="lg" className="w-full h-14 text-sm font-extrabold uppercase tracking-widest rounded-none shadow-lg active:scale-95 transition-transform" onClick={handleAddToCart}>
                 Adicionar ao Carrinho
              </Button>
              <Button variant="outline" size="lg" className="w-full h-14 text-sm font-extrabold uppercase tracking-widest rounded-none border-2" asChild>
                 <Link to="/checkout" onClick={handleAddToCart}>Comprar Agora</Link>
              </Button>
            </div>

            {/* Product Accordion Info */}
            <div className="border-t divide-y">
              {/* Description Section */}
              <div className="py-4">
                <button 
                  className="flex justify-between items-center w-full text-xs font-bold uppercase tracking-widest py-2"
                  onClick={() => toggleSection("description")}
                >
                  Descrição
                  {openSection === "description" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <div className={cn("overflow-hidden transition-all duration-300", openSection === "description" ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0")}>
                  <p className="text-sm text-muted-foreground leading-relaxed font-roboto text-left">
                    {product.longDescription}
                  </p>
                </div>
              </div>

              {/* Material & Care Section */}
              <div className="py-4">
                <button 
                  className="flex justify-between items-center w-full text-xs font-bold uppercase tracking-widest py-2"
                  onClick={() => toggleSection("care")}
                >
                  Informações de Cuidado
                  {openSection === "care" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <div className={cn("overflow-hidden transition-all duration-300", openSection === "care" ? "max-h-96 opacity-100 mt-4 px-1" : "max-h-0 opacity-0")}>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase text-foreground mb-1 text-left">Composição:</p>
                      <p className="text-sm text-muted-foreground text-left">{product.material}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase text-foreground mb-2 text-left">Como cuidar:</p>
                      <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4 text-left">
                        {product.care?.map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping & Returns */}
              <div className="py-4">
                <button 
                  className="flex justify-between items-center w-full text-xs font-bold uppercase tracking-widest py-2"
                  onClick={() => toggleSection("shipping")}
                >
                  Envio e Devoluções
                  {openSection === "shipping" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <div className={cn("overflow-hidden transition-all duration-300", openSection === "shipping" ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0")}>
                   <div className="space-y-6">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <Truck className="w-4 h-4 mt-0.5 text-primary" />
                          <div className="space-y-1 text-left">
                            <p className="text-[10px] font-bold uppercase">Frete Grátis</p>
                            <p className="text-[10px] text-muted-foreground">Em pedidos acima de R$ 250.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <RefreshCw className="w-4 h-4 mt-0.5 text-primary" />
                          <div className="space-y-1 text-left">
                            <p className="text-[10px] font-bold uppercase">Troca Grátis</p>
                            <p className="text-[10px] text-muted-foreground">Até 30 dias após a compra.</p>
                          </div>
                        </div>
                     </div>

                     <FreightCalculator weight={product.weight || 0.5} className="mt-4 border-dashed bg-muted/20" />
                   </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-6 py-6 border-t border-dashed">
               <div className="flex items-center gap-2">
                 <ShieldCheck className="w-5 h-5 text-success" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Garantia SIGA</span>
               </div>
               <div className="h-4 w-[1px] bg-muted border-l"></div>
               <div className="text-[10px] text-muted-foreground font-medium">Produto Original. Pagamento Criptografado.</div>
            </div>
          </div>
        </div>

        {/* Continue Shopping Section - Infinite Scroll */}
        <div className="pt-20 border-t">
          <h2 className="text-lg md:text-2xl font-black tracking-tighter uppercase mb-8 md:mb-10 text-center">Continuar Comprando</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 px-4">
            {displayProducts.map((p, idx) => (
              <ProductCard 
                key={p.id} 
                product={p} 
                innerRef={idx === displayProducts.length - 1 ? lastProductElementRef : undefined}
                animationDelay={`${idx * 100}ms`}
              />
            ))}
          </div>

          {(isLoading || hasMore) && (
            <div className="flex justify-center py-16">
               <div className="flex flex-col items-center gap-4">
                 <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Carregando mais Estilo</p>
               </div>
            </div>
          )}

          {!hasMore && !isLoading && (
            <div className="py-10 text-center border-t border-dashed mt-8">
              <p className="text-muted-foreground text-xs uppercase tracking-[0.5em] font-black opacity-40">Fim do Catálogo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
