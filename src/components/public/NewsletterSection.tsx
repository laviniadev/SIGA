import { Mail, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { toast } from 'sonner'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Por favor, digite seu e-mail')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      toast.success('Você se inscreveu com sucesso!')
      setEmail('')
      setIsLoading(false)
    }, 500)
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Newsletter Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary/80 to-secondary p-12 md:p-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -ml-48 -mb-48" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Receba as Melhores Ofertas
            </h2>
            <p className="text-white/90 text-lg mb-8 font-medium">
              Se inscreva na nossa newsletter e receba 10% de desconto na sua primeira compra
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/95 border-0 h-12 font-medium"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-secondary hover:bg-secondary/90 text-white font-black uppercase tracking-widest h-12 px-8 rounded-lg"
              >
                {isLoading ? 'Inscrevendo...' : 'Inscrever'}
              </Button>
            </form>

            <p className="text-white/80 text-xs font-bold uppercase tracking-widest mt-6">
              Sem spam. Desinscreva-se a qualquer momento.
            </p>
          </div>
        </div>

        {/* Trust Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="font-bold text-lg">100% Autenticidade</h3>
            <p className="text-muted-foreground text-sm">
              Todos os produtos são genuínos e verificados
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center">
                <svg className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="font-bold text-lg">Compra Segura</h3>
            <p className="text-muted-foreground text-sm">
              Transações protegidas com os melhores gateways
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h3 className="font-bold text-lg">Entrega Rápida</h3>
            <p className="text-muted-foreground text-sm">
              Enviamos seus pedidos em até 2 dias úteis
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
