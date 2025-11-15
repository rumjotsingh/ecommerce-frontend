import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { useAuth } from "../../context/auth";
import { API_ENDPOINTS } from "../../config/api";
import toast from "react-hot-toast";
import Rating from "../UI/Rating";
import Button from "../UI/Button";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/slices/cartSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth] = useAuth();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { items: cartItems } = useSelector((state) => state.cart);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [cartItem, setCartItem] = useState(null);

  useEffect(() => {
    // Check if product is in wishlist
    const inWishlist = wishlistItems?.some((item) => item._id === product._id);
    setIsInWishlist(inWishlist);
  }, [wishlistItems, product._id]);

  useEffect(() => {
    // Check if product is in cart
    const itemInCart = cartItems?.find((item) => item._id === product._id);
    setCartItem(itemInCart || null);
  }, [cartItems, product._id]);

  const handleAddToCart = (e) => {
    e.stopPropagation();

    // Check if product is out of stock
    if (product.quantity === 0) {
      toast.error("Product is out of stock", { duration: 2000 });
      return;
    }

    // Add product to cart via Redux
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success("Item added to cart", {
      duration: 2000,
      style: {
        background: "#0EA5A4",
        color: "#fff",
      },
    });
  };

  const handleIncreaseQuantity = (e) => {
    e.stopPropagation();

    // Check if new quantity exceeds stock
    if (cartItem && cartItem.orderQuantity >= product.quantity) {
      toast.error(`Only ${product.quantity} items available`, {
        duration: 2000,
      });
      return;
    }

    dispatch(increaseQuantity(product._id));
  };

  const handleDecreaseQuantity = (e) => {
    e.stopPropagation();
    dispatch(decreaseQuantity(product._id));

    if (cartItem && cartItem.orderQuantity === 1) {
      toast.success("Item removed from cart", { duration: 2000 });
    }
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
        toast.success("Removed from wishlist", { duration: 2000 });
      } else {
        await dispatch(addToWishlist(product._id)).unwrap();
        toast.success("Added to wishlist", { duration: 2000 });
      }
    } catch (err) {
      toast.error(err || "Something went wrong");
      console.error("Wishlist error:", err);
    }
  };

  return (
    <div
      className="group bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => navigate(`/product/${product.slug}`)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img
          src={API_ENDPOINTS.PRODUCT.GET_PHOTO(product._id)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button
              className={`p-2 bg-white rounded-full shadow-lg transition-colors ${
                isInWishlist ? "bg-red-50" : "hover:bg-red-50"
              }`}
              onClick={handleWishlistToggle}
            >
              {isInWishlist ? (
                <AiFillHeart size={20} className="text-red-500" />
              ) : (
                <AiOutlineHeart
                  size={20}
                  className="text-gray-700 hover:text-red-500"
                />
              )}
            </button>
          </div>
        </div>

        {/* Badge */}
        {product.quantity < 5 && product.quantity > 0 && (
          <div className="absolute top-4 left-4">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Low Stock
            </span>
          </div>
        )}
        {product.quantity === 0 && (
          <div className="absolute top-4 left-4">
            <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg line-clamp-1 group-hover:text-primary-500 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Rating rating={4.5} size="sm" />
          <span className="text-xs text-gray-500">(125)</span>
        </div>

        <div className="flex  gap-4 items-center justify-between pt-2">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              ${product.price}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </div>
            )}
          </div>

          {cartItem ? (
            <div
              className="flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleDecreaseQuantity}
                className="w-8 h-8 rounded-lg border-2 border-primary-500 bg-white flex items-center justify-center text-primary-500 hover:bg-primary-50 transition-colors"
              >
                <AiOutlineMinus size={14} />
              </button>
              <span className="text-base font-semibold w-8 text-center">
                {cartItem.orderQuantity || 1}
              </span>
              <button
                onClick={handleIncreaseQuantity}
                disabled={cartItem.orderQuantity >= product.quantity}
                className="w-8 h-8 rounded-lg border-2 border-primary-500 bg-primary-500 flex items-center justify-center text-white hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AiOutlinePlus size={14} />
              </button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
              icon={<AiOutlineShoppingCart size={18} />}
              disabled={product.quantity === 0}
              className="shadow-lg"
            >
              Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
