import { Button } from "@/components/ui/button"
import { Star, StarHalf, ChevronLeft, ChevronDown, ChevronUp, Truck, ShieldCheck, RefreshCw, ChevronRight, Heart } from "lucide-react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { mockProducts } from "@/data/mockProducts"
import { useCartStore } from "@/stores/useCartStore"
import { useState, useEffect, useRef, useCallback, type MouseEvent as ReactMouseEvent } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

import { ProductCard } from "@/components/public/ProductCard"
import { FreightCalculator } from "@/components/public/FreightCalculator"
import { X, Check } from "lucide-react"

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  
  const product = mockProducts.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [openSection, setOpenSection] = useState<string | null>("description");
  const [activeImage, setActiveImage] = useState<string>(product?.image || "");
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [activeReviewImage, setActiveReviewImage] = useState<{reviewIndex: number, imgIndex: number} | null>(null);

  const sizes = product ? (product.category === "Roupas" 
    ? ["P", "M", "G", "GG"] 
    : product.category === "Calçados" 
      ? ["38", "39", "40", "41", "42"] 
      : ["Único"]) : [];

  useEffect(() => {
    if (id) setIsFavorited(localStorage.getItem(`fav_${id}`) === 'true');
  }, [id]);

  const toggleFavorite = () => {
    const newState = !isFavorited;
    setIsFavorited(newState);
    if (id) {
      if (newState) {
        localStorage.setItem(`fav_${id}`, "true");
        toast.success("Adicionado aos favoritos!");
      } else {
        localStorage.removeItem(`fav_${id}`);
        toast.info("Removido dos favoritos.");
      }
    }
  };

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
      // Auto-select size if only one option exists
      if (sizes.length === 1) setSelectedSize(sizes[0]);
      
      // Auto-select color if only one option exists
      if (product.colors && product.colors.length === 1) {
        setSelectedColor(product.colors[0]);
      } else if (!product.colors || product.colors.length === 0) {
        setSelectedColor("Multicolorido");
      }

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
      setActiveImage(product.image);
    }
  }, [product, id, sizes.length]);

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



  const handleAddToCart = () => {
    if (!selectedSize && sizes.length > 1) {
      toast.error("Por favor, selecione um tamanho.");
      return;
    }

    if (product.colors && product.colors.length > 1 && !selectedColor) {
      toast.error("Por favor, selecione uma cor/modelo.");
      return;
    }
    
    const sizeToApply = sizes.length === 1 ? sizes[0] : selectedSize;
    const colorToApply = product.colors && product.colors.length > 0 ? (selectedColor || product.colors[0]) : "Multicolorido";

    // apply currentPrice correctly so the cart has the discounted price
    addToCart({ ...product, price: currentPrice }, sizeToApply, colorToApply);
    toast.success(`${product.name} (${sizeToApply} - ${colorToApply}) adicionado ao carrinho!`);
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

  const mockReviews = [
    {
      user: "M***a",
      date: "04 jul 2024",
      rating: 5,
      comment: "Amei são lindos tem vários tamanhos. Cor exatamente como na foto. Lindos amei vai combinar com meu relógio e brincos.",
      fit: "Tamanho Real",
      color: "Rosa Ouro",
      size: "Tamanho Único",
      helpful: 1780,
      images: [
        "https://placehold.co/600x600/f3f4f6/a3a3a3?text=Em+Breve",
        "https://placehold.co/600x600/f3f4f6/a3a3a3?text=Em+Breve",
        "https://placehold.co/600x600/f3f4f6/a3a3a3?text=Em+Breve"
      ]
    },
    {
      user: "S***a",
      date: "16 abr 2024",
      rating: 5,
      comment: "Excelente qualidade, superou as expectativas. Chegou muito rápido!",
      fit: "Tamanho Real",
      color: "Prata",
      size: "Tamanho Único",
      helpful: 450,
      images: [
        "https://placehold.co/600x600/f3f4f6/a3a3a3?text=Em+Breve"
      ]
    }
  ];

  const handleReviewNav = (dir: 'next' | 'prev') => {
    if (!activeReviewImage) return;
    const { reviewIndex, imgIndex } = activeReviewImage;
    const currentReview = mockReviews[reviewIndex];
    
    if (dir === 'next') {
      if (imgIndex < currentReview.images.length - 1) {
        setActiveReviewImage({ reviewIndex, imgIndex: imgIndex + 1 });
      } else if (reviewIndex < mockReviews.length - 1) {
        setActiveReviewImage({ reviewIndex: reviewIndex + 1, imgIndex: 0 });
      }
    } else {
      if (imgIndex > 0) {
        setActiveReviewImage({ reviewIndex, imgIndex: imgIndex - 1 });
      } else if (reviewIndex > 0) {
        const prevReview = mockReviews[reviewIndex - 1];
        setActiveReviewImage({ reviewIndex: reviewIndex - 1, imgIndex: prevReview.images.length - 1 });
      }
    }
  };

  return (
    <div className="bg-background min-h-screen font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-6">
        <Link to="/products" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
        </Link>

        {/* Main Product Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 mb-12">
          
          {/* Photos Column (7 cols) */}
          <div className="lg:col-span-1 flex flex-col items-center space-y-4">
            <div className="w-full max-w-[320px] space-y-3 relative">
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

              {/* Zoom Popup Panel — appears to the right, clipped to viewport */}
              {zoomVisible && (
                <div
                  className="hidden lg:block absolute left-[calc(100%+12px)] top-0 z-50 border border-border shadow-2xl rounded-lg overflow-hidden bg-background max-w-[300px]"
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
          <div className="lg:col-span-1 flex flex-col pt-2 pr-1 lg:pr-4">
            <div className="mb-3 md:mb-5">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary mb-1">{product.category}</p>
                  <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-foreground leading-tight tracking-tight mb-1.5 text-left">{product.name}</h1>
                </div>
                <button
                  onClick={toggleFavorite}
                  className={cn(
                    "p-2.5 rounded-full border border-muted-foreground/20 hover:bg-muted/30 transition-all active:scale-95 group flex-shrink-0 focus:outline-none shadow-sm"
                  )}
                  title="Favoritar"
                >
                  <Heart className={cn("w-5 h-5 transition-colors", isFavorited ? "fill-red-500 text-red-500" : "text-muted-foreground group-hover:text-red-500/70")} />
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                {isOffer ? (
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm font-medium line-through tabular-nums mb-1 text-left">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(originalPrice)}
                    </span>
                    <p className="text-base md:text-xl font-black text-orange-600 flex items-center gap-2">
                       {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentPrice)}
                       <span className="bg-orange-500 text-white px-2 py-0.5 rounded-md shadow transform -skew-x-6 text-xs inline-block ml-1">-{discount}% OFF</span>
                    </p>
                  </div>
                ) : (
                  <p className="text-base md:text-xl font-light text-foreground">
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

            {/* Color/Variant Selection */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/60">
                 <span>Estilo / Cor</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.colors && product.colors.length > 0 ? (
                  product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "h-11 px-4 flex items-center justify-center border-2 font-black text-[11px] md:text-xs transition-all focus:outline-none rounded-sm min-w-[3rem]",
                        selectedColor === color
                          ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                          : "border-muted-foreground/10 hover:border-primary/50 text-muted-foreground/80"
                      )}
                    >
                      {color}
                    </button>
                  ))
                ) : (
                  <button
                    disabled
                    className="h-11 px-4 flex items-center justify-center border-2 border-primary bg-primary text-primary-foreground font-black text-[11px] md:text-xs rounded-sm cursor-default"
                  >
                    Multicolorido
                  </button>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3 mb-5">
              <div className="flex justify-between items-center text-xs uppercase tracking-widest font-bold">
                 <span>Tamanho</span>
                 <button className="text-primary underline hover:text-orange-600">Guia de Medidas</button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "w-11 h-11 flex items-center justify-center border-2 font-black text-[11px] md:text-xs transition-all focus:outline-none rounded-sm",
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                        : "border-muted-foreground/10 hover:border-primary/50 text-muted-foreground/80"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 mb-6">
              <Button size="lg" className="w-full h-10 md:h-11 text-xs md:text-sm font-extrabold uppercase tracking-widest rounded-sm shadow-lg active:scale-95 transition-transform" onClick={handleAddToCart}>
                 Adicionar ao Carrinho
              </Button>
              <Button variant="outline" size="lg" className="w-full h-10 md:h-11 text-xs md:text-sm font-extrabold uppercase tracking-widest rounded-sm border-2" asChild>
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

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center text-center gap-3 sm:gap-6 py-6">
               <div className="flex items-center gap-2">
                 <ShieldCheck className="w-5 h-5 text-success" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Garantia SIGA</span>
               </div>
               <div className="hidden sm:block h-4 w-[1px] bg-muted border-l"></div>
               <div className="text-[10px] text-muted-foreground font-medium">Produto Original. Pagamento Criptografado.</div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div id="reviews" className="py-12 border-t">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-black tracking-tighter uppercase mb-0.5">Avaliações dos Clientes</h2>
              <div className="flex items-center gap-3">
                <div className="flex text-primary">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="fill-current w-3.5 h-3.5" />)}
                </div>
                <span className="text-lg font-black pt-0.5">4,87</span>
                <span className="text-muted-foreground text-[9px] font-bold uppercase tracking-widest pt-1.5">1000+ Comentários</span>
              </div>
            </div>
            <Button variant="outline" className="text-[9px] font-black uppercase tracking-widest border-2 h-8 px-3">Ver Todas</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 px-1 md:px-4">
            {/* Stats Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mb-2.5">Ajuste Geral:</p>
                <div className="space-y-3">
                  {[
                    { label: "Pequeno", pct: "2%" },
                    { label: "Tamanho Real", pct: "98%", active: true },
                    { label: "Grande", pct: "0%" }
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between text-[9px] font-bold uppercase tracking-tight">
                        <span className={item.active ? "text-foreground" : "text-muted-foreground/50"}>{item.label}</span>
                        <span className="text-muted-foreground/40">{item.pct}</span>
                      </div>
                      <div className="h-1 bg-muted rounded-full relative overflow-hidden">
                        <div 
                          className={cn("absolute inset-y-0 left-0 rounded-full transition-all duration-1000", item.active ? "bg-primary" : "bg-muted-foreground/20")}
                          style={{ width: item.pct }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {["recompraria", "logística veloz", "maravilhoso", "linda", "Looks combinando", "excelente qualidade"].map(tag => (
                  <span key={tag} className="px-2 py-1 bg-muted text-[8px] font-black uppercase tracking-widest text-muted-foreground/70 rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Comments List */}
            <div className="lg:col-span-9 space-y-8 pl-0 lg:pl-10 lg:border-l">
              {mockReviews.map((review, rIdx) => (
                <div key={rIdx} className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-8 border-b last:border-0 last:pb-0">
                  <div className="flex justify-between items-center text-xs">
                     <div className="flex items-center gap-3">
                        <span className="font-extrabold tracking-tight text-[11px]">{review.user}</span>
                        <div className="flex text-primary">
                          {[1,2,3,4,5].map(s => <Star key={s} className="fill-current w-2.5 h-2.5" />)}
                        </div>
                     </div>
                     <span className="text-muted-foreground/40 font-medium tracking-widest uppercase text-[8px]">{review.date}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                    <span>Ajuste: <span className="text-foreground/60">{review.fit}</span></span>
                    <span>Cor: <span className="text-foreground/60">{review.color}</span></span>
                    <span>Tamanho: <span className="text-foreground/60">{review.size}</span></span>
                  </div>

                  <p className="text-xs md:text-sm text-foreground/80 leading-relaxed max-w-2xl">{review.comment}</p>

                  <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {review.images.map((img, iIdx) => (
                      <button 
                        key={iIdx} 
                        onClick={() => setActiveReviewImage({reviewIndex: rIdx, imgIndex: iIdx})}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border border-muted hover:border-primary/50 transition-all active:scale-95 group flex-shrink-0"
                      >
                        <img src={img} alt="User submission" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-5 pt-1">
                    <button className="flex items-center gap-1.5 text-muted-foreground/50 hover:text-primary transition-colors group">
                      <Check className="w-3 h-3" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Útil ({review.helpful})</span>
                    </button>
                    <button className="text-muted-foreground/30 hover:text-foreground text-[9px] font-bold uppercase tracking-widest">...</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review Image Popup Modal */}
        {activeReviewImage && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-black/40 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-500">
            <div 
              className="absolute inset-0 cursor-zoom-out" 
              onClick={() => setActiveReviewImage(null)} 
            />
            
            <button 
              onClick={() => setActiveReviewImage(null)}
              className="absolute top-6 right-6 p-2 text-foreground/40 hover:text-primary transition-colors z-[1001] bg-background/50 rounded-full border border-border/50 shadow-sm"
            >
              <X className="w-8 h-8" />
            </button>

            <div 
              className="w-full max-w-6xl flex flex-col lg:flex-row bg-background rounded-2xl overflow-hidden shadow-2xl h-[90vh] lg:h-[70vh] relative z-10 cursor-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Side */}
              <div className="flex-1 bg-muted/10 relative flex items-center justify-center p-8">
                <img 
                  src={mockReviews[activeReviewImage.reviewIndex].images[activeReviewImage.imgIndex]} 
                  className="max-w-full max-h-full object-contain drop-shadow-2xl animate-in zoom-in-95 duration-500" 
                  alt="Full preview"
                />
                
                {/* Navigation in Modal */}
                <button 
                  onClick={() => handleReviewNav('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white hover:bg-white/10 rounded-full transition-all active:scale-90"
                >
                  <ChevronLeft className="w-10 h-10" />
                </button>
                <button 
                  onClick={() => handleReviewNav('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white hover:bg-white/10 rounded-full transition-all active:scale-90"
                >
                  <ChevronRight className="w-10 h-10" />
                </button>

                {/* Thumbnails in Modal */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {mockReviews[activeReviewImage.reviewIndex].images.map((img, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setActiveReviewImage({ ...activeReviewImage, imgIndex: idx })}
                        className={cn(
                          "w-12 h-12 rounded border-2 transition-all",
                          activeReviewImage.imgIndex === idx ? "border-primary scale-110" : "border-transparent opacity-50"
                        )}
                      >
                        <img src={img} className="w-full h-full object-cover rounded" alt="Thumb" />
                      </button>
                    ))}
                </div>
              </div>

              {/* Info Side */}
              <div className="w-full lg:w-[400px] border-l p-8 flex flex-col justify-between overflow-y-auto">
                 <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1">
                        <p className="text-xl font-black">{mockReviews[activeReviewImage.reviewIndex].user}</p>
                        <div className="flex text-primary">
                          {[1,2,3,4,5].map(s => <Star key={s} className="fill-current w-4 h-4" />)}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 py-1 bg-muted rounded">
                        {mockReviews[activeReviewImage.reviewIndex].date}
                      </span>
                    </div>

                    <div className="space-y-6">
                      <p className="text-base text-foreground leading-relaxed">
                        "{mockReviews[activeReviewImage.reviewIndex].comment}"
                      </p>

                      <div className="space-y-3 pt-6 border-t border-dashed">
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                          <span>Ajuste de Referência</span>
                          <span className="text-primary">{mockReviews[activeReviewImage.reviewIndex].fit}</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                          <span>Cor Selecionada</span>
                          <span className="text-foreground">{mockReviews[activeReviewImage.reviewIndex].color}</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                          <span>Tamanho Comprado</span>
                          <span className="text-foreground">{mockReviews[activeReviewImage.reviewIndex].size}</span>
                        </div>
                      </div>
                    </div>
                 </div>

                 <div className="pt-8 flex items-center justify-between border-t border-muted">
                    <button className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest hover:underline">
                      <Check className="w-4 h-4" /> Útil ({mockReviews[activeReviewImage.reviewIndex].helpful})
                    </button>
                    <div className="flex gap-2">
                       <button 
                        disabled={activeReviewImage.reviewIndex === 0}
                        onClick={() => setActiveReviewImage({ reviewIndex: activeReviewImage.reviewIndex - 1, imgIndex: 0 })}
                        className="p-2 border rounded-full hover:bg-muted transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                       >
                        <ChevronLeft className="w-4 h-4" />
                       </button>
                       <button 
                        disabled={activeReviewImage.reviewIndex === mockReviews.length - 1}
                        onClick={() => setActiveReviewImage({ reviewIndex: activeReviewImage.reviewIndex + 1, imgIndex: 0 })}
                        className="p-2 border rounded-full hover:bg-muted transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                       >
                        <ChevronRight className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* Continue Shopping Section - Infinite Scroll */}
        <div className="pt-12 border-t">
          <h2 className="text-lg md:text-2xl font-black tracking-tighter uppercase mb-6 md:mb-8 text-center">Continuar Comprando</h2>
          
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
