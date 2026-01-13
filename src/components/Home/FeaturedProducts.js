import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import ProductCard from "../Product/ProductCard";
import { AiOutlineRight } from "react-icons/ai";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 12 }));
  }, [dispatch]);

  if (loading) {
    return (
      <section className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded mb-1" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !products?.length) {
    return null;
  }

  const featuredProducts = products.slice(0, 12);

  return (
    <section className="bg-gray-100 py-4">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              Top Picks For You
            </h2>
            <Link
              to="/products"
              className="flex items-center gap-1 bg-primary-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-primary-600 transition-colors"
            >
              View All
              <AiOutlineRight size={14} />
            </Link>
          </div>

          {/* Products Grid */}
          <div className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
