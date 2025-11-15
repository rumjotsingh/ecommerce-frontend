import React from "react";
import Layout from "./../../components/layout/layout";
import { useAuth } from "../../context/auth";
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

  // Mock data - In real app, fetch from API
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+12.5%",
      icon: <AiOutlineDollar size={32} />,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      icon: <AiOutlineShoppingCart size={32} />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Total Products",
      value: "567",
      change: "+2.4%",
      icon: <BiPackage size={32} />,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      title: "Total Users",
      value: "8,921",
      change: "+18.7%",
      icon: <AiOutlineUser size={32} />,
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
  ];

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

  const topProducts = [
    { name: "Wireless Headphones", sales: 245, revenue: "$12,250" },
    { name: "Smart Watch", sales: 189, revenue: "$9,450" },
    { name: "Laptop Stand", sales: 156, revenue: "$4,680" },
    { name: "USB-C Cable", sales: 432, revenue: "$2,160" },
  ];

  return (
    <Layout title="Admin Dashboard">
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AdminMenu />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Welcome Section */}
              <Card>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
                    <AiOutlineUser size={32} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Welcome back, {auth?.user?.name}!
                    </h1>
                    <p className="text-gray-600">{auth?.user?.email}</p>
                  </div>
                </div>
              </Card>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} hover className="relative overflow-hidden">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                        >
                          <span className={stat.textColor}>{stat.icon}</span>
                        </div>
                        <span className="flex items-center gap-1 text-sm font-medium text-green-500">
                          <BiTrendingUp size={16} />
                          {stat.change}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <Card>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">
                        Recent Orders
                      </h2>
                      <button className="text-sm text-primary-500 hover:text-primary-600 font-medium">
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      {recentOrders.map((order, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-semibold text-gray-900">
                                {order.id}
                              </span>
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
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
                            <p className="text-sm text-gray-600">
                              {order.customer}
                            </p>
                            <p className="text-xs text-gray-500">
                              {order.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">
                              {order.amount}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Top Products */}
                <Card>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">
                        Top Products
                      </h2>
                      <button className="text-sm text-primary-500 hover:text-primary-600 font-medium">
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      {topProducts.map((product, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {product.sales} sales
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary-500">
                              {product.revenue}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sales Chart Placeholder */}
              <Card>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                      Sales Overview
                    </h2>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-sm bg-primary-500 text-white rounded-lg">
                        Week
                      </button>
                      <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                        Month
                      </button>
                      <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                        Year
                      </button>
                    </div>
                  </div>
                  {/* Chart Placeholder */}
                  <div className="h-64 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <AiOutlineLineChart
                        size={64}
                        className="text-gray-300 mx-auto"
                      />
                      <p className="text-gray-500">
                        Chart visualization would go here
                      </p>
                      <p className="text-sm text-gray-400">
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
