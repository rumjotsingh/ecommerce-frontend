import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/auth";
import { API_ENDPOINTS } from "../config/api";
import toast from "react-hot-toast";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShareAlt,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { BiPackage, BiShield } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import Rating from "../components/UI/Rating";
import Button from "../components/UI/Button";
import Badge from "../components/UI/Badge";
import ProductCard from "../components/Product/ProductCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/slices/wishlistSlice";
import {
  addReview,
  fetchProductReviews,
  deleteReview,
} from "../redux/slices/reviewSlice";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/slices/cartSlice";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth] = useAuth();
  const { items: cartItems } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { reviews, loading: reviewsLoading } = useSelector(
    (state) => state.review
  );
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [cartItem, setCartItem] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  //initial details
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        API_ENDPOINTS.PRODUCT.GET_SINGLE(params.slug)
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug, getProduct]);

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

  useEffect(() => {
    // Fetch reviews when product changes
    if (product._id) {
      dispatch(fetchProductReviews(product._id));
    }
  }, [product._id, dispatch]);

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(API_ENDPOINTS.PRODUCT.RELATED(pid, cid));
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    // Check if product has stock
    if (product.quantity === 0) {
      toast.error("Product is out of stock", {
        duration: 2000,
      });
      return;
    }

    // Check if requested quantity exceeds available stock
    if (quantity > product.quantity) {
      toast.error(`Only ${product.quantity} items available in stock`, {
        duration: 2000,
      });
      return;
    }

    // Check if product already exists in cart
    const existingItem = cartItems.find((item) => item._id === product._id);
    const currentQuantity = existingItem?.orderQuantity || 0;
    const newTotalQuantity = currentQuantity + quantity;

    // Check if new total quantity exceeds stock
    if (newTotalQuantity > product.quantity) {
      toast.error(
        `Cannot add more. Only ${product.quantity} items available in stock`,
        {
          duration: 2000,
        }
      );
      return;
    }

    // Add product with selected quantity to cart via Redux
    dispatch(addToCart({ product, quantity }));

    if (existingItem) {
      toast.success(`Quantity updated! ${newTotalQuantity} item(s) in cart`, {
        duration: 2000,
      });
    } else {
      toast.success(`${quantity} item(s) added to cart`, {
        duration: 2000,
        style: {
          background: "#0EA5A4",
          color: "#fff",
        },
      });
    }
  };

  const handleWishlistToggle = async () => {
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

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!auth?.token) {
      toast.error("Please login to write a review");
      navigate("/login");
      return;
    }

    if (!reviewComment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setSubmittingReview(true);
    try {
      await dispatch(
        addReview({
          productId: product._id,
          reviewData: {
            rating: reviewRating,
            comment: reviewComment,
          },
        })
      ).unwrap();
      toast.success("Review added successfully");
      setReviewComment("");
      setReviewRating(5);
      setShowReviewForm(false);
      dispatch(fetchProductReviews(product._id));
    } catch (err) {
      toast.error(err.message || "Failed to add review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await dispatch(deleteReview(reviewId)).unwrap();
      toast.success("Review deleted");
      dispatch(fetchProductReviews(product._id));
    } catch (err) {
      toast.error(err.message || "Failed to delete review");
    }
  };

  // Mock images array - In real scenario, you'd have multiple product images
  const productImages = [API_ENDPOINTS.PRODUCT.GET_PHOTO(product._id)];

  return (
    <Layout title={`${product?.name} - Product Details`}>
      <div className="bg-gray-50 py-6 sm:py-8 lg:py-12">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          {/* Product Section */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-soft-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 lg:mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {/* Image Gallery */}
              <div className="space-y-3 sm:space-y-4">
                {/* Main Image */}
                <div className="aspect-square bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden">
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnail Images */}
                {productImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                    {productImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? "border-primary-500"
                            : "border-gray-200 hover:border-primary-300"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                {/* Category Badge */}
                <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 flex-wrap">
                  <Badge variant="primary" className="text-xs sm:text-sm">
                    {product?.category?.name}
                  </Badge>
                  {product.quantity < 10 && product.quantity > 0 && (
                    <Badge variant="warning" className="text-xs sm:text-sm">
                      Only {product.quantity} left
                    </Badge>
                  )}
                  {product.quantity === 0 && (
                    <Badge variant="danger" className="text-xs sm:text-sm">
                      Out of Stock
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <Rating rating={4.5} size="lg" showCount count={125} />
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2.5 sm:gap-3 lg:gap-4 flex-wrap">
                  <div className="text-3xl sm:text-3xl lg:text-4xl font-bold text-primary-500">
                    ${product.price}
                  </div>
                  {product.originalPrice && (
                    <div className="text-2xl text-gray-400 line-through">
                      ${product.originalPrice}
                    </div>
                  )}
                  {product.originalPrice && (
                    <Badge variant="success" size="lg">
                      Save ${product.originalPrice - product.price}
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-1.5 sm:space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Description
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Quantity Selector - Only show if NOT in cart */}
                {!cartItem && (
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:border-primary-500 hover:text-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg sm:text-xl"
                      >
                        -
                      </button>
                      <span className="text-lg sm:text-xl font-semibold w-10 sm:w-12 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => {
                          if (quantity >= product.quantity) {
                            toast.error(
                              `Only ${product.quantity} items available`,
                              {
                                duration: 2000,
                              }
                            );
                          } else {
                            setQuantity(quantity + 1);
                          }
                        }}
                        disabled={quantity >= product.quantity}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:border-primary-500 hover:text-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg sm:text-xl"
                      >
                        +
                      </button>
                    </div>
                    {product.quantity > 0 && (
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        {product.quantity} items available
                      </p>
                    )}
                  </div>
                )}

                {/* Cart Quantity Controls - Show if item IS in cart */}
                {cartItem && (
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700">
                      Quantity in Cart
                    </label>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <button
                        onClick={() => {
                          dispatch(decreaseQuantity(product._id));
                          if (cartItem.orderQuantity === 1) {
                            toast.success("Item removed from cart", {
                              duration: 2000,
                            });
                          }
                        }}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border-2 border-primary-500 bg-white flex items-center justify-center text-primary-500 hover:bg-primary-50 transition-colors text-lg sm:text-xl"
                      >
                        -
                      </button>
                      <span className="text-lg sm:text-xl font-semibold w-10 sm:w-12 text-center text-primary-600">
                        {cartItem.orderQuantity || 1}
                      </span>
                      <button
                        onClick={() => {
                          if (cartItem.orderQuantity >= product.quantity) {
                            toast.error(
                              `Only ${product.quantity} items available`,
                              { duration: 2000 }
                            );
                          } else {
                            dispatch(increaseQuantity(product._id));
                          }
                        }}
                        disabled={cartItem.orderQuantity >= product.quantity}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border-2 border-primary-500 bg-primary-500 flex items-center justify-center text-white hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg sm:text-xl"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-[10px] sm:text-xs text-primary-600 font-medium">
                      ✓ Item in cart -{" "}
                      {product.quantity - cartItem.orderQuantity} more available
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 lg:gap-4">
                  {!cartItem ? (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleAddToCart}
                      icon={
                        <AiOutlineShoppingCart
                          size={20}
                          className="sm:w-6 sm:h-6"
                        />
                      }
                      disabled={product.quantity === 0}
                      className="flex-1 text-sm sm:text-base"
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      size="lg"
                      onClick={() => navigate("/cart")}
                      icon={
                        <AiOutlineShoppingCart
                          size={20}
                          className="sm:w-6 sm:h-6"
                        />
                      }
                      className="flex-1 text-sm sm:text-base"
                    >
                      Go to Cart
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleWishlistToggle}
                    className="xs:w-auto"
                  >
                    {isInWishlist ? (
                      <AiFillHeart
                        size={20}
                        className="text-red-500 sm:w-6 sm:h-6"
                      />
                    ) : (
                      <AiOutlineHeart size={20} className="sm:w-6 sm:h-6" />
                    )}
                  </Button>
                  <Button variant="outline" size="lg" className="xs:w-auto">
                    <AiOutlineShareAlt size={20} className="sm:w-6 sm:h-6" />
                  </Button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaShippingFast className="text-primary-500" size={18} />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-900">
                        Free Delivery
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-600">
                        On orders $50+
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <BiShield className="text-secondary-500" size={18} />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-900">
                        Secure Payment
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-600">
                        100% protected
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <BiPackage className="text-green-500" size={18} />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-900">
                        Easy Returns
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-600">
                        30-day policy
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-soft-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 lg:mb-12">
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 sm:gap-4 lg:gap-0 mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Customer Reviews
              </h2>
              <Button
                variant="primary"
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="w-full xs:w-auto text-sm sm:text-base"
              >
                Write a Review
              </Button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <form
                onSubmit={handleSubmitReview}
                className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 rounded-xl sm:rounded-2xl"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Write Your Review
                </h3>

                {/* Star Rating */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="text-3xl focus:outline-none transition-colors"
                      >
                        {star <= reviewRating ? (
                          <AiFillStar className="text-yellow-400" />
                        ) : (
                          <AiOutlineStar className="text-gray-300" />
                        )}
                      </button>
                    ))}
                    <span className="ml-3 text-lg text-gray-600">
                      {reviewRating} {reviewRating === 1 ? "star" : "stars"}
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Share your thoughts about this product..."
                    required
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={submittingReview}
                  >
                    {submittingReview ? "Submitting..." : "Submit Review"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowReviewForm(false);
                      setReviewComment("");
                      setReviewRating(5);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              {reviewsLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Loading reviews...</p>
                </div>
              ) : reviews?.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">
                    No reviews yet. Be the first to review!
                  </p>
                </div>
              ) : (
                reviews?.map((review) => (
                  <div
                    key={review._id}
                    className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {review.user?.name || "Anonymous"}
                          </h4>
                          <Rating rating={review.rating} size="sm" />
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      {auth?.user?._id === review.user?._id && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteReview(review._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Similar Products */}
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Similar Products
              </h2>
            </div>

            {relatedProducts.length < 1 ? (
              <div className="text-center py-8 sm:py-12 bg-white rounded-xl sm:rounded-2xl">
                <p className="text-sm sm:text-base text-gray-600">
                  No similar products found
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {relatedProducts?.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
