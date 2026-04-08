import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { KeyRound, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error("Por favor, informe seu e-mail.")
      return
    }
    
    // Simulação de envio
    toast.success("Link de recuperação enviado com sucesso!")
    setIsSent(true)
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-secondary animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="flex justify-center mb-2">
            <div className="bg-secondary/10 rounded-full p-4">
              <KeyRound className="h-8 w-8 text-secondary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight text-foreground">
            Recuperar Senha
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            {isSent 
              ? "Verifique sua caixa de entrada para redefinir sua senha."
              : "Informe seu e-mail cadastrado para receber as instruções de recuperação."}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">E-mail</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu.email@exemplo.com" 
                  className="h-12 border-muted-foreground/30 focus:border-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full h-12 text-base font-bold bg-secondary hover:bg-purple-700 shadow-md">
                Enviar Link
              </Button>
            </form>
          ) : (
            <div className="text-center py-4">
               <p className="text-sm text-muted-foreground mb-6">
                 Se o e-mail estiver cadastrado, você receberá um link em instantes.
               </p>
               <Button variant="outline" className="w-full" onClick={() => setIsSent(false)}>
                 Tentar outro e-mail
               </Button>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center pt-2">
          <Link to="/login" className="flex items-center text-sm font-semibold text-primary hover:text-orange-600 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
