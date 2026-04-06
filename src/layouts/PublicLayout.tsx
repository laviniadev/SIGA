import { Outlet, Link, useNavigate } from "react-router-dom"
import { ShoppingBag, User, LogOut } from "lucide-react"
import { useCartStore } from "@/stores/useCartStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { toast } from "sonner"

import { Footer } from "@/components/public/Footer"
import { Logo } from "@/components/public/Logo"
import { LogoutModal } from "@/components/ui/LogoutModal"

export function PublicLayout() {
  const navigate = useNavigate();
  const cartCount = useCartStore((state) => state.cartCount());
  const { isAuthenticated, logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("Sessão encerrada.");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md transition-all duration-500">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex h-16 items-center">
          <Link to="/" className="mr-6 flex items-center transition-all active:scale-95 hover:opacity-80">
            <Logo className="text-2xl" />
          </Link>
          <div className="mx-6 flex flex-1 items-center justify-center space-x-4">
            <nav className="flex items-center space-x-6 text-sm font-black uppercase tracking-[0.2em]">
              <Link to="/" className="transition-all hover:text-primary relative group">
                Início
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
              <div className="flex items-center space-x-4">
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
              <Link to="/login" className="text-muted-foreground hover:text-primary transition-all active:scale-90 p-1">
                <User className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
