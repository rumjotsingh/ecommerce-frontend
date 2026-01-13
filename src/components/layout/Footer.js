import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-8">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-sm font-medium mb-4 uppercase tracking-wide">
              About
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white text-sm font-medium mb-4 uppercase tracking-wide">
              Help
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/return-policy"
                  className="hover:text-white transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/policy"
                  className="hover:text-white transition-colors"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Report Issue
                </Link>
              </li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="text-white text-sm font-medium mb-4 uppercase tracking-wide">
              Policy
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/return-policy"
                  className="hover:text-white transition-colors"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  to="/policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/policy"
                  className="hover:text-white transition-colors"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-medium mb-4 uppercase tracking-wide">
              Contact Us
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <AiOutlineEnvironment
                  className="text-primary-400 mt-0.5 flex-shrink-0"
                  size={14}
                />
                <span>123 Shopping Street, Commerce City, CC 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <AiOutlinePhone
                  className="text-primary-400 flex-shrink-0"
                  size={14}
                />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <AiOutlineMail
                  className="text-primary-400 flex-shrink-0"
                  size={14}
                />
                <span>support@shophub.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white italic">
                ShopHub
              </span>
              <span className="text-[10px] text-yellow-400 italic -mt-2">
                Explore <span className="text-white">Plus</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 text-center">
              © {new Date().getFullYear()} ShopHub. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg"
                alt="Payment Methods"
                className="h-6 opacity-60"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
