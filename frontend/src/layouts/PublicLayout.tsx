import { Outlet, Link, useNavigate, useLocation } from "react-router-dom"
import { ShoppingBag, User, LogOut, Menu, X } from "lucide-react"
import { useCartStore } from "@/stores/useCartStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

import { Footer } from "@/components/public/Footer"
import { Logo } from "@/components/public/Logo"
import { LogoutModal } from "@/components/ui/LogoutModal"

export function PublicLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = useCartStore((state) => state.cartCount());
  const { isAuthenticated, logout, user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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

  const navLinks = [
    { name: "Início", path: "/", mobileOnly: true },
    { name: "Ofertas", path: "/offers" },
    { name: "Tendências", path: "/trends" },
    { name: "Produtos", path: "/products" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#111111] overflow-x-hidden">
      <header className="fixed top-0 left-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex h-16 items-center">
          <Link to="/" className="mr-6 flex items-center transition-all active:scale-95 hover:opacity-80">
            <Logo className="text-2xl" />
          </Link>
          <div className="ml-6 flex flex-1 items-center justify-center space-x-4">
            <nav className="hidden md:flex items-center space-x-6 text-sm font-black uppercase tracking-[0.2em]">
              {navLinks.filter(link => !link.mobileOnly).map((link) => {
                const isActive = location.pathname === link.path;
                const isTrends = link.name === "Tendências";

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "transition-all relative group",
                      isTrends
                        ? (isActive ? "text-secondary" : "text-muted-foreground hover:text-secondary")
                        : (isActive ? "text-primary" : "text-muted-foreground hover:text-primary")
                    )}
                  >
                    {link.name}
                    <span className={cn(
                      "absolute -bottom-1 left-0 h-0.5 transition-all",
                      isTrends ? "bg-secondary" : "bg-primary",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}></span>
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center space-x-5">
            <Link to="/cart" className={cn(
              "text-muted-foreground hover:text-primary relative transition-all active:scale-90 p-1",
              location.pathname === "/cart" && "text-primary"
            )}>
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold animate-in zoom-in duration-300 shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/customer" className={cn(
                  "text-muted-foreground hover:text-primary flex items-center gap-2 transition-all active:scale-90 group",
                  location.pathname === "/customer" && "text-primary"
                )}>
                  <div className={cn(
                    "h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors",
                    location.pathname === "/customer" && "bg-primary/10"
                  )}>
                    <User className={cn("h-5 w-5", location.pathname === "/customer" && "text-primary")} />
                  </div>
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
              <Link to="/login" className={cn(
                "hidden md:flex text-muted-foreground hover:text-primary transition-all active:scale-90 p-1",
                location.pathname === "/login" && "text-primary"
              )}>
                <User className="h-6 w-6" />
              </Link>
            )}

            {/* Hamburger Button */}
            <button
              className={cn(
                "md:hidden text-muted-foreground hover:text-primary transition-all active:scale-90 p-1",
                isMenuOpen && "text-primary"
              )}
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
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  const isTrends = link.name === "Tendências";
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={cn(
                        "text-base font-black uppercase tracking-tighter transition-colors py-1 flex items-center justify-between group",
                        isTrends
                          ? (isActive ? "text-secondary" : "text-zinc-950")
                          : (isActive ? "text-primary" : "text-zinc-950")
                      )}
                    >
                      {link.name}
                      {isActive && <div className={cn("h-1 w-1 rounded-full", isTrends ? "bg-secondary" : "bg-primary")} />}
                    </Link>
                  );
                })}
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

      <main className="flex-1 pt-16 bg-background">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
