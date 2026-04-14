import { Link } from "react-router-dom"
import {
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
    <footer className="w-full bg-[#111111] text-white pt-8 md:pt-10 pb-[calc(1.5rem+env(safe-area-inset-bottom))] border-t border-white/5 font-inter relative left-0 -mt-[3px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center gap-6 lg:gap-6 mb-2 md:mb-6 pb-2 md:pb-6 border-none md:border-b border-white/5">
          
          {/* Logo & Slogan */}
          <div className="w-full lg:w-auto text-center lg:text-left flex flex-col items-center lg:items-start space-y-1.5 md:space-y-4">
            <Link to="/" className="flex items-start transition-all active:scale-95 group leading-none">
              <Logo className="text-2xl md:text-2xl leading-none" />
            </Link>
            <p className="hidden md:block text-gray-500 text-[11px] font-medium tracking-tight uppercase max-w-[280px]">
              O amanhã do street style hoje. Exclusividade e essência urbana.
            </p>
          </div>

          {/* Links Horizontais de Alta Usabilidade */}
          <nav className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-8 gap-y-3 sm:gap-x-8 sm:gap-y-4 w-full lg:w-auto justify-items-center sm:justify-center">
            <Link to="/products" className="text-[11px] md:text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-all flex items-center gap-1 group">
              <ChevronRight className="hidden sm:block w-4 h-4 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              Produtos
            </Link>
            <Link to="/offers" className="text-[11px] md:text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-all flex items-center gap-1 group">
              <ChevronRight className="hidden sm:block w-4 h-4 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              Ofertas
            </Link>
            <Link to="/trends" className="text-[11px] md:text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-all flex items-center gap-1 group">
              <ChevronRight className="hidden sm:block w-4 h-4 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              Tendências
            </Link>
            <Link to="/customer" className="text-[11px] md:text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-all flex items-center gap-1 group">
              <ChevronRight className="hidden sm:block w-4 h-4 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              Minha Conta
            </Link>
          </nav>

          {/* Redes Sociais - DESKTOP ONLY */}
          <div className="hidden md:flex items-center justify-center w-full lg:w-auto gap-4 mt-2 md:mt-0">
            <a href="#" className="h-9 w-9 flex items-center justify-center bg-white/5 border border-white/5 hover:bg-white/10 group transition-all rounded-sm">
              <FaInstagram className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a href="#" className="h-9 w-9 flex items-center justify-center bg-white/5 border border-white/5 hover:bg-white/10 group transition-all rounded-sm">
              <FaFacebook className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a href="#" className="h-9 w-9 flex items-center justify-center bg-white/5 border border-white/5 hover:bg-white/10 group transition-all rounded-sm">
              <FaTwitter className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        {/* ═══════ MOBILE SPECIFIC ROW: SOCIALS + PAYMENTS ═══════ */}
        <div className="flex md:hidden items-center justify-between w-full py-4 px-2">
          {/* Redes Sociais Mobile */}
          <div className="flex items-center gap-3">
            <a href="#" className="h-8 w-8 flex items-center justify-center bg-white/5 border border-white/5 hover:bg-white/10 rounded-full transition-all">
              <FaInstagram className="h-3.5 w-3.5 text-gray-400" />
            </a>
            <a href="#" className="h-8 w-8 flex items-center justify-center bg-white/5 border border-white/5 hover:bg-white/10 rounded-full transition-all">
              <FaFacebook className="h-3.5 w-3.5 text-gray-400" />
            </a>
            <a href="#" className="h-8 w-8 flex items-center justify-center bg-white/5 border border-white/5 hover:bg-white/10 rounded-full transition-all">
              <FaTwitter className="h-3.5 w-3.5 text-gray-400" />
            </a>
          </div>
          {/* Pagamentos Mobile */}
          <div className="flex items-center gap-3 opacity-60">
            <img src="/payment/visa.png" alt="Visa" className="h-7 w-auto object-contain" />
            <img src="/payment/mastercard.png" alt="Mastercard" className="h-5 w-auto object-contain" />
            <img src="/payment/pix.png" alt="Pix" className="h-4 w-auto object-contain" />
          </div>
        </div>

        {/* Linha Final: Copyright & Back To Top */}
        <div className="flex flex-row items-center justify-between gap-3 md:gap-6 pt-2 md:pt-0 w-full px-2 md:px-0">
          <p className="text-[9px] md:text-[10px] uppercase font-black tracking-[0.25em] text-gray-600">
            © 2026 <span className="text-white">SIGASTORE</span><span className="hidden md:inline">. Todos os direitos reservados.</span>
          </p>
          
          <div className="flex flex-row items-center gap-6 w-auto">
            {/* Pagamentos - DESKTOP ONLY */}
            <div className="hidden md:flex items-center justify-center gap-3 opacity-60 hover:opacity-100 hover:brightness-125 transition-all duration-500 cursor-pointer">
              <img src="/payment/visa.png" alt="Visa" className="h-10 w-auto object-contain" />
              <img src="/payment/mastercard.png" alt="Mastercard" className="h-6 w-auto object-contain" />
              <img src="/payment/pix.png" alt="Pix" className="h-5 w-auto object-contain" />
            </div>
            
            <button
              onClick={scrollToTop}
              className="text-[10px] md:text-[9px] font-black uppercase text-gray-600 tracking-widest hover:text-white transition-colors flex items-center gap-1.5 md:gap-1 group"
            >
              Topo <span className="text-xs md:text-[9px] group-hover:-translate-y-1 transition-transform">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
