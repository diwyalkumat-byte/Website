
import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ShieldCheck, Lock, Truck, CreditCard, ChevronRight, Loader2, Landmark } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  totalPrice: number;
  clearCart: () => void;
}

const VerificationScreen: React.FC<{ amount: number }> = ({ amount }) => {
  const [statusText, setStatusText] = useState('Initiating secure transaction...');
  
  useEffect(() => {
    const statuses = [
      'Initiating secure transaction...',
      'Connecting to payment gateway...',
      'Verifying account details with your bank...',
      'Encrypting transaction data...',
      'Finalizing payment...'
    ];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < statuses.length) setStatusText(statuses[i]);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative">
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-600 animate-pulse">
            <ShieldCheck size={48} />
          </div>
          <div className="absolute top-0 right-1/2 translate-x-12">
            <Loader2 className="animate-spin text-indigo-600" size={24} />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-black text-gray-900">Secure Payment Verification</h2>
          <p className="text-indigo-600 font-bold font-mono tracking-wider text-sm">{statusText}</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Merchant</span>
            <span className="font-bold text-gray-900">SOLE MATE PREMIUM</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Amount</span>
            <span className="font-bold text-gray-900">Rs {amount}</span>
          </div>
          <div className="h-px bg-gray-200 w-full" />
          <div className="flex justify-center space-x-4 opacity-40 grayscale">
            <span className="text-[10px] font-black italic">VISA</span>
            <span className="text-[10px] font-black italic">mastercard</span>
            <span className="text-[10px] font-black italic">UPI</span>
          </div>
        </div>

        <div className="pt-8">
          <div className="flex items-center justify-center space-x-2 text-gray-400 text-xs font-medium">
            <Lock size={12} />
            <span>256-bit AES Encryption Active</span>
          </div>
          <p className="mt-4 text-xs text-red-400 font-bold animate-pulse">
            PLEASE DO NOT REFRESH OR CLOSE THIS WINDOW
          </p>
        </div>
      </div>
    </div>
  );
};

const Checkout: React.FC<CheckoutProps> = ({ cart, totalPrice, clearCart }) => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'UPI'
  });

  if (cart.length === 0 && !isVerifying) {
    return <Navigate to="/shop" replace />;
  }

  const shippingCost = totalPrice > 500 ? 0 : 40;
  const tax = Math.round(totalPrice * 0.12);
  const grandTotal = totalPrice + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'phone' || name === 'pincode') {
      const numericValue = value.replace(/\D/g, '');
      if (name === 'phone' && numericValue.length > 10) return;
      if (name === 'pincode' && numericValue.length > 6) return;
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    
    setTimeout(() => {
      clearCart();
      // Passing customer data to the success page
      navigate('/order-success', { 
        state: { 
          customerPhone: formData.phone,
          customerName: formData.firstName 
        } 
      });
    }, 4000);
  };

  return (
    <>
      {isVerifying && <VerificationScreen amount={grandTotal} />}
      
      <div className={`min-h-screen bg-gray-50 py-12 md:py-20 transition-opacity duration-500 ${isVerifying ? 'opacity-0' : 'opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black text-gray-900 mb-10 flex items-center">
            Secure Checkout <ShieldCheck className="ml-3 text-indigo-600" size={32} />
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mr-3 text-sm">1</div>
                    Shipping Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">First Name</label>
                      <input 
                        required
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last Name</label>
                      <input 
                        required
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                      <input 
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@mail.com"
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                      <input 
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="10 digit mobile number"
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Delivery Address</label>
                      <input 
                        required
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street address, apartment, suite, etc."
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">City</label>
                      <input 
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pincode</label>
                      <input 
                        required
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="6 digit pincode"
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mr-3 text-sm">2</div>
                    Payment Method
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'UPI', label: 'UPI (PhonePe/GPay)', icon: '⚡' },
                      { id: 'CARD', label: 'Credit / Debit Card', icon: '💳' },
                      { id: 'NB', label: 'Net Banking', icon: '🏦' },
                      { id: 'COD', label: 'Cash on Delivery', icon: '💵' }
                    ].map(method => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                        className={`flex items-center p-4 rounded-2xl border-2 transition-all ${
                          formData.paymentMethod === method.id 
                            ? 'border-indigo-600 bg-indigo-50/50' 
                            : 'border-gray-100 bg-white hover:border-gray-200'
                        }`}
                      >
                        <span className="text-2xl mr-4">{method.icon}</span>
                        <span className={`font-bold ${formData.paymentMethod === method.id ? 'text-indigo-600' : 'text-gray-600'}`}>
                          {method.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-24 bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 bg-gray-50/50">
                  <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
                </div>
                
                <div className="p-8 space-y-6">
                  <div className="max-h-60 overflow-y-auto pr-2 space-y-4">
                    {cart.map(item => (
                      <div key={item.cartId} className="flex justify-between items-start">
                        <div className="flex space-x-3">
                          <div className="relative">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                            <span className="absolute -top-2 -right-2 w-5 h-5 bg-indigo-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                              {item.quantity}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 leading-none mb-1">{item.name}</p>
                            <p className="text-[10px] text-gray-400 uppercase font-medium">{item.selectedPack || item.selectedLength}</p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-gray-900">Rs {item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-6 border-t border-gray-100 text-sm">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span>Rs {totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Shipping Fee</span>
                      <span>{shippingCost === 0 ? <span className="text-green-600 font-bold uppercase text-[10px]">Free</span> : `Rs ${shippingCost}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Estimated Tax (GST)</span>
                      <span>Rs {tax}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-black text-indigo-600">Rs {grandTotal}</span>
                  </div>

                  <button 
                    type="submit"
                    form="checkout-form"
                    className="w-full py-5 rounded-2xl font-black text-lg transition shadow-xl shadow-indigo-100 flex items-center justify-center space-x-3 bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    <Lock size={20} />
                    <span>Pay Rs {grandTotal}</span>
                    <ChevronRight size={20} />
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4">
                    <ShieldCheck size={14} className="text-green-500" />
                    <span>Secure 256-bit SSL encrypted payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
