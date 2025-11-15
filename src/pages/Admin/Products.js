import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "./../../components/layout/layout";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Card from "../../components/UI/Card";
import { BiPackage } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  //getall products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_ENDPOINTS.PRODUCT.GET_ALL);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title="All Products">
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AdminMenu />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              {/* Header */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <BiPackage size={20} className="text-white sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                      All Products
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                      {products?.length || 0} products in your store
                    </p>
                  </div>
                </div>
              </Card>

              {/* Products Grid */}
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 rounded-xl sm:rounded-2xl h-64 sm:h-80 lg:h-96"></div>
                    </div>
                  ))}
                </div>
              ) : products?.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  {products.map((p) => (
                    <Link
                      key={p._id}
                      to={`/dashborad/admin/product/${p.slug}`}
                      className="group"
                    >
                      <Card hover className="h-full p-3 sm:p-4 lg:p-6">
                        <div className="relative overflow-hidden rounded-lg sm:rounded-xl mb-2 sm:mb-3 lg:mb-4">
                          <img
                            src={API_ENDPOINTS.PRODUCT.GET_PHOTO(p._id)}
                            alt={p.name}
                            className="w-full h-32 sm:h-40 lg:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-white p-1.5 sm:p-2 rounded-md sm:rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <AiOutlineEdit
                              size={16}
                              className="text-primary-500 sm:w-5 sm:h-5"
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-1 text-xs sm:text-sm lg:text-base">
                            {p.name}
                          </h3>
                          <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 line-clamp-2">
                            {p.description}
                          </p>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card className="p-6 sm:p-8">
                  <div className="text-center py-8 sm:py-12">
                    <BiPackage
                      size={40}
                      className="text-gray-300 mx-auto mb-3 sm:mb-4 sm:w-12 sm:h-12"
                    />
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
                      No Products Yet
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Create your first product to get started
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
