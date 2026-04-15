import { useState, useEffect } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Copy, Clock, ChevronLeft, ShieldCheck } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function PixPayment() {
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutos
  const pixCode = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode)
    toast.success("Código PIX copiado com sucesso!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative">
        
        {/* Voltar no topo - IDENTICO AO FAVORITES */}
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-4 md:mb-6 group"
        >
          <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-0.5 transition-transform" /> 
          Voltar para o início
        </button>

        <div className="flex flex-col items-center justify-center w-full animate-in fade-in slide-in-from-bottom-4 duration-700 mt-4 md:mt-8">
          <Card className="border-none shadow-2xl rounded-[28px] overflow-hidden bg-background/90 backdrop-blur-xl border border-white/10 max-w-[400px] w-full">
          <CardContent className="p-5 space-y-4 text-center">
            
            {/* Header Ultra Compacto */}
            <div className="flex items-center justify-between border-b border-muted/30 pb-3">
              <div className="text-left">
                <h1 className="text-lg font-black tracking-tighter uppercase italic leading-none">Pague com PIX</h1>
                <p className="text-muted-foreground text-[8px] font-black uppercase tracking-widest opacity-60 mt-1">Escaneie ou copie o código</p>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-success/10 text-success border border-success/20">
                <CheckCircle2 className="w-2.5 h-2.5" />
                <span className="text-[8px] font-black uppercase tracking-widest italic">Processando</span>
              </div>
            </div>

            {/* QR Code Refinado */}
            <div className="relative group p-3 bg-white rounded-[20px] shadow-inner inline-block border border-muted/50 transition-transform duration-500 hover:scale-[1.02]">
              <QRCodeSVG 
                value={pixCode} 
                size={140}
                level="H"
                includeMargin={false}
              />
              <div className="absolute -bottom-1 -right-1 bg-primary text-white px-1.5 py-0.5 rounded-md shadow-lg">
                <span className="text-[7px] font-black uppercase tracking-widest italic">SIGA</span>
              </div>
            </div>

            {/* Timer e Status em Linha Única */}
            <div className="flex items-center justify-between px-3 py-2 bg-muted/20 rounded-xl border border-muted/10">
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-primary" />
                <span className="text-[11px] font-black tabular-nums">{formatTime(timeLeft)}</span>
              </div>
              <div className="h-4 w-px bg-muted/40" />
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-success rounded-full animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-success">Aguardando</span>
              </div>
            </div>

            {/* Copia e Cola Compacto */}
            <div className="relative flex items-center gap-2 p-1 bg-muted/30 rounded-xl border border-muted/30 group transition-all hover:border-primary/30">
              <div className="flex-1 px-3 text-[8px] font-bold text-muted-foreground/60 truncate text-left uppercase tracking-tighter">
                {pixCode}
              </div>
              <Button 
                onClick={handleCopy}
                size="sm"
                className="h-8 px-4 bg-primary hover:bg-orange-600 rounded-lg font-black uppercase tracking-widest text-[8px] shadow-lg shadow-primary/20"
              >
                Copiar
              </Button>
            </div>

            {/* Segurança */}
            <div className="flex items-center justify-center gap-1.5 text-[7px] font-bold text-muted-foreground uppercase tracking-widest opacity-30 italic">
              <ShieldCheck className="w-2.5 h-2.5" /> Compra 100% protegida
            </div>

          </CardContent>
        </Card>

        </div>
      </div>
    </div>
  )
}
