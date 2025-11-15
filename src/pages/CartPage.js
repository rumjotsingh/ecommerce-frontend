import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
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
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    // Initialize quantities for each cart item
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item._id] = 1;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  //total price

  const subtotal = () => {
    let total = 0;
    cart?.forEach((item) => {
      const qty = quantities[item._id] || 1;
      total = total + item.price * qty;
    });
    return total;
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty >= 1) {
      setQuantities({
        ...quantities,
        [productId]: newQty,
      });
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

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-backend-s84l.onrender.com/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post(
        "https://ecommerce-backend-s84l.onrender.com/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashborad/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
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
                          src={`https://ecommerce-backend-s84l.onrender.com/api/v1/product/product-photo/${product._id}`}
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
                        <span>Tax</span>
                        <span className="font-medium">
                          ${(subtotal() * 0.1).toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-baseline">
                          <span className="text-xl font-semibold text-gray-900">
                            Total
                          </span>
                          <span className="text-3xl font-bold text-primary-500">
                            ${(subtotal() * 1.1).toFixed(2)}
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
                    {!clientToken || !cart?.length ? (
                      ""
                    ) : (
                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded-xl p-4">
                          <DropIn
                            options={{
                              authorization: clientToken,
                              paypal: {
                                flow: "vault",
                              },
                            }}
                            onInstance={(instance) => setInstance(instance)}
                          />
                        </div>

                        <Button
                          variant="primary"
                          size="lg"
                          fullWidth
                          onClick={handlePayment}
                          disabled={
                            loading || !instance || !auth?.user?.address
                          }
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
