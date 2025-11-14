import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const ModernFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
              🛒 <span>ShopHub</span>
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Your one-stop destination for quality products at amazing prices. Shop with confidence and enjoy fast, free shipping on orders over $50.
            </p>
            <div className="flex gap-4">
              <button className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </button>
              <button className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </button>
              <button className="hover:text-primary transition-colors">
                <Instagram size={20} />
              </button>
              <button className="hover:text-primary transition-colors">
                <Youtube size={20} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/policy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="hover:text-primary transition-colors">
                  Track Order
                </button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors">
                  Shipping Info
                </button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors">
                  FAQs
                </button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors">
                  Size Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span>support@shophub.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2024 ShopHub. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/policy" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/policy" className="hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
