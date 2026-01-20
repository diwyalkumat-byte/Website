
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart, CheckCircle, Info } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { SockLength, AgeRange, WipePack, CartItem } from '../types';

interface ProductDetailProps {
  addToCart: (item: CartItem) => void;
}

const COLORS = [
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'Grey', hex: '#8e8e8e' },
  { name: 'White', hex: '#f9f9f9' },
  { name: 'Navy', hex: '#1a237e' },
  { name: 'Blue', hex: '#2196f3' },
  { name: 'Beige', hex: '#f5f5dc' },
  { name: 'Light Blue', hex: '#add8e6' },
  { name: 'Saffron', hex: '#f4c430' },
  { name: 'Neon Yellow', hex: '#ccff00' },
  { name: 'Neon Green', hex: '#39ff14' }
];

const ProductDetail: React.FC<ProductDetailProps> = ({ addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id);

  const [quantity, setQuantity] = React.useState(1);
  const [selectedLength, setSelectedLength] = React.useState<SockLength>('Ankle Length');
  const [selectedAge, setSelectedAge] = React.useState<AgeRange>('17 - 20 Years');
  const [selectedPack, setSelectedPack] = React.useState<WipePack>('Pack of 10');
  const [selectedColor, setSelectedColor] = React.useState<string>(COLORS[0].name);
  const [added, setAdded] = React.useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Product Not Found</h1>
        <p className="text-gray-500 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg">
          Back to Shop
        </Link>
      </div>
    );
  }

  const isSocks = product.category === 'Socks';
  const isWipes = product.id === 'shoe-wipes';

  // Dynamic price calculation
  const currentPrice = isWipes 
    ? (selectedPack === 'Pack of 10' ? 249 : 599) 
    : product.price;

  // Reverted to photo-based logic: Display image based on selected length option
  const currentDisplayImage = (isSocks && product.optionImages && product.optionImages[selectedLength]) 
    ? product.optionImages[selectedLength] 
    : product.image;

  const handleAddToCart = () => {
    let cartId = product.id;
    if (isSocks) {
      cartId += `-${selectedLength}-${selectedAge}-${selectedColor}`;
    } else if (isWipes) {
      cartId += `-${selectedPack}`;
    }
    
    const item: CartItem = {
      ...product,
      price: currentPrice,
      cartId,
      quantity,
      selectedLength: isSocks ? selectedLength : undefined,
      selectedAge: isSocks ? selectedAge : undefined,
      selectedColor: isSocks ? selectedColor : undefined,
      selectedPack: isWipes ? selectedPack : undefined,
    };
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-500 hover:text-indigo-600 font-medium mb-12 transition"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Main Product Image Container */}
          <div className="space-y-6">
            <div className={`aspect-[${product.aspect || '4/5'}] bg-gray-50 rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500`}>
              <img 
                key={currentDisplayImage}
                src={currentDisplayImage} 
                alt={`${product.name} - ${selectedLength}`} 
                className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-700"
              />
            </div>
            {isSocks && (
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 font-medium">
                <Info size={14} />
                <span>Showing {selectedLength} preview. Choose your color below.</span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-4">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-4xl font-black text-indigo-600">Rs {currentPrice}</span>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="text-gray-400 text-sm ml-2 font-medium">(120+ Sold)</span>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-10 border-l-4 border-indigo-100 pl-6 italic">
              {product.description}
            </p>

            {isSocks && (
              <div className="space-y-8 mb-10">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Color Selection</h3>
                  <div className="flex flex-wrap gap-3">
                    {COLORS.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        title={color.name}
                        className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColor === color.name 
                            ? 'border-indigo-600 scale-110 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {selectedColor === color.name && (
                          <div className={`w-2 h-2 rounded-full ${['White', 'Beige', 'Light Blue', 'Neon Yellow'].includes(color.name) ? 'bg-black' : 'bg-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs font-medium text-gray-500">Selected: <span className="text-gray-900 font-bold">{selectedColor}</span></p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Sock Length</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['Ankle Length', 'Mid Length', 'Knee Length'].map((l) => (
                      <button
                        key={l}
                        onClick={() => setSelectedLength(l as SockLength)}
                        className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition ${
                          selectedLength === l ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Select Age / Size</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['9 - 12 Years', '13 - 16 Years', '17 - 20 Years'].map((a) => (
                      <button
                        key={a}
                        onClick={() => setSelectedAge(a as AgeRange)}
                        className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition ${
                          selectedAge === a ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {isWipes && (
              <div className="space-y-8 mb-10">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Select Pack Size</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['Pack of 10', 'Pack of 25'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setSelectedPack(p as WipePack)}
                        className={`py-4 px-6 rounded-xl border-2 font-bold text-base transition flex flex-col items-center ${
                          selectedPack === p ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        <span>{p}</span>
                        <span className="text-xs mt-1 font-medium opacity-70">
                          {p === 'Pack of 10' ? 'Rs 149' : 'Rs 229'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-auto space-y-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center bg-gray-100 rounded-2xl p-1">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white transition"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-12 text-center font-black text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white transition"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`flex-1 flex items-center justify-center py-4 rounded-2xl font-bold text-lg transition shadow-xl ${
                    added ? 'bg-green-500 text-white cursor-default' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {added ? <><CheckCircle className="mr-2" size={24} /> Added to Cart</> : <><ShoppingCart className="mr-2" size={24} /> Add to Cart</>}
                </button>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 flex items-start space-x-4 border border-gray-100">
                <Info className="text-indigo-400 shrink-0 mt-1" size={20} />
                <p className="text-sm text-gray-500 leading-relaxed">
                  Fast Shipping available. Secure payment processing. This product is eligible for our 14-day hassle-free exchange program.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
