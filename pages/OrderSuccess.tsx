
import React, { useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Star, MessageSquare, Send, Check, User, ShieldHalf, Eye } from 'lucide-react';

const EmojiConfetti: React.FC = () => {
  const [items, setItems] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const newItems = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
      size: 20 + Math.random() * 30,
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[150] overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute top-[-50px] animate-emoji-fall opacity-0"
          style={{
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            fontSize: `${item.size}px`,
          }}
        >
          🥳
        </div>
      ))}
      <style>{`
        @keyframes emoji-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 1; }
        }
        .animate-emoji-fall {
          animation-name: emoji-fall;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

interface NotificationStatusProps {
  phone: string;
  name: string;
  orderId: string;
}

const NotificationDispatcher: React.FC<NotificationStatusProps> = ({ phone, name, orderId }) => {
  const [step, setStep] = useState(0);
  const [showPreview, setShowPreview] = useState<null | 'customer' | 'ceo'>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1000); // Send to customer
    const timer2 = setTimeout(() => setStep(2), 2500); // Send to CEO
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const customerMsg = `Hi ${name || 'Customer'}, your SoleMate order ${orderId} is confirmed! We're preparing your premium shoe care gear for dispatch. Stay fresh!`;
  const ceoMsg = `CEO ALERT: New order ${orderId} received from ${name || 'a customer'} (${phone}). Revenue goals on track! 🚀`;

  return (
    <div className="bg-indigo-50/50 p-6 rounded-[2rem] border border-indigo-100 space-y-4 text-left relative overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-black text-indigo-900 uppercase tracking-widest flex items-center">
          <MessageSquare size={16} className="mr-2" />
          Smart Notifications
        </h4>
        <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">LIVE</span>
      </div>

      {/* Customer Notification */}
      <div className={`flex items-center justify-between p-3 rounded-xl bg-white border transition-all duration-500 ${step >= 1 ? 'border-green-200 opacity-100' : 'border-gray-100 opacity-50'}`}>
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${step >= 1 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
            <User size={16} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">Message to Customer</p>
            <p className="text-[10px] text-gray-500">+91 {phone || 'XXXXX XXXXX'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {step >= 1 ? (
            <>
              <button onClick={() => setShowPreview('customer')} className="p-1.5 hover:bg-gray-50 rounded-md text-gray-400 transition">
                <Eye size={14} />
              </button>
              <div className="flex items-center text-green-600 text-[10px] font-bold">
                <Check size={14} className="mr-1" /> SENT
              </div>
            </>
          ) : (
            <div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          )}
        </div>
      </div>

      {/* CEO Notification */}
      <div className={`flex items-center justify-between p-3 rounded-xl bg-white border transition-all duration-500 ${step >= 2 ? 'border-green-200 opacity-100' : 'border-gray-100 opacity-50'}`}>
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${step >= 2 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
            <ShieldHalf size={16} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">Direct Alert to CEO</p>
            <p className="text-[10px] text-gray-500">+91 99XXX XXXXX</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {step >= 2 ? (
            <>
              <button onClick={() => setShowPreview('ceo')} className="p-1.5 hover:bg-gray-50 rounded-md text-gray-400 transition">
                <Eye size={14} />
              </button>
              <div className="flex items-center text-green-600 text-[10px] font-bold">
                <Check size={14} className="mr-1" /> SENT
              </div>
            </>
          ) : step === 1 ? (
            <div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          ) : null}
        </div>
      </div>

      {/* Preview Tooltip */}
      {showPreview && (
        <div className="absolute inset-0 bg-indigo-900/95 p-6 flex flex-col justify-center text-white animate-in fade-in zoom-in duration-200 z-20">
          <div className="flex justify-between items-center mb-4">
            <h5 className="font-bold text-xs uppercase tracking-widest text-indigo-300">Message Content</h5>
            <button onClick={() => setShowPreview(null)} className="text-white/60 hover:text-white">Close</button>
          </div>
          <p className="text-sm font-medium italic">"{showPreview === 'customer' ? customerMsg : ceoMsg}"</p>
        </div>
      )}
    </div>
  );
};

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const { customerPhone, customerName } = (location.state as { customerPhone?: string; customerName?: string }) || {};
  const orderId = useMemo(() => `SM-${Math.floor(100000 + Math.random() * 900000)}`, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-20 px-4 relative">
      <EmojiConfetti />
      
      <div className="max-w-xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-700 relative z-10">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
            <CheckCircle size={56} />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <Star size={16} />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black text-gray-900 leading-tight">Order Placed Successfully!</h1>
          <p className="text-gray-500 text-lg">
            Thank you for choosing SoleMate. Your order <span className="text-indigo-600 font-bold font-mono">#{orderId}</span> has been confirmed.
          </p>
        </div>

        {/* New Notification Dispatcher Card */}
        <NotificationDispatcher 
          phone={customerPhone || ''} 
          name={customerName || ''} 
          orderId={orderId} 
        />

        <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 space-y-6 text-left">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
              <Package className="text-indigo-600" size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Dispatch Pending</h4>
              <p className="text-sm text-gray-500 leading-relaxed">We've received your order and are currently preparing your items for shipping. Expect an update within 24 hours.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
              <Star className="text-yellow-400" size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Stay fresh, stay comfortable</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Don't forget to tag us <span className="text-indigo-600 font-bold">@SoleMateCare</span> when you unbox your new gear!</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link 
            to="/" 
            className="flex-1 px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition shadow-xl"
          >
            Back to Home
          </Link>
          <Link 
            to="/shop" 
            className="flex-1 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition shadow-xl flex items-center justify-center"
          >
            Continue Shopping <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
