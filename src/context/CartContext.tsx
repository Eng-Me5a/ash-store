import React, { createContext, useContext, useEffect, useState } from 'react';

// نوع المنتج
interface Product {
  id: number;
  title: string;
  image: string;
  price: string;
}

// نوع السياق
interface CartContextType {
  cartCount: number;
  updateCartCount: () => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  updateCartCount: () => {},
});

// ✅ تصدير المزود بشكل صحيح
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
  };

  useEffect(() => {
    updateCartCount(); // أول تحميل
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ تصدير hook للوصول للعداد
export const useCart = () => useContext(CartContext);
