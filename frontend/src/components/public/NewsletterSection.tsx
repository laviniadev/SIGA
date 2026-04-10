import { Mail, Heart, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useRef, useEffect } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const commonDomains = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com.br", "icloud.com", "live.com"];

  const getEmailSuggestion = (value: string) => {
    if (!value.includes("@")) return null;
    const [local, domain] = value.split("@");
    if (!domain) return "gmail.com";

    const suggestion = commonDomains.find(d => d.startsWith(domain.toLowerCase()));
    if (suggestion && suggestion !== domain.toLowerCase()) return suggestion;
    return null;
  };

  const getFieldFeedback = (name: string, value: string) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? "Digite um e-mail válido (ex@ex.com)" : "E-mail pronto p/ inscrição";
  };

  const isFieldInvalid = (name: string, value: string) => {
    if (!touched[name]) return false;
    const feedback = getFieldFeedback(name, value);
    return feedback && !feedback.includes("pronto");
  };

  const ValidationTooltip = ({ field, value }: { field: string; value: string }) => {
    const feedback = getFieldFeedback(field, value);
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      if (focusedField === field && feedback) {
        setVisible(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setVisible(false);
        }, 3000);
      } else {
        setVisible(false);
      }
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, [value, focusedField, feedback]);

    if (!visible || !feedback) return null;

    const isValid = feedback.includes("pronto");

    return (
      <div className="absolute -top-7 left-2 z-50 animate-in fade-in slide-in-from-bottom-1 duration-200">
        <div className={cn(
          "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm border whitespace-nowrap",
          isValid
            ? "bg-gray-100 text-gray-500 border-gray-200"
            : "bg-gray-100 text-gray-600 border-gray-200"
        )}>
          {feedback}
        </div>
        <div className="absolute -bottom-1 left-3 w-2 h-2 bg-gray-100 border-r border-b border-gray-200 transform rotate-45"></div>
      </div>
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setTouched({ email: true });
      toast.error('Por favor, digite um e-mail válido');
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      toast.success('Inscrição confirmada. Verifique seu e-mail!')
      setEmail('')
      setTouched({});
      setIsLoading(false)
    }, 800)
  }

  return (
    <section className="pt-2 pb-16 md:pt-4 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-200 p-6 md:p-8 lg:p-10">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Mail className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
              </div>
              <h2 className="text-lg md:text-2xl font-black text-zinc-900 tracking-tighter uppercase mb-2">
                Ofertas Exclusivas <br className="md:hidden" /> no seu E-mail
              </h2>
              <p className="text-zinc-600 text-xs md:text-sm lg:text-base font-medium max-w-md mx-auto lg:mx-0">
                Fique por dentro das novidades e receba <span className="text-primary font-bold">10% OFF</span> na sua primeira compra.
              </p>
            </div>

            <div className="w-full max-w-md">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative group">
                  <ValidationTooltip field="email" value={email} />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => {
                      setFocusedField(null);
                      setTouched(prev => ({ ...prev, email: true }));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && email.includes("@")) {
                        const suggestion = getEmailSuggestion(email);
                        if (suggestion) {
                          e.preventDefault();
                          const [local] = email.split("@");
                          setEmail(`${local}@${suggestion}`);
                          setTouched({ email: true });
                        }
                      }
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      "bg-white border-zinc-200 text-zinc-900 text-sm md:text-base placeholder:text-zinc-400 focus:border-primary transition-all h-12 rounded-xl",
                      isFieldInvalid("email", email) && "border-destructive focus:border-destructive shadow-[0_0_0_1px_rgba(220,38,38,0.1)]"
                    )}
                  />
                  {email.includes("@") && getEmailSuggestion(email) && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] md:text-[10px] font-black text-muted-foreground/30 pointer-events-none uppercase tracking-widest">
                      Enter p/ @{getEmailSuggestion(email)}
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs md:text-sm font-black uppercase tracking-widest h-12 px-10 transition-all active:scale-95 shadow-lg shadow-primary/20 rounded-xl"
                >
                  {isLoading ? '...' : 'Inscrever'}
                </Button>
              </form>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-4 text-zinc-400 text-[10px] md:text-xs font-black uppercase tracking-widest opacity-60">
                <ShieldCheck className="w-3.5 h-3.5 text-primary/50" />
                <span>Desinscreva-se quando quiser</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
