import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineShoppingCart } from "react-icons/ai";
import { BiTrendingUp, BiShield, BiSupport } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import Button from "../UI/Button";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-soft">
              <BiTrendingUp className="text-secondary-500" size={20} />
              <span className="text-sm font-medium text-gray-700">
                Trending Products
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Shop Smart,
              <span className="block bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Live Better
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl">
              Discover amazing deals on premium products. From electronics to
              fashion, we've got everything you need at unbeatable prices.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/products")}
                icon={<AiOutlineShoppingCart size={20} />}
              >
                Shop Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/categories")}
                icon={<AiOutlineArrowRight size={20} />}
                iconPosition="right"
              >
                Browse Categories
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <div className="text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image/Illustration */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl p-8 shadow-soft-lg">
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Special Offer
                        </div>
                        <div className="text-xs text-gray-500">
                          Limited Time
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-primary-500">
                      50% OFF
                    </div>
                  </div>
                  <div className="h-40 bg-gray-100 rounded-xl flex items-center justify-center">
                    <AiOutlineShoppingCart
                      size={80}
                      className="text-gray-300"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-soft-lg z-20 hidden lg:block">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaShippingFast className="text-green-500" size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Free Shipping</div>
                  <div className="text-sm font-semibold text-gray-900">
                    On orders $50+
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-soft-lg z-20 hidden lg:block">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BiShield className="text-purple-500" size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Secure Payment</div>
                  <div className="text-sm font-semibold text-gray-900">
                    100% Protected
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaShippingFast className="text-primary-500" size={24} />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Free Shipping</div>
                <div className="text-sm text-gray-600">On orders over $50</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <BiSupport className="text-secondary-500" size={24} />
              </div>
              <div>
                <div className="font-semibold text-gray-900">24/7 Support</div>
                <div className="text-sm text-gray-600">We're here to help</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <BiShield className="text-green-500" size={24} />
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  Secure Payment
                </div>
                <div className="text-sm text-gray-600">100% protected</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
