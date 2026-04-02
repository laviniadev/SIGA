import { Outlet, Link, useNavigate } from "react-router-dom"
import { LayoutDashboard, Package, Users, ShoppingCart, LogOut } from "lucide-react"
import { useAuthStore } from "@/stores/useAuthStore"
import { toast } from "sonner"

export function AdminLayout() {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
    toast.success("Sessão administrativa encerrada.");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-muted/40">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background md:flex">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="text-secondary font-bold text-xl">SIGA Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-primary hover:bg-primary/5 hover:translate-x-1 active:scale-95"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/admin/products"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-primary hover:bg-primary/5 hover:translate-x-1 active:scale-95"
            >
              <Package className="h-4 w-4" />
              Produtos
            </Link>
            <Link
              to="/admin/clients"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-primary hover:bg-primary/5 hover:translate-x-1 active:scale-95"
            >
              <Users className="h-4 w-4" />
              Clientes
            </Link>
            <Link
              to="/admin/orders"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-primary hover:bg-primary/5 hover:translate-x-1 active:scale-95"
            >
              <ShoppingCart className="h-4 w-4" />
              Pedidos
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-destructive transition-all hover:bg-destructive/10 active:scale-95 cursor-pointer font-bold text-xs"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold text-foreground">Área Administrativa</h1>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
