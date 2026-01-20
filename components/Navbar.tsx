
import React from 'react';
/* Fix: Re-importing Link from react-router-dom */
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Footprints } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  toggleCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, toggleCart }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 text-indigo-600">
            <Footprints size={32} />
            <span className="text-xl font-bold tracking-tight text-gray-900">SOLE<span className="text-indigo-600">MATE</span></span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Home</Link>
            <Link to="/shop" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Shop</Link>
            <Link to="/contact" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Contact</Link>
            <button 
              onClick={toggleCart}
              className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleCart}
              className="relative p-2 text-gray-600"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-4 px-4 space-y-4 shadow-lg">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">Home</Link>
          <Link to="/shop" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">Shop</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
