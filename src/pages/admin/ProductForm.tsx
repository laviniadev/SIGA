import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ProductForm() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-3xl font-bold tracking-tight text-primary">Preencher Produto</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>
            Insira os dados do produto. Este é apenas um formulário de demonstração.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate("/admin/products"); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Produto</Label>
                <Input id="nome" placeholder="Ex: Tênis Urban" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" placeholder="SKU-1234" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Input id="categoria" placeholder="Ex: Calçados" required />
              </div>
              <div className="space-y-2 flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="preco">Preço (R$)</Label>
                  <Input id="preco" type="number" step="0.01" placeholder="0.00" required />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="estoque">Estoque Inicial</Label>
                  <Input id="estoque" type="number" placeholder="0" required />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button type="button" variant="outline" className="mr-4" onClick={() => navigate("/admin/products")}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-success hover:bg-green-600 text-white">
                <Save className="mr-2 h-4 w-4" /> Salvar Produto
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
