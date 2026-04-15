import { Button } from "@/components/ui/button"
import { Trash2, ShoppingBag, ShieldCheck } from "lucide-react"
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16 min-h-[70vh]">
      <div className="flex flex-col gap-2 md:gap-6 mb-2 md:mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-lg md:text-2xl font-black tracking-tighter uppercase text-foreground">
              Carrinho
            </h1>
            <div className="h-1 w-20 bg-primary"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

        {cartItems.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center text-center bg-card rounded-xl md:rounded-2xl border shadow-sm px-4 py-8 md:py-10 w-full max-w-md mx-auto mt-8 md:mt-12 mb-16 md:mb-36">
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
            <div className="md:col-span-2 space-y-3">
              {cartItems.map((item, idx) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className={cn(
                    "flex flex-col sm:flex-row items-start gap-2 border bg-card rounded-xl p-2 shadow-sm hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-left-5",
                    `delay-[${idx * 100}ms]`
                  )}
                >
                  <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border group/img">
                    <img src={item.image} alt={item.name} className="object-cover w-full h-full group-hover/img:scale-110 transition-transform duration-500" />
                  </div>

                  <div className="flex flex-1 flex-col w-full h-full justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xs md:text-sm hover:text-primary transition-all active:scale-[0.98] origin-left leading-tight">
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-7 w-7 transition-colors active:scale-90 flex-shrink-0"
                          onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[9px] text-muted-foreground line-clamp-1">{item.description}</p>
                        <div className="h-2 w-[1px] bg-muted-foreground/30"></div>
                        <p className="text-[9px] font-black uppercase text-primary tracking-tighter">{item.selectedColor}</p>
                      </div>

                      {/* Size Selector in Cart */}
                      <div className="mt-2 flex flex-col gap-1.5">
                        <span className="text-[9px] font-bold uppercase text-muted-foreground tracking-wider">Tamanho:</span>
                        <div className="flex flex-wrap gap-1">
                          {getSizesForCategory(item.category).map((s) => (
                            <button
                              key={s}
                              onClick={() => updateSize(item.id, item.selectedSize, item.selectedColor, s)}
                              className={cn(
                                "text-[9px] h-5 w-7 rounded font-bold border transition-all active:scale-90",
                                item.selectedSize === s
                                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                  : "border-muted-foreground/20 hover:border-primary text-muted-foreground"
                              )}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center space-x-1 bg-muted/40 rounded-full px-1 py-0.5 border overflow-hidden">
                        <Button variant="ghost" size="sm" className="h-4 w-4 rounded-full px-0 hover:bg-background active:scale-75 transition-transform text-[8px]" onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}>-</Button>
                        <span className="w-4 text-center text-[9px] font-extrabold tabular-nums">{item.quantity}</span>
                        <Button variant="ghost" size="sm" className="h-4 w-4 rounded-full px-0 hover:bg-background active:scale-75 transition-transform text-[8px]" onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}>+</Button>
                      </div>

                      <span className="font-black text-xs text-foreground tabular-nums">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo */}
            <div className="md:col-span-1 mb-32">
              <div className="bg-card p-3.5 rounded-xl border shadow-lg sticky top-24">
                <h3 className="text-[10px] font-black tracking-widest uppercase border-b pb-2 mb-3 text-muted-foreground/90">Resumo da Compra</h3>

                <div className="space-y-3 text-[9px]">
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

                  <div className="pt-2 mt-1 border-t flex justify-between font-black text-sm md:text-base text-foreground tracking-tighter">
                    <span>TOTAL</span>
                    <span className="tabular-nums text-primary">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal() + (cartTotal() > 250 ? 0 : (shippingValue || 0)))}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-dashed">
                  <FreightCalculator
                    weight={totalWeight}
                    onCalculate={(val) => setShippingValue(val)}
                    className="bg-muted/30 border-none shadow-none p-3"
                  />
                </div>

                <Button className="w-full h-9 bg-primary hover:bg-orange-600 rounded-xl font-black uppercase tracking-widest text-[9px] shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-4 group" asChild>
                  <Link to="/checkout" className="flex items-center justify-center gap-2">
                    Finalizar Pedido
                  </Link>
                </Button>

                <div className="flex items-center justify-center gap-2 mt-4 animate-in fade-in duration-1000">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                  </div>
                  <p className="text-[9px] text-muted-foreground uppercase font-black tracking-[0.15em] flex items-center">
                    Compra 100% Segura
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
