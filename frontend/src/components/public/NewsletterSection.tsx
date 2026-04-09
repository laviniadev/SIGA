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
    <section className="py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Newsletter Banner */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-primary via-primary/80 to-secondary p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-white rounded-full blur-3xl -mr-24 sm:-mr-48 -mt-24 sm:-mt-48" />
            <div className="absolute bottom-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-white rounded-full blur-3xl -ml-24 sm:-ml-48 -mb-24 sm:-mb-48" />
          </div>

          <div className="relative z-10 max-w-xl md:max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="bg-white/20 p-3 md:p-4 rounded-full">
                <Mail className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-2 md:mb-4">
              Receba as Melhores Ofertas
            </h2>
            <p className="text-white/90 text-sm md:text-lg mb-6 md:mb-8 font-medium">
              Se inscreva na nossa newsletter e receba 10% de desconto na sua primeira compra
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-xs sm:max-w-md mx-auto">
              <Input
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/95 border-0 h-10 md:h-12 font-medium text-sm"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-secondary hover:bg-secondary/90 text-white font-black uppercase tracking-widest h-10 md:h-12 px-6 md:px-8 rounded-lg text-xs md:text-sm"
              >
                {isLoading ? 'Inscrevendo...' : 'Inscrever'}
              </Button>
            </form>

            <p className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-4 md:mt-6">
              Sem spam. Desinscreva-se a qualquer momento.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
