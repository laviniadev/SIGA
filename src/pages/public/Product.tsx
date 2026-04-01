import { Button } from "@/components/ui/button"
import { Star, StarHalf, ArrowLeft, ChevronDown, ChevronUp, Truck, ShieldCheck, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { mockProducts } from "@/data/mockProducts"
import { useCartStore } from "@/stores/useCartStore"
import { useState, useEffect, useRef, useCallback } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  
  const product = mockProducts.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [openSection, setOpenSection] = useState<string | null>("description");
  const [activeImage, setActiveImage] = useState<string>(product?.image || "");
  
  // Infinite Scroll State
  const [displayProducts, setDisplayProducts] = useState<typeof mockProducts>([]);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (product) {
      // Começar com produtos da mesma categoria (excluindo o atual)
      const initialRecommendations = mockProducts.filter(p => p.category === product.category && p.id !== product.id);
      setDisplayProducts(initialRecommendations.slice(0, 4));
      setHasMore(initialRecommendations.length > 4 || mockProducts.length > initialRecommendations.length + 1);
      window.scrollTo(0, 0);
      setSelectedSize("");
      setActiveImage(product.image);
    }
  }, [product, id]);

  const lastProductElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore, displayProducts]);

  const loadMore = () => {
    const currentIds = displayProducts.map(p => p.id);
    const available = mockProducts.filter(p => !currentIds.includes(p.id) && p.id !== product?.id);
    
    if (available.length > 0) {
      setDisplayProducts(prev => [...prev, ...available.slice(0, 4)]);
      setHasMore(available.length > 4);
    } else {
      setHasMore(false);
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
        <Button onClick={() => navigate("/products")}>Voltar para a Loja</Button>
      </div>
    );
  }

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
    addToCart(product, sizeToApply);
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
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Link to="/products" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Link>

        {/* Main Product Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
          
          {/* Photos Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center space-y-4">
            <div className="w-full max-w-[400px] space-y-4">
              <div className="bg-muted/5 rounded-lg overflow-hidden border border-muted w-full aspect-square flex items-center justify-center relative group">
                <img src={activeImage} alt={product.name} className="object-contain w-full h-full p-4 transition-transform duration-700 hover:scale-105" />
                
                {/* Navigation Arrows */}
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md text-foreground transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md text-foreground transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              {/* Thumbnails */}
              <div className="flex justify-center lg:justify-start gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted-foreground/20">
                {product.images?.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={cn(
                      "w-16 h-16 lg:w-20 lg:h-20 rounded-sm overflow-hidden border-2 transition-all flex-shrink-0",
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
            <div className="mb-8">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary mb-2">{product.category}</p>
              <h1 className="text-4xl font-bold text-foreground leading-tight tracking-tight mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-3">
                <p className="text-3xl font-light text-foreground">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                </p>
                <div className="h-4 w-[1px] bg-muted-foreground/30 mx-2"></div>
                <div className="flex text-primary">
                  <Star className="fill-current w-3.5 h-3.5" />
                  <Star className="fill-current w-3.5 h-3.5" />
                  <Star className="fill-current w-3.5 h-3.5" />
                  <Star className="fill-current w-3.5 h-3.5" />
                  <StarHalf className="fill-current w-3.5 h-3.5" />
                </div>
              </div>
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
                  <p className="text-sm text-muted-foreground leading-relaxed font-roboto">
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
                      <p className="text-[10px] font-extrabold uppercase text-foreground mb-1">Composição:</p>
                      <p className="text-sm text-muted-foreground">{product.material}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase text-foreground mb-2">Como cuidar:</p>
                      <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
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
                <div className={cn("overflow-hidden transition-all duration-300", openSection === "shipping" ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0")}>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <Truck className="w-4 h-4 mt-0.5 text-primary" />
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase">Frete Grátis</p>
                          <p className="text-[10px] text-muted-foreground">Em pedidos acima de R$ 250.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <RefreshCw className="w-4 h-4 mt-0.5 text-primary" />
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase">Troca Grátis</p>
                          <p className="text-[10px] text-muted-foreground">Até 30 dias após a compra.</p>
                        </div>
                      </div>
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
          <h2 className="text-2xl font-bold uppercase tracking-tighter mb-10 text-center">Continuar Comprando</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {displayProducts.map((p, idx) => (
              <div 
                key={p.id} 
                className="group cursor-pointer"
                ref={idx === displayProducts.length - 1 ? lastProductElementRef : null}
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <div className="bg-muted/20 aspect-[3/4] overflow-hidden mb-3 border border-transparent group-hover:border-muted transition-all">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
                </div>
                <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1 tracking-widest">{p.category}</p>
                <h3 className="text-sm font-semibold mb-1 line-clamp-1">{p.name}</h3>
                <p className="text-sm font-bold text-foreground">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.price)}
                </p>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center py-12">
               <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {!hasMore && (
            <div className="py-16 text-center">
              <p className="text-muted-foreground text-xs uppercase tracking-[0.3em] font-bold">Fim do Catálogo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
