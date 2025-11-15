import React, { useState, useEffect } from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "./../../components/layout/layout";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import { useAuth } from "../../context/auth";
import moment from "moment";
import Card from "../../components/UI/Card";
import Badge from "../../components/UI/Badge";
import {
  AiOutlineShoppingCart,
  AiOutlineClockCircle,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_ENDPOINTS.ORDER.GET_ALL);
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "success";
      case "processing":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <Layout title={"Your Orders"}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <UserMenu />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Header */}
              <Card>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <AiOutlineShoppingCart size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      My Orders
                    </h1>
                    <p className="text-gray-600">
                      {orders?.length || 0} total orders
                    </p>
                  </div>
                </div>
              </Card>

              {/* Orders List */}
              {loading ? (
                <div className="grid gap-6">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                      <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-24 bg-gray-200 rounded"></div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : orders?.length > 0 ? (
                <div className="space-y-6">
                  {orders.map((order, index) => (
                    <Card key={order._id}>
                      {/* Order Header */}
                      <div className="border-b pb-4 mb-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-500">
                              Order #{index + 1}
                            </span>
                            <Badge variant={getStatusColor(order?.status)}>
                              {order?.status || "Pending"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <AiOutlineClockCircle size={16} />
                              <span>
                                {moment(order?.createdAt).format(
                                  "MMM DD, YYYY"
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {order?.payment?.success ? (
                                <>
                                  <AiOutlineCheckCircle
                                    size={16}
                                    className="text-green-500"
                                  />
                                  <span className="text-green-600 font-medium">
                                    Payment Success
                                  </span>
                                </>
                              ) : (
                                <>
                                  <AiOutlineCloseCircle
                                    size={16}
                                    className="text-red-500"
                                  />
                                  <span className="text-red-600 font-medium">
                                    Payment Failed
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Products */}
                      <div className="space-y-4">
                        {order?.products?.map((product) => (
                          <div
                            key={product._id}
                            className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                          >
                            <img
                              src={API_ENDPOINTS.PRODUCT.GET_PHOTO(product._id)}
                              alt={product.name}
                              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">
                                {product.description?.substring(0, 80)}...
                              </p>
                              <p className="text-lg font-bold text-primary-600">
                                ${product.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer */}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">
                            Total Items: {order?.products?.length}
                          </span>
                          <span className="text-sm text-gray-500">
                            Buyer: {order?.buyer?.name}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <AiOutlineShoppingCart
                        size={32}
                        className="text-gray-400"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No Orders Yet
                    </h3>
                    <p className="text-gray-600">
                      You haven't placed any orders yet. Start shopping!
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
