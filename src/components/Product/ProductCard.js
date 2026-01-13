import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart,
  AiFillStar,
} from "react-icons/ai";
import { useAuth } from "../../context/auth";
import { API_ENDPOINTS } from "../../config/api";
import toast from "react-hot-toast";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductCard = ({ product, className = "" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth] = useAuth();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { items: cartItems } = useSelector((state) => state.cart);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const inWishlist = wishlistItems?.some((item) => item._id === product._id);
    setIsInWishlist(inWishlist);
  }, [wishlistItems, product._id]);

  const isInCart = cartItems?.some((item) => item._id === product._id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product.quantity === 0) {
      toast.error("Product is out of stock");
      return;
    }
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success("Added to cart");
  };

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    if (!auth?.token) {
      toast.error("Please login to add to wishlist");
      navigate("/login");
      return;
    }
    try {
      if (isInWishlist) {
        await dispatch(removeFromWishlist(product._id)).unwrap();
        toast.success("Removed from wishlist");
      } else {
        await dispatch(addToWishlist(product._id)).unwrap();
        toast.success("Added to wishlist");
      }
    } catch (err) {
      toast.error(err || "Something went wrong");
    }
  };

  const discountPercentage =
    product.originalPrice && product.price < product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  const rating = product.rating || 4.0;
  const reviewCount = product.reviewCount || 0;

  return (
    <div
      className={`bg-white rounded border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow group ${className}`}
      onClick={() => navigate(`/product/${product.slug}`)}
    >
      {/* Product Image */}
      <div className="relative p-4 pb-2">
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 z-10 p-1.5 bg-white rounded-full shadow-sm hover:shadow"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? (
            <AiFillHeart className="text-red-500" size={18} />
          ) : (
            <AiOutlineHeart
              className="text-gray-400 hover:text-red-500"
              size={18}
            />
          )}
        </button>

        {/* Image Container */}
        <div className="relative aspect-square flex items-center justify-center overflow-hidden">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}
          <img
            src={
              imageError
                ? "https://via.placeholder.com/200x200?text=No+Image"
                : API_ENDPOINTS.PRODUCT.GET_PHOTO(product._id)
            }
            alt={product.name}
            className={`max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
            loading="lazy"
          />
        </div>

        {/* Badges */}
        {discountPercentage > 0 && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-sm font-medium">
            {discountPercentage}% off
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="px-4 pb-4 space-y-2">
        {/* Brand/Category */}
        {product.category && (
          <p className="text-xs text-gray-500 uppercase tracking-wide truncate">
            {product.category.name}
          </p>
        )}

        {/* Product Name */}
        <h3 className="text-sm text-gray-800 line-clamp-2 min-h-[40px] group-hover:text-primary-500 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-0.5 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded">
            {rating.toFixed(1)}
            <AiFillStar size={10} />
          </span>
          <span className="text-xs text-gray-500">
            ({reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg font-medium text-gray-900">
            ₹{product.price?.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span className="text-sm text-green-600 font-medium">
                {discountPercentage}% off
              </span>
            </>
          )}
        </div>

        {/* Stock Status */}
        {product.quantity === 0 ? (
          <p className="text-xs text-red-500 font-medium">Out of Stock</p>
        ) : product.quantity <= 5 ? (
          <p className="text-xs text-orange-500">
            Only {product.quantity} left
          </p>
        ) : null}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.quantity === 0 || isInCart}
          className={`w-full flex items-center justify-center gap-2 py-2 mt-2 rounded text-sm font-medium transition-colors ${
            product.quantity === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : isInCart
              ? "bg-green-50 text-green-600 border border-green-200"
              : "bg-primary-500 text-white hover:bg-primary-600"
          }`}
        >
          <AiOutlineShoppingCart size={16} />
          {product.quantity === 0
            ? "Out of Stock"
            : isInCart
            ? "Added to Cart"
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
