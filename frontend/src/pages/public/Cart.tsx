import { Button } from "@/components/ui/button"
import { Trash2, ShoppingBag } from "lucide-react"
import { Link } from "react-router-dom"
import { useCartStore } from "@/stores/useCartStore"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { FreightCalculator } from "@/components/public/FreightCalculator"

export default function Cart() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, updateSize, cartCount } = useCartStore();
  const [shippingValue, setShippingValue] = useState<number | null>(null);

  const getSizesForCategory = (category: string) => {
    if (category === "Roupas") return ["P", "M", "G", "GG"];
    if (category === "Calçados") return ["38", "39", "40", "41", "42"];
    return ["Único"];
  };

  const totalWeight = cartItems.reduce((acc, item) => acc + (item.weight || 0.5) * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 min-h-[70vh]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        
        {cartItems.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center text-center bg-card rounded-xl md:rounded-2xl border shadow-sm px-4 py-12 md:py-20 w-full max-w-md mx-auto">
            <div className="bg-muted p-4 md:p-6 rounded-full mb-4 md:mb-6">
              <ShoppingBag className="h-8 w-8 md:h-12 md:w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-black tracking-tighter uppercase mb-2">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground mb-6 md:mb-8 max-w-xs text-sm md:text-base">Parece que você ainda não escolheu seus produtos favoritos.</p>
            <Button asChild size="lg" className="rounded-full px-6 md:px-8 h-10 md:h-12 text-xs md:text-sm">
              <Link to="/products">Explorar Produtos</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="md:col-span-2 space-y-3 md:space-y-4">
              {cartItems.map((item, idx) => (
              <div 
                key={`${item.id}-${item.selectedSize}`} 
                className={cn(
                  "flex flex-col sm:flex-row items-start gap-3 md:gap-4 border py-3 md:py-4 bg-card rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-left-5",
                  `delay-[${idx * 100}ms]`
                )}
              >
                <div className="w-32 h-32 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border group/img">
                  <img src={item.image} alt={item.name} className="object-cover w-full h-full group-hover/img:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="flex flex-1 flex-col w-full h-full justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                       <h3 className="font-bold text-lg hover:text-primary transition-all active:scale-[0.98] origin-left">
                         <Link to={`/product/${item.id}`}>{item.name}</Link>
                       </h3>
                       <Button 
                         variant="ghost" 
                         size="icon" 
                         className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8 transition-colors active:scale-90" 
                         onClick={() => removeFromCart(item.id, item.selectedSize)}
                       >
                         <Trash2 className="h-4 w-4" />
                       </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{item.description}</p>
                    
                    {/* Size Selector in Cart */}
                    <div className="mt-3 flex flex-col gap-2">
                       <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">Tamanho:</span>
                       <div className="flex flex-wrap gap-1.5">
                          {getSizesForCategory(item.category).map((s) => (
                            <button
                              key={s}
                              onClick={() => updateSize(item.id, item.selectedSize, s)}
                              className={cn(
                                "text-[10px] h-6 w-8 rounded font-bold border transition-all active:scale-90",
                                item.selectedSize === s 
                                  ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                                  : "border-muted-foreground/30 hover:border-primary text-muted-foreground"
                              )}
                            >
                              {s}
                            </button>
                          ))}
                       </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-1 bg-muted/40 rounded-full px-2 py-1 border overflow-hidden">
                      <Button variant="ghost" size="sm" className="h-6 w-6 rounded-full px-0 hover:bg-background active:scale-75 transition-transform" onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}>-</Button>
                      <span className="w-8 text-center text-xs font-bold tabular-nums">{item.quantity}</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 rounded-full px-0 hover:bg-background active:scale-75 transition-transform" onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}>+</Button>
                    </div>
                    
                    <span className="font-extrabold text-lg text-foreground tabular-nums">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Resumo */}
          <div className="md:col-span-1">
            <div className="bg-card p-6 rounded-2xl border shadow-lg sticky top-24">
              <h3 className="text-lg md:text-2xl font-black tracking-tighter uppercase border-b pb-4">Resumo da Compra</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Itens ({cartCount()})</span>
                  <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal())}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Entrega</span>
                  <span className={cn(
                    "font-bold transition-all duration-500",
                    shippingValue === 0 || cartTotal() > 250 ? "text-success" : "text-foreground"
                  )}>
                    {cartTotal() > 250 || shippingValue === 0 
                      ? "Grátis" 
                      : shippingValue !== null 
                        ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(shippingValue)
                        : "--"
                    }
                  </span>
                </div>
                
                <div className="pt-4 border-t flex justify-between font-extrabold text-xl text-foreground">
                  <span>Total</span>
                  <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal() + (cartTotal() > 250 ? 0 : (shippingValue || 0)))}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-dashed">
                <FreightCalculator 
                  weight={totalWeight} 
                  onCalculate={(val) => setShippingValue(val)}
                  className="bg-muted/30 border-none shadow-none"
                />
              </div>
              
              <Button size="lg" className="w-full bg-primary hover:bg-orange-600 h-14 shadow-xl rounded-full text-lg mt-8 group" asChild>
                <Link to="/checkout">
                  Finalizar Pedido
                </Link>
              </Button>
              
              <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase font-bold tracking-widest">
                Compra 100% Segura
              </p>
            </div>
          </div>
            </>
          )}
      </div>
    </div>
  )
}
