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
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <AiOutlineHeart className="text-red-500" size={40} />
              My Wishlist
            </h1>
            <p className="text-gray-600">
              {items?.length
                ? `You have ${items.length} item${
                    items.length > 1 ? "s" : ""
                  } in your wishlist`
                : "Your wishlist is empty"}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
              {error}
            </div>
          )}

          {items?.length === 0 ? (
            <Card className="text-center py-16">
              <div className="flex flex-col items-center gap-6">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                  <AiOutlineHeart size={64} className="text-gray-300" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Your wishlist is empty
                  </h2>
                  <p className="text-gray-600">
                    Add items you like to your wishlist. Review them anytime and
                    easily move them to cart.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items?.map((product) => (
                <Card key={product._id} hover className="overflow-hidden">
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
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <AiOutlineDelete size={20} className="text-red-500" />
                    </button>

                    {/* Stock Badge */}
                    {product.quantity === 0 && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    {product.quantity > 0 && product.quantity < 5 && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Low Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h3
                        className="font-semibold text-gray-900 text-lg line-clamp-1 cursor-pointer hover:text-primary-500 transition-colors"
                        onClick={() => navigate(`/product/${product.slug}`)}
                      >
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </div>

                    {/* Category */}
                    {product.category?.name && (
                      <div className="text-xs text-gray-500">
                        {product.category.name}
                      </div>
                    )}

                    {/* Price */}
                    <div className="text-2xl font-bold text-primary-500">
                      ${product.price}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleMoveToCart(product)}
                        icon={<AiOutlineShoppingCart size={18} />}
                        disabled={product.quantity === 0}
                        className="flex-1"
                      >
                        {product.quantity === 0
                          ? "Out of Stock"
                          : "Add to Cart"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFromWishlist(product._id)}
                      >
                        <AiOutlineDelete size={18} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Continue Shopping Button */}
          {items?.length > 0 && (
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" onClick={() => navigate("/")}>
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
