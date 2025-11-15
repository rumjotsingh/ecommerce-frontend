import React from "react";
import { useNavigate } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/layout/layout";
import { AiOutlineArrowRight, AiOutlineAppstore } from "react-icons/ai";

const Categories = () => {
  const categories = useCategory();
  const navigate = useNavigate();

  const categoryColors = [
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600",
    "from-pink-500 to-pink-600",
    "from-green-500 to-green-600",
    "from-yellow-500 to-yellow-600",
    "from-red-500 to-red-600",
    "from-indigo-500 to-indigo-600",
    "from-teal-500 to-teal-600",
    "from-orange-500 to-orange-600",
    "from-cyan-500 to-cyan-600",
  ];

  return (
    <Layout title={"All Categories"}>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-10 sm:py-12 lg:py-16">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
              <AiOutlineAppstore
                size={32}
                className="text-white sm:w-9 sm:h-9 lg:w-10 lg:h-10"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              All Categories
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Explore our complete collection of categories and discover amazing
              products
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid Section */}
      <section className="py-10 sm:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          {categories?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {categories.map((category, index) => (
                <div
                  key={category._id}
                  onClick={() => navigate(`/category/${category.slug}`)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div
                      className={`bg-gradient-to-br ${
                        categoryColors[index % categoryColors.length]
                      } p-6 sm:p-7 lg:p-8 flex flex-col items-center justify-center h-36 sm:h-40 lg:h-48`}
                    >
                      <div className="text-center text-white">
                        <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 sm:mb-2.5 lg:mb-3">
                          {category.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-sm sm:text-base lg:text-lg font-semibold">
                          {category.name}
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white rounded-full p-2 sm:p-2.5 lg:p-3 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                        <AiOutlineArrowRight
                          className="text-gray-900"
                          size={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gray-200 rounded-full mb-3 sm:mb-4">
                <AiOutlineAppstore
                  size={32}
                  className="text-gray-400 sm:w-9 sm:h-9 lg:w-10 lg:h-10"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
                No Categories Found
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Categories will appear here once they are added.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Categories;
