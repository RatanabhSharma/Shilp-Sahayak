import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, TwitterIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
export const Footer: React.FC = () => {
  return <footer className="bg-gray-800 text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              Shilp Sahayak
            </h3>
            <p className="mb-4 text-sm">
              Bringing your ideas to life with precision 3D printing. Customized
              designs at affordable rates.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon size={20} className="hover:text-secondary-400 transition-colors" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon size={20} className="hover:text-secondary-400 transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <TwitterIcon size={20} className="hover:text-secondary-400 transition-colors" />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-secondary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-secondary-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/customized" className="text-sm hover:text-secondary-400 transition-colors">
                  Customized
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-secondary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-secondary-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          {/* Product Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=keychains" className="text-sm hover:text-secondary-400 transition-colors">
                  Keychains
                </Link>
              </li>
              <li>
                <Link to="/products?category=lithoframes" className="text-sm hover:text-secondary-400 transition-colors">
                  Lithoframes
                </Link>
              </li>
              <li>
                <Link to="/products?category=lightboxes" className="text-sm hover:text-secondary-400 transition-colors">
                  Lightboxes
                </Link>
              </li>
              <li>
                <Link to="/products?category=lamps" className="text-sm hover:text-secondary-400 transition-colors">
                  Lamps
                </Link>
              </li>
              <li>
                <Link to="/products?category=tablelamps" className="text-sm hover:text-secondary-400 transition-colors">
                  Showcase Side Table Lamps
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MailIcon size={18} className="mr-2 mt-1 flex-shrink-0" />
                <a href="mailto:info@shilpsahayak.com" className="text-sm hover:text-secondary-400 transition-colors">
                  info@shilpsahayak.com
                </a>
              </div>
              <div className="flex items-start">
                <PhoneIcon size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">+91-XXXXXXXXXX</span>
              </div>
              <div className="flex items-start">
                <MapPinIcon size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">Placeholder City, India</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Shilp Sahayak. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>;
};