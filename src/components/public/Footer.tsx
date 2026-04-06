import { Link } from "react-router-dom"
import { 
  MapPin, 
  Phone, 
  Mail,
  ArrowRight
} from "lucide-react"
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa"
import { Logo } from "@/components/public/Logo"

export const Footer = () => {
  const scrollToTop = () => {
    const start = window.pageYOffset;
    const speed = 4; // pixels por milissegundo (velocidade constante)
    let startTime: number | null = null;

    // Desabilita o scroll-behavior: smooth do CSS para não interferir na animação JS
    document.documentElement.style.scrollBehavior = 'auto';

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = Math.max(start - (timeElapsed * speed), 0);
      
      window.scrollTo(0, run);

      if (run > 0) {
        requestAnimationFrame(animation);
      } else {
        // Restaura o scroll-behavior original
        document.documentElement.style.scrollBehavior = '';
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <footer className="bg-[#111111] text-white pt-20 pb-8 border-t border-white/5 font-inter">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 mb-16 items-start">
          
          {/* Logo & Sobre */}
          <div className="flex flex-col items-start space-y-6">
            <Link to="/" className="flex items-start transition-all active:scale-95 group leading-none">
              <Logo className="text-3xl leading-none" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium tracking-tight">
              Definindo o futuro do street style com exclusividade, tecnologia e durabilidade. 
              Sua jornada para o amanhã começa aqui.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-none bg-white/5 border border-white/5 hover:bg-white/10 group transition-all">
                <FaInstagram className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-none bg-white/5 border border-white/5 hover:bg-white/10 group transition-all">
                <FaFacebook className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-none bg-white/5 border border-white/5 hover:bg-white/10 group transition-all">
                <FaTwitter className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Loja */}
          <div className="flex flex-col items-start space-y-6 pt-1">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary leading-none h-[1.875rem] flex items-center">Nossa Loja</h4>
            <ul className="space-y-4 w-full">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-all text-sm font-bold flex items-center group relative hover:pl-6">
                   <ArrowRight className="absolute left-0 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                   Coleção Completa
                </Link>
              </li>
              <li>
                <Link to="/products?category=Roupas" className="text-gray-400 hover:text-white transition-all text-sm font-bold flex items-center group relative hover:pl-6">
                   <ArrowRight className="absolute left-0 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                   Roupas Premium
                </Link>
              </li>
              <li>
                <Link to="/products?category=Calçados" className="text-gray-400 hover:text-white transition-all text-sm font-bold flex items-center group relative hover:pl-6">
                   <ArrowRight className="absolute left-0 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                   Lifestyle Sneakers
                </Link>
              </li>
              <li>
                <Link to="/products?category=Acessórios" className="text-gray-400 hover:text-white transition-all text-sm font-bold flex items-center group relative hover:pl-6">
                   <ArrowRight className="absolute left-0 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                   Acessórios Urbanos
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div className="flex flex-col items-start space-y-6 pt-1">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary leading-none h-[1.875rem] flex items-center">Suporte</h4>
            <ul className="space-y-4 w-full">
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-all text-sm font-bold flex items-center group relative hover:pl-6">
                   <ArrowRight className="absolute left-0 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                   Frequência de Perguntas
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-all text-sm font-bold flex items-center group relative hover:pl-6">
                   <ArrowRight className="absolute left-0 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                   Status do Pedido
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-all text-sm font-bold flex items-center group relative hover:pl-6">
                   <ArrowRight className="absolute left-0 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                   Política de Trocas
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-all text-sm font-bold flex items-center group relative hover:pl-6">
                   <ArrowRight className="absolute left-0 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                   Termos e Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="flex flex-col items-start space-y-6 pt-1">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary leading-none h-[1.875rem] flex items-center">Contato</h4>
            <ul className="space-y-5 w-full">
              <li className="flex items-start gap-4 group">
                <div className="h-10 w-10 flex items-center justify-center rounded-none bg-white/5 border border-white/5 group-hover:bg-primary transition-all">
                   <Phone className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-black uppercase text-gray-600 tracking-widest leading-none">Telefone</p>
                  <p className="text-sm font-bold text-gray-200">(11) 4002-8922</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="h-10 w-10 flex items-center justify-center rounded-none bg-white/5 border border-white/5 group-hover:bg-primary transition-all">
                   <Mail className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-black uppercase text-gray-600 tracking-widest leading-none">E-mail</p>
                  <p className="text-sm font-bold text-gray-200">suporte@sigastore.br</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="h-10 w-10 flex items-center justify-center rounded-none bg-white/5 border border-white/5 group-hover:bg-primary transition-all">
                   <MapPin className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-black uppercase text-gray-600 tracking-widest leading-none">Sede</p>
                  <p className="text-sm font-bold text-gray-200">Av. Paulista, 1000 - SP</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-600">
            &copy; 2026 <span className="text-[#F59E0B]">SIGA</span> <span className="text-[#8B5CF6]">Store</span>. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-8">
             <div className="hidden sm:flex items-center gap-3 grayscale opacity-40 invert hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
               <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
             </div>
             <p 
               onClick={scrollToTop}
               className="text-[10px] font-black uppercase text-gray-600 tracking-widest hover:text-white transition-colors cursor-pointer leading-none"
             >
               Início da Página ↑
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
