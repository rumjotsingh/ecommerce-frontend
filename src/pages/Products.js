import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
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
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
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

  return (
    <Layout title={"All Products - ShopHub"}>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-4">
              <AiOutlineAppstore size={40} className="text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              All Products
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our complete collection of products with advanced filters
            </p>
          </div>
        </div>
      </div>

      {/* Products with Filters */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {products?.length > 0
                  ? `${products.length} Products`
                  : "No Products"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {total > 0 && `Total: ${total} products available`}
              </p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl"
            >
              <AiOutlineFilter size={20} />
              Filters
            </button>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div
              className={`${
                showFilters ? "block" : "hidden"
              } lg:block fixed lg:relative inset-0 lg:inset-auto z-50 lg:z-0 bg-black bg-opacity-50 lg:bg-transparent`}
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowFilters(false);
              }}
            >
              <div className="bg-white lg:bg-transparent h-full lg:h-auto w-80 lg:w-64 p-6 lg:p-0 overflow-y-auto">
                <div className="flex items-center justify-between lg:hidden mb-6">
                  <h3 className="text-xl font-bold">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <AiOutlineClose size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Category Filter */}
                  <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Categories
                    </h3>
                    <div className="space-y-3">
                      {categories?.map((c) => (
                        <label
                          key={c._id}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <Checkbox
                            onChange={(e) =>
                              handleFilter(e.target.checked, c._id)
                            }
                            className="text-primary-500"
                          />
                          <span className="text-gray-700 group-hover:text-primary-500 transition-colors">
                            {c.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </Card>

                  {/* Price Filter */}
                  <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Price Range
                    </h3>
                    <Radio.Group
                      onChange={(e) => setRadio(e.target.value)}
                      className="space-y-3 w-full"
                    >
                      {Prices?.map((p) => (
                        <Radio key={p._id} value={p.array} className="block">
                          <span className="text-gray-700">{p.name}</span>
                        </Radio>
                      ))}
                    </Radio.Group>
                  </Card>

                  {/* Reset Button */}
                  <Button
                    variant="danger"
                    fullWidth
                    onClick={() => window.location.reload()}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 rounded-2xl h-96"></div>
                    </div>
                  ))}
                </div>
              ) : products?.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products?.map((p) => (
                      <ProductCard key={p._id} product={p} />
                    ))}
                  </div>

                  {/* Load More */}
                  {products && products.length < total && (
                    <div className="text-center mt-12">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(page + 1);
                        }}
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Load More Products"}
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <Card>
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <AiOutlineAppstore size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No Products Found
                    </h3>
                    <p className="text-gray-600">
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
