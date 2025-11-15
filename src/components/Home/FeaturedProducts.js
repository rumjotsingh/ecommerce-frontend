import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../Product/ProductCard";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://ecommerce-backend-s84l.onrender.com/api/v1/product/product-list/1"
      );
      setLoading(false);
      setProducts(data.products?.slice(0, 8) || []);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Discover our handpicked selection of trending items
            </p>
          </div>
          <button
            onClick={() => navigate("/products")}
            className="hidden md:flex items-center gap-2 text-primary-500 font-medium hover:gap-3 transition-all"
          >
            View All
            <AiOutlineArrowRight size={20} />
          </button>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl h-80"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="md:hidden text-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium rounded-xl hover:shadow-lg transition-all"
          >
            View All Products
            <AiOutlineArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
