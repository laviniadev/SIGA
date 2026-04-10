import { Link } from "react-router-dom"
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight
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
    <footer className="w-full bg-[#111111] text-white pt-8 pb-6 border-t border-white/5 font-inter relative left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center gap-8 lg:gap-6 mb-6 pb-6 border-b border-white/5">
          
          {/* Logo & Slogan */}
          <div className="space-y-4 w-full lg:w-auto text-center lg:text-left flex flex-col items-center lg:items-start">
            <Link to="/" className="flex items-start transition-all active:scale-95 group leading-none">
              <Logo className="text-2xl leading-none" />
            </Link>
            <p className="text-gray-500 text-[11px] font-medium tracking-tight uppercase max-w-[280px]">
              O amanhã do street style hoje. Exclusividade e essência urbana.
            </p>
          </div>

          {/* Links Horizontais de Alta Usabilidade */}
          <nav className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-4 sm:gap-x-8 gap-y-4 w-full lg:w-auto justify-items-center sm:justify-center">
            <Link to="/products" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-all flex items-center gap-2 group">
              <ChevronRight className="hidden sm:block w-4 h-4 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              Produtos
            </Link>
            <Link to="/offers" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-all flex items-center gap-2 group">
              <ChevronRight className="hidden sm:block w-4 h-4 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              Ofertas
            </Link>
            <Link to="/trends" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-all flex items-center gap-2 group">
              <ChevronRight className="hidden sm:block w-4 h-4 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              Tendências
            </Link>
            <Link to="/customer" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-all flex items-center gap-2 group">
              <ChevronRight className="hidden sm:block w-4 h-4 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              Minha Conta
            </Link>
          </nav>

          {/* Redes Sociais */}
          <div className="flex items-center justify-center w-full lg:w-auto gap-4">
            <a href="#" className="h-10 w-10 sm:h-9 sm:w-9 flex items-center justify-center bg-white/5 border border-white/5 hover:bg-white/10 group transition-all">
              <FaInstagram className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a href="#" className="h-10 w-10 sm:h-9 sm:w-9 flex items-center justify-center bg-white/5 border border-white/5 hover:bg-white/10 group transition-all">
              <FaFacebook className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a href="#" className="h-10 w-10 sm:h-9 sm:w-9 flex items-center justify-center bg-white/5 border border-white/5 hover:bg-white/10 group transition-all">
              <FaTwitter className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        {/* Linha Final: Copyright & Pagamentos */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          <p className="text-[9px] md:text-[10px] uppercase font-black tracking-[0.25em] text-gray-600 text-center md:text-left">
            © 2026 <span className="text-white">SIGASTORE</span>. Todos os direitos reservados.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
            <div className="flex items-center justify-center gap-3 opacity-60 hover:opacity-100 hover:brightness-125 transition-all duration-500 cursor-pointer">
              <img src="/payment/visa.png" alt="Visa" className="h-8 sm:h-10 w-auto object-contain" />
              <img src="/payment/mastercard.png" alt="Mastercard" className="h-5 sm:h-6 w-auto object-contain" />
              <img src="/payment/pix.png" alt="Pix" className="h-4 sm:h-5 w-auto object-contain" />
            </div>
            <button
              onClick={scrollToTop}
              className="w-full sm:w-auto py-3 sm:py-0 border-t border-white/5 sm:border-t-0 text-[10px] sm:text-[9px] font-black uppercase text-gray-600 tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2 sm:gap-1 group"
            >
              Início da Página <span className="group-hover:-translate-y-1 transition-transform">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
