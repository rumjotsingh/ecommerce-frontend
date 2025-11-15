import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "./../../components/layout/layout";
import axios from "axios";
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
      const { data } = await axios.get(
        "https://ecommerce-backend-s84l.onrender.com/api/v1/product/get-product"
      );
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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AdminMenu />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Header */}
              <Card>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <BiPackage size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      All Products
                    </h1>
                    <p className="text-gray-600">
                      {products?.length || 0} products in your store
                    </p>
                  </div>
                </div>
              </Card>

              {/* Products Grid */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 rounded-2xl h-96"></div>
                    </div>
                  ))}
                </div>
              ) : products?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((p) => (
                    <Link
                      key={p._id}
                      to={`/dashborad/admin/product/${p.slug}`}
                      className="group"
                    >
                      <Card hover className="h-full">
                        <div className="relative overflow-hidden rounded-xl mb-4">
                          <img
                            src={`https://ecommerce-backend-s84l.onrender.com/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2 bg-white p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <AiOutlineEdit
                              size={20}
                              className="text-primary-500"
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                            {p.name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {p.description}
                          </p>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card>
                  <div className="text-center py-12">
                    <BiPackage
                      size={48}
                      className="text-gray-300 mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No Products Yet
                    </h3>
                    <p className="text-gray-600">
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
