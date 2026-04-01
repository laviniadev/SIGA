import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

export default function Cart() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Meu Carrinho</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          {/* Item do Carrinho */}
          <div className="flex items-center gap-4 border-b py-6 bg-card rounded-lg p-4 shadow-sm">
            <div className="w-24 h-24 bg-muted rounded flex-shrink-0 flex items-center justify-center border-dashed">
              IMG
            </div>
            
            <div className="flex flex-1 flex-col">
              <h3 className="font-semibold text-lg hover:text-primary transition-colors cursor-pointer">Tênis Urban Style</h3>
              <p className="text-sm text-muted-foreground">Tamanho: 41 | Cor: Preto</p>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 bg-muted/50 rounded-md p-1">
                  <Button variant="ghost" size="sm" className="h-6 w-6 rounded-sm px-0">-</Button>
                  <span className="w-8 text-center text-sm font-semibold">1</span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 rounded-sm px-0">+</Button>
                </div>
                
                <span className="font-bold text-lg text-foreground">R$ 299,90</span>
                
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Resumo */}
        <div className="w-full md:w-1/3">
          <div className="bg-card p-6 rounded-lg border shadow-md space-y-4">
            <h3 className="font-semibold text-lg">Resumo do Pedido</h3>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Subtotal (1 item)</span>
                <span>R$ 299,90</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span className="text-success font-medium">Grátis</span>
              </div>
            </div>
            
            <div className="pt-4 border-t flex justify-between font-bold text-lg text-foreground">
              <span>Total</span>
              <span>R$ 299,90</span>
            </div>
            
            <Button className="w-full bg-primary hover:bg-orange-600 h-12 shadow-sm uppercase font-bold tracking-widest mt-4" asChild>
              <Link to="/checkout">Finalizar Compra</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
