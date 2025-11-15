import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/layout";
import {
  fetchWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";
import { useCart } from "../../context/cart";
import { API_ENDPOINTS } from "../../config/api";
import toast from "react-hot-toast";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineDelete,
} from "react-icons/ai";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Spinner from "../../components/UI/Spinner";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const { items, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await dispatch(removeFromWishlist(productId)).unwrap();
      toast.success("Removed from wishlist", { duration: 2000 });
      // Refresh wishlist immediately
      await dispatch(fetchWishlist()).unwrap();
    } catch (err) {
      toast.error(err || "Failed to remove from wishlist");
      console.error("Remove error:", err);
    }
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
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
        <div className="min-h-screen flex items-center justify-center">
          <Spinner size="lg" />
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
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl text-red-600 text-sm sm:text-base">
              {error}
            </div>
          )}

          {items?.length === 0 ? (
            <Card className="text-center py-12 sm:py-16 p-6 sm:p-8">
              <div className="flex flex-col items-center gap-4 sm:gap-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gray-100 rounded-full flex items-center justify-center">
                  <AiOutlineHeart
                    size={48}
                    className="text-gray-300 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                  />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
                    Your wishlist is empty
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 px-4">
                    Add items you like to your wishlist. Review them anytime and
                    easily move them to cart.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate("/")}
                  className="text-sm sm:text-base"
                >
                  Continue Shopping
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {items?.map((product) => (
                <Card key={product._id} hover className="overflow-hidden p-0">
                  {/* Product Image */}
                  <div
                    className="relative aspect-square bg-gray-100 cursor-pointer overflow-hidden group"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    <img
                      src={API_ENDPOINTS.PRODUCT.GET_PHOTO(product._id)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Remove Button Overlay */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromWishlist(product._id);
                      }}
                      className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                      aria-label="Remove from wishlist"
                    >
                      <AiOutlineDelete
                        size={16}
                        className="text-red-500 sm:w-5 sm:h-5"
                      />
                    </button>

                    {/* Stock Badge */}
                    {product.quantity === 0 && (
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                        <span className="bg-gray-800 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    {product.quantity > 0 && product.quantity < 5 && (
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                        <span className="bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                          Low Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-3 sm:p-4 lg:p-5 space-y-2 sm:space-y-3 lg:space-y-4">
                    <div>
                      <h3
                        className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg line-clamp-1 cursor-pointer hover:text-primary-500 transition-colors"
                        onClick={() => navigate(`/product/${product.slug}`)}
                      >
                        {product.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 line-clamp-2 mt-0.5 sm:mt-1">
                        {product.description}
                      </p>
                    </div>

                    {/* Category */}
                    {product.category?.name && (
                      <div className="text-[10px] sm:text-xs text-gray-500">
                        {product.category.name}
                      </div>
                    )}

                    {/* Price */}
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-500">
                      ${product.price}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col xs:flex-row gap-1.5 sm:gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleMoveToCart(product)}
                        icon={
                          <AiOutlineShoppingCart
                            size={16}
                            className="sm:w-[18px] sm:h-[18px]"
                          />
                        }
                        disabled={product.quantity === 0}
                        className="flex-1 text-xs sm:text-sm"
                      >
                        {product.quantity === 0
                          ? "Out of Stock"
                          : "Add to Cart"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFromWishlist(product._id)}
                        className="xs:w-auto text-xs sm:text-sm"
                        aria-label="Remove"
                      >
                        <AiOutlineDelete
                          size={16}
                          className="sm:w-[18px] sm:h-[18px]"
                        />
                      </Button>
                    </div>
                  </div>
                </Card>
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
