import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { LogIn } from "lucide-react"

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica visual: Redireciona para a área do cliente ao clicar
    navigate("/customer");
  };

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
        <CardHeader className="space-y-2 text-center pb-6">
           <div className="flex justify-center mb-2">
              <div className="bg-primary/10 rounded-full p-4">
                 <LogIn className="h-8 w-8 text-primary" />
              </div>
           </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight text-foreground">
            Acessar Conta
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Insira suas credenciais para visualizar seus pedidos e perfil.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">E-mail</Label>
              <Input id="email" type="email" placeholder="seu.email@exemplo.com" className="h-12 border-muted-foreground/30 focus:border-primary" />
            </div>
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                 <Label htmlFor="password" className="text-sm font-semibold">Senha</Label>
                 <a href="#" className="text-sm font-semibold text-secondary hover:text-purple-700 transition-colors">
                   Esqueceu a senha?
                 </a>
               </div>
               <Input id="password" type="password" placeholder="••••••••" className="h-12 border-muted-foreground/30 focus:border-primary" />
            </div>
            <Button type="submit" className="w-full h-12 text-base font-bold bg-primary hover:bg-orange-600 shadow-md">
              Entrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-4">
          <div className="text-center text-sm text-muted-foreground">
             Não possui conta?{" "}
             <Link to="/register" className="font-semibold text-primary hover:text-orange-600 hover:underline">
               Cadastre-se gratuitamente
             </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
