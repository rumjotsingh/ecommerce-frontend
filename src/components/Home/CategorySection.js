import React from "react";
import { useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import { AiOutlineArrowRight } from "react-icons/ai";

const CategorySection = () => {
  const navigate = useNavigate();
  const categories = useCategory();

  const categoryColors = [
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600",
    "from-pink-500 to-pink-600",
    "from-green-500 to-green-600",
    "from-yellow-500 to-yellow-600",
    "from-red-500 to-red-600",
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our diverse range of categories and find exactly what
            you're looking for
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories?.slice(0, 6).map((category, index) => (
            <div
              key={category._id}
              onClick={() => navigate(`/category/${category.slug}`)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300">
                <div
                  className={`bg-gradient-to-br ${
                    categoryColors[index % categoryColors.length]
                  } p-8 flex items-center justify-center h-40`}
                >
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">
                      {category.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-sm font-medium">{category.name}</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <AiOutlineArrowRight
                    className="text-white opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                    size={24}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {categories?.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => navigate("/categories")}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary-500 font-medium rounded-xl border-2 border-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300"
            >
              View All Categories
              <AiOutlineArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
