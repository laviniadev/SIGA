import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { UserPlus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
// useAuthStore removed because it was unused

export default function Register() {
  const navigate = useNavigate()
  // login removed because it was unused
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Por favor, preencha todos os campos.")
      return
    }

    // Simulação de registro
    toast.success("Conta criada com sucesso!")
    
    // Auto-login para facilitar o debug (usando as mesmas credenciais para simular)
    // No mock real, isso apenas usaria o store de auth
    setTimeout(() => {
      // Simula o login imediato com os dados recém-criados (apenas para o estado global)
      // Como é um mock, vamos usar o login backdoor ou apenas settar o user se tivéssemos um register no store
      // Por simplicidade, vamos redirecionar para login
      navigate("/login")
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="space-y-2 text-center pb-6">
           <div className="flex justify-center mb-2">
              <div className="bg-primary/10 rounded-full p-4">
                 <UserPlus className="h-8 w-8 text-primary" />
              </div>
           </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight text-foreground">
            Criar Conta
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Preencha os dados abaixo para se cadastrar na loja.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold">Nome Completo</Label>
              <Input 
                id="name" 
                placeholder="Seu nome" 
                className="h-10 border-muted-foreground/30 focus:border-primary" 
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu.email@exemplo.com" 
                className="h-10 border-muted-foreground/30 focus:border-primary" 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
               <Label htmlFor="password" className="text-sm font-semibold">Senha</Label>
               <Input 
                 id="password" 
                 type="password" 
                 placeholder="••••••••" 
                 className="h-10 border-muted-foreground/30 focus:border-primary" 
                 value={formData.password}
                 onChange={handleChange}
               />
            </div>
            <Button type="submit" className="w-full h-12 text-base font-bold bg-primary hover:bg-orange-600 shadow-md">
              Cadastrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-2">
          <div className="text-center text-sm text-muted-foreground">
             Já possui conta?{" "}
             <Link to="/login" className="font-semibold text-primary hover:text-orange-600 hover:underline">
               Faça login aqui
             </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
