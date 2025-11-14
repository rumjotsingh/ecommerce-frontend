import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ModernAdminDashboard = () => {
  const [auth] = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  // Mock data for charts
  const salesData = [
    { name: "Jan", sales: 4000, orders: 240 },
    { name: "Feb", sales: 3000, orders: 198 },
    { name: "Mar", sales: 5000, orders: 300 },
    { name: "Apr", sales: 4500, orders: 278 },
    { name: "May", sales: 6000, orders: 389 },
    { name: "Jun", sales: 5500, orders: 349 },
  ];

  const productData = [
    { name: "Electronics", value: 400 },
    { name: "Fashion", value: 300 },
    { name: "Home", value: 200 },
    { name: "Sports", value: 150 },
  ];

  useEffect(() => {
    // Fetch dashboard stats
    fetchStats();
  }, []);

  const fetchStats = async () => {
    // Mock stats - replace with actual API calls
    setStats({
      totalOrders: 1234,
      totalProducts: 567,
      totalUsers: 890,
      totalRevenue: 45678,
    });
  };

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
    <Card className="hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                {trend === "up" ? (
                  <TrendingUp size={16} className="text-green-500" />
                ) : (
                  <TrendingDown size={16} className="text-red-500" />
                )}
                <span
                  className={`text-sm font-medium ${
                    trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {trendValue}%
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            )}
          </div>
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${color}`}
          >
            <Icon size={32} className="text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout title="Admin Dashboard - ShopHub">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {auth?.user?.name}!
              </h1>
              <p className="text-gray-600">Here's what's happening with your store today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatCard
                title="Total Revenue"
                value={`$${stats.totalRevenue.toLocaleString()}`}
                icon={DollarSign}
                trend="up"
                trendValue="12.5"
                color="bg-gradient-to-r from-green-500 to-green-600"
              />
              <StatCard
                title="Total Orders"
                value={stats.totalOrders.toLocaleString()}
                icon={ShoppingCart}
                trend="up"
                trendValue="8.2"
                color="bg-gradient-to-r from-blue-500 to-blue-600"
              />
              <StatCard
                title="Total Products"
                value={stats.totalProducts.toLocaleString()}
                icon={Package}
                trend="up"
                trendValue="3.1"
                color="bg-gradient-to-r from-primary to-primary-600"
              />
              <StatCard
                title="Total Users"
                value={stats.totalUsers.toLocaleString()}
                icon={Users}
                trend="up"
                trendValue="15.3"
                color="bg-gradient-to-r from-secondary to-secondary-600"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#0EA5A4"
                        strokeWidth={2}
                        dot={{ fill: "#0EA5A4" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Orders Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Orders by Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="orders" fill="#7C3AED" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((order) => (
                    <div
                      key={order}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                          #{order}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Order #100{order}</h4>
                          <p className="text-sm text-gray-600">Customer Name • 2 items</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">$99.99</p>
                        <Badge variant="default">Pending</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ModernAdminDashboard;
