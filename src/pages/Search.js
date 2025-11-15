import React from "react";
import Layout from "./../components/layout/layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { API_ENDPOINTS } from "../config/api";
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
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          {/* Header */}
          <Card className="mb-6 sm:mb-8 p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <AiOutlineSearch
                  size={20}
                  className="text-white sm:w-6 sm:h-6"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  Search Results
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {values?.results.map((p) => (
                <Card key={p._id} hover className="group p-3 sm:p-4 lg:p-6">
                  <div className="relative overflow-hidden rounded-lg sm:rounded-xl mb-3 sm:mb-4">
                    <img
                      src={API_ENDPOINTS.PRODUCT.GET_PHOTO(p._id)}
                      alt={p.name}
                      className="w-full h-32 sm:h-40 lg:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="font-semibold text-gray-900 line-clamp-1 text-xs sm:text-sm lg:text-base">
                      {p.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 line-clamp-2">
                      {p.description}
                    </p>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-500">
                      ${p.price}
                    </div>
                    <div className="flex flex-col xs:flex-row gap-1.5 sm:gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate(`/product/${p.slug}`)}
                        icon={
                          <AiOutlineEye size={14} className="sm:w-4 sm:h-4" />
                        }
                        className="flex-1 text-xs sm:text-sm"
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
                        icon={
                          <AiOutlineShoppingCart
                            size={14}
                            className="sm:w-4 sm:h-4"
                          />
                        }
                        className="flex-1 text-xs sm:text-sm"
                      >
                        Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6 sm:p-8">
              <div className="text-center py-8 sm:py-12">
                <AiOutlineSearch
                  size={48}
                  className="text-gray-300 mx-auto mb-3 sm:mb-4 sm:w-16 sm:h-16"
                />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
                  No Products Found
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Try adjusting your search terms
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
