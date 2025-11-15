import React from "react";
import Layout from "../../components/layout/layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";
import Card from "../../components/UI/Card";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineHome,
  AiOutlinePhone,
  AiOutlineCalendar,
} from "react-icons/ai";

const Dashboard = () => {
  const [auth] = useAuth();

  const userInfo = [
    {
      icon: <AiOutlineUser size={24} />,
      label: "Full Name",
      value: auth?.user?.name || "N/A",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <AiOutlineMail size={24} />,
      label: "Email Address",
      value: auth?.user?.email || "N/A",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <AiOutlinePhone size={24} />,
      label: "Phone Number",
      value: auth?.user?.phone || "N/A",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <AiOutlineHome size={24} />,
      label: "Address",
      value: auth?.user?.address || "N/A",
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <UserMenu />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              {/* Welcome Card */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                    <AiOutlineUser
                      size={24}
                      className="text-white sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                    />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                      Welcome, {auth?.user?.name}!
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                      Manage your account and view your activity
                    </p>
                  </div>
                </div>
              </Card>

              {/* User Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {userInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-soft-lg transition-shadow duration-300 p-4 sm:p-6"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${info.color} rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <span className="text-white">{info.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">
                          {info.label}
                        </p>
                        <p className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Quick Stats */}
              <Card className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Account Overview
                </h2>
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg sm:rounded-xl">
                    <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1.5 sm:mb-2">
                      0
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Total Orders
                    </div>
                  </div>
                  <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-lg sm:rounded-xl">
                    <div className="text-2xl sm:text-3xl font-bold text-secondary-600 mb-1.5 sm:mb-2">
                      $0
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Total Spent
                    </div>
                  </div>
                  <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg sm:rounded-xl">
                    <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1.5 sm:mb-2">
                      Active
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Account Status
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

export default Dashboard;
