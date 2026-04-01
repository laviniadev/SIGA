import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { UserPlus } from "lucide-react"

export default function Register() {
  const navigate = useNavigate()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    navigate("/login")
  }

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
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
              <Label htmlFor="nome" className="text-sm font-semibold">Nome Completo</Label>
              <Input id="nome" placeholder="Seu nome" className="h-10 border-muted-foreground/30 focus:border-primary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">E-mail</Label>
              <Input id="email" type="email" placeholder="seu.email@exemplo.com" className="h-10 border-muted-foreground/30 focus:border-primary" />
            </div>
            <div className="space-y-2">
               <Label htmlFor="password" className="text-sm font-semibold">Senha</Label>
               <Input id="password" type="password" placeholder="••••••••" className="h-10 border-muted-foreground/30 focus:border-primary" />
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
