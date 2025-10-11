import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, MenuIcon, XIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import AuthModal from '../ui/AuthModal';
export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const {
    isAuthenticated,
    user
  } = useAuth();
  const {
    getItemCount
  } = useCart();
  const location = useLocation();
  const navLinks = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Products',
    path: '/products'
  }, {
    name: 'Customized',
    path: '/customized'
  }, {
    name: 'About Us',
    path: '/about'
  }, {
    name: 'Contact Us',
    path: '/contact'
  }];
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="bg-primary-600 text-white font-bold text-xl rounded-md p-2">
            SS
          </div>
          <span className="ml-2 text-xl font-semibold text-gray-800 hidden sm:inline">
            Shilp Sahayak
          </span>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => <Link key={link.path} to={link.path} className={`text-sm font-medium transition-colors hover:text-primary-600 ${isActive(link.path) ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600'}`}>
              {link.name}
            </Link>)}
        </nav>
        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsAuthModalOpen(true)} className="flex items-center text-gray-600 hover:text-primary-600 transition-colors" aria-label={isAuthenticated ? 'Account' : 'Sign in'}>
            <UserIcon size={20} />
            <span className="ml-1 text-sm hidden sm:inline">
              {isAuthenticated ? user?.name?.split(' ')[0] : 'Sign in'}
            </span>
          </button>
          <Link to="/cart" className="flex items-center text-gray-600 hover:text-primary-600 transition-colors relative" aria-label="Cart">
            <ShoppingCartIcon size={20} />
            {getItemCount() > 0 && <span className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getItemCount()}
              </span>}
          </Link>
          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden bg-white border-t border-gray-100 py-2">
          <div className="container mx-auto px-4">
            {navLinks.map(link => <Link key={link.path} to={link.path} className={`block py-2 px-4 text-sm font-medium ${isActive(link.path) ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:bg-gray-50'}`} onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>)}
          </div>
        </div>}
      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>;
};