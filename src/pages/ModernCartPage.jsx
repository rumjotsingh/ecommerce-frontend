import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Trash2, ShoppingBag, Minus, Plus, ArrowRight } from "lucide-react";

const ModernCartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  // Calculate total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete item
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

  // Get payment gateway token
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

  // Handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
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
    <Layout title="Shopping Cart - ShopHub">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {cart?.length > 0
              ? `You have ${cart.length} ${cart.length === 1 ? "item" : "items"} in your cart`
              : "Your cart is empty"}
          </p>
        </div>

        {cart?.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Add some products to get started!</p>
              <Button size="lg" onClick={() => navigate("/")}>
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart?.map((p) => (
                <Card key={p._id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={`https://ecommerce-backend-s84l.onrender.com/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 truncate">{p.name}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
                          </div>
                          <button
                            onClick={() => removeCartItem(p._id)}
                            className="text-red-500 hover:text-red-600 transition-colors ml-2"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-primary">${p.price}</div>
                          <div className="flex items-center gap-2 border border-gray-200 rounded-lg">
                            <button className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors">
                              <Minus size={16} />
                            </button>
                            <span className="px-4 font-semibold">1</span>
                            <button className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors">
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{totalPrice()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>$0.00</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-primary">{totalPrice()}</span>
                    </div>
                  </div>

                  {auth?.user?.address ? (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Delivery Address</h4>
                      <p className="text-sm text-gray-600 mb-3">{auth?.user?.address}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/dashborad/user/profile")}
                      >
                        Update Address
                      </Button>
                    </div>
                  ) : (
                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                      <p className="text-sm text-yellow-800 mb-3">
                        Please add a delivery address to continue
                      </p>
                      {auth?.token ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate("/dashborad/user/profile")}
                        >
                          Add Address
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate("/login", { state: "/cart" })}
                        >
                          Login to Checkout
                        </Button>
                      )}
                    </div>
                  )}

                  {!clientToken || !cart?.length ? (
                    ""
                  ) : (
                    <div className="space-y-4">
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing..." : "Complete Payment"}
                        <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ModernCartPage;
