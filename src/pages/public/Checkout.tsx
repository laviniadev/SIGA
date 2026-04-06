import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { useCartStore } from "@/stores/useCartStore"
import { toast } from "sonner"

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCartStore();
  const total = cartTotal();
  const handleConfirm = () => {
     toast.success("Pedido realizado com sucesso!");
     clearCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-8 lg:px-12 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <h1 className="col-span-full text-center text-3xl font-extrabold tracking-tight text-foreground mb-4 text-primary uppercase tracking-widest">Finalizar Compra</h1>
        
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-lg border-muted/20">
            <CardHeader className="bg-muted/5 border-b">
              <CardTitle className="text-secondary font-bold uppercase text-sm tracking-widest">1. Identificação Pessoal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 group">
                  <Label htmlFor="nome" className="text-xs font-bold uppercase tracking-tighter text-muted-foreground group-focus-within:text-primary transition-colors">Nome Completo</Label>
                  <Input id="nome" placeholder="Ex: João da Silva" className="h-11 border-muted-foreground/20 focus:border-primary transition-all duration-300 focus:shadow-md" />
                </div>
                <div className="space-y-2 group">
                  <Label htmlFor="cpf" className="text-xs font-bold uppercase tracking-tighter text-muted-foreground group-focus-within:text-primary transition-colors">CPF</Label>
                  <Input id="cpf" placeholder="000.000.000-00" className="h-11 border-muted-foreground/20 focus:border-primary transition-all duration-300 focus:shadow-md" />
                </div>
              </div>
              <div className="space-y-2 group">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-tighter text-muted-foreground group-focus-within:text-primary transition-colors">E-mail para Notificações</Label>
                <Input id="email" type="email" placeholder="seuemail@exemplo.com" className="h-11 border-muted-foreground/20 focus:border-primary transition-all duration-300 focus:shadow-md" />
              </div>
              <div className="space-y-2 group">
                 <Label htmlFor="telefone" className="text-xs font-bold uppercase tracking-tighter text-muted-foreground group-focus-within:text-primary transition-colors">Telefone / WhatsApp</Label>
                 <Input id="telefone" placeholder="(11) 98765-4321" className="h-11 border-muted-foreground/20 focus:border-primary transition-all duration-300 focus:shadow-md" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-muted/20">
            <CardHeader className="bg-muted/5 border-b">
              <CardTitle className="text-secondary font-bold uppercase text-sm tracking-widest">2. Endereço de Entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="col-span-1 space-y-2 group">
                  <Label htmlFor="cep" className="text-xs font-bold uppercase tracking-tighter text-muted-foreground group-focus-within:text-primary transition-colors">CEP</Label>
                  <Input id="cep" placeholder="00000-000" className="h-11 border-muted-foreground/20 focus:border-primary transition-all duration-300 focus:shadow-md" />
                </div>
                <div className="col-span-1 sm:col-span-2 space-y-2 group">
                   <Label htmlFor="endereco" className="text-xs font-bold uppercase tracking-tighter text-muted-foreground group-focus-within:text-primary transition-colors">Logradouro</Label>
                   <Input id="endereco" placeholder="Ex: Rua das Flores" className="h-11 border-muted-foreground/20 focus:border-primary transition-all duration-300 focus:shadow-md" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <div className="col-span-1 space-y-2 group">
                    <Label htmlFor="numero" className="text-xs font-bold uppercase tracking-tighter text-muted-foreground group-focus-within:text-primary transition-colors">Número</Label>
                    <Input id="numero" placeholder="123" className="h-11 border-muted-foreground/20 focus:border-primary transition-all duration-300 focus:shadow-md" />
                 </div>
                 <div className="col-span-1 sm:col-span-2 space-y-2 group">
                    <Label htmlFor="complemento" className="text-xs font-bold uppercase tracking-tighter text-muted-foreground group-focus-within:text-primary transition-colors">Complemento</Label>
                    <Input id="complemento" placeholder="Apto, Sala, Bloco..." className="h-11 border-muted-foreground/20 focus:border-primary transition-all duration-300 focus:shadow-md" />
                 </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="space-y-2 group">
                   <Label htmlFor="cidade" className="text-xs font-bold uppercase tracking-tighter text-muted-foreground group-focus-within:text-primary transition-colors">Cidade</Label>
                   <Input id="cidade" placeholder="Ex: São Paulo" className="h-11 border-muted-foreground/20 focus:border-primary transition-all duration-300 focus:shadow-md" />
                 </div>
                 <div className="space-y-2 group">
                    <Label htmlFor="estado" className="text-xs font-bold uppercase tracking-tighter text-muted-foreground group-focus-within:text-primary transition-colors">Estado</Label>
                    <Input id="estado" placeholder="SP" className="h-11 border-muted-foreground/20 focus:border-primary transition-all duration-300 focus:shadow-md" />
                 </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-muted/20 overflow-hidden">
            <CardHeader className="bg-muted/5 border-b">
               <CardTitle className="text-secondary font-bold uppercase text-sm tracking-widest">3. Método de Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border-2 border-primary rounded-xl p-6 cursor-pointer hover:bg-primary/5 transition-all flex flex-col items-center justify-center space-y-2 text-primary font-black bg-primary/5 shadow-inner scale-105">
                   <span className="text-lg">PIX</span>
                   <span className="text-[10px] font-black text-success uppercase animate-pulse">Menor Preço (-5% OFF)</span>
                </div>
                <div className="border border-muted rounded-xl p-6 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center space-y-2 text-muted-foreground font-bold active:scale-95">
                   <span className="text-lg">Cartão</span>
                   <span className="text-[10px] font-bold opacity-60">Até 12x Sem Juros</span>
                </div>
                <div className="border border-muted rounded-xl p-6 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center space-y-2 text-muted-foreground font-bold active:scale-95 text-center">
                   <span className="text-lg">Boleto</span>
                   <span className="text-[10px] font-bold opacity-60">Vencimento 3 dias</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-1">
           <div className="bg-card p-8 rounded-2xl border-2 border-muted/50 shadow-2xl space-y-6 sticky top-24 transform transition-transform hover:shadow-primary/5">
             <h3 className="font-black text-xl border-b pb-4 uppercase tracking-tighter">Resumo Final</h3>
             <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                 {cartItems.map((item) => (
                   <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-start gap-4 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="flex-1">
                        <p className="font-bold text-sm line-clamp-1 leading-none mb-1">{item.name}</p>
                        <div className="flex gap-2">
                           <span className="text-[9px] font-black uppercase bg-secondary/10 text-secondary px-2 py-0.5 rounded">Tamanho {item.selectedSize}</span>
                           <span className="text-[9px] font-bold text-muted-foreground uppercase">{item.quantity} unidades</span>
                        </div>
                      </div>
                      <span className="font-black text-sm tabular-nums whitespace-nowrap">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}
                      </span>
                   </div>
                 ))}
             </div>
             
             <div className="space-y-3 pt-6 border-t font-medium text-sm text-muted-foreground">
                <div className="flex justify-between">
                   <span>Subtotal</span>
                   <span className="tabular-nums">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</span>
                </div>
                <div className="flex justify-between items-center text-success font-black group">
                   <span>Desconto Especial (PIX)</span>
                   <span className="tabular-nums group-hover:scale-110 transition-transform">- {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total * 0.05)}</span>
                </div>
                <div className="flex justify-between">
                   <span>Taxa de Entrega</span>
                   <span className="text-success font-black uppercase text-[10px] tracking-widest">Grátis</span>
                </div>
             </div>
             
             <div className="pt-6 border-t-2 flex flex-col items-end gap-1">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total a pagar agora</span>
                <span className="text-4xl font-black text-primary tabular-nums tracking-tighter drop-shadow-sm">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total * 0.95)}
                </span>
             </div>
             
             <Button className="w-full bg-success hover:bg-green-600 h-16 shadow-xl rounded-full uppercase font-black tracking-widest mt-4 text-lg active:scale-95 transition-all group overflow-hidden relative" onClick={handleConfirm} asChild>
                <Link to="/customer">
                  <span className="relative z-10 flex items-center"><CheckCircle className="mr-3 h-5 w-5" /> Finalizar Pedido</span>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                </Link>
             </Button>
             
             <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center mt-2">
                <span className="h-1.5 w-1.5 bg-success rounded-full animate-ping"></span> Compra 100% Protegida
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}
