import { Routes, Route } from "react-router-dom"

// Layouts
import { PublicLayout } from "@/layouts/PublicLayout"
import { AdminLayout } from "@/layouts/AdminLayout"

// Public Pages
import Home from "@/pages/public/Home"
import ProductsList from "@/pages/public/ProductsList"
import Product from "@/pages/public/Product"
import Cart from "@/pages/public/Cart"
import Checkout from "@/pages/public/Checkout"
import Login from "@/pages/public/Login"
import Register from "@/pages/public/Register"
import CustomerArea from "@/pages/public/CustomerArea"

// Admin Pages
import AdminLogin from "@/pages/admin/Login"
import AdminDashboard from "@/pages/admin/Dashboard"
import AdminProducts from "@/pages/admin/Products"
import ProductForm from "@/pages/admin/ProductForm"
import AdminClients from "@/pages/admin/Clients"
import AdminOrders from "@/pages/admin/Orders"

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductsList />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="customer" element={<CustomerArea />} />
      </Route>

      {/* Rota Exclusiva de Login Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Rotas Administrativas */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/edit" element={<ProductForm />} />
        <Route path="clients" element={<AdminClients />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>
    </Routes>
  )
}
