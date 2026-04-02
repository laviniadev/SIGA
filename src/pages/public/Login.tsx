import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { LogIn } from "lucide-react"
import { useAuthStore } from "@/stores/useAuthStore"
import { useState } from "react"
import { toast } from "sonner"

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      toast.success("Login realizado com sucesso!");
      navigate("/customer");
    } else {
      toast.error("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary animate-in fade-in zoom-in-95 duration-500">
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
            <br/><span className="text-xs text-primary/70">(Debug: dev / 123 | Cliente: cliente@siga.com / cliente123)</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">E-mail</Label>
              <Input 
                id="email" 
                type="text" 
                placeholder="E-mail ou Usuário" 
                className="h-12 border-muted-foreground/30 focus:border-primary transition-all duration-300 focus:shadow-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                 <Label htmlFor="password" className="text-sm font-semibold">Senha</Label>
                 <Link to="/forgot-password" className="text-sm font-semibold text-secondary hover:text-purple-700 transition-colors">
                   Esqueceu a senha?
                 </Link>
               </div>
               <Input 
                 id="password" 
                 type="password" 
                 placeholder="••••••••" 
                 className="h-12 border-muted-foreground/30 focus:border-primary transition-all duration-300 focus:shadow-md"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
               />
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
