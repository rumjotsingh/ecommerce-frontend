import React, { useEffect } from "react";
import Layout from "./../../components/layout/layout";
import { useAuth } from "../../context/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOverview,
  fetchTopProducts,
} from "../../redux/slices/analyticsSlice";
import AdminMenu from "../../components/layout/AdminMenu";
import {
  AiOutlineShoppingCart,
  AiOutlineDollar,
  AiOutlineUser,
  AiOutlineLineChart,
} from "react-icons/ai";
import { BiPackage, BiTrendingUp } from "react-icons/bi";
import Card from "../../components/UI/Card";

const AdminDashboard = () => {
  const [auth] = useAuth();
  const dispatch = useDispatch();
  const { overview, topProducts, loading } = useSelector(
    (state) => state.analytics
  );

  // Fetch analytics data on mount
  useEffect(() => {
    if (auth?.token) {
      dispatch(fetchOverview());
      dispatch(fetchTopProducts());
    }
  }, [auth?.token, dispatch]);

  // Stats data from API
  const stats = [
    {
      title: "Total Revenue",
      value: loading
        ? "..."
        : `$${parseFloat(overview?.totalRevenue || 0).toFixed(2)}`,
      change: "+12.5%",
      icon: <AiOutlineDollar size={32} />,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      title: "Total Orders",
      value: loading ? "..." : (overview?.totalOrders || 0).toString(),
      change: "+8.2%",
      icon: <AiOutlineShoppingCart size={32} />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Total Products",
      value: loading ? "..." : (overview?.totalProducts || 0).toString(),
      change: "+2.4%",
      icon: <BiPackage size={32} />,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      title: "Pending Orders",
      value: loading ? "..." : (overview?.pendingOrders || 0).toString(),
      change: "+18.7%",
      icon: <AiOutlineUser size={32} />,
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
  ];

  // Recent orders - would need separate API endpoint
  const recentOrders = [
    {
      id: "#12345",
      customer: "John Doe",
      amount: "$125.00",
      status: "Completed",
      date: "2 hours ago",
    },
    {
      id: "#12344",
      customer: "Jane Smith",
      amount: "$89.50",
      status: "Processing",
      date: "5 hours ago",
    },
    {
      id: "#12343",
      customer: "Bob Johnson",
      amount: "$234.00",
      status: "Shipped",
      date: "1 day ago",
    },
    {
      id: "#12342",
      customer: "Alice Brown",
      amount: "$56.00",
      status: "Completed",
      date: "2 days ago",
    },
  ];

  return (
    <Layout title="Admin Dashboard">
      <div className="bg-gray-50 min-h-screen py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AdminMenu />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Welcome Section */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                    <AiOutlineUser
                      size={24}
                      className="text-white sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                    />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                      Welcome back, {auth?.user?.name}!
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 truncate">
                      {auth?.user?.email}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    hover
                    className="relative overflow-hidden p-3 sm:p-4 lg:p-6"
                  >
                    <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${stat.bgColor} rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0`}
                        >
                          <span
                            className={`${stat.textColor} text-xl sm:text-2xl lg:text-3xl`}
                          >
                            {React.cloneElement(stat.icon, {
                              size: 20,
                              className: "sm:w-6 sm:h-6 lg:w-8 lg:h-8",
                            })}
                          </span>
                        </div>
                        <span className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs lg:text-sm font-medium text-green-500">
                          <BiTrendingUp
                            size={12}
                            className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4"
                          />
                          {stat.change}
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 truncate">
                          {stat.title}
                        </p>
                        <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Recent Orders */}
                <Card className="p-4 sm:p-6">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                        Recent Orders
                      </h2>
                      <button className="text-xs sm:text-sm text-primary-500 hover:text-primary-600 font-medium">
                        View All
                      </button>
                    </div>
                    <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                      {recentOrders.map((order, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2.5 sm:p-3 lg:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 mb-0.5 sm:mb-1">
                              <span className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                                {order.id}
                              </span>
                              <span
                                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full whitespace-nowrap ${
                                  order.status === "Completed"
                                    ? "bg-green-100 text-green-700"
                                    : order.status === "Processing"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 truncate">
                              {order.customer}
                            </p>
                            <p className="text-[10px] sm:text-xs text-gray-500">
                              {order.date}
                            </p>
                          </div>
                          <div className="text-right ml-2">
                            <p className="font-bold text-gray-900 text-xs sm:text-sm lg:text-base whitespace-nowrap">
                              {order.amount}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Top Products */}
                <Card className="p-4 sm:p-6">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                        Top Products
                      </h2>
                      <button className="text-xs sm:text-sm text-primary-500 hover:text-primary-600 font-medium">
                        View All
                      </button>
                    </div>
                    <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                      {loading ? (
                        <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-gray-500">
                          Loading top products...
                        </div>
                      ) : topProducts?.length > 0 ? (
                        topProducts.map((product, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 sm:gap-3 lg:gap-4 p-2.5 sm:p-3 lg:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-md sm:rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm lg:text-base">
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base truncate">
                                {product.name}
                              </p>
                              <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600">
                                {product.totalSold || 0} sales
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-primary-500 text-xs sm:text-sm lg:text-base whitespace-nowrap">
                                ${parseFloat(product.revenue || 0).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-gray-500">
                          No top products data available
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sales Chart Placeholder */}
              <Card className="p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                      Sales Overview
                    </h2>
                    <div className="flex gap-1.5 sm:gap-2">
                      <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-primary-500 text-white rounded-md sm:rounded-lg">
                        Week
                      </button>
                      <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:bg-gray-100 rounded-md sm:rounded-lg">
                        Month
                      </button>
                      <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:bg-gray-100 rounded-md sm:rounded-lg">
                        Year
                      </button>
                    </div>
                  </div>
                  {/* Chart Placeholder */}
                  <div className="h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <div className="text-center space-y-1.5 sm:space-y-2 px-4">
                      <AiOutlineLineChart
                        size={48}
                        className="text-gray-300 mx-auto sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                      />
                      <p className="text-sm sm:text-base text-gray-500">
                        Chart visualization would go here
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400">
                        Integrate a charting library like Chart.js or Recharts
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
