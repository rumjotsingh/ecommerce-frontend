import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/layout";
import {
  fetchWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { API_ENDPOINTS } from "../../config/api";
import toast from "react-hot-toast";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineDelete,
} from "react-icons/ai";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import { ProductGridSkeleton } from "../../components/UI/SkeletonLoader";
import EmptyState from "../../components/UI/EmptyState";
import ProductCard from "../../components/Product/ProductCard";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await dispatch(removeFromWishlist(productId)).unwrap();
      toast.success("Removed from wishlist", { duration: 2000 });
    } catch (err) {
      toast.error(err || "Failed to remove from wishlist");
      console.error("Remove error:", err);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success("Added to cart", {
      duration: 2000,
      style: {
        background: "#0EA5A4",
        color: "#fff",
      },
    });
  };

  const handleMoveToCart = async (product) => {
    handleAddToCart(product);
    await handleRemoveFromWishlist(product._id);
  };

  if (loading) {
    return (
      <Layout title="My Wishlist">
        <div className="bg-gray-50 py-6 sm:py-8 lg:py-12 min-h-screen">
          <div className="container mx-auto px-3 sm:px-4 lg:px-8">
            {/* Header Skeleton */}
            <div className="mb-6 sm:mb-8">
              <div className="h-10 bg-neutral-200 rounded animate-pulse w-64 mb-2" />
              <div className="h-5 bg-neutral-200 rounded animate-pulse w-48" />
            </div>
            <ProductGridSkeleton count={8} columns={4} />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="My Wishlist">
      <div className="bg-gray-50 py-6 sm:py-8 lg:py-12 min-h-screen">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1.5 sm:mb-2 flex items-center gap-2 sm:gap-3">
              <AiOutlineHeart className="text-red-500" size={32} />
              My Wishlist
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {items?.length
                ? `You have ${items.length} item${
                    items.length > 1 ? "s" : ""
                  } in your wishlist`
                : "Your wishlist is empty"}
            </p>
          </div>

          {error && (
            <Card className="mb-4 sm:mb-6 p-4 bg-danger-50 border border-danger-200">
              <div className="flex items-center gap-3">
                <AiOutlineDelete className="text-danger-600 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-danger-900 mb-1">Error Loading Wishlist</h3>
                  <p className="text-danger-700 text-sm">{error}</p>
                </div>
              </div>
            </Card>
          )}

          {items?.length === 0 ? (
            <Card className="text-center py-12 sm:py-16 p-6 sm:p-8">
              <EmptyState
                icon={<AiOutlineHeart className="w-24 h-24 text-neutral-300" />}
                title="Your wishlist is empty"
                description="Add items you like to your wishlist. Review them anytime and easily move them to cart when you're ready to purchase."
                actionText="Continue Shopping"
                onAction={() => navigate("/")}
              />
            </Card>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {items?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Continue Shopping Button */}
          {items?.length > 0 && (
            <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/")}
                className="text-sm sm:text-base"
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
