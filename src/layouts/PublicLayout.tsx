import { Outlet, Link, useNavigate } from "react-router-dom"
import { ShoppingBag, User, LogOut } from "lucide-react"
import { useCartStore } from "@/stores/useCartStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { toast } from "sonner"

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
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center mx-auto px-4 md:px-6">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-2xl text-primary">SIGA<span className="text-secondary">Store</span></span>
          </Link>
          <div className="mx-6 flex flex-1 items-center justify-center space-x-4">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link to="/" className="transition-colors hover:text-primary">Início</Link>
              <Link to="/products" className="transition-colors hover:text-primary">Produtos</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-muted-foreground hover:text-primary relative transition-colors">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to="/customer" className="text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                  <User className="h-6 w-6" />
                  <span className="hidden md:inline text-xs font-semibold">{user?.name.split(' ')[0]}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                  title="Sair"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                <User className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t bg-muted/20 py-6 md:py-0">
        <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row md:px-6 text-sm text-muted-foreground">
          <p className="text-center text-sm leading-loose md:text-left">
            &copy; 2026 SIGA Store. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
