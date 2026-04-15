import { Routes, Route } from "react-router-dom"

// Layouts
import { PublicLayout } from "@/layouts/PublicLayout"
import { AdminLayout } from "@/layouts/AdminLayout"
import { ProtectedRoute } from "@/components/ProtectedRoute"

// Public Pages
import Home from "@/pages/public/Home"
import ProductsList from "@/pages/public/ProductsList"
import Product from "@/pages/public/Product"
import Cart from "@/pages/public/Cart"
import Checkout from "@/pages/public/Checkout"
import Login from "@/pages/public/Login"
import Register from "@/pages/public/Register"
import CustomerArea from "@/pages/public/CustomerArea"
import ForgotPassword from "@/pages/public/ForgotPassword"
import Offers from "@/pages/public/Offers"
import Favorites from "@/pages/public/Favorites"
import PixPayment from "@/pages/public/PixPayment"
import Success from "@/pages/public/Success"

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
        <Route path="checkout/pix" element={<PixPayment />} />
        <Route path="checkout/success" element={<Success />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="offers" element={<Offers />} />
        <Route path="trends" element={<Trends />} />
        <Route path="favorites" element={<Favorites />} />

        {/* Rota Protegida de Cliente */}
        <Route element={<ProtectedRoute allowedRoles={["customer", "admin"]} />}>
          <Route path="customer" element={<CustomerArea />} />
        </Route>
      </Route>

      {/* Rota Exclusiva de Login Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Rotas Administrativas Protegidas */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/login" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/edit" element={<ProductForm />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Route>
    </Routes>
  )
}
