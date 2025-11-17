import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import Card from "../../components/UI/Card";
import Badge from "../../components/UI/Badge";
import {
  AiOutlineShoppingCart,
  AiOutlineClockCircle,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
const { Option } = Select;

const AdminOrders = () => {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_ENDPOINTS.ORDER.GET_ALL_ADMIN);
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

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        API_ENDPOINTS.ORDER.UPDATE_STATUS(orderId),
        {
          status: value,
        }
      );
      console.log(data);
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "deliverd":
        return "success";
      case "processing":
        return "warning";
      case "shipped":
        return "info";
      case "cancel":
        return "danger";
      default:
        return "default";
    }
  };
  // console.log(orders);

  return (
    <Layout title={"All Orders Data"}>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AdminMenu />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              {/* Header */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <AiOutlineShoppingCart
                      size={20}
                      className="text-white sm:w-6 sm:h-6"
                    />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                      All Orders
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                      {orders?.length || 0} total orders
                    </p>
                  </div>
                </div>
              </Card>

              {/* Orders List */}
              {loading ? (
                <div className="grid gap-4 sm:gap-6">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} className="p-4 sm:p-6">
                      <div className="animate-pulse space-y-3 sm:space-y-4">
                        <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-20 sm:h-24 bg-gray-200 rounded"></div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : orders?.length > 0 ? (
                <div className="space-y-4 sm:space-y-6">
                  {orders.map((order, index) => (
                    <Card key={order._id} className="p-4 sm:p-6">
                      {/* Order Header */}
                      <div className="border-b pb-3 sm:pb-4 mb-3 sm:mb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className="text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">
                              Order #{index + 1}
                            </span>
                            <Badge variant={getStatusVariant(order?.status)}>
                              {order?.status || "Pending"}
                            </Badge>
                          </div>
                          <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 lg:gap-6 text-xs sm:text-sm">
                            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600">
                              <AiOutlineClockCircle
                                size={14}
                                className="sm:w-4 sm:h-4 flex-shrink-0"
                              />
                              <span className="whitespace-nowrap">
                                {moment(order?.createdAt).format(
                                  "MMM DD, YYYY"
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              {order?.payment?.razorpay_order_id ? (
                                <>
                                  <AiOutlineCheckCircle
                                    size={14}
                                    className="text-green-500 sm:w-4 sm:h-4 flex-shrink-0"
                                  />
                                  <span className="text-green-600 font-medium whitespace-nowrap">
                                    Payment Success
                                  </span>
                                </>
                              ) : (
                                <>
                                  <AiOutlineCloseCircle
                                    size={14}
                                    className="text-red-500 sm:w-4 sm:h-4 flex-shrink-0"
                                  />
                                  <span className="text-red-600 font-medium whitespace-nowrap">
                                    Payment Failed
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Payment Details */}
                        {order?.payment && (
                          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl space-y-2">
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                              Payment Details
                            </h4>
                            <div className="grid grid-cols-1 gap-2 sm:gap-3 text-xs sm:text-sm">
                              {order?.payment?.razorpay_order_id && (
                                <div>
                                  <span className="text-gray-600">
                                    Order ID:
                                  </span>
                                  <p className="font-mono text-gray-900 break-all text-[10px] sm:text-xs">
                                    {order.payment.razorpay_order_id}
                                  </p>
                                </div>
                              )}
                              {order?.payment?.razorpay_payment_id && (
                                <div>
                                  <span className="text-gray-600">
                                    Payment ID:
                                  </span>
                                  <p className="font-mono text-gray-900 break-all text-[10px] sm:text-xs">
                                    {order.payment.razorpay_payment_id}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Status Update */}
                        <div className="mt-3 sm:mt-4 flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4">
                          <label className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                            Update Status:
                          </label>
                          <Select
                            className="w-full xs:flex-1 xs:max-w-xs text-sm"
                            onChange={(value) => handleChange(order._id, value)}
                            defaultValue={order?.status}
                            size="large"
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>

                      {/* Order Products */}
                      <div className="space-y-3 sm:space-y-4">
                        {order?.products?.map((product) => (
                          <div
                            key={product._id}
                            className="flex gap-2.5 sm:gap-3 lg:gap-4 p-2.5 sm:p-3 lg:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors"
                          >
                            <img
                              src={API_ENDPOINTS.PRODUCT.GET_PHOTO(product._id)}
                              alt={product.name}
                              className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 object-cover rounded-md sm:rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base truncate">
                                {product.name}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-600 mb-1.5 sm:mb-2 line-clamp-2">
                                {product.description?.substring(0, 80)}...
                              </p>
                              <p className="text-base sm:text-lg font-bold text-primary-600">
                                ${product.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer */}
                      <div className="border-t pt-3 sm:pt-4 mt-3 sm:mt-4">
                        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 text-xs sm:text-sm">
                          <span className="text-gray-600">
                            Total Items: {order?.products?.length}
                          </span>
                          <span className="text-gray-500 truncate">
                            Buyer: {order?.buyer?.name}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-6 sm:p-8">
                  <div className="text-center py-8 sm:py-12">
                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full mb-3 sm:mb-4">
                      <AiOutlineShoppingCart
                        size={28}
                        className="text-gray-400 sm:w-8 sm:h-8"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                      No Orders Yet
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Orders will appear here once customers make purchases
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

export default AdminOrders;
