import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/product/productThunk';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

export default function ProductHome() {
  const dispatch = useDispatch();
  const { products, error, status } = useSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handlePageClick = (url) => {
    if (url) {
      dispatch(fetchProducts(url));
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    dispatch(fetchProducts(undefined, category));
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        Error loading products: {error}
      </div>
    );
  }

  if (status === 'succeeded' && (!products?.data || products?.data.length === 0)) {
    return <div className="text-center py-8">No products available</div>;
  }

  // Extract unique categories from products
  const categories = [...new Set(products?.data?.map(product => product.category).filter(Boolean))];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.data?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination links={products?.links} onPageClick={handlePageClick} />
    </div>
  );
}