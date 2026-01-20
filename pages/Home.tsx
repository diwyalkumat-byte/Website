import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../constants';

const getDirectImageLink = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

const BG = '1Nyq40dfHzMvvDaaFoimqVMkGnTE2_v46'
const Home: React.FC = () => {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gray-900 h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src= {getDirectImageLink(BG)}
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Protection For <br /> <span className="text-indigo-400">Every Step</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-10">
            From Premium Cotton Socks to Transparent Anti-Shoe Bite Tape and Scented Pouches, we provide the ultimate care for your journey.
          </p>
          <Link 
            to="/shop" 
            className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-full text-lg hover:bg-indigo-700 transition shadow-xl"
          >
            Shop Collection <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold mb-1">Premium Quality</h3>
            <p className="text-xs text-gray-500">Tested & approved</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-4">
              <Truck size={24} />
            </div>
            <h3 className="font-bold mb-1">Fast Delivery</h3>
            <p className="text-xs text-gray-500">Across the country</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-4">
              <Star size={24} />
            </div>
            <h3 className="font-bold mb-1">High Rated</h3>
            <p className="text-xs text-gray-500">4.9/5 User satisfaction</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-4">
              <RotateCcw size={24} />
            </div>
            <h3 className="font-bold mb-1">Easy Returns</h3>
            <p className="text-xs text-gray-500">14-day policy</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Essential Collection</h2>
              <p className="text-gray-500">Our signature products for everyday footwear care.</p>
            </div>
            <Link to="/shop" className="text-indigo-600 font-bold hover:underline">View All Shop</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map(product => (
              <div key={product.id} className="bg-white rounded-3xl overflow-hidden product-card-transition">
                <div className="h-64 overflow-hidden relative group">
                   <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-gray-900 shadow-sm">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-indigo-600">Rs {product.price}</span>
                    <Link 
                      to={`/product/${product.id}`}
                      className="px-6 py-2 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="py-24 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-6">Join the SoleMate Circle</h2>
          <p className="text-indigo-100 text-xl max-w-2xl mx-auto mb-10">
            Subscribe to our newsletter and get exclusive access to new product drops and pro shoe care tips.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 rounded-full border-none focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <button className="px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition shadow-xl">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;