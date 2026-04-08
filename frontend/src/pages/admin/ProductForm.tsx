import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ProductForm() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full hover:bg-primary/10 hover:text-primary transition-all active:scale-90 shadow-sm">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-3xl font-extrabold tracking-tight text-primary uppercase text-shadow-sm">Cadastro de Produto</h2>
      </div>

      <Card className="shadow-lg border-muted/20 overflow-hidden">
        <CardHeader className="bg-muted/5 border-b">
          <CardTitle className="text-xl font-bold">Informações Detalhadas</CardTitle>
          <CardDescription className="text-xs">
            Preencha os campos abaixo para disponibilizar o item em sua vitrina virtual.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate("/admin/products"); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 group">
                <Label htmlFor="nome" className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Nome do Produto</Label>
                <Input id="nome" placeholder="Ex: Tênis Urban High" required className="h-12 border-muted-foreground/20 focus:border-primary transition-all duration-300 focus:shadow-md" />
              </div>
              <div className="space-y-2 group">
                <Label htmlFor="sku" className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">SKU (Código Interno)</Label>
                <Input id="sku" placeholder="Ex: SIGA-FT-1234" required className="h-12 border-muted-foreground/20 focus:border-primary transition-all duration-300 focus:shadow-md" />
              </div>
              <div className="space-y-2 group">
                <Label htmlFor="categoria" className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Categoria</Label>
                <Input id="categoria" placeholder="Ex: Calçados esportivos" required className="h-12 border-muted-foreground/20 focus:border-primary transition-all duration-300 focus:shadow-md" />
              </div>
              <div className="space-y-2 flex gap-4">
                <div className="flex-1 space-y-2 group">
                  <Label htmlFor="preco" className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Preço (R$)</Label>
                  <Input id="preco" type="number" step="0.01" placeholder="0.00" required className="h-12 border-muted-foreground/20 focus:border-primary transition-all duration-300 focus:shadow-md" />
                </div>
                <div className="flex-1 space-y-2 group">
                  <Label htmlFor="estoque" className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Estoque Inicial</Label>
                  <Input id="estoque" type="number" placeholder="0" required className="h-12 border-muted-foreground/20 focus:border-primary transition-all duration-300 focus:shadow-md" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-6 border-t mt-8">
              <Button type="button" variant="ghost" className="px-8 font-bold text-muted-foreground hover:text-foreground active:scale-95 transition-all" onClick={() => navigate("/admin/products")}>
                Descartar
              </Button>
              <Button type="submit" className="bg-success hover:bg-green-600 text-white px-8 font-bold uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                <Save className="mr-2 h-4 w-4" /> Finalizar Cadastro
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
