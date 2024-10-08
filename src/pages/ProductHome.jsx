import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/product/productThunk';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import ProductModal from '../components/ProductModal';

export default function ProductHome() {
  const dispatch = useDispatch();
  const { products, error, status } = useSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortBy, setSortBy] = useState('name');


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts({ url: null, categoryIds: selectedCategory ? [selectedCategory] : [], sortBy }));
    }
  }, [status, dispatch, selectedCategory, sortBy]);
  

  const handlePageClick = (url) => {
    if (url) {
      console.log({selectedCategory});
      url = url + (selectedCategory ? `&category_ids[]=${selectedCategory}` : '') + `&sortBy=${sortBy}`;
      dispatch(fetchProducts({ url }));
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    dispatch(fetchProducts({ categoryIds: categoryId ? [categoryId] : [] }));
  };


  const handleOpenProductModal = (product = null) => {
    setSelectedItem(product);
    setIsProductModalOpen(true);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    dispatch(fetchProducts({ categoryIds: selectedCategory ? [selectedCategory] : [], sortBy: e.target.value }));
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Our Products</h1>
        <div className="space-x-2 flex">
          <div className="">
            sort by:
            <select className="px-2 py-1 border rounded-md"
              value={sortBy}
              onChange={handleSortChange}>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
          <button
            onClick={() => handleOpenProductModal()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Add Product
          </button>
        </div>
      </div>
      
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      {status === 'succeeded' && (!products?.data || products?.data.length === 0) ? (
        <div className="text-center py-8">No products available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.data?.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}

      <Pagination links={products?.links} onPageClick={handlePageClick} />

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedItem(null);
        }}
        product={selectedItem}
      />
    </div>
  );
}