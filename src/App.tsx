import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductGrid from "./components/bestproduct";
import BishtatSection from "./components/bestsellerSection";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";
import AshProducts from "./components/ashProductS";
import ProductDetails from "./pages/ProductDetails";
import AboutUs from "./components/AboutUs";
import CollectionsPage from "./pages/CollectionsPage";
import AdminDashboard from "./pages/AdminDashboar";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute"; // ✅ استدعاء الراوت المحمي
import AdminOrdersPage from "./pages/AdminOrdersPage";

const App = () => {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <ProductGrid />
                <BishtatSection />
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/products" element={<AshProducts />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
          </Route>
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
