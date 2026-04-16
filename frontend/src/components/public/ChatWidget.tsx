import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/useAuthStore';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
  needsHuman?: boolean;
  internalLink?: string;
}

export function ChatWidget() {
  const { isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Olá! Sou seu assistente virtual do SIGA. Como posso te ajudar hoje?",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          text: "Busca produtos ou quer ver ofertas?",
          isBot: true,
          timestamp: new Date()
        }
      ]);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const [failureCount, setFailureCount] = useState(0);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    const lowMsg = userMsg.toLowerCase();
    setInput('');
    setMessages(prev => [...prev, { text: userMsg, isBot: false, timestamp: new Date() }]);
    setIsLoading(true);

    const getLocalResponse = () => {
      // Helper for word boundary check
      const containsWord = (word: string) => new RegExp(`\\b${word}\\b`, 'i').test(lowMsg);
      
      // Helper to clean the search query from stop words/commands
      const cleanSearchQuery = (text: string) => {
        const stopWords = [
          "buscar", "busca", "procurar", "procura", "encontrar", "quero", "ver", "comprar", "pesquisar", "pesquisa",
          "gostaria", "gostariia", "queria", "queriia", "preciso", "mostre", "exiba", "lista", "tem", "vcs", "vocês", 
          "estou", "procurando", "por", "um", "uma", "uns", "umas", "de", "do", "da", "dos", "das", "pode", "mostrar", 
          "algum", "alguma", "alguns", "algumas", "tamanho", "com", "para", "em", "pelo", "pela"
        ];
        let cleaned = text;
        stopWords.forEach(word => {
          cleaned = cleaned.replace(new RegExp(`\\b${word}\\b`, 'gi'), "");
        });
        return cleaned.trim().replace(/\s+/g, ' ');
      };



      if (lowMsg.match(/^(oi|olá|ola|bom dia|boa tarde|boa noite)/)) {
        setFailureCount(0);
        return { text: "Olá. O que você está procurando hoje?", needsHuman: false };
      }

      // Sections detection...
      if (containsWord("carrinho") || containsWord("sacola") || containsWord("cart") || lowMsg.includes("meu carrinho") || lowMsg.includes("minha sacola")) {
        setFailureCount(0);
        return { text: "Acessando seu carrinho de compras.", internalLink: "/cart" };
      }
      if (containsWord("checkout") || containsWord("finalizar") || containsWord("pagamento")) {
        setFailureCount(0);
        return { text: "Redirecionando para o fechamento do seu pedido.", internalLink: "/checkout" };
      }
      if (containsWord("home") || containsWord("inicio") || containsWord("página inicial")) {
        setFailureCount(0);
        return { text: "Voltando para a página inicial.", internalLink: "/" };
      }
      if (containsWord("perfil") || lowMsg.includes("minha conta") || lowMsg.includes("meus pedidos") || containsWord("dashboard") || containsWord("profile") || containsWord("account")) {
        setFailureCount(0);
        if (!isAuthenticated) {
          return { text: "Você precisa estar logado para ver sua conta. Deseja fazer login agora?", internalLink: "/login" };
        }
        return { text: "Acessando sua área de cliente.", internalLink: "/customer" };
      }
      if (containsWord("wishlist") || containsWord("favorito") || lowMsg.includes("lista de desejos")) {
        setFailureCount(0);
        if (!isAuthenticated) {
          return { text: "Faça login para salvar e ver seus produtos favoritos.", internalLink: "/login" };
        }
        return { text: "Abrindo sua lista de desejos.", internalLink: "/favorites" };
      }

      // Categories (Robust for accents and typos)
      if (containsWord("roupa") || containsWord("roupas") || lowMsg.includes("vestuário") || containsWord("camiseta") || containsWord("clothes")) {
        setFailureCount(0);
        return { text: "Encontrei nossa coleção de roupas para você.", internalLink: "/products?category=Roupas" };
      }
      if (containsWord("tenis") || containsWord("tênis") || containsWord("calçado") || containsWord("calçados") || containsWord("sapato") || containsWord("shoes") || containsWord("sneaker")) {
        setFailureCount(0);
        return { text: "Veja aqui nossos calçados disponíveis.", internalLink: "/products?category=Calçados" };
      }
      if (containsWord("acessório") || containsWord("acessorio") || containsWord("acessórios") || containsWord("acessorios") || containsWord("relógio") || containsWord("relogio") || containsWord("oculos") || containsWord("accessory") || containsWord("accessories")) {
        setFailureCount(0);
        return { text: "Confira nossos acessórios.", internalLink: "/products?category=Acessórios" };
      }

      // Trends
      if (containsWord("urbano") || containsWord("urban") || containsWord("minimalista") || containsWord("minimalismo") || containsWord("atemporal")) {
        setFailureCount(0);
        const style = containsWord("urbano") ? "Urbano" : containsWord("minimalista") ? "Minimalista" : "Atemporal";
        return { text: `Confira nossa coleção ${style} com as últimas tendências.`, internalLink: `/trends?filter=${style}` };
      }
      
      if (containsWord("promoc") || containsWord("promoção") || containsWord("oferta") || containsWord("desconto") || containsWord("sale") || containsWord("offer")) {
        setFailureCount(0);
        if (lowMsg.includes("trend") || lowMsg.includes("tendência")) {
          return { text: "Veja as melhores promoções da nossa curadoria.", internalLink: "/trends?filter=Promoções" };
        }
        return { text: "Aqui estão as melhores ofertas de hoje.", internalLink: "/offers" };
      }
      if (containsWord("frete") || containsWord("entrega") || containsWord("shipping") || containsWord("delivery")) {
        setFailureCount(0);
        return { text: "Frete grátis em compras acima de R$ 199. Deseja calcular para seu CEP?", needsHuman: false };
      }
      if (containsWord("atendente") || containsWord("humano") || containsWord("falar") || containsWord("suporte") || containsWord("support")) {
        setFailureCount(0);
        return { text: "Encaminhando para um atendente no WhatsApp.", needsHuman: true };
      }

      // If we reach here, it's a general search or unrecognized
      const finalQuery = cleanSearchQuery(userMsg);
      const isVeryShort = finalQuery.length < 2 && finalQuery.length > 0;
      
      // Gibberish Heuristics:
      // 1. 4+ consecutive consonants
      const hasConsonantCluster = /[^aeiouáéíóúâêôãõ\s]{4,}/i.test(finalQuery);
      // 2. 3+ identical characters
      const hasRepeatingChars = /(.)\1\1/.test(finalQuery);
      // 3. Common smash keys or laughs
      const isSmashOrLaugh = /asdf|dfgh|jkl|qwerty|qwer|zxcv|kkkk|hahah|rsrsrs|uhauh|shuashua|ksksks|jaij|isji|iajs|isaj|jasa/i.test(finalQuery);
      
      // 4. Random typing patterns (lower threshold for home-row patterns)
      const isRandomTyping = (finalQuery.length > 5 && !/\s/.test(finalQuery) && (
        (finalQuery.match(/[asdfjkluiop]/gi) || []).length > finalQuery.length * 0.75 ||
        (finalQuery.length > 15 && !/\s/.test(finalQuery))
      ));

      const resemblesGibberish = hasConsonantCluster || hasRepeatingChars || isSmashOrLaugh || isRandomTyping;

      if (isVeryShort || resemblesGibberish || failureCount >= 1) {
        if (failureCount === 0 && (isVeryShort || resemblesGibberish)) {
          setFailureCount(1);
          return { text: "Não entendi bem. Poderia repetir ou explicar de outra forma?", needsHuman: false };
        } else {
          setFailureCount(0); // Reset after escalating
          return { text: "Ainda não estou conseguindo te entender. Vou te passar para um de nossos especialistas no WhatsApp agora.", needsHuman: true };
        }
      }

      // Normal general search (count as "somewhat understood" but maybe keep counter 0)
      setFailureCount(0);
      return { text: `Veja os resultados para "${finalQuery}" em nossa loja.`, internalLink: `/products?search=${encodeURIComponent(finalQuery)}` };
    };

    try {
      const apiUrl = import.meta.env.PROD 
        ? '/api/chat' 
        : 'http://127.0.0.1:5005/api/chat';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!response.ok) throw new Error();

      const data = await response.json();
      
      // Simulação de digitação (atraso artificial para humanização)
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 800));

      let finalResponse = data.response;
      let finalLink = data.internal_link;

      // Proteção de rotas autenticadas (Favoritos e Perfil)
      if (!isAuthenticated && (finalLink === '/favorites' || finalLink === '/customer')) {
        finalResponse = finalLink === '/favorites' 
          ? "Você precisa estar logado para acessar seus favoritos. 🔒 Deseja fazer login agora?" 
          : "Para ver seus pedidos e dados, é necessário fazer login. 👤 Deseja entrar?";
        finalLink = '/login';
      }

      setMessages(prev => [...prev, {
        text: finalResponse,
        isBot: true,
        timestamp: new Date(),
        needsHuman: data.needs_human,
        internalLink: finalLink
      }]);
    } catch (error) {
      // Delay também no fallback para consistência
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const fallback = getLocalResponse();
      setMessages(prev => [...prev, {
        ...fallback,
        isBot: true,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-4 md:bottom-14 md:right-8 z-[9999] flex flex-col items-end max-w-[calc(100vw-32px)] pointer-events-none">
      {/* Chat Window */}
      <div className={cn(
        "mb-4 w-[calc(100vw-32px)] md:w-[330px] h-[300px] md:h-[360px] bg-background shadow-2xl rounded-2xl flex flex-col overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-right",
        isOpen
          ? "opacity-100 scale-100 translate-y-0 blur-0 duration-300 ease-out pointer-events-auto"
          : "opacity-0 scale-0 translate-y-32 blur-xl pointer-events-none duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      )}>
        {/* Header */}
        <div className="bg-[#8B5CF6] py-2.5 px-4 text-white flex justify-between items-center relative overflow-hidden">
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.1)_50%,transparent_100%)] animate-[shimmer_4s_infinite] pointer-events-none" />
          
          <div className="flex items-center gap-2.5 relative z-10">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs uppercase tracking-tight">Assistente SIGA</p>
              <p className="text-[8px] opacity-80 uppercase font-black tracking-widest leading-none">Online Agora</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 p-1 rounded-full transition-colors relative z-10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/5 scroll-smooth">
          {messages.map((msg, idx) => (
            <div key={idx} className={cn("flex w-full", msg.isBot ? "justify-start" : "justify-end")}>
              <div className={cn(
                "max-w-[80%] p-2.5 rounded-2xl text-xs shadow-sm",
                msg.isBot
                  ? "bg-card border text-foreground rounded-tl-none"
                  : "bg-[#8B5CF6] text-primary-foreground rounded-tr-none"
              )}>
                <p className="leading-relaxed">{msg.text}</p>

                {msg.internalLink && (
                  <Button
                    asChild
                    className="w-full mt-3 bg-[#8B5CF6] hover:bg-violet-700 text-white gap-2 h-9 text-[10px] font-black uppercase"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to={msg.internalLink}>
                      Conferir Agora <ExternalLink className="w-3 h-3" />
                    </Link>
                  </Button>
                )}

                {msg.needsHuman && (
                  <Button
                    asChild
                    className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white gap-2 h-9 text-[10px] font-black uppercase"
                  >
                    <a href="https://api.whatsapp.com/send?phone=5521995027179" target="_blank" rel="noreferrer">
                      Falar com Atendente <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                )}

                <span className="text-[8px] opacity-40 mt-1 block uppercase font-bold tracking-tighter">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-card border p-3 rounded-2xl rounded-tl-none tabular-nums space-x-1">
                <span className="w-1 h-1 bg-foreground/30 inline-block rounded-full animate-bounce" />
                <span className="w-1 h-1 bg-foreground/30 inline-block rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1 h-1 bg-foreground/30 inline-block rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Footer Input */}
        <div className="p-3 bg-card flex gap-2">
          <input
            type="text"
            placeholder="Digite sua dúvida..."
            className="flex-1 bg-muted/30 border-none rounded-full px-4 py-1.5 text-xs focus:ring-2 focus:ring-[#8B5CF6] outline-none transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button size="icon" onClick={handleSend} className="h-8 w-8 rounded-full flex-shrink-0 animate-in zoom-in-50 bg-[#8B5CF6] hover:bg-violet-700">
            <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#8B5CF6] text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-90 relative pointer-events-auto",
          isOpen && "rotate-90 opacity-0 pointer-events-none translate-y-4"
        )}
      >
        {/* Shimmer Effect (Contained) */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.1)_50%,transparent_100%)] animate-[shimmer_4s_infinite]" />
        </div>
        
        <MessageCircle className="w-6 h-6 md:w-8 md:h-8 relative z-10" />
        
        {/* Green Status Dot (Safe from clipping) */}
        <span className="absolute top-0 right-0 md:-top-0.5 md:-right-0.5 flex h-2.5 w-2.5 md:h-3.5 md:w-3.5 z-20">
          <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-success opacity-60"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3.5 md:w-3.5 bg-success"></span>
        </span>
      </button>
    </div>
  );
}
