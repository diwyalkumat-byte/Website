
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { PRODUCTS } from '../constants';

const Shop: React.FC = () => {
  const [filter, setFilter] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = filter === 'All' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Our Collection</h1>
            <p className="text-gray-500">Quality gear for every step you take.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-600 outline-none w-full md:w-64 bg-white"
              />
            </div>
            <div className="flex bg-white rounded-full border border-gray-200 p-1">
              {['All', 'Socks', 'Accessories', 'Care'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition ${
                    filter === cat 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map(product => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 product-card-transition shadow-sm"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase mb-1 block">
                        {product.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition">
                        {product.name}
                      </h3>
                    </div>
                    <span className="text-xl font-black text-gray-900">Rs {product.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                    {product.description}
                  </p>
                  <div className="flex items-center text-indigo-600 font-bold group-hover:translate-x-2 transition-transform">
                    View Product <span className="ml-2">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
            <Filter size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900">No products found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search for something else.</p>
            <button 
              onClick={() => {setFilter('All'); setSearchQuery('');}}
              className="mt-6 text-indigo-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
