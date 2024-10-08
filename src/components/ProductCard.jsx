import React from 'react';
import { API_URL } from '../API/URL';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      {product.image ? (
        <img src={ 'http://localhost:8000/' + product.image} alt={product.name} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No image available</span>
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          
        </div>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</p>
        
        {/* Categories */}
        {product.categories && product.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {product.categories.map((category, index) => (
              <span 
                key={category.id || index} 
                className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}