import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import toast from "react-hot-toast";
import { applyCoupon, clearAppliedCoupon } from "../redux/slices/couponSlice";
import {
  getRazorpayKey,
  createRazorpayOrder,
  verifyRazorpayPayment,
  clearPaymentState,
} from "../redux/slices/paymentSlice";
import {
  AiOutlineShoppingCart,
  AiOutlineDelete,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineRight,
} from "react-icons/ai";
import { BiPackage } from "react-icons/bi";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    appliedCoupon,
    discount,
    loading: couponLoading,
  } = useSelector((state) => state.coupon);
  const { razorpayKey, loading: paymentLoading } = useSelector(
    (state) => state.payment
  );
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    // Initialize quantities for each cart item from orderQuantity or default to 1
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item._id] = item.orderQuantity || 1;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  //total price
  const subtotal = () => {
    let total = 0;
    cart?.forEach((item) => {
      const qty = item.orderQuantity || 1;
      total = total + item.price * qty;
    });
    return total;
  };
  console.log("Subtotal:", subtotal());

  const calculateTotal = () => {
    const sub = subtotal();
    const tax = sub * 0.1;
    const finalTotal = sub + tax - discount;
    return finalTotal > 0 ? finalTotal : 0;
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty >= 1) {
      // Update quantities state
      setQuantities({
        ...quantities,
        [productId]: newQty,
      });

      // Update cart with new orderQuantity
      const updatedCart = cart.map((item) => {
        if (item._id === productId) {
          return { ...item, orderQuantity: newQty };
        }
        return item;
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item removed from cart");
    } catch (error) {
      console.log(error);
    }
  };

  // Handle coupon apply
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      const result = await dispatch(
        applyCoupon({ code: couponCode, totalAmount: subtotal() })
      ).unwrap();
      // Backend returns {success: true, data: {...}}
      const couponData = result.data || result;
      const savedAmount = parseFloat(couponData.discountAmount) || 0;
      toast.success(`Coupon applied! You saved $${savedAmount.toFixed(2)}`);
    } catch (err) {
      toast.error(err.message || "Invalid coupon code");
    }
  };

  // Handle remove coupon
  const handleRemoveCoupon = () => {
    dispatch(clearAppliedCoupon());
    setCouponCode("");
    toast.success("Coupon removed");
  };

  // Get Razorpay key
  useEffect(() => {
    if (auth?.token) {
      dispatch(getRazorpayKey());
    }
  }, [auth?.token, dispatch]);

  // Clear payment state on unmount
  useEffect(() => {
    return () => {
      dispatch(clearPaymentState());
    };
  }, [dispatch]);

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle Razorpay payment
  const handlePayment = async () => {
    try {
      setLoading(true);

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load payment gateway");
        setLoading(false);
        return;
      }

      // Create order
      const orderResult = await dispatch(
        createRazorpayOrder({
          amount: Math.round(calculateTotal() * 100), // Convert to paise
          cart,
        })
      ).unwrap();

      // Configure Razorpay options
      const options = {
        key: razorpayKey,
        amount: orderResult.order.amount,
        currency: orderResult.currency || "USD",
        name: "E-Commerce Store",
        description: "Order Payment",
        order_id: orderResult.id,
        handler: async function (response) {
          try {
            // Prepare cart data with quantities for backend
            const cartWithQuantities = cart.map((item) => ({
              id: item._id,
              name: item.name,
              price: item.price,
              quantity: quantities[item._id] || item.orderQuantity || 1,
            }));

            // Verify payment
            await dispatch(
              verifyRazorpayPayment({
                razorpay_order_id: orderResult.order.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cart: cartWithQuantities,
              })
            ).unwrap();

            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            dispatch(clearAppliedCoupon());
            navigate("/dashborad/user/orders");
            toast.success("Payment Completed Successfully!");
          } catch (error) {
            setLoading(false);
            toast.error("Payment verification failed");
            console.error("Payment verification error:", error);
          }
        },
        prefill: {
          name: auth?.user?.name,
          email: auth?.user?.email,
          contact: auth?.user?.phone,
        },
        theme: {
          color: "#0EA5A4",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response) {
        setLoading(false);
        toast.error("Payment failed. Please try again.");
      });
      razorpay.open();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message || "Payment failed");
    }
  };

  return (
    <Layout title="Shopping Cart">
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              {cart?.length
                ? `You have ${cart.length} item${
                    cart.length > 1 ? "s" : ""
                  } in your cart`
                : "Your cart is empty"}
            </p>
          </div>

          {cart?.length === 0 ? (
            <Card className="text-center py-16">
              <div className="flex flex-col items-center gap-6">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                  <AiOutlineShoppingCart size={64} className="text-gray-300" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Your cart is empty
                  </h2>
                  <p className="text-gray-600">
                    Start shopping to add items to your cart
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate("/")}
                  icon={<BiPackage size={20} />}
                >
                  Continue Shopping
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart?.map((product) => (
                  <Card key={product._id} hover>
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Product Image */}
                      <div
                        className="w-full sm:w-32 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
                        onClick={() => navigate(`/product/${product.slug}`)}
                      >
                        <img
                          src={API_ENDPOINTS.PRODUCT.GET_PHOTO(product._id)}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3
                            className="text-lg font-semibold text-gray-900 hover:text-primary-500 cursor-pointer transition-colors"
                            onClick={() => navigate(`/product/${product.slug}`)}
                          >
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4">
                          {/* Price */}
                          <div className="text-2xl font-bold text-primary-500">
                            ${product.price}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  product._id,
                                  (quantities[product._id] || 1) - 1
                                )
                              }
                              className="w-8 h-8 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:border-primary-500 hover:text-primary-500 transition-colors"
                            >
                              <AiOutlineMinus size={16} />
                            </button>
                            <span className="text-lg font-semibold w-12 text-center">
                              {quantities[product._id] || 1}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  product._id,
                                  (quantities[product._id] || 1) + 1
                                )
                              }
                              className="w-8 h-8 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:border-primary-500 hover:text-primary-500 transition-colors"
                            >
                              <AiOutlinePlus size={16} />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeCartItem(product._id)}
                            className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <AiOutlineDelete size={20} />
                            <span className="font-medium">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Order Summary
                    </h2>

                    {/* Coupon Section */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Apply Coupon
                      </h3>
                      {appliedCoupon ? (
                        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                          <div className="flex items-center gap-2">
                            <span className="text-green-600 font-semibold">
                              {appliedCoupon.code}
                            </span>
                            <span className="text-sm text-green-600">
                              (-${discount.toFixed(2)})
                            </span>
                          </div>
                          <button
                            onClick={handleRemoveCoupon}
                            className="text-sm text-red-500 hover:text-red-600 font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) =>
                              setCouponCode(e.target.value.toUpperCase())
                            }
                            placeholder="Enter coupon code"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                          <Button
                            variant="outline"
                            onClick={handleApplyCoupon}
                            disabled={couponLoading || !couponCode.trim()}
                            className="whitespace-nowrap"
                          >
                            {couponLoading ? "..." : "Apply"}
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium">
                          ${subtotal().toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="font-medium text-green-500">Free</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax (10%)</span>
                        <span className="font-medium">
                          ${(subtotal() * 0.1).toFixed(2)}
                        </span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount ({appliedCoupon?.code})</span>
                          <span className="font-medium">
                            -${discount.toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-baseline">
                          <span className="text-xl font-semibold text-gray-900">
                            Total
                          </span>
                          <span className="text-3xl font-bold text-primary-500">
                            ${calculateTotal().toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Address Section */}
                    {auth?.user?.address ? (
                      <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Delivery Address
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {auth?.user?.address}
                        </p>
                        <button
                          onClick={() => navigate("/dashborad/user/profile")}
                          className="text-sm text-primary-500 font-medium hover:text-primary-600"
                        >
                          Change Address
                        </button>
                      </div>
                    ) : (
                      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <p className="text-sm text-yellow-800 mb-3">
                          Please add a delivery address to continue
                        </p>
                        <Button
                          variant="outline"
                          fullWidth
                          onClick={() =>
                            auth?.token
                              ? navigate("/dashborad/user/profile")
                              : navigate("/login", { state: "/cart" })
                          }
                        >
                          {auth?.token ? "Add Address" : "Login to Continue"}
                        </Button>
                      </div>
                    )}

                    {/* Payment Section */}
                    {cart?.length > 0 && razorpayKey && (
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                          <p className="text-sm text-blue-800">
                            <strong>Secure Payment:</strong> Your payment is
                            processed securely through Razorpay
                          </p>
                        </div>

                        <Button
                          variant="primary"
                          size="lg"
                          fullWidth
                          onClick={handlePayment}
                          disabled={loading || !auth?.user?.address}
                          icon={<AiOutlineRight size={20} />}
                          iconPosition="right"
                        >
                          {loading ? "Processing..." : "Proceed to Payment"}
                        </Button>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
