import { Outlet, Link, useNavigate } from "react-router-dom"
import { ShoppingBag, User, LogOut, Menu, X } from "lucide-react"
import { useCartStore } from "@/stores/useCartStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { useState, useEffect } from "react"
import { toast } from "sonner"

import { Footer } from "@/components/public/Footer"
import { Logo } from "@/components/public/Logo"
import { LogoutModal } from "@/components/ui/LogoutModal"

export function PublicLayout() {
  const navigate = useNavigate();
  const cartCount = useCartStore((state) => state.cartCount());
  const { isAuthenticated, logout, user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [navigate]);

  // Block scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    toast.success("Sessão encerrada.");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background overflow-x-hidden">
      <header className="fixed top-0 left-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md transition-all duration-500">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex h-16 items-center">
          <Link to="/" className="mr-6 flex items-center transition-all active:scale-95 hover:opacity-80">
            <Logo className="text-2xl" />
          </Link>
          <div className="mx-6 flex flex-1 items-center justify-center space-x-4">
            <nav className="hidden md:flex items-center space-x-6 text-sm font-black uppercase tracking-[0.2em]">
              <Link to="/" className="transition-all hover:text-primary relative group">
                Início
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link to="/offers" className="transition-all hover:text-primary relative group">
                Ofertas
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link to="/trends" className="transition-all hover:text-primary relative group">
                Tendências
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link to="/products" className="transition-all hover:text-primary relative group">
                Produtos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-5">
            <Link to="/cart" className="text-muted-foreground hover:text-primary relative transition-all active:scale-90 p-1">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold animate-in zoom-in duration-300 shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/customer" className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-all active:scale-90 group">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="hidden md:inline text-xs font-bold uppercase tracking-wider">{user?.name.split(' ')[0]}</span>
                </Link>
                <LogoutModal onConfirm={handleLogout}>
                  <button 
                    className="text-muted-foreground hover:text-destructive transition-all active:scale-90 cursor-pointer p-1 outline-none"
                    title="Sair"
                  >
                    <LogOut className="h-5 w-5 pointer-events-none" />
                  </button>
                </LogoutModal>
              </div>
            ) : (
              <Link to="/login" className="hidden md:flex text-muted-foreground hover:text-primary transition-all active:scale-90 p-1">
                <User className="h-6 w-6" />
              </Link>
            )}

            {/* Hamburger Button */}
            <button 
              className="md:hidden text-muted-foreground hover:text-primary transition-all active:scale-90 p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

      </header>

      {/* Mobile Menu - Refeito do Zero FORA do Header */}
      <div className={`fixed inset-0 z-[100] md:hidden transition-all duration-300 ${isMenuOpen ? "visible" : "invisible"}`}>
        {/* Overlay Escuro com Fade */}
        <div 
          className={`absolute inset-0 bg-zinc-950/40 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0"}`} 
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Gaveta Branca Sólida com Slide */}
        <nav className={`absolute right-0 top-0 h-full w-[240px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out p-6 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          {/* Header da Gaveta com Logo */}
          <div className="flex items-center justify-between mb-8 pt-2">
            <Logo className="text-lg" />
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-zinc-950 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col space-y-7">
            <div className="space-y-2">
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/50 border-b border-primary/5 pb-1.5">Navegação</p>
                <div className="flex flex-col space-y-4">
                  <Link to="/" className="text-base font-black uppercase tracking-tighter text-zinc-950 hover:text-primary transition-colors py-1">Início</Link>
                  <Link to="/offers" className="text-base font-black uppercase tracking-tighter text-zinc-950 hover:text-primary transition-colors py-1">Ofertas</Link>
                  <Link to="/trends" className="text-base font-black uppercase tracking-tighter text-zinc-950 hover:text-primary transition-colors py-1">Tendências</Link>
                  <Link to="/products" className="text-base font-black uppercase tracking-tighter text-zinc-950 hover:text-primary transition-colors py-1">Produtos</Link>
                </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-zinc-50">
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/50 border-b border-primary/5 pb-1.5">Conta</p>
              <div className="flex flex-col space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/customer" className="flex items-center gap-3 text-[13px] font-black uppercase tracking-tighter text-zinc-950 hover:text-primary transition-colors py-1">
                      <div className="h-7 w-7 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600"><User className="h-3.5 w-3.5" /></div>
                      Minha Área
                    </Link>
                    <LogoutModal onConfirm={handleLogout}>
                      <button className="flex items-center gap-3 text-[13px] font-black uppercase tracking-tighter text-destructive hover:opacity-80 transition-opacity text-left py-1 w-full">
                        <div className="h-7 w-7 rounded-full bg-destructive/5 flex items-center justify-center"><LogOut className="h-3.5 w-3.5" /></div>
                        Sair
                      </button>
                    </LogoutModal>
                  </>
                ) : (
                  <Link to="/login" className="flex items-center gap-3 text-[13px] font-black uppercase tracking-tighter text-zinc-950 hover:text-primary transition-colors py-1">
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary"><User className="h-3.5 w-3.5" /></div>
                    Acessar Conta
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Rodapé da Gaveta */}
          <div className="mt-auto pt-8 border-t border-zinc-50">
             <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-400 text-center">
               SIGASTORE © 2026
             </p>
          </div>
        </nav>
      </div>

      <main className="flex-1 pt-16 min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
