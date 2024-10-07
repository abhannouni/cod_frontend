import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {product.image ? (
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No image available</span>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</p>
        {product.category && (
          <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm mt-2">
            {product.category}
          </span>
        )}
      </div>
    </div>
  );
}