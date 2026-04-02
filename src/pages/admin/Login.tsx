import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"
import { useNavigate, Link } from "react-router-dom"
import { useAuthStore } from "@/stores/useAuthStore"
import { useState } from "react"
import { toast } from "sonner"

export default function AdminLogin() {
  const navigate = useNavigate()
  const login = useAuthStore(state => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(email, password);
    if (success) {
      const user = useAuthStore.getState().user;
      if (user?.role === "admin") {
        toast.success("Bem-vindo ao painel!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Acesso negado. Requer privilégios de administrador.");
        useAuthStore.getState().logout();
      }
    } else {
      toast.error("Credenciais inválidas. Tente novamente.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Lock className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Acesso Restrito
          </CardTitle>
          <CardDescription>
            Insira suas credenciais para acessar o painel de administração
            <br/><span className="text-xs text-primary/70">(Debug: dev / 123 | Admin: admin@siga.com / admin123)</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail ou Usuário</Label>
              <Input 
                id="email" 
                type="text" 
                placeholder="Ex: admin@sigastore.com ou dev" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-orange-600">
              Entrar no Painel
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
