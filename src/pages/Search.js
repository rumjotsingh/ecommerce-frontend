import React from "react";
import Layout from "./../components/layout/layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import {
  AiOutlineShoppingCart,
  AiOutlineEye,
  AiOutlineSearch,
} from "react-icons/ai";

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  return (
    <Layout title={"Search results"}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <Card className="mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <AiOutlineSearch size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Search Results
                </h1>
                <p className="text-gray-600">
                  {values?.results.length < 1
                    ? "No Products Found"
                    : `Found ${values?.results.length} ${
                        values?.results.length === 1 ? "product" : "products"
                      }`}
                </p>
              </div>
            </div>
          </Card>

          {/* Results */}
          {values?.results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {values?.results.map((p) => (
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
                <AiOutlineSearch
                  size={64}
                  className="text-gray-300 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-600">Try adjusting your search terms</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
