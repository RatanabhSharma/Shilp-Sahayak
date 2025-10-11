import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ShoppingCartIcon, PencilIcon } from 'lucide-react';
import { getProductById, getRelatedProducts } from '../utils/mockData';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import ModelViewer from '../components/3d/ModelViewer';
const ProductDetail: React.FC = () => {
  const {
    productId
  } = useParams<{
    productId: string;
  }>();
  const navigate = useNavigate();
  const {
    addToCart
  } = useCart();
  const product = useMemo(() => {
    if (!productId) return null;
    return getProductById(productId);
  }, [productId]);
  const relatedProducts = useMemo(() => {
    if (!productId) return [];
    return getRelatedProducts(productId, 4);
  }, [productId]);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showModelViewer, setShowModelViewer] = useState(false);
  if (!product) {
    return <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/products">
          <Button variant="primary">Back to Products</Button>
        </Link>
      </div>;
  }
  const handleAddToCart = () => {
    addToCart({
      id: '',
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
      isCustom: false
    });
  };
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  return <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors">
          <ArrowLeftIcon size={16} className="mr-1" />
          <span>Back</span>
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div>
            <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
              {showModelViewer ? <ModelViewer height="100%" /> : <img src={product.images[activeImageIndex]} alt={product.name} className="w-full h-full object-contain" />}
              <button onClick={() => setShowModelViewer(!showModelViewer)} className="absolute bottom-4 right-4 bg-white bg-opacity-80 text-gray-800 px-3 py-1 rounded-md text-sm font-medium hover:bg-opacity-100 transition-all">
                {showModelViewer ? 'Show Image' : 'View 3D Model'}
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => <button key={index} className={`border rounded-md overflow-hidden ${activeImageIndex === index && !showModelViewer ? 'border-primary-500' : 'border-gray-200'}`} onClick={() => {
              setActiveImageIndex(index);
              setShowModelViewer(false);
            }}>
                  <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover aspect-square" />
                </button>)}
            </div>
          </div>
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-gray-900 mb-6">
              ₹{product.price}
            </p>
            <div className="prose prose-sm text-gray-700 mb-6">
              <p>{product.description}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-2">Product Specifications</h3>
              <dl className="space-y-1 text-sm">
                <div className="flex">
                  <dt className="w-32 font-medium text-gray-600">Material:</dt>
                  <dd>{product.material}</dd>
                </div>
                <div className="flex">
                  <dt className="w-32 font-medium text-gray-600">
                    Dimensions:
                  </dt>
                  <dd>
                    {product.dimensions.width} × {product.dimensions.height} ×{' '}
                    {product.dimensions.depth} mm
                  </dd>
                </div>
                <div className="flex">
                  <dt className="w-32 font-medium text-gray-600">Weight:</dt>
                  <dd>{product.weight} grams</dd>
                </div>
              </dl>
            </div>
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <div className="flex max-w-[150px]">
                <button className="bg-gray-100 px-3 py-2 rounded-l-md border border-gray-300" onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                  -
                </button>
                <input type="number" id="quantity" name="quantity" min="1" value={quantity} onChange={handleQuantityChange} className="p-2 w-full text-center border-t border-b border-gray-300 focus:outline-none focus:ring-0" />
                <button className="bg-gray-100 px-3 py-2 rounded-r-md border border-gray-300" onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button variant="primary" size="lg" fullWidth icon={<ShoppingCartIcon size={18} />} onClick={handleAddToCart}>
                Add to Cart
              </Button>
              {product.isCustomizable && <Link to={`/customized/${product.id}`} className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" fullWidth icon={<PencilIcon size={18} />}>
                    Customize
                  </Button>
                </Link>}
            </div>
          </div>
        </div>
        {/* Related Products */}
        {relatedProducts.length > 0 && <div className="border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => <ProductCard key={relatedProduct.id} product={relatedProduct} showCustomizeButton={false} />)}
            </div>
          </div>}
      </div>
    </div>;
};
export default ProductDetail;