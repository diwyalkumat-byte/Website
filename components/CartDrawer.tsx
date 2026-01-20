
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (cartId: string, delta: number) => void;
  removeFromCart: (cartId: string) => void;
  totalPrice: number;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  updateQuantity, 
  removeFromCart, 
  totalPrice 
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleProceed = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-500">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="p-4 bg-gray-100 rounded-full text-gray-400">
                  <ShoppingBag size={48} />
                </div>
                <p className="text-gray-500 font-medium">Your cart is empty.</p>
                <button 
                  onClick={onClose}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <ul className="space-y-6">
                {cart.map((item) => (
                  <li key={item.cartId} className="flex space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="font-bold text-gray-900">Rs {item.price * item.quantity}</p>
                      </div>
                      <div className="flex flex-wrap gap-x-2 text-xs text-gray-500">
                        {item.selectedPack && (
                          <span className="font-medium text-indigo-600">{item.selectedPack}</span>
                        )}
                        {item.selectedColor && (
                          <span className="font-medium">Color: {item.selectedColor}</span>
                        )}
                        {item.selectedLength && (
                          <span>• {item.selectedLength}</span>
                        )}
                        {item.selectedAge && (
                          <span>• {item.selectedAge}</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.cartId, -1)}
                            className="p-1 hover:bg-gray-100 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.cartId, 1)}
                            className="p-1 hover:bg-gray-100"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-red-500 hover:text-red-600 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-gray-100 p-6 space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span>Rs {totalPrice}</span>
              </div>
              <p className="text-sm text-gray-500 italic">Taxes and shipping calculated at checkout.</p>
              <button 
                onClick={handleProceed}
                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
