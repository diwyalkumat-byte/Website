
import React, { useState, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartItem } from './types';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import CartDrawer from './components/CartDrawer';
import { Footprints } from 'lucide-react';

// Scroll to top on route change helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Footer = () => (
  <footer className="bg-gray-950 text-gray-400 py-20">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center space-x-2 text-white mb-6">
          <Footprints size={32} className="text-indigo-500" />
          <span className="text-2xl font-black tracking-tighter">SOLEMATE</span>
        </div>
        <p className="text-sm leading-relaxed mb-8">
          Revolutionizing shoe care with premium accessories designed for durability and comfort. Because every step matters.
        </p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Quick Links</h4>
        <ul className="space-y-4 text-sm">
          <li><a href="/" className="hover:text-white transition">Home</a></li>
          <li><a href="/shop" className="hover:text-white transition">Shop</a></li>
          <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
          <li><a href="/shop" className="hover:text-white transition">New Arrivals</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Legal</h4>
        <ul className="space-y-4 text-sm">
          <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
          <li><a href="#" className="hover:text-white transition">Shipping Policy</a></li>
          <li><a href="#" className="hover:text-white transition">Refund Policy</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Connect</h4>
        <ul className="space-y-4 text-sm">
          <li><a href="#" className="hover:text-white transition">Instagram</a></li>
          <li><a href="#" className="hover:text-white transition">Twitter</a></li>
          <li><a href="#" className="hover:text-white transition">Facebook</a></li>
          <li><a href="#" className="hover:text-white transition">Pinterest</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-xs">
      <p>© 2024 SoleMate Premium Shoe Care. All rights reserved.</p>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <span>India</span>
        <span>Secure Payments</span>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.cartId === item.cartId);
      if (existing) {
        return prev.map(i => i.cartId === item.cartId ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((cartId: string) => {
    setCart(prev => prev.filter(i => i.cartId !== cartId));
  }, []);

  const updateQuantity = useCallback((cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar cartCount={totalItems} toggleCart={() => setIsCartOpen(true)} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout cart={cart} totalPrice={totalPrice} clearCart={clearCart} />} />
            <Route path="/order-success" element={<OrderSuccess />} />
          </Routes>
        </main>

        <Footer />

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          totalPrice={totalPrice}
        />
      </div>
    </Router>
  );
};

export default App;
