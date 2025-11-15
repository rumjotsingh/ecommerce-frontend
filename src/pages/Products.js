import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import ProductCard from "../components/Product/ProductCard";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import {
  AiOutlineFilter,
  AiOutlineClose,
  AiOutlineAppstore,
} from "react-icons/ai";

const Products = () => {
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
      const { data } = await axios.get(API_ENDPOINTS.CATEGORY.GET_ALL);
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
  const getAllProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_ENDPOINTS.PRODUCT.LIST(page));
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [page]);

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(API_ENDPOINTS.PRODUCT.COUNT);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Load more
  const loadMore = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_ENDPOINTS.PRODUCT.LIST(page));
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [page, products]);

  // Get filtered products
  const filterProduct = useCallback(async () => {
    try {
      const { data } = await axios.post(API_ENDPOINTS.PRODUCT.FILTER, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }, [checked, radio]);

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
    if (page === 1) return;
    loadMore();
  }, [page, loadMore]);

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length, getAllProducts]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio, filterProduct]);

  return (
    <Layout title={"All Products - ShopHub"}>
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
              All Products
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Browse our complete collection of products with advanced filters
            </p>
          </div>
        </div>
      </div>

      {/* Products with Filters */}
      <section className="py-10 sm:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {products?.length > 0
                  ? `${products.length} Products`
                  : "No Products"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                {total > 0 && `Total: ${total} products available`}
              </p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-500 text-white rounded-lg sm:rounded-xl text-sm sm:text-base"
            >
              <AiOutlineFilter size={18} className="sm:w-5 sm:h-5" />
              Filters
            </button>
          </div>

          <div className="flex gap-6 sm:gap-8">
            {/* Filters Sidebar */}
            <div
              className={`${
                showFilters ? "block" : "hidden"
              } lg:block fixed lg:relative inset-0 lg:inset-auto z-50 lg:z-0 bg-black bg-opacity-50 lg:bg-transparent`}
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowFilters(false);
              }}
            >
              <div className="bg-white lg:bg-transparent h-full lg:h-auto w-[280px] sm:w-80 lg:w-64 p-4 sm:p-6 lg:p-0 overflow-y-auto">
                <div className="flex items-center justify-between lg:hidden mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <AiOutlineClose size={20} className="sm:w-6 sm:h-6" />
                  </button>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {/* Category Filter */}
                  <Card className="p-3 sm:p-4 lg:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                      Categories
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {categories?.map((c) => (
                        <label
                          key={c._id}
                          className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
                        >
                          <Checkbox
                            onChange={(e) =>
                              handleFilter(e.target.checked, c._id)
                            }
                            className="text-primary-500"
                          />
                          <span className="text-sm sm:text-base text-gray-700 group-hover:text-primary-500 transition-colors">
                            {c.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </Card>

                  {/* Price Filter */}
                  <Card className="p-3 sm:p-4 lg:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                      Price Range
                    </h3>
                    <Radio.Group
                      onChange={(e) => setRadio(e.target.value)}
                      className="space-y-2 sm:space-y-3 w-full"
                    >
                      {Prices?.map((p) => (
                        <Radio key={p._id} value={p.array} className="block">
                          <span className="text-sm sm:text-base text-gray-700">
                            {p.name}
                          </span>
                        </Radio>
                      ))}
                    </Radio.Group>
                  </Card>

                  {/* Reset Button */}
                  <Button
                    variant="danger"
                    fullWidth
                    onClick={() => window.location.reload()}
                    className="text-sm sm:text-base"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 rounded-xl sm:rounded-2xl h-64 sm:h-80 lg:h-96"></div>
                    </div>
                  ))}
                </div>
              ) : products?.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                    {products?.map((p) => (
                      <ProductCard key={p._id} product={p} />
                    ))}
                  </div>

                  {/* Load More */}
                  {products && products.length < total && (
                    <div className="text-center mt-8 sm:mt-10 lg:mt-12">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(page + 1);
                        }}
                        disabled={loading}
                        className="text-sm sm:text-base"
                      >
                        {loading ? "Loading..." : "Load More Products"}
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <Card className="p-6 sm:p-8">
                  <div className="text-center py-8 sm:py-12">
                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full mb-3 sm:mb-4">
                      <AiOutlineAppstore
                        size={28}
                        className="text-gray-400 sm:w-8 sm:h-8"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
                      No Products Found
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Try adjusting your filters to see more results
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
