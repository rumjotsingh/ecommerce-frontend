import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import { Prices } from "../components/Prices";
import toast from "react-hot-toast";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import {
  ShoppingBag,
  TrendingUp,
  Star,
  ChevronRight,
  Filter,
  X,
  Tag,
  Truck,
  Shield,
  HeadphonesIcon,
  RotateCcw,
} from "lucide-react";

const ModernHomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-backend-s84l.onrender.com/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce-backend-s84l.onrender.com/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-backend-s84l.onrender.com/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce-backend-s84l.onrender.com/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, radio]);

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "https://ecommerce-backend-s84l.onrender.com/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item added to cart");
  };

  return (
    <Layout title="Shop Amazing Products - Best Offers">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-primary-600 to-secondary text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <Badge className="bg-white text-primary">New Arrivals</Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Discover Amazing Products
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Shop the latest trends with exclusive deals and free shipping on orders over $50
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100"
                  onClick={() => navigate("/categories")}
                >
                  Shop Now
                  <ChevronRight className="ml-2" size={20} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => {
                    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View Products
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/20 rounded-full blur-3xl"></div>
                <img
                  src="/images/hero-shopping.svg"
                  alt="Shopping"
                  className="relative z-10 w-full max-w-md mx-auto"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                <Truck className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">Free Shipping</h3>
                <p className="text-xs text-gray-500">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary-50 rounded-full flex items-center justify-center">
                <Shield className="text-secondary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">Secure Payment</h3>
                <p className="text-xs text-gray-500">100% protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                <RotateCcw className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">Easy Returns</h3>
                <p className="text-xs text-gray-500">30-day guarantee</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary-50 rounded-full flex items-center justify-center">
                <HeadphonesIcon className="text-secondary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">24/7 Support</h3>
                <p className="text-xs text-gray-500">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Shop by Category
            </h2>
            <p className="text-gray-600">Find exactly what you're looking for</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories?.slice(0, 8).map((c) => (
              <Card
                key={c._id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-2 border-transparent hover:border-primary"
                onClick={() => navigate(`/category/${c.slug}`)}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Tag className="text-white" size={28} />
                  </div>
                  <h3 className="font-semibold text-gray-900">{c.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
          {categories?.length > 8 && (
            <div className="text-center mt-8">
              <Button variant="outline" onClick={() => navigate("/categories")}>
                View All Categories
                <ChevronRight className="ml-2" size={16} />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="md:w-64 flex-shrink-0">
              <div className="md:hidden mb-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={18} className="mr-2" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
              </div>

              <div className={`space-y-6 ${showFilters ? "block" : "hidden md:block"}`}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg">Filters</h3>
                      {(checked.length > 0 || radio.length > 0) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setChecked([]);
                            setRadio([]);
                            window.location.reload();
                          }}
                        >
                          <X size={16} className="mr-1" />
                          Clear
                        </Button>
                      )}
                    </div>

                    {/* Category Filter */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-gray-700">Category</h4>
                      <div className="space-y-2">
                        {categories?.map((c) => (
                          <label key={c._id} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                              onChange={(e) => handleFilter(e.target.checked, c._id)}
                              checked={checked.includes(c._id)}
                            />
                            <span className="text-sm text-gray-700">{c.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Price Filter */}
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-700">Price Range</h4>
                      <div className="space-y-2">
                        {Prices?.map((p) => (
                          <label key={p._id} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="price"
                              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                              value={p.array}
                              onChange={(e) => setRadio(p.array)}
                              checked={radio === p.array}
                            />
                            <span className="text-sm text-gray-700">{p.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Featured Products
                </h2>
                <div className="text-sm text-gray-600">
                  {products?.length} {products?.length === 1 ? "product" : "products"}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((p) => (
                  <Card
                    key={p._id}
                    className="group hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={`https://ecommerce-backend-s84l.onrender.com/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-secondary">New</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-1">
                        {p.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {p.description}
                      </p>
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">(4.5)</span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-primary">${p.price}</span>
                        <span className="text-sm text-gray-500 line-through">
                          ${Math.round(p.price * 1.3)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          Details
                        </Button>
                        <Button className="flex-1" onClick={() => addToCart(p)}>
                          <ShoppingBag size={18} className="mr-2" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              {products && products.length < total && (
                <div className="text-center mt-8">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Load More Products"}
                    <ChevronRight className="ml-2" size={20} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-12 bg-gradient-to-r from-secondary to-secondary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <TrendingUp size={48} className="mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Special Offer - Limited Time!
            </h2>
            <p className="text-lg mb-6 text-white/90">
              Get up to 50% off on selected items. Don't miss out on these amazing deals!
            </p>
            <Button size="lg" className="bg-white text-secondary hover:bg-gray-100">
              Shop Deals Now
              <ChevronRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ModernHomePage;
