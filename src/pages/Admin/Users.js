import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "./../../components/layout/layout";
import Card from "../../components/UI/Card";
import { AiOutlineUser } from "react-icons/ai";

const Users = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
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
                    <AiOutlineUser
                      size={20}
                      className="text-white sm:w-6 sm:h-6"
                    />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                      All Users
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                      Manage registered users
                    </p>
                  </div>
                </div>
              </Card>

              {/* Users List Placeholder */}
              <Card className="p-6 sm:p-8">
                <div className="text-center py-10 sm:py-12 lg:py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gray-100 rounded-full mb-3 sm:mb-4">
                    <AiOutlineUser
                      size={32}
                      className="text-gray-400 sm:w-9 sm:h-9 lg:w-10 lg:h-10"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
                    Users Management
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto px-4">
                    This feature is coming soon. You'll be able to view and
                    manage all registered users from here.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
