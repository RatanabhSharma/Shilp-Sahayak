import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FilterIcon, XIcon } from 'lucide-react';
import { products, categories } from '../utils/mockData';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
const Products: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || '';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [customizableOnly, setCustomizableOnly] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // Find min and max prices from all products
  const minPrice = Math.min(...products.map(product => product.price));
  const maxPrice = Math.max(...products.map(product => product.price));
  useEffect(() => {
    let filtered = [...products];
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    // Filter by price range
    filtered = filtered.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);
    // Filter by customizable
    if (customizableOnly) {
      filtered = filtered.filter(product => product.isCustomizable);
    }
    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, customizableOnly]);
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (e.target.name === 'minPrice') {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };
  const handleCustomizableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomizableOnly(e.target.checked);
  };
  const resetFilters = () => {
    setSelectedCategory('');
    setPriceRange([minPrice, maxPrice]);
    setCustomizableOnly(false);
  };
  return <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="lg:hidden mb-4">
        <Button variant="outline" onClick={() => setIsFilterOpen(!isFilterOpen)} icon={<FilterIcon size={16} />}>
          Filters
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters - Mobile */}
        {isFilterOpen && <div className="fixed inset-0 bg-white z-40 p-4 lg:hidden overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 text-gray-500 hover:text-gray-700">
                <XIcon size={24} />
              </button>
            </div>
            {/* Filter content - same as desktop */}
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-lg font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => <div key={category.id} className="flex items-center">
                      <input type="checkbox" id={`mobile-category-${category.id}`} checked={selectedCategory === category.id} onChange={() => handleCategoryChange(category.id)} className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
                      <label htmlFor={`mobile-category-${category.id}`} className="ml-2 text-sm text-gray-700">
                        {category.name}
                      </label>
                    </div>)}
                </div>
              </div>
              {/* Price Range */}
              <div>
                <h3 className="text-lg font-medium mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      ₹{priceRange[0]}
                    </span>
                    <span className="text-sm text-gray-600">
                      ₹{priceRange[1]}
                    </span>
                  </div>
                  <input type="range" name="minPrice" min={minPrice} max={maxPrice} value={priceRange[0]} onChange={handlePriceChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                  <input type="range" name="maxPrice" min={minPrice} max={maxPrice} value={priceRange[1]} onChange={handlePriceChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>
              </div>
              {/* Customizable */}
              <div>
                <h3 className="text-lg font-medium mb-3">Options</h3>
                <div className="flex items-center">
                  <input type="checkbox" id="mobile-customizable" checked={customizableOnly} onChange={handleCustomizableChange} className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
                  <label htmlFor="mobile-customizable" className="ml-2 text-sm text-gray-700">
                    Customizable Only
                  </label>
                </div>
              </div>
              {/* Reset Filters */}
              <Button variant="outline" fullWidth onClick={resetFilters}>
                Reset Filters
              </Button>
              <Button variant="primary" fullWidth onClick={() => setIsFilterOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>}
        {/* Sidebar Filters - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-6">Filters</h2>
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => <div key={category.id} className="flex items-center">
                      <input type="checkbox" id={`category-${category.id}`} checked={selectedCategory === category.id} onChange={() => handleCategoryChange(category.id)} className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
                      <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700">
                        {category.name}
                      </label>
                    </div>)}
                </div>
              </div>
              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      ₹{priceRange[0]}
                    </span>
                    <span className="text-sm text-gray-600">
                      ₹{priceRange[1]}
                    </span>
                  </div>
                  <input type="range" name="minPrice" min={minPrice} max={maxPrice} value={priceRange[0]} onChange={handlePriceChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                  <input type="range" name="maxPrice" min={minPrice} max={maxPrice} value={priceRange[1]} onChange={handlePriceChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>
              </div>
              {/* Customizable */}
              <div>
                <h3 className="text-sm font-medium mb-3">Options</h3>
                <div className="flex items-center">
                  <input type="checkbox" id="customizable" checked={customizableOnly} onChange={handleCustomizableChange} className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
                  <label htmlFor="customizable" className="ml-2 text-sm text-gray-700">
                    Customizable Only
                  </label>
                </div>
              </div>
              {/* Reset Filters */}
              <Button variant="outline" fullWidth onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or browse all products
              </p>
              <Button variant="primary" className="mt-4" onClick={resetFilters}>
                View All Products
              </Button>
            </div> : <>
              <p className="text-sm text-gray-500 mb-4">
                {filteredProducts.length} products
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
            </>}
        </div>
      </div>
    </div>;
};
export default Products;