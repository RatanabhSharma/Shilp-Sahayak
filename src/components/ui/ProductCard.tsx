import React, { lazy } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, PencilIcon } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../utils/mockData';
import Button from './Button';
type ProductCardProps = {
  product: Product;
  showCustomizeButton?: boolean;
};
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showCustomizeButton = true
}) => {
  const {
    addToCart
  } = useCart();
  const handleAddToCart = () => {
    addToCart({
      id: '',
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      isCustom: false
    });
  };
  return <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/products/${product.id}`} className="block relative">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105" loading="lazy" />
        </div>
        {product.isCustomizable && <span className="absolute top-2 right-2 bg-secondary-500 text-white text-xs px-2 py-1 rounded-full">
            Customizable
          </span>}
      </Link>
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="font-medium text-gray-800 mb-1 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="text-sm text-gray-500 mb-3 line-clamp-2 h-10">
          {product.description}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-medium text-gray-900">₹{product.price}</span>
          <div className="flex space-x-2">
            {product.isCustomizable && showCustomizeButton && <Link to={`/customized/${product.id}`}>
                <Button variant="outline" size="sm" icon={<PencilIcon size={16} />}>
                  Customize
                </Button>
              </Link>}
            <Button variant="primary" size="sm" icon={<ShoppingCartIcon size={16} />} onClick={handleAddToCart}>
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default ProductCard;