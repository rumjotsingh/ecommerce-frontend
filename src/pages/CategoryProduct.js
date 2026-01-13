import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { addToCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import { ProductGridSkeleton } from "../components/UI/SkeletonLoader";
import EmptyState from "../components/UI/EmptyState";
import ProductCard from "../components/Product/ProductCard";
import { BiCategory } from "react-icons/bi";
import { AiOutlineShoppingCart, AiOutlineEye } from "react-icons/ai";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPrductsByCat = React.useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        API_ENDPOINTS.PRODUCT.CATEGORY(params.slug)
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
      toast.error("Error loading products");
    } finally {
      setLoading(false);
    }
  }, [params.slug]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug, getPrductsByCat]);

  return (
    <Layout title={`${category?.name} - Products`}>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          {/* Header */}
          <Card className="mb-6 sm:mb-8 p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <BiCategory size={20} className="text-white sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  {category?.name}
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  {products?.length}{" "}
                  {products?.length === 1 ? "product" : "products"} found
                </p>
              </div>
            </div>
          </Card>

          {/* Products Grid */}
          {loading ? (
            <ProductGridSkeleton count={8} columns={4} />
          ) : products?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          ) : (
            <Card className="p-6 sm:p-8">
              <EmptyState
                icon={<BiCategory className="w-20 h-20 text-neutral-300" />}
                title="No Products Found"
                description={`This category doesn't have any products yet. Check back soon or browse other categories.`}
                actionText="Browse All Categories"
                onAction={() => navigate("/categories")}
              />
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
