import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function Checkout() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8 text-center text-primary">Finalizar Compra</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-secondary">1. Identificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" placeholder="Ex: João da Silva" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" placeholder="000.000.000-00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="seuemail@exemplo.com" />
              </div>
              <div className="space-y-2">
                 <Label htmlFor="telefone">Telefone / WhatsApp</Label>
                 <Input id="telefone" placeholder="(11) 98765-4321" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-secondary">2. Endereço de Entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input id="cep" placeholder="00000-000" />
                </div>
                <div className="col-span-2 space-y-2">
                   <Label htmlFor="endereco">Logradouro</Label>
                   <Input id="endereco" placeholder="Ex: Rua das Flores" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="numero">Número</Label>
                    <Input id="numero" placeholder="123" />
                 </div>
                 <div className="col-span-2 space-y-2">
                    <Label htmlFor="complemento">Complemento</Label>
                    <Input id="complemento" placeholder="Apto, Sala, Bloco..." />
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="cidade">Cidade</Label>
                   <Input id="cidade" placeholder="Ex: São Paulo" />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Input id="estado" placeholder="SP" />
                 </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
               <CardTitle className="text-secondary">3. Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-primary rounded-lg p-4 cursor-pointer hover:bg-muted/40 transition-colors flex flex-col items-center justify-center space-y-2 text-primary font-medium bg-primary/5">
                   <span>PIX</span>
                   <span className="text-xs text-success font-bold">-5% Off</span>
                </div>
                <div className="border rounded-lg p-4 cursor-pointer hover:bg-muted/40 transition-colors flex flex-col items-center justify-center space-y-2 text-muted-foreground font-medium">
                   <span>Cartão de Crédito</span>
                   <span className="text-xs">Até 12x</span>
                </div>
                <div className="border rounded-lg p-4 cursor-pointer hover:bg-muted/40 transition-colors flex flex-col items-center justify-center space-y-2 text-muted-foreground font-medium">
                   <span>Boleto Bancário</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-1/3">
           <div className="bg-card p-6 rounded-lg border shadow-md space-y-4 sticky top-24">
             <h3 className="font-semibold text-lg border-b pb-4">Resumo da Compra</h3>
             <div className="space-y-3 py-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                   <span>Tênis Urban Style (1x)</span>
                   <span>R$ 299,90</span>
                </div>
             </div>
             <div className="space-y-2 text-sm text-muted-foreground border-t pt-4">
                <div className="flex justify-between">
                   <span>Subtotal</span>
                   <span>R$ 299,90</span>
                </div>
                <div className="flex justify-between">
                   <span>Desconto (PIX)</span>
                   <span className="text-success font-medium">- R$ 14,99</span>
                </div>
                <div className="flex justify-between">
                   <span>Frete</span>
                   <span className="text-success font-medium">Grátis</span>
                </div>
             </div>
             
             <div className="pt-4 border-t flex justify-between font-bold text-xl text-foreground">
                <span>Total a pagar</span>
                <span>R$ 284,91</span>
             </div>
             
             <Button className="w-full bg-success hover:bg-green-600 h-14 shadow-md uppercase font-bold tracking-widest mt-6 text-lg" asChild>
                <Link to="/customer"><CheckCircle className="mr-2 h-5 w-5" /> Confirmar Pedido</Link>
             </Button>
           </div>
        </div>
      </div>
    </div>
  )
}
