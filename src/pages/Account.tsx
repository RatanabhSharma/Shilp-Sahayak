import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserIcon, PackageIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import AuthModal from '../components/ui/AuthModal';
type Order = {
  id: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    name: string;
    quantity: number;
  }[];
};
const Account: React.FC = () => {
  const {
    user,
    isAuthenticated,
    logout,
    updateProfile
  } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: user?.address || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        phone: '',
        address: user.address || ''
      });
      // Mock orders data
      setOrders([{
        id: 'ORD123456',
        date: '2023-05-15',
        total: 1299,
        status: 'delivered',
        items: [{
          name: 'Custom Name Keychain',
          quantity: 2
        }, {
          name: 'Geometric Shape Keychain',
          quantity: 1
        }]
      }, {
        id: 'ORD123457',
        date: '2023-06-20',
        total: 2499,
        status: 'shipped',
        items: [{
          name: 'Custom Photo Lightbox',
          quantity: 1
        }]
      }, {
        id: 'ORD123458',
        date: '2023-07-10',
        total: 799,
        status: 'processing',
        items: [{
          name: 'Landscape Lithoframe',
          quantity: 1
        }]
      }]);
    }
  }, [user]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileData.name,
      address: profileData.address
    });
    setIsEditing(false);
  };
  if (!isAuthenticated) {
    return <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Account</h1>
        <p className="mb-8 text-gray-600">
          Please sign in to access your account.
        </p>
        <Button variant="primary" size="lg" onClick={() => setIsAuthModalOpen(true)}>
          Sign In
        </Button>
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>;
  }
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Your Account</h1>
            <Button variant="outline" onClick={logout} icon={<LogOutIcon size={16} />}>
              Sign Out
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button className={`flex items-center px-6 py-4 text-sm font-medium ${activeTab === 'profile' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('profile')}>
                <UserIcon size={18} className="mr-2" />
                Profile
              </button>
              <button className={`flex items-center px-6 py-4 text-sm font-medium ${activeTab === 'orders' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('orders')}>
                <PackageIcon size={18} className="mr-2" />
                Order History
              </button>
            </div>
            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'profile' && <div>
                  <h2 className="text-xl font-semibold mb-6">
                    Profile Information
                  </h2>
                  <form onSubmit={handleProfileUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input type="text" id="name" name="name" value={profileData.name} onChange={handleInputChange} disabled={!isEditing} className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input type="email" id="email" name="email" value={profileData.email} disabled className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input type="tel" id="phone" name="phone" value={profileData.phone} onChange={handleInputChange} disabled={!isEditing} className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500" />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input type="text" id="address" name="address" value={profileData.address} onChange={handleInputChange} disabled={!isEditing} className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      {isEditing ? <>
                          <Button type="button" variant="outline" className="mr-2" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" variant="primary">
                            Save Changes
                          </Button>
                        </> : <Button type="button" variant="primary" onClick={() => setIsEditing(true)}>
                          Edit Profile
                        </Button>}
                    </div>
                  </form>
                </div>}
              {activeTab === 'orders' && <div>
                  <h2 className="text-xl font-semibold mb-6">Order History</h2>
                  {orders.length === 0 ? <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        You haven't placed any orders yet.
                      </p>
                      <Button variant="primary" as="a" href="/products">
                        Start Shopping
                      </Button>
                    </div> : <div className="space-y-6">
                      {orders.map(order => <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                            <div>
                              <span className="text-sm font-medium text-gray-700">
                                Order #{order.id}
                              </span>
                              <span className="text-xs text-gray-500 ml-4">
                                {new Date(order.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div>
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          <div className="px-4 py-3 border-b border-gray-200">
                            {order.items.map((item, index) => <div key={index} className="flex justify-between py-1">
                                <span className="text-sm">
                                  {item.quantity} × {item.name}
                                </span>
                              </div>)}
                          </div>
                          <div className="px-4 py-3 flex justify-between items-center">
                            <span className="font-medium">Total</span>
                            <span className="font-medium">₹{order.total}</span>
                          </div>
                        </div>)}
                    </div>}
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Account;