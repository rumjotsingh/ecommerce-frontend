import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { AiOutlineRight } from "react-icons/ai";

const CategoryShowcase = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <section className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse text-center">
                  <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-16 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const featuredCategories = categories?.slice(0, 8) || [];

  if (featuredCategories.length === 0) return null;

  return (
    <section className="bg-gray-100 py-4">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <Link
              to="/categories"
              className="flex items-center gap-1 text-primary-500 text-sm font-medium hover:underline"
            >
              View All
              <AiOutlineRight size={14} />
            </Link>
          </div>

          {/* Categories Grid */}
          <div className="p-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {featuredCategories.map((category) => (
                <Link
                  key={category._id}
                  to={`/category/${category.slug}`}
                  className="text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                    <span className="text-2xl font-bold text-primary-500">
                      {category.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium group-hover:text-primary-500 transition-colors truncate">
                    {category.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
