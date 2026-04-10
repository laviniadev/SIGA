import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { LogIn } from "lucide-react"
import { useAuthStore } from "@/stores/useAuthStore"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="container mx-auto px-4 py-10 flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="space-y-1 text-center pb-4">
           <div className="flex justify-center mb-1">
              <div className="bg-primary/10 rounded-full p-3">
                 <LogIn className="h-6 w-6 text-primary" />
              </div>
           </div>
          <CardTitle className="text-2xl font-black tracking-tighter uppercase text-foreground">
            Acessar Conta
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Insira suas credenciais para visualizar seus pedidos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pb-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider">E-mail</Label>
              <Input 
                id="email" 
                type="text" 
                placeholder="E-mail ou Usuário" 
                className="h-11 border-muted-foreground/30 focus:border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
               <div className="flex items-center justify-between">
                 <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider">Senha</Label>
                 <Link to="/forgot-password" className="text-xs font-bold text-secondary hover:underline">
                   Esqueceu?
                 </Link>
               </div>
               <Input 
                 id="password" 
                 type="password" 
                 placeholder="••••••••" 
                 className="h-11 border-muted-foreground/30 focus:border-primary"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <Button type="submit" className="w-full h-11 text-sm font-bold bg-primary hover:bg-orange-600 shadow-md uppercase tracking-widest">
              Entrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 pt-2 pb-6">
          <div className="text-center text-xs text-muted-foreground">
             Não possui conta?{" "}
             <Link to="/register" className="font-bold text-primary hover:underline">
               Cadastre-se
             </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
