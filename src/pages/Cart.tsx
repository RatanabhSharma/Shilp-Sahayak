import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, TrashIcon, ShoppingBagIcon } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';
import ModelViewer from '../components/3d/ModelViewer';
const Cart: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card'
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();
  const shipping = items.length > 0 ? 100 : 0;
  const tax = Math.round(getCartTotal() * 0.18); // 18% tax
  const total = getCartTotal() + shipping + tax;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order processing
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
      // Redirect to home after a delay
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }, 1500);
  };
  if (orderPlaced) {
    return <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckIcon className="text-green-500" size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-4">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-8">
            Thank you for your order. We've received your request and will
            process it shortly. You will receive an email confirmation.
          </p>
          <Link to="/">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
        </div>
      </div>;
  }
  if (items.length === 0) {
    return <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBagIcon className="text-gray-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
        </div>
      </div>;
  }
  return <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <Link to="/products" className="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
              <ArrowLeftIcon size={16} className="mr-1" />
              <span>Continue Shopping</span>
            </Link>
            <h1 className="text-2xl font-bold ml-auto">Your Cart</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Cart Items ({items.length})
                  </h2>
                  <div className="divide-y divide-gray-200">
                    {items.map(item => <div key={item.id} className="py-6 flex">
                        <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                          {item.isCustom ? <ModelViewer height="100%" backgroundColor={item.customOptions?.color || '#f3f4f6'} /> : <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-sm font-medium text-gray-900">
                                {item.name}
                              </h3>
                              {item.isCustom && <p className="mt-1 text-xs text-gray-500">
                                  Custom Design • {item.weight}g
                                </p>}
                              {item.customOptions && <div className="mt-1 flex items-center">
                                  <div className="w-3 h-3 rounded-full mr-1" style={{
                              backgroundColor: item.customOptions.color
                            }} />
                                  <span className="text-xs text-gray-500">
                                    {item.customOptions.size?.width}×
                                    {item.customOptions.size?.height}×
                                    {item.customOptions.size?.depth}mm
                                  </span>
                                </div>}
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              ₹{item.price}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button className="px-2 py-1 text-gray-600 hover:text-gray-800" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                                -
                              </button>
                              <span className="px-2 py-1 text-sm text-center w-8">
                                {item.quantity}
                              </span>
                              <button className="px-2 py-1 text-gray-600 hover:text-gray-800" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                                +
                              </button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Remove item">
                              <TrashIcon size={18} />
                            </button>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
            {/* Order Summary */}
            <div className="lg:col-span-1">
              {!isCheckingOut ? <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">
                      Order Summary
                    </h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>₹{getCartTotal()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span>₹{shipping}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax (18%)</span>
                        <span>₹{tax}</span>
                      </div>
                      <div className="border-t pt-4 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>
                    </div>
                    <Button variant="primary" fullWidth className="mt-6" onClick={() => setIsCheckingOut(true)}>
                      Proceed to Checkout
                    </Button>
                  </div>
                </div> : <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Checkout</h2>
                    <form onSubmit={handleCheckout}>
                      <div className="space-y-4 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                          </label>
                          <input type="text" id="address" name="address" required value={formData.address} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                              City
                            </label>
                            <input type="text" id="city" name="city" required value={formData.city} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                          </div>
                          <div>
                            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                              PIN Code
                            </label>
                            <input type="text" id="pincode" name="pincode" required value={formData.pincode} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
                            Payment Method
                          </label>
                          <select id="paymentMethod" name="paymentMethod" required value={formData.paymentMethod} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="card">Credit/Debit Card</option>
                            <option value="upi">UPI</option>
                            <option value="cod">Cash on Delivery</option>
                          </select>
                        </div>
                      </div>
                      <div className="border-t pt-4 mb-4">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>₹{total}</span>
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <Button type="button" variant="outline" className="flex-1" onClick={() => setIsCheckingOut(false)}>
                          Back
                        </Button>
                        <Button type="submit" variant="primary" className="flex-1">
                          Place Order
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
// Helper component for the success page
const CheckIcon: React.FC<{
  className?: string;
  size?: number;
}> = ({
  className,
  size = 24
}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 6L9 17l-5-5" />
  </svg>;
export default Cart;