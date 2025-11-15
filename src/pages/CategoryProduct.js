import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import { BiCategory } from "react-icons/bi";
import { AiOutlineShoppingCart, AiOutlineEye } from "react-icons/ai";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce-backend-s84l.onrender.com/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
      toast.error("Error loading products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={`${category?.name} - Products`}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <Card className="mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <BiCategory size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {category?.name}
                </h1>
                <p className="text-gray-600">
                  {products?.length}{" "}
                  {products?.length === 1 ? "product" : "products"} found
                </p>
              </div>
            </div>
          </Card>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl h-96"></div>
                </div>
              ))}
            </div>
          ) : products?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <Card key={p._id} hover className="group">
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img
                      src={`https://ecommerce-backend-s84l.onrender.com/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {p.description}
                    </p>
                    <div className="text-2xl font-bold text-primary-500">
                      ${p.price}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate(`/product/${p.slug}`)}
                        icon={<AiOutlineEye size={16} />}
                        className="flex-1"
                      >
                        Details
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item added to cart");
                        }}
                        icon={<AiOutlineShoppingCart size={16} />}
                        className="flex-1"
                      >
                        Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <div className="text-center py-12">
                <BiCategory size={64} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-600">
                  This category doesn't have any products yet
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
